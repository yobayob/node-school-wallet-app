import {Context} from 'koa';
import {verifyToken} from '../auth/utils';

// check validity token
export async function jwtCheckerMiddleware(ctx: Context, next: any) {
	if (!ctx.headers || !ctx.header.authorization) {
		ctx.throw(401)
	}
	console.log(ctx.header.authorization)
	const parts = ctx.header.authorization.split(' ');
	if (parts.length !== 2 || parts[0] !== 'JWT') {
		ctx.throw(401)
	}
	let claims: any;
	try {
		claims = await verifyToken(parts[1]) as any;
	} catch (err) {
		ctx.throw(401, err)
	}
	console.log(ctx.req.url)
	if (ctx.req.url !== '/sign-up' && (!claims.id || claims.status === 0)) {
		ctx.throw(401);
	}
	ctx.state.userId = claims.id;
	await next()
}
