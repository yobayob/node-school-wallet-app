const card = require('./card')

const models = {
	Card: card
};

// BECAUSE I'M CRAZY AHAHAHAHA

const mockDB = {

	model: model => {
		if (models[model] !== undefined){
			return models[model]
		}
		throw 'ModelNotFound'
	}
};

module.exports = mockDB;
