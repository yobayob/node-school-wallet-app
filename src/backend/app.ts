import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import * as logger from 'koa-logger';
import * as mongoose from 'mongoose';
import * as serve from 'koa-static';
import { tryCatchMiddleware } from './middlewares'
import { Inject } from 'typescript-ioc';
import { Wallet } from './wallet';
import { Render } from './render';
import { Auth } from './auth';
import { log } from './common/logger';
import { NotificationServer } from './notifications';
import config from './configs';

export class App {

	constructor(
		@Inject private wallet: Wallet,
		@Inject private render: Render,
		@Inject private auth: Auth,
		@Inject private notificationServer: NotificationServer,
	) { }

	private async createApp() {
		const app: Koa = new Koa();
		app.use(logger());
		app.use(bodyParser());
		app.use(serve('public'));
		app.use(tryCatchMiddleware);
		this.wallet.register(app);
		this.render.register(app);
		this.auth.register(app);
		return Promise.resolve(app);
	}

	private async createDB() {
		return mongoose.connect(`mongodb://${config.db.url}:${config.db.port}/${config.db.db}`, { useMongoClient: true });
	}

	public async start() {
		const db = await this.createDB();
		const app = await this.createApp();
		log.info(`Started listening on port ${config.port}...`);
		const server = app.listen(config.port);
		this.notificationServer.start(server);
		return Promise.resolve(server);
	}
}
