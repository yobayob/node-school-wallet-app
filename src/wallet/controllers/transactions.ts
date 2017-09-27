import { Context } from 'koa';
import { TransactionManager, CardManager } from '../services'
import { Inject, Singleton } from 'typescript-ioc';
import {Validate} from '../../common/utils'


const createTransactionSchema = {
	additionalProperties: false,
	type: 'object',
	required: ['cardId', 'type', 'data', 'time', 'sum'],
	properties: {
		cardId: {
			type: 'number'
		},
		type: {
			type: 'string'
		},
		data: {
			type: 'string'
		},
		time: {
			type: 'date-time'
		},
		sum: {
			type: 'number'
		},
	}
};


@Singleton
export class TransactionController {
	constructor(
		@Inject private transaction: TransactionManager,
		@Inject private card: CardManager
	) { }

	public async getAllCardTransaction(ctx: Context) {
		try {
			const card = await this.card.get(parseInt(ctx.params.cardId, 10));
			const transactions = await this.transaction.all(card);
			ctx.body = transactions
		} catch (err) {
			ctx.body = err;
			ctx.status = 400
		}
	}

	public async createCardTransaction(ctx: Context) {
		try {
			await Validate(ctx.request.body, createTransactionSchema);
			const card = await this.card.get(parseInt(ctx.params.cardId, 10));
			const trans = await this.transaction.create(card, ctx.request.body);
			ctx.body = trans;
		} catch (err) {
			ctx.body = err;
			ctx.status = 400
		}
	}
}



