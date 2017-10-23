import * as App from 'koa';
import * as Router from 'koa-router';

/*
 Abstract class for create application on koa
 */
export abstract class Application {

	public router: Router;

	protected $setRoutes(): void {}

	public register(app: App): void {
		this.$setRoutes();
		app.use(this.router.routes());
		app.use(this.router.allowedMethods());
	}
}
