const router = require('express').Router();

// for test available api
router.use('/ping', (req, res) => {
	res.status(200).json({'ping': 'pong'})
});

router.use('', require('./cards'));
module.exports = router;
