import {Context} from 'koa';
import {Inject, Singleton} from 'typescript-ioc';
import {Validate} from '../../common/utils'
import {OAuth} from '../models'
import {ApplicationError} from '../../common/exceptions/application.error';

@Singleton
export class AuthControllers {

	constructor(@Inject private auth: OAuth) {
	}

	public async callback(ctx: Context) {
		const code = ctx.request.query.code;
		if (!code) {
			throw new ApplicationError('Fail query params');
		}
		const token = await this.auth.getToken({code}) as any;
		const user = await this.auth.getUserInformation(token.token.access_token);
		ctx.type = 'application/json';
		ctx.body = {token, user};
	}

	public async login(ctx: Context) {
		ctx.response.redirect(this.auth.authorizationUri)
	}
}

