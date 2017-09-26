import {Context} from 'koa';
import {CardManager} from '../services/cards'
import {Inject, Singleton} from 'typescript-ioc';
import {Validate} from '../../common/utils'


const createSchemaRequest = {
	additionalProperties: false,
	type: 'object',
	required: ['cardNumber', 'balance'],
	properties: {
		cardNumber: {
			type: 'string',
		},
		balance: {
			type: 'number',
		}
	},
};


@Singleton
export class CardsController {
	constructor(@Inject private cards: CardManager) {
	}

	public async getAllCards(ctx: Context) {
		try {
			ctx.body = await this.cards.all();
		} catch (err) {
			ctx.throw(400)
		}
	}

	public async createCard(ctx: Context) {
		try {
			await Validate(ctx.request.body, createSchemaRequest);
			ctx.body = await this.cards.create(ctx.request.body)
		} catch (err) {
			ctx.body = err;
			ctx.status = 400
		}
	}

	public async deleteCard(ctx: Context) {
		try {
			let cardId = parseInt(ctx.params.cardId);
			await this.cards.remove(cardId);
			ctx.status = 200;
		} catch (err) {
			ctx.throw(404)
		}
	}
}
