import chai from 'chai';
import chaiHttp from 'chai-http';
import { expect } from 'chai';
import { SERVER } from '../server.js';

chai.use(chaiHttp);
const testServer = chai.request(SERVER).keepOpen();

describe('Basket API Tests', () => {
    const userId = '6630e8fb3bb556af26349d71';
    const productId = '6630ee0e218e7742629b1566';

    it('should add a product to the basket', async () => {
        const res = await testServer
            .post('/api/basket')
            .send({
                userId: userId,
                productId: productId,
                quantity: 1
            });

        expect(res).to.have.status(200);
        expect(res.body).to.have.property('success').equal(true);
        expect(res.body.basket).to.be.an('object');
        expect(res.body.basket.items).to.have.lengthOf(1);
    });

    it('should update the quantity of a product in the basket', async () => {
        const res = await testServer
            .put(`/api/basket/${userId}/${productId}`)
            .send({
                quantity: 2
            });

        expect(res).to.have.status(200);
        expect(res.body).to.have.property('success').equal(true);
        expect(res.body.basket).to.be.an('object');
        expect(res.body.basket.items[0].quantity).to.equal(2);
    });

    it('should remove a product from the basket', async () => {
        const res = await testServer
            .delete(`/api/basket/${userId}/${productId}`);

        expect(res).to.have.status(200);
        expect(res.body).to.have.property('success').equal(true);
        expect(res.body.basket).to.be.an('object');
        expect(res.body.basket.items).to.have.lengthOf(0);
    });
});
