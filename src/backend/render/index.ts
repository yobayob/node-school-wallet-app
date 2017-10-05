import {ApplicationSchema} from '../common/interfaces/application';
import {Inject, Singleton} from 'typescript-ioc';
import * as Router from 'koa-router';
import render from './render'
import * as App from 'koa';
import * as views from 'koa-views';
import * as path from 'path';

/**
 * Server side rendering
 */
@Singleton
export class Render implements ApplicationSchema {

	constructor(
		@Inject private router: Router,
	) {}

	/*
	 * TODO: add cache (LRU)
	 */
	async render(ctx: any) {
		ctx.status = 200;
		await ctx.render('index', render());
	}

	$setRoutes() {
		this.router.use(views(path.resolve('templates'), {extension: 'ejs'}));
		this.router.get('/about', this.render);
		this.router.get('/', this.render);
	};

	register(app: App): void {
		this.$setRoutes();
		app.use(this.router.routes());
		app.use(this.router.allowedMethods());
	}
}
