import {expect} from 'chai';
import {Server} from 'http';
import * as Koa from 'koa';
import 'mocha';
import * as sinon from 'sinon';
import {agent} from 'supertest';
import {instance, mock, verify, when} from 'ts-mockito';
import {Container} from 'typescript-ioc';
import {Card} from '../src/backend/wallet/models'
import {App} from '../src/backend/app';
import {writeFileSync} from 'fs';

describe('E2E: Cards', () => {
	let app: Server;

	const cardNumber = '5469550034235124';
	const cardNumber2 = '5106216010126757';
	const balance = 500;

	function clean() {
		writeFileSync(`src/backend/source/cards.json`, JSON.stringify([]));
		writeFileSync(`src/backend/source/transactions.json`, JSON.stringify([]));
	}

	before(async () => {
		clean();
		const myApp: App = Container.get(App);
		app = await myApp.start();
	});

	after(async () => {
		clean();
	});

	describe('POST /cards', () => {

		it('should return the success', async () => {
			const response = await agent(app)
				.post('/cards')
				.send({
					cardNumber: cardNumber,
					balance: balance,
				})
				.accept('json')
				.expect(200);

			const result: Card = response.body;
			expect(result.id).to.equal(1);
			expect(result.cardNumber).to.equal(cardNumber);
			expect(result.balance).to.equal(balance);
		});

		it('should return the success 2', async () => {
			const response = await agent(app)
				.post('/cards')
				.send({
					cardNumber: cardNumber2,
					balance: balance
				})
				.accept('json')
				.expect(200);

			const result: Card = response.body;
			expect(result.id).to.equal(2);
			expect(result.cardNumber).to.equal(cardNumber2);
			expect(result.balance).to.equal(balance);
		});

		it('should return the error duplicate', async () => {
			const response = await agent(app)
				.post('/cards')
				.send({
					cardNumber: cardNumber,
					balance: balance
				})
				.accept('json')
				.expect(400);
		});

		it('should return the error (not balance)', async () => {
			const response = await agent(app)
				.post('/cards')
				.send({
					cardNumber: cardNumber2,
				})
				.accept('json')
				.expect(400);
		});

		it('should return the error (not cardNumber)', async () => {
			const response = await agent(app)
				.post('/cards')
				.send({
					balance: balance
				})
				.accept('json')
				.expect(400);
		});

		it('should return the error (fail luhn)', async () => {
			const response = await agent(app)
				.post('/cards')
				.send({
					cardNumber: '234234233',
					balance: balance
				})
				.accept('json')
				.expect(400);
		});

		it('should return the error (unknown field)', async () => {
			const response = await agent(app)
				.post('/cards')
				.send({
					privet: 'poka',
					cardNumber: cardNumber2,
					balance: balance
				})
				.accept('json')
				.expect(400);
		});

		it('should return the error (not data)', async () => {
			const response = await agent(app)
				.post('/cards')
				.accept('json')
				.expect(400);
		})
	});

	describe('GET /cards', () => {
		it('should return the success', async () => {

			const response = await agent(app)
				.get('/cards')
				.accept('json')
				.expect(200);
			const result: Card[] = response.body;
			expect(result.length).to.equal(2);
			expect(result[0].cardNumber).to.equal(cardNumber);
			expect(result[0].balance).to.equal(balance);
		});
	});

	describe('DELETE /cards', () => {
		it('should return the success', async () => {
			const response = await agent(app)
				.delete('/cards/2')
				.accept('json')
				.expect(200);
		});
		it('should return the success', async () => {
			const response = await agent(app)
				.delete('/cards/0')
				.accept('json')
				.expect(404);
		});
		it('should return the success', async () => {
			const response = await agent(app)
				.delete('/cards/99')
				.accept('json')
				.expect(404);
		});
		it('should return the success', async () => {
			const response = await agent(app)
				.delete('/cards/dfsdf')
				.accept('json')
				.expect(404);
		})
	});

	describe('POST /cards/:id/transaction', () => {
		it('should return the success', async () => {
			const response = await agent(app)
				.post('/cards/1/transaction')
				.send({
					sum: 200,
					data: '324234234gdfcfg',
					time: '2017-08-9T05:28:31+03:00',
					type: 'prepaidCard',
				})
				.accept('json')
				.expect(200);
		});

		it('should return the error (invalid type)', async () => {
			const response = await agent(app)
				.post('/cards/1/transaction')
				.send({
					sum: 200,
					data: '324234234gdfcfg',
					time: '2017-08-9T05:28:31+03:00',
					type: 'invalid',
				})
				.accept('json')
				.expect(400);
		});

		it('should return the error (invalid card)', async () => {
			const response = await agent(app)
				.post('/cards/2/transaction')
				.send({
					sum: 200,
					data: '324234234gdfcfg',
					time: '2017-08-9T05:28:31+03:00',
					type: 'prepaidCard',
				})
				.accept('json')
				.expect(400);
		});


	})
});
