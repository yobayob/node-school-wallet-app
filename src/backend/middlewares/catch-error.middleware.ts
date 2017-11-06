import {Context} from 'koa';

export async function tryCatchMiddleware(ctx: Context, next: any) {
	try {
		await next()
	} catch (err) {
		ctx.status = err.status || 500;
		ctx.body = JSON.stringify({error: true, message: err.message});
		ctx.app.emit('error', err, ctx);
	}
}
