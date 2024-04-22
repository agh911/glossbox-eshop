import chai from "chai";
import chaiHttp from "chai-http";
import { expect } from "chai";
import { SERVER } from "../server.js";

chai.use(chaiHttp);

const testServer = chai.request(SERVER).keepOpen();

describe('Products request', () => {
    it('should /GET all productData', async () => {
        const res = await testServer
            .get("/")
            .send();

        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        expect(res.body[0].name).to.be.equal("Cicapair Tiger Grass Color Correcting Treatment");
    });

    it('should /GET a single product by ID', async () => {
        const productId = "653e6ec931498e0925f1aee0";
        const res = await testServer
            .get(`/product/${encodeURIComponent(productId)}`)
            .send();

        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body._id).to.equal(productId);
    });
});