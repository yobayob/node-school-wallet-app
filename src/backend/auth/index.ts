import {Application} from '../common/models'
import {Inject, Singleton} from 'typescript-ioc';
import {AuthControllers} from './controllers'
import * as Router from 'koa-router';
import {cookieCheckerMiddleware} from '../middlewares';


@Singleton
export class Auth extends Application {

	constructor(
		@Inject public router: Router,
		@Inject public authController: AuthControllers,
	) {
		super()
	}

	$setRoutes() {

		this.router.get('/sign-in/:type',
			async (ctx) => this.authController
				.signIn(ctx));

		this.router.post('/sign-up',
			cookieCheckerMiddleware,
			async (ctx) => this.authController
				.signUp(ctx));

		this.router.get('/callback/:type',
			async (ctx) => this.authController
				.callback(ctx));
	}
}
