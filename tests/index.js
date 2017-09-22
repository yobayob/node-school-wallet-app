const request = require('supertest'),
	app = require('../index');


describe('BaseTest', () => {
	it('Ping test', (done) => {
		request(app)
			.get('/')
			.expect(200, done);
	});
});
