const request = require('supertest'),
	app = require('../index');


describe('Cards', () => {
	it('Get list', (done) => {
		request(app)
			.get('/cards')
			.expect(200, done);
	});
	it('Empty create request', (done) => {
		request(app)
			.post('/cards')
			.expect(400, done);
	});
	it('Create Card', (done) => {
		request(app)
			.post('/cards')
			.set('Content-Type', 'application/json')
			.send({'cardNumber': '5469550034235124', balance: 800})
			.expect(200, done);
	});
	it('Remove', (done) => {
		request(app)
			.delete('/cards/2')
			.set('Content-Type', 'application/json')
			.expect(200, done);
	});
	it('Luhn failed', (done) => {
		request(app)
			.post('/cards')
			.set('Content-Type', 'application/json')
			.send({'cardNumber': '3242342432234', balance: 800})
			.expect(400, done);
	});
	it('Without balance', (done) => {
		request(app)
			.post('/cards')
			.set('Content-Type', 'application/json')
			.send({'cardNumber': '3242342432234'})
			.expect(400, done);
	});
	it('Without cardNumber', (done) => {
		request(app)
			.post('/cards')
			.set('Content-Type', 'application/json')
			.send({balance: 800})
			.expect(400, done);
	});
	it('Superfluous field', (done) => {
		request(app)
			.post('/cards')
			.set('Content-Type', 'application/json')
			.send({'cardNumber': '5469550034235124', balance: 800, 'Privet': 'Test'})
			.expect(400, done);
	});
	it('Wrong type field', (done) => {
		request(app)
			.post('/cards')
			.set('Content-Type', 'application/json')
			.send({'cardNumber': 5469550034235124, balance: 800})
			.expect(400, done);
	});
	it('Wrong type field 2', (done) => {
		request(app)
			.post('/cards')
			.set('Content-Type', 'application/json')
			.send({'cardNumber': '5469550034235124', balance: '800'})
			.expect(400, done);
	});
	it('Remove invalid id', (done) => {
		request(app)
			.get('/cards/sadas')
			.set('Content-Type', 'application/json')
			.expect(404, done);
	});
	it('Remove not exists id', (done) => {
		request(app)
			.get('/cards/99')
			.set('Content-Type', 'application/json')
			.expect(404, done);
	});
	it('Remove id than less zero', (done) => {
		request(app)
			.get('/cards/-2')
			.set('Content-Type', 'application/json')
			.expect(404, done);
	});
});
