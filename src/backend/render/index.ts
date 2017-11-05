import {Application} from '../common/models'
import {Inject, Singleton} from 'typescript-ioc';
import * as Router from 'koa-router';
import {CardModel, TransactionModel} from '../wallet/models'
import render, {renderLogin} from './render'
import {renderToStaticMarkup} from 'react-dom/server'

/**
 * Server side rendering
 */
@Singleton
export class Render extends Application {

	constructor(
		@Inject public router: Router,
		@Inject private cards: CardModel,
		@Inject private transactions: TransactionModel,
	) {
		super()
	}

	/*
	 * TODO: add cache (LRU)
	 */
	$setRoutes() {
		this.router.get('/', async (ctx) => {
			const cards = await this.cards.all();
			const transactions = await this.transactions.all();
			ctx.body = renderToStaticMarkup(render({cards, transactions}));
		});

		this.router.get('/login', async (ctx) => {
			ctx.body = renderToStaticMarkup(renderLogin());
		})
	}
}
