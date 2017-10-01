import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import * as logger from 'koa-logger';
import { Inject } from 'typescript-ioc';
import { Wallet } from './wallet/wallet';
import { Render } from './render';
import * as serve from 'koa-static';
import 'path'

export class App {

	constructor(
		@Inject private wallet: Wallet,
		@Inject private render: Render,
	) { }

	private async createApp() {
		const app: Koa = new Koa();
		app.use(logger());
		app.use(bodyParser());
		app.use(serve('dist/frontend'));
		this.wallet.register(app);
		this.render.register(app);
		return Promise.resolve(app);
	}

	public async start() {
		const app = await this.createApp();
		console.log('Started listening on port 3000...');
		const server = app.listen(3000);
		return Promise.resolve(server);
	}
}
