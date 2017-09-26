import { Context } from 'koa';
import { TransactionManager, CardManager } from '../services'
import { Inject, Singleton } from 'typescript-ioc';

@Singleton
export class TransactionController {
	constructor(
		@Inject private transaction: TransactionManager,
		@Inject private card: CardManager
	) { }

	public async getAllCardTransaction(ctx: Context){
		try {
			const card = await this.card.get(ctx.params.cardId);
			const transaction = await this.transaction.all(card);
		} catch (err){
			ctx.throw(400)
		}
	}

	public async createCardTransaction(ctx: Context){
		try {
			const card = await this.card.get(ctx.params.cardId);
			const transaction = await this.transaction.create(card);
		} catch (err){
			ctx.throw(400)
		}
	}
}



