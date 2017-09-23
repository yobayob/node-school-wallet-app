const router = require('express').Router();
const Card = require('../models').Card;


router.get('/cards', (req, res) => {
	Card.all().then(
		cards => res.status(200).json(cards),
		error => res.status(400).json(error)
	)
});

router.post('/cards', (req, res) => {
	Card.create(req.body).then(
		card => res.status(200).json(card),
		error => res.status(400).json(error)
	);
});

router.delete('/cards/:id', (req, res) => {
	Card.deleteByIndex(req.params.id).then(
		card => res.status(200).json(card),
		error => res.status(404).json(error)
	);
});

module.exports = router;
