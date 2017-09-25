const router = require('koa-router')(),
	models = require('../models');


router.get('/cards', async ctx => {
	const cards = await models.Card.all();
	try {
		ctx.status = 200;
		ctx.body = cards
	} catch (error){
		ctx.status = 400;
		ctx.body = error
	}
});

router.post('/cards', async ctx => {
	const card = await models.Card.create(ctx.request.body);
	try {
		ctx.status = 200;
		ctx.body = card
	} catch (error) {
		console.log(error)
		ctx.status = 400;
		ctx.body = error
	}
});

router.delete('/cards/:id', async ctx => {
	const card = await models.Card.deleteByIndex(ctx.params.id);
	try {
		ctx.status = 200;
		ctx.body = card
	} catch(error){
		ctx.status = 404;
		ctx.body = error
	}
});

module.exports = router;
