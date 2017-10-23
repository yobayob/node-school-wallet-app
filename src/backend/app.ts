import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import * as logger from 'koa-logger';
import {tryCatchMiddleware} from './middlewares'
import { Inject } from 'typescript-ioc';
import { Wallet } from './wallet';
import { Render } from './render';
import * as mongoose from 'mongoose';
import * as serve from 'koa-static';
import {log} from './common/logger'

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
		app.use(serve('public'));
		app.use(tryCatchMiddleware);
		this.wallet.register(app);
		this.render.register(app);
		return Promise.resolve(app);
	}

	private async createDB() {
		return mongoose.connect('mongodb://127.0.0.1:27018', { useMongoClient: true });
	}

	public async start() {
		const db = await this.createDB();
		const app = await this.createApp();
		log.info('Started listening on port 3000...');
		const server = app.listen(3000);
		return Promise.resolve(server);
	}
}
