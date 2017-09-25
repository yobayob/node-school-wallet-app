const Koa = require('koa'),
	logger = require('./middlewares/logger'),
	router = require('./routes');

const app = new Koa();
app.use(logger);
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);
