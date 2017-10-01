import {ApplicationSchema} from '../common/interfaces/application'
import {Inject, Singleton} from 'typescript-ioc';
import * as controllers from './controllers';
import * as Router from 'koa-router';
import * as App from 'koa';

/*
 Module wallet - all business logic for cards and transaction
 */
@Singleton
export class Wallet implements ApplicationSchema {

	constructor(
		@Inject private router: Router,
		@Inject private cardsController: controllers.CardsController,
		@Inject private transactionController: controllers.TransactionController
	) {}

	$setRoutes() {

		this.router.get('/cards',
			async (ctx) => this.cardsController
				.getAllCards(ctx));

		this.router.post('/cards',
			async (ctx) => this.cardsController
				.createCard(ctx));

		this.router.delete('/cards/:cardId',
			async (ctx) => this.cardsController
				.deleteCard(ctx));

		this.router.get('/cards/:cardId/transaction',
			async (ctx) => this.transactionController
				.getAllCardTransaction(ctx));

		this.router.post('/cards/:cardId/transaction',
			async (ctx) => this.transactionController
				.createCardTransaction(ctx));
	}

	register(app: App): void {
		this.$setRoutes();
		app.use(this.router.routes());
		app.use(this.router.allowedMethods());
	}
}
