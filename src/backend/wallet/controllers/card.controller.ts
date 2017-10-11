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
		},
	},
};

@Singleton
export class CardsController {
	constructor(@Inject private cards: CardManager) {
	}

	public async getAllCards(ctx: Context) {
		ctx.body = await this.cards.all();
	}

	public async createCard(ctx: Context) {
		await Validate(ctx.request.body, createSchemaRequest);
		ctx.body = await this.cards.create(ctx.request.body)
	}

	public async deleteCard(ctx: Context) {
			const cardId = parseInt(ctx.params.cardId, 10);
			await this.cards.remove(cardId);
			ctx.status = 200;
	}
}

