import {ApplicationSchema} from '../common/interfaces/application';
import {Inject, Singleton} from 'typescript-ioc';
import * as Router from 'koa-router';
import {CardModel, TransactionModel} from '../wallet/models'
import render from './render'
import * as App from 'koa';
import {renderToStaticMarkup} from 'react-dom/server'

/**
 * Server side rendering
 */
@Singleton
export class Render implements ApplicationSchema {

	constructor(
		@Inject private router: Router,
		@Inject private cards: CardModel,
		@Inject private transactions: TransactionModel,
	) {}

	/*
	 * TODO: add cache (LRU)
	 */
	$setRoutes() {
		this.router.get('/', async (ctx) => {
			const cards = await this.cards.all();
			const transactions = await this.transactions.all();
			ctx.body = renderToStaticMarkup(render({cards, transactions}));
		})
	}

	register(app: App): void {
		this.$setRoutes();
		app.use(this.router.routes());
		app.use(this.router.allowedMethods());
	}
}
