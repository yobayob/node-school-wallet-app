import { Context } from 'koa';
import { CardManager } from '../services/cards'
import { Container, Inject, Singleton } from 'typescript-ioc';

@Singleton
export class CardsController {
	constructor( @Inject private cards: CardManager) { }

	public async getAllCards(ctx: Context) {
		ctx.body = await this.cards.all();
	}
}
