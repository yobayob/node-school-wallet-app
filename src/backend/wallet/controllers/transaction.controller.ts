import { Context } from 'koa';
import { Inject, Singleton } from 'typescript-ioc';
import {Validate} from '../../common/utils'
import {transactionCreateSchema, transactionPaySchema, transactionTransferSchema} from '../schema'
import {TransactionModel, CardModel} from '../models'

@Singleton
export class TransactionController {
	constructor(
		@Inject private trans: TransactionModel,
		@Inject private cards: CardModel,
	) { }

	public async getAllTransaction(ctx: Context) {
		ctx.body = await this.trans.all()
	}

	public async getAllCardTransaction(ctx: Context) {
		const card = await this.cards.get({id: ctx.params.cardId});
		ctx.body = await this.cards.filter({cardId: card.id});
	}

	public async createCardTransaction(ctx: Context) {
		await Validate(ctx.request.body, transactionCreateSchema as any);
		const card = await this.cards.get({id: ctx.params.cardId});
		const {type, data, sum}: any = ctx.request.body;
		ctx.body = await this.trans.createCardTransaction(card, type, data, sum);
	}

	public async pay(ctx: Context) {
		await Validate(ctx.request.body, transactionPaySchema);
		const {amount, data}: any = ctx.request.body;
		const card = await this.cards.get({id: ctx.params.cardId});
		ctx.body = await this.trans.pay(card, data, amount)
	}

	public async fill(ctx: Context) {
		await Validate(ctx.request.body, transactionPaySchema);
		const {amount, data}: any = ctx.request.body;
		const card = await this.cards.get({id: ctx.params.cardId});
		ctx.body = await this.trans.fill(card, data, amount)
	}

	public async transfer(ctx: Context) {
		await Validate(ctx.request.body, transactionTransferSchema);
		const {cardId, amount}: any = ctx.request.body;
		const cardIn = await this.cards.get({id: ctx.params.cardId});
		const cardOut = await this.cards.get({id: cardId});
		ctx.body = await this.trans.transfer(cardIn, cardOut, amount);
	}
}

