import {Application} from '../common/models/application'
import {cookieCheckerMiddleware} from '../middlewares/cookie.middleware'
import {Inject, Singleton} from 'typescript-ioc'
import * as controllers from './controllers'
import * as Router from 'koa-router'

import {NotificationServer} from '../notifications'

/*
 Module wallet - all business logic for cards and transaction
 */
@Singleton
export class Wallet extends Application {

	constructor(
		@Inject public router: Router,
		@Inject private cardsController: controllers.CardsController,
		@Inject private transactionController: controllers.TransactionController,
		@Inject private notificationServer: NotificationServer,
		@Inject private goalController: controllers.GoalController,
	) {
		super()
	}

	$setRoutes() {

		this.router.use(cookieCheckerMiddleware);

		this.router.param('id', async (id, ctx, next) => {
			ctx.params.id = parseFloat(id);
			await next()
		});

		this.router.param('goalId', async (goalId, ctx, next) => {
			ctx.params.id = parseFloat(goalId);
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
			cookieCheckerMiddleware,
			async (ctx) => this.transactionController
				.pay(ctx));

		this.router.post('/cards/:cardId/fill',
			cookieCheckerMiddleware,
			async (ctx) => this.transactionController
				.fill(ctx));

		this.router.post('/cards/:cardId/transfer',
			cookieCheckerMiddleware,
			async (ctx) => this.transactionController
				.transfer(ctx));

		this.router.get('/cards/:cardId/file-transaction',
			async (ctx) => this.transactionController
				.getCardTransactionCSV(ctx));

		this.router.post('/goals',
			async (ctx) => this.goalController
				.createGoal(ctx));

		this.router.post('/goals/:goalId',
			async (ctx) => this.goalController
				.pay(ctx));

		this.router.get('/transactions', async (ctx) => {
			await this.transactionController.getAllTransaction(ctx);

			/**
			 * For testing
			 *  TODO: remove me, pls
			 */
			this.notificationServer.notifyClientTest({
				type: 'transaction_success',
				data: 'success',
			})
		});
	}
}
