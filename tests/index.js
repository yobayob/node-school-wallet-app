const request = require('supertest'),
	app = require('../index');

describe('BaseTest', () => {
	it('Ping test', (done) => {
		request(app)
			.get('/ping')
			.expect(200, {
				'ping': 'pong',
			}, done);
	});
});
