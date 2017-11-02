import {Application} from '../common/models'
import {Inject, Singleton} from 'typescript-ioc';
import {AuthControllers} from './controllers'
import * as Router from 'koa-router';

@Singleton
export class Auth extends Application {

	constructor(
		@Inject public router: Router,
		@Inject public authController: AuthControllers,
	) {
		super()
	}

	$setRoutes() {
		this.router.get('/auth/:type',
			async (ctx) => this.authController
				.login(ctx));

		this.router.get('/callback/:type',
			async (ctx) => this.authController
				.callback(ctx));

	}
}
