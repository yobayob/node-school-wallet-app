import {Context} from 'koa';
import {Inject, Singleton} from 'typescript-ioc';
import {Validate} from '../../common/utils'
import {cardCreateSchema} from '../schema'
import {CardModel} from '../models'
import {PushManager} from '../../push/push'

@Singleton
export class CardsController {

	constructor(
		@Inject private card: CardModel,
	) {}

	public async getAllCards(ctx: Context) {
		ctx.state.user = await ctx.state.user;
		ctx.body = await this.card.filter({user_id: ctx.state.user.id});
	}

	public async getCard(ctx: Context) {
		ctx.body = await this.card.get({id: ctx.params.cardId});
	}

	public async createCard(ctx: Context) {
		ctx.state.user = await ctx.state.user;
		if (ctx.state.user.token) {
			PushManager.send(
				ctx.state.user.token,
				{title: 'Карта добавлена', body: `Номер карты: ${ctx.request.body.cardNumber}`});
		}
		await Validate({...ctx.request.body, user_id: ctx.state.user.id}, cardCreateSchema);
		ctx.body = await this.card.create({...ctx.request.body, user_id: ctx.state.user.id});
		ctx.status = 201
	}

	public async deleteCard(ctx: Context) {
		await this.card.delete({id: ctx.params.cardId});
		ctx.status = 204;
	}
}
