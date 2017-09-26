import * as App from 'koa';
import * as Router from 'koa-router';

export abstract class Application {

	public router: Router = new Router();

	constructor() {
		this.$onInit()
	}

	public $onInit(){}

	public register(app: App) {
		app.use(this.router.routes());
		app.use(this.router.allowedMethods());
	}
}

export default Application;
