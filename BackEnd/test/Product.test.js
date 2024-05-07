import chai from "chai";
import chaiHttp from "chai-http";
import { expect } from "chai";
import { SERVER } from "../server.js";

chai.use(chaiHttp);
const testServer = chai.request(SERVER).keepOpen();

const productId = '6630ee0e218e7742629b1566';
const invalidProductId = '6630ee0e218e7742629b1567';

describe('Products request', () => {
    describe('getProductDataService', () => {
        it('should /GET all productData', async () => {
            const res = await testServer
                .get("/")
                .send();

            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
            expect(res.body).to.have.lengthOf(2);
            expect(res.body[0].name).to.be.equal("Cicapair Tiger Grass Color Correcting Treatment");
            expect(res.body[1].name).to.be.equal("Madagascar Centella Asiatica 100 Ampoule");

        });
    });

    describe('getSingleProductDataService', () => {
        it('should /GET a single product by ID', async () => {
            const res = await testServer
                .get(`/product/${productId}`);

            // Assertions
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');
            expect(res.body._id).to.equal(productId);
        });

        it('should return an error if product ID is invalid', async () => {
            const res = await testServer
                .get(`/product/${invalidProductId}`);

            expect(res).to.have.status(404);
            expect(res.body).to.have.property('message').equal("Product not found.");
        });

        it('should return an error if fetching single product with an invalid ID format', async () => {
            const res = await testServer
                .get(`/product/invalidProductId`);

            expect(res).to.have.status(500);
            expect(res.body).to.have.property('message').equal('Internal server error.');
        });
    });
});