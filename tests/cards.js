const request = require('supertest'),
	app = require('../index');


describe('Cards', () => {
	it('Get list', (done) => {
		request(app)
			.get('/cards')
			.set('Content-Type', 'application/json')
			.expect(200, [{
				'cardNumber': '5106216010173049',
				'balance': 15000
			}, {
				'cardNumber': '5106216010126757',
				'balance': 700
			}], done);
	});
	it('Empty create request', (done) => {
		request(app)
			.post('/cards')
			.expect(400, {
				'cardNumber': [
					'is missing and it is not optional'
				],
				'balance': [
					'is missing and it is not optional'
				]
			}, done);
	});
	it('Create Card', (done) => {
		request(app)
			.post('/cards')
			.set('Content-Type', 'application/json')
			.send({'cardNumber': '5469550034235124', balance: 800})
			.expect(200, {
				"cardNumber": "5469550034235124",
				"balance": 800
			}, done);
	});
	it('Remove', (done) => {
		request(app)
			.delete('/cards/2')
			.set('Content-Type', 'application/json')
			.expect(200, {
				"cardNumber": "5469550034235124",
				"balance": 800
			}, done);
	});
	it('Luhn failed', (done) => {
		request(app)
			.post('/cards')
			.set('Content-Type', 'application/json')
			.send({'cardNumber': '3242342432234', balance: 800})
			.expect(400, {
				'cardNumber': ['Can\'t pass the LUHN algorithm',]
			}, done);
	});
	it('Without balance', (done) => {
		request(app)
			.post('/cards')
			.set('Content-Type', 'application/json')
			.send({'cardNumber': '3242342432234'})
			.expect(400, {
					'balance': ['is missing and it is not optional',]
				},
				done);
	});
	it('Without cardNumber', (done) => {
		request(app)
			.post('/cards')
			.set('Content-Type', 'application/json')
			.send({balance: 800})
			.expect(400, {
				'cardNumber': [
					'is missing and it is not optional'
				]
			}, done);
	});
	it('Superfluous field', (done) => {
		request(app)
			.post('/cards')
			.set('Content-Type', 'application/json')
			.send({'cardNumber': '5469550034235124', balance: 800, 'Privet': 'Test'})
			.expect(400, {
				'non_field_errors': [
					'numberThe property Privet is not defined in the schema and the schema does not allow additional properties'
				]
			}, done);
	});
	it('Wrong type field', (done) => {
		request(app)
			.post('/cards')
			.set('Content-Type', 'application/json')
			.send({'cardNumber': 5469550034235124, balance: 800})
			.expect(400, {
				'cardNumber': [
					'number value found, but a string is required'
				]
			}, done);
	});
	it('Wrong type field 2', (done) => {
		request(app)
			.post('/cards')
			.set('Content-Type', 'application/json')
			.send({'cardNumber': '5469550034235124', balance: '800'})
			.expect(400, {
				'balance': [
					'string value found, but a number is required'
				]
			}, done);
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
