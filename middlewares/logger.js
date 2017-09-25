const log4js = require('log4js');

log4js.configure({
	appenders: {'out': {type: 'stdout'}},
	categories: {default: {appenders: ['out'], level: 'info'}}
});
const logger = log4js.getLogger('out');


module.exports = async (ctx, next) => {
	ctx.res.on('finish', function () {
		let level = 'info';
		if (ctx.res.statusCode >= 400 && ctx.res.statusCode < 500) {
			level = 'warn'
		} else if (ctx.res.statusCode >= 500) {
			level = 'error'
		}
		logger[level](`${ctx.method} - ${ctx.protocol}://${ctx.host}${ctx.url} - ${ctx.res.statusCode}`)
	});
	return next();
};
