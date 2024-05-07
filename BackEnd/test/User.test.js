import chai from 'chai';
import chaiHttp from 'chai-http';
import { expect } from 'chai';
import { SERVER } from '../server.js';
import User from '../models/user.model.js';

chai.use(chaiHttp);
const testServer = chai.request(SERVER).keepOpen();

describe('User API Tests', () => {

    describe('POST /auth/signUp', () => {
        after(async () => {
            await User.findOneAndDelete({ email: 'johndoe@example.com' });
        });

        it('should successfully sign up a new user', async () => {
            const res = await testServer
                .post('/auth/signUp')
                .send({
                    name: 'John Doe',
                    username: 'johndoe',
                    email: 'johndoe@example.com',
                    password: 'secretPassword123'
                });

            expect(res).to.have.status(200);
            expect(res.body).to.have.property('message').equal('Sign up successful.');
        });

        it('should return an error if email is already in use', async () => {
            const res = await testServer
                .post('/auth/signUp')
                .send({
                    name: 'John Doe',
                    username: 'johndoe2',
                    email: 'johndoe@example.com',
                    password: 'secretPassword123'
                });

            expect(res).to.have.status(409);
            expect(res.body).to.have.property('message').equal('Email is already in use.');
        });
    });

    describe('POST /auth/signIn', () => {
        it('should successfully sign in with correct credentials', async () => {
            const res = await testServer
                .post('/auth/signIn')
                .send({
                    email: 'test@example.com',
                    password: 'secretPassword123'
                });

            expect(res).to.have.status(200);
            expect(res.body).to.have.property('message').equal('Successful sign in.');
        });

        it('should return an error with invalid credentials', async () => {
            const res = await testServer
                .post('/auth/signIn')
                .send({
                    email: 'test@example.com',
                    password: 'wrongpassword123'
                });

            expect(res).to.have.status(401);
            expect(res.body).to.have.property('message').equal('Invalid credentials.');
        });
    });

    describe('POST /getUser', () => {
        it('should return user data for a valid email', async () => {
            const res = await testServer
                .post('/getUser')
                .send({
                    email: 'test@example.com'
                });

            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');
        });

        it('should return a 404 error for an invalid email', async () => {
            const res = await testServer
                .post('/getUser')
                .send({
                    email: 'nonexistent@example.com'
                });

            expect(res).to.have.status(404);
            expect(res.text).to.equal('Apologies, we were not able to find this user.');
        });
    });
});