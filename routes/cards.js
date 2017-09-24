const router = require('express').Router(),
	models = require('../models'),
	validate = require('../middlewares/validator');

router.get('/cards', (req, res) => {
	models.Card.all().then(
		cards => res.status(200).json(cards),
		error => res.status(400).json(error)
	)
});

router.post('/cards', validate(models.Card.schema), (req, res) => {
	models.Card.create(req.body).then(
		card => res.status(200).json(card),
		error => res.status(400).json(error)
	);
});

router.delete('/cards/:id', (req, res) => {
	models.Card.deleteByIndex(req.params.id).then(
		card => res.status(200).json(card),
		error => res.status(404).json(error)
	);
});

module.exports = router;
