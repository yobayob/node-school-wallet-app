import 'reflect-metadata';
import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as bodyParser from 'koa-bodyparser';
import { Container } from 'typescript-ioc';
import { App } from './app'

// // create koa app
// const app = new Koa();
// const router = new Router();
//
// // register all application routes
// AppRoutes.forEach(route => router[route.method](route.path, route.action));
//
// // run app
// app.use(bodyParser());
// app.use(router.routes());
// app.use(router.allowedMethods());
// app.listen(3000);

console.log('Koa application is up and running on port 3000');


const app = Container.get(App);
app.start();
