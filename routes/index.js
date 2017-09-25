const router = require('koa-router')(),
	bodyParser = require('koa-bodyparser'),
	jsonMiddleware = require('koa-json'),
	cards = require('./cards');

// for test available api
router.use(bodyParser(), jsonMiddleware());

router.get('/ping', ctx => {
	ctx.status = 200;
	ctx.body = {'ping':'pong'}
});

router
	.use(cards.routes())
	.use(cards.allowedMethods());

module.exports = router;
