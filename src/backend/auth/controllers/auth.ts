import {Context} from 'koa';
import {Inject, Singleton} from 'typescript-ioc';
import {Validate} from '../../common/utils'
import {OauthManager, defaultTypes, IOauth} from '../services'
import {ApplicationError} from '../../common/exceptions/application.error';
import {UserModel} from '../models/user.model';
import {usersCreateJson} from '../schema'


@Singleton
export class AuthControllers {

	constructor(
		@Inject private authManager: OauthManager,
		@Inject private userManager: UserModel,
	) {}

	public getType(ctx: Context): IOauth {
		const type = ctx.params.type;
		if (!type) {
			throw new ApplicationError(`Type is invalid`, 400)
		}
		if (defaultTypes.indexOf(type) === -1) {
			throw new ApplicationError(`Invalid authorization method`, 400)
		}
		return this.authManager.getOauthByType(type)
	}

	public async callback(ctx: Context) {
		const auth = this.getType(ctx);
		const code = ctx.request.query.code;
		if (!code) {
			throw new ApplicationError('Fail query params');
		}
		const token = await auth.getToken({code}) as any;
		const user = await auth.getUserInformation(token.token.access_token);
		ctx.type = 'application/json';
		ctx.body = {token, user};
	}

	public async signIn(ctx: Context) {
		const auth = this.getType(ctx);
		ctx.response.redirect(auth.authorizationUri)
	}

	public async signUp(ctx: Context) {
		const item = ctx.request.body;
		Validate(item, usersCreateSchema);
		ctx.body = this.userManager.create(o);
	}
}

