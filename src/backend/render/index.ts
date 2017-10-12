import {ApplicationSchema} from '../common/interfaces/application';
import {Inject, Singleton} from 'typescript-ioc';
import * as Router from 'koa-router';
import {CardManager, TransactionManager} from '../wallet/services'
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
		@Inject private cards: CardManager,
		@Inject private transactions: TransactionManager,
	) {}

	/*
	 * TODO: add cache (LRU)
	 */
	$setRoutes() {
		this.router.get('/', async (ctx) => {
			const cards = await this.cards.all();
			const transactions = await this.transactions.full();
			ctx.body = renderToStaticMarkup(render({cards, transactions}));
		})
	}

	register(app: App): void {
		this.$setRoutes();
		app.use(this.router.routes());
		app.use(this.router.allowedMethods());
	}
}
