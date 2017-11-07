import {Application} from '../common/models'
import {Inject, Singleton} from 'typescript-ioc';
import * as Router from 'koa-router';
import {CardModel, TransactionModel} from '../wallet/models'
import {renderLogin, getSSR} from './render'
import {renderToStaticMarkup} from 'react-dom/server'
import {cookieCheckerMiddleware} from '../middlewares'
import {UserModel} from '../auth/models';
/**
 * Server side rendering
 */
@Singleton
export class Render extends Application {

	constructor(
		@Inject public router: Router,
		@Inject private cards: CardModel,
		@Inject private transactions: TransactionModel,
		@Inject private user: UserModel,
	) {
		super()
	}

	/*
	 * TODO: add cache (LRU) || Promise.all()
	 */
	$setRoutes() {

		this.router.get('(\/card|\/|\/pay)', cookieCheckerMiddleware, async (ctx) => {
			const user = await ctx.state.user;
			const cards = await this.cards.filter({user_id: user.id});
			const transactions = await this.transactions.all();
			ctx.body = renderToStaticMarkup(await getSSR(ctx.url, {cards, transactions, user}));
		});

		this.router.get('/login', async (ctx) => {
			ctx.body = renderToStaticMarkup(renderLogin());
		})
	}
}
