import {Context} from 'koa';
import {CardManager} from '../services/cards'
import {Inject, Singleton} from 'typescript-ioc';
import {Validate} from '../../common/utils'
import {cardCreateSchema} from '../schema'

@Singleton
export class CardsController {
	constructor(@Inject private cards: CardManager) {}

	public async getAllCards(ctx: Context) {
		ctx.body = await this.cards.all();
	}

	public async getCard(ctx: Context) {
		ctx.body = await this.cards.get(ctx.params.cardId);
	}

	public async createCard(ctx: Context) {
		await Validate(ctx.request.body, cardCreateSchema);
		ctx.body = await this.cards.create(ctx.request.body)
	}

	public async deleteCard(ctx: Context) {
		const cardId = parseInt(ctx.params.cardId, 10);
		await this.cards.remove(cardId);
	}
}

