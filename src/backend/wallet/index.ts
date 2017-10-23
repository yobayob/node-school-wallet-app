import {Application} from '../common/models/application'
import {Inject, Singleton} from 'typescript-ioc';
import * as controllers from './controllers';
import * as Router from 'koa-router';

/*
 Module wallet - all business logic for cards and transaction
 */
@Singleton
export class Wallet extends Application {

	constructor(
		@Inject public router: Router,
		@Inject private cardsController: controllers.CardsController,
		@Inject private transactionController: controllers.TransactionController,
	) {
		super()
	}

	$setRoutes() {

		this.router.param('id', async (id, ctx, next) => {
			ctx.params.id = parseFloat(id);
			await next()
		});

		this.router.param('cardId', async (cardId, ctx, next) => {
			ctx.params.cardId = parseFloat(cardId);
			await next()
		});

		this.router.get('/cards',
			async (ctx) => this.cardsController
				.getAllCards(ctx));

		this.router.post('/cards',
			async (ctx) => this.cardsController
				.createCard(ctx));

		this.router.get('/cards/:cardId',
			async (ctx) => this.cardsController
				.getCard(ctx));

		this.router.delete('/cards/:cardId',
			async (ctx) => this.cardsController
				.deleteCard(ctx));

		this.router.get('/cards/:cardId/transactions',
			async (ctx) => this.transactionController
				.getAllCardTransaction(ctx));

		this.router.post('/cards/:cardId/transactions',
			async (ctx) => this.transactionController
				.createCardTransaction(ctx));

		this.router.post('/cards/:cardId/pay',
			async (ctx) => this.transactionController
				.pay(ctx));

		this.router.post('/cards/:cardId/fill',
			async (ctx) => this.transactionController
				.fill(ctx));

		this.router.post('/cards/:cardId/transfer',
			async (ctx) => this.transactionController
				.transfer(ctx));

		this.router.get('/transactions',
			async (ctx) => this.transactionController
				.getAllTransaction(ctx));
	}
}
