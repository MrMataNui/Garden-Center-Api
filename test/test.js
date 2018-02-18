const request = require('supertest');
const assert = require('chai').assert;
const app = require('../../server');
const server = request(app);
describe('Authorization', () => {
	let token;
	before ( (done)=> {
		server
			.post('/authenticate')
			.set('Authorization', 'Basic 5d7D57D956Df756tf796oF88F698F967956f9')
			.end( (err, res) => {
				token = res.body.token;
				done();
			});
	});
	it ('should get users', (done) => {
		server
			.get('/users')
			.set('x-access-token', token)
			.expect( 200, done );
	});
	it ('should get David Kaus for id 1', (done) => {
		server
			.get('/users/1')
			.set('x-access-token', token)
			.end( (err, res) => {
				assert.equal(res.body.name, 'David Kaus');
				done();
			});
	});
});