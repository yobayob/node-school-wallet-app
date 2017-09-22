const router = require('express').Router();
const mockDB = require('../models/mockDB');


router.get('/cards', (req, res) => {
	mockDB.model('Card').all().then(
		cards => res.status(200).json(cards),
		error => res.status(400).json(error)
	)
});

router.post('/cards', (req, res) => {
	mockDB.model('Card').create(req.body).then(
		card => res.status(200).json(card),
		error => res.status(400).json(error)
	);
});

router.delete('/cards/:id', (req, res) => {
	mockDB.model('Card').remove(req.params.id).then(
		card => res.status(200).json(card),
		error => res.status(400).json(error)
	);
});

module.exports = router;
