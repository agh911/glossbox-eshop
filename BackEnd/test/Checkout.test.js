import chai from 'chai';
import chaiHttp from 'chai-http';
import { expect } from 'chai';
import { createCheckoutSession } from '../controllers/checkout.controller.js';


chai.use(chaiHttp);

describe('Checkout Controller', () => {
    it('should handle checkout session creation errors', async () => {
        const req = {
            body: {
            }
        };
        const res = {
            status: (code) => {
                expect(code).to.equal(400);
                return res;
            },
            json: (data) => {
                expect(data).to.have.property('error').that.is.a('string');
            }
        };

        await createCheckoutSession(req, res);
    });
});
