import { Context } from 'koa';
import { TransactionManager, CardManager } from '../services'
import { Inject, Singleton } from 'typescript-ioc';
import {Validate} from '../../common/utils'
import {transactionCreateSchema, transactionPaySchema, transactionTransferSchema} from '../schema'

@Singleton
export class TransactionController {
	constructor(
		@Inject private transaction: TransactionManager,
		@Inject private card: CardManager,
	) { }

	public async getAllTransaction(ctx: Context) {
		ctx.body = await this.transaction.all()
	}

	public async getAllCardTransaction(ctx: Context) {
		const card = await this.card.get(ctx.params.cardId);
		const trans = await this.transaction.all(card);
		ctx.body = trans
	}

	public async createCardTransaction(ctx: Context) {
		await Validate(ctx.request.body, transactionCreateSchema as any);
		const card = await this.card.get(ctx.params.cardId);
		const trans = await this.transaction.create(card, ctx.request.body);
		ctx.body = trans;
	}

	public async pay(ctx: Context) {
		await Validate(ctx.request.body, transactionPaySchema);
		const amount = parseFloat(ctx.request.body.amount);
		const card = await this.card.get(ctx.params.cardId);
		ctx.body = await this.transaction.create(card, {
			type: 'paymentMobile',
			data: 'PAY',
			sum: -amount,
		});
	}

	public async fill(ctx: Context) {
		await Validate(ctx.request.body, transactionPaySchema);
		const amount = parseFloat(ctx.request.body.amount);
		const card = await this.card.get(ctx.params.cardId);
		ctx.body = await this.transaction.create(card, {
			type: 'prepaidCard',
			data: 'FILL',
			sum: amount,
		});
	}

	public async transfer(ctx: Context) {
		await Validate(ctx.request.body, transactionTransferSchema);
		const cardOut = await this.card.get(parseInt(ctx.request.body.cardId, 10));
		const cardIn = await this.card.get(ctx.params.cardId);
		const amount = parseFloat(ctx.request.body.amount);
		ctx.body = await this.transaction.transfer(cardIn, cardOut, amount);
	}
}

