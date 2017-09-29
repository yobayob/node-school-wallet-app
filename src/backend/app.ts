import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import * as logger from 'koa-logger';
import * as Router from 'koa-router';
import * as controllers from './wallet/controllers'
import { Inject } from 'typescript-ioc';
import { IRouterContext } from 'koa-router'
import { Wallet } from './wallet/wallet';
import * as serve from 'koa-static';

export class App {

	constructor(@Inject private wallet: Wallet) { }

	private async createApp() {
		const app: Koa = new Koa();
		app.use(logger());
		app.use(bodyParser());
		app.use(serve('dist/frontend'));
		this.wallet.register(app);
		return Promise.resolve(app);
	}

	public async start() {
		const app = await this.createApp();
		console.log('Started listening on port 3000...');
		const server = app.listen(3000);
		return Promise.resolve(server);
	}
}
