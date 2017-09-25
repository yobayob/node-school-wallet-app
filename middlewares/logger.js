const log4js = require('log4js');

log4js.configure({
	appenders: {'out': {type: 'stdout'}},
	categories: {default: {appenders: ['out'], level: 'info'}}
});
const logger = log4js.getLogger('out');


module.exports = (req, res, next) => {
	res.on('finish', function () {
		let level = 'info';
		if (res.statusCode >= 400 && res.statusCode < 500) {
			level = 'warn'
		} else if (res.statusCode >= 500) {
			level = 'error'
		}
		logger[level](`${req.protocol}://${req.get('host')}${req.originalUrl} - ${res.statusCode}`)
	});
	return next();
};
