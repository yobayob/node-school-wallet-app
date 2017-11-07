import {Context} from 'koa';
import {Inject, Singleton} from 'typescript-ioc';
import {Validate} from '../../common/utils'
import {OauthManager, defaultTypes, IOauth} from '../services'
import {ApplicationError} from '../../common/exceptions/application.error';
import {UserModel, APPROVE_USER} from '../models/user.model';
import {usersCreateSchema} from '../schema'
import {createToken} from '../utils';

@Singleton
export class AuthControllers {

	constructor(@Inject private authManager: OauthManager,
				@Inject private userManager: UserModel,) {
	}

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

	/**
	 * Callback for oauth service
	 * get type of oauth
	 * process callback and create jwt token
	 * easy inline js for open popup window (use postmessage to parent window)
	 */
	public async callback(ctx: Context) {
		const auth = this.getType(ctx);
		const code = ctx.request.query.code;
		const userInfo = await auth.callback(code);
		const user = await this.userManager.getOrCreate(userInfo);
		const jwt = await createToken(user);
		const body = JSON.stringify({success: true, token: jwt});
		const origin = ctx.origin.replace(`localhost`, '127.0.0.1'); //monkey patch origin. I don't know why :(
		ctx.body = `
		<script type="text/javascript">
		  window.opener.postMessage(${body}, \'${origin}\');
		  window.close()
		</script>
		`
	}

	/**
	 * This endpoint opened popup window and wait answer from oauth
	 */
	public async signIn(ctx: Context) {
		const auth = this.getType(ctx);
		ctx.response.redirect(auth.authorizationUri)
	}

	/**
	 * Simple registration
	 * TODO: add validity on the all field
	 */
	public async signUp(ctx: Context) {
		const item = ctx.request.body;
		await Validate(item, usersCreateSchema);
		const currentUser = await ctx.state.user;
		const user = await this.userManager.updateOne({id: currentUser.id}, {
			...item,
			status: APPROVE_USER,
		});
		if (!user) {
			throw new ApplicationError(`Failed updates`, 500)
		}
		const newToken = await createToken(user);
		ctx.body = {token: newToken, success: true};
	}

	public async updateToken(ctx: Context) {
		const currentUser = await ctx.state.user;
		const token = ctx.query.token;
		await this.userManager.updateOne({id: currentUser.id}, {token});
		ctx.body = 'success';
	}
}
