import chai from 'chai';
import chaiHttp from 'chai-http';
import { expect } from 'chai';
import { SERVER } from '../server.js';

chai.use(chaiHttp);
const testServer = chai.request(SERVER).keepOpen();

const userId = '6630e8fb3bb556af26349d71';
const productId = '6630ee0e218e7742629b1566';
const invalidUserId = 'invalidUserId';
const invalidProductId = 'invalidProductId';

describe('Basket Service Unit Tests', () => {
    describe('addToBasket', () => {
        it('should add a product to the basket', async () => {
            const res = await testServer
                .post('/api/basket')
                .send({ userId, productId, quantity: 1 });

            expect(res).to.have.status(200);
            expect(res.body.success).to.be.true;
            expect(res.body.basket).to.exist;
            expect(res.body.basket.items).to.have.lengthOf(1);
            expect(res.body.basket.items[0].product.toString()).to.equal(productId);
            expect(res.body.basket.items[0].quantity).to.equal(1);
        });

        it('should return an error if user ID is invalid', async () => {
            const res = await testServer
                .post('/api/basket')
                .send({ invalidUserId, productId, quantity: 1 });

            expect(res).to.have.status(500);
            expect(res.body.success).to.be.false;
            expect(res.body.error).to.equal('User not found');
        });

        it('should return an error if product ID is invalid', async () => {
            const res = await testServer
                .post('/api/basket')
                .send({ userId, invalidProductId, quantity: 1 });

            expect(res).to.have.status(500);
            expect(res.body.success).to.be.false;
            expect(res.body.error).to.equal('Product not found');
        });
    });

    describe('updateBasketItemQuantity', () => {
        it('should update the quantity of a product in the basket', async () => {
            const res = await testServer
                .put(`/api/basket/${userId}/${productId}`)
                .send({ quantity: 2 });

            expect(res).to.have.status(200);
            expect(res.body.success).to.be.true;
            expect(res.body.basket).to.exist;
            expect(res.body.basket.items).to.have.lengthOf(1);
            expect(res.body.basket.items[0].quantity).to.equal(2);
        });
    });

    describe('removeFromBasket', () => {
        it('should remove a product from the basket', async () => {
            const res = await testServer
                .delete(`/api/basket/${userId}/${productId}`);

            expect(res).to.have.status(200);
            expect(res.body.success).to.be.true;
            expect(res.body.basket).to.exist;
            expect(res.body.basket.items).to.have.lengthOf(0);
        });
    });
});
