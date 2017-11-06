import {Context} from 'koa';
import {verifyToken} from '../auth/utils';
import {Container} from 'typescript-ioc';
import {UserModel, IUserModel} from '../auth/models';
import {ApplicationError} from '../common/exceptions';

// check validity token from cookie and put user to context
export async function cookieCheckerMiddleware(ctx: Context, next: any) {
	const token = ctx.cookies.get(`jwt`);
	let claims: any;
	try {
		claims = await verifyToken(token) as any;
	} catch (err) {
		ctx.redirect('/login');
		return
	}
	if (!claims.id) {
		ctx.redirect('/login');
		return
	}
	let user: IUserModel;
	try {
		user = await Container.get(UserModel).get({id: claims.id})
	} catch (err) {
		ctx.redirect('/login');
		return
	}
	ctx.state.user = user;
	await next()
}
