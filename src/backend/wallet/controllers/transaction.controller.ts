import { Context } from 'koa';
import { Inject, Singleton } from 'typescript-ioc';
import {Validate} from '../../common/utils';
import {transactionCreateSchema, transactionPaySchema, transactionTransferSchema} from '../schema'
import {TransactionModel, CardModel, ITransaction} from '../models'
import {PassThrough, Stream} from 'stream'

@Singleton
export class TransactionController {
	constructor(
		@Inject private trans: TransactionModel,
		@Inject private cards: CardModel,
	) {}

	public async getAllTransaction(ctx: Context) {
		ctx.body = await this.trans.all()
	}

	public async getAllCardTransaction(ctx: Context) {
		const card = await this.cards.get({id: ctx.params.cardId});
		ctx.body = await this.trans.filter({cardId: card.id});
	}

	public async createCardTransaction(ctx: Context) {
		await Validate(ctx.request.body, transactionCreateSchema);
		const card = await this.cards.get({id: ctx.params.cardId});
		const {type, data, sum}: any = ctx.request.body;
		ctx.body = await this.trans.createCardTransaction(card, type, data, sum);
		ctx.status = 201;
	}

	public async pay(ctx: Context) {
		await Validate(ctx.request.body, transactionPaySchema);
		const {amount, data}: any = ctx.request.body;
		const card = await this.cards.get({id: ctx.params.cardId});
		ctx.body = await this.trans.pay(card, data, amount);
		ctx.status = 201
	}

	public async fill(ctx: Context) {
		await Validate(ctx.request.body, transactionPaySchema);
		const {amount, data}: any = ctx.request.body;
		const card = await this.cards.get({id: ctx.params.cardId});
		ctx.body = await this.trans.fill(card, data, amount);
		ctx.status = 201
	}

	public async transfer(ctx: Context) {
		await Validate(ctx.request.body, transactionTransferSchema);
		const {cardId, amount}: any = ctx.request.body;
		const cardIn = await this.cards.get({id: ctx.params.cardId});
		const cardOut = await this.cards.get({id: cardId});
		ctx.body = await this.trans.transfer(cardIn, cardOut, amount);
		ctx.status = 201
	}

	public async getCardTransactionCSV(ctx: Context) {

		const stream = new PassThrough();
		const card = await this.cards.get({id: ctx.params.cardId});
		const reader = await this.trans.filter({cardId: card.id}).cursor();

		// TODO: fix this
		stream.write(`id;cardId;type;time;data\n`);
		reader
			.on('data',
				(chunk: any) => stream.write(`${chunk.id};${chunk.cardId};${chunk.type};${chunk.time};${chunk.data}\n`))
			.on('close',
				() => ctx.res.end());

		ctx.req.on('close', () => ctx.res.end());
		ctx.req.on('finish', () => ctx.res.end());
		ctx.req.on('error', () => ctx.res.end());
		ctx.type = 'text/csv';
		ctx.body = stream;

	}
}

