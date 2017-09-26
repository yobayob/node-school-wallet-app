import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import * as logger from 'koa-logger';
import * as Router from 'koa-router';
import * as controllers from './controllers'
import { Inject } from 'typescript-ioc';
import { IRouterContext } from 'koa-router'
import CardRoutes from './router/card';

export class App {

	constructor(@Inject private cardRoutes: CardRoutes) { }

	private async createApp() {
		const app: Koa = new Koa();
		const router: Router = new Router();
		app.use(logger());
		app.use(bodyParser());

		this.cardRoutes.register(router);
		app.use(router.routes());
		app.use(router.allowedMethods());
		return Promise.resolve(app);
	}

	public async start() {
		const app = await this.createApp();
		console.log('Started listening on port 3000...');
		const server = app.listen(3000);
		return Promise.resolve(server);
	}
}
