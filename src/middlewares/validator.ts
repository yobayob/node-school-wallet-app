import * as Router from 'koa-router';

// test
export async function validator(ctx: Router.IRouterContext, next: () => Promise<any>) {
	console.log('Hello, I am middleware for validation request')
	await next()
}
