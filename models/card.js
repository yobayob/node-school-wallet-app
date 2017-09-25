const fs = require('fs'),
	JSONStream = require('JSONStream'),
	es = require('event-stream'),
	jsonSchema = require('commonjs-utils/lib/json-schema'),
	luhn = require('../libs/utils').checkLuhn;

const cardSchema = {
	additionalProperties: false,
	type: 'object',
	properties: {
		cardNumber: {
			type: 'string',
			required: true
		},
		balance: {
			type: 'number',
			required: true
		}
	},
};

class Card {

	constructor() {
		this.schema = cardSchema;
		this.objects = [];
		this._load()
	}


	//create objects
	async create(o) {
		let ctrl = this;

		return new Promise((resolve, reject) => {
			let v = jsonSchema.validate(o, ctrl.schema);
			if (!v.valid) {
				let errors = {};
				// serialize error with schema validation
				v.errors.forEach(item => (errors[item.property] !== undefined)
					? errors[item.property].push(item.message)
					: errors[item.property] = [item.message,]);

				// fuuu
				if (errors[''] !== undefined) {
					errors.non_field_errors = errors[''];
					delete errors[''];
				}
				reject(errors);

			}

			if (!luhn(o.cardNumber)) {
				reject({cardNumber: ['Can\'t pass the LUHN algorithm',]});
			}

			console.log('error')

			if (-1 !== ctrl.objects.findIndex(item => item.cardNumber === o.cardNumber)) {
				throw new Error({cardNumber: ['Card with this id exists']});
				return
			}
			console.log("WOW")
			ctrl.objects.push({
				cardNumber: o.cardNumber,
				balance: o.balance
			});
			ctrl._save();
			console.log("RESOLVE")
			resolve({
				cardNumber: o.cardNumber,
				balance: o.balance
			});

		})
	}

	//remove object by index
	async deleteByIndex(id) {
		let ctrl = this;
		return new Promise((resolve, reject) => {
			try {
				if (parseInt(id) < 0) {
					reject({'id': ['Card not found']});
					return
				}
				let card = ctrl.objects.splice(id, 1);
				if (card.length > 0) {
					ctrl._save();
					resolve(card[0]);
					return
				}
				reject({'id': ['Card not found']})
			}
			catch (e) {
				reject(e)
			}
		})
	}

	// return all objects
	async all() {
		let ctrl = this;
		return new Promise((resolve, reject) => {
			try {
				resolve(ctrl.objects);
			}
			catch (e) {
				reject(e)
			}
		})
	}

	//load from storage
	_load() {
		let ctrl = this;
		fs.createReadStream('source/cards.json', {encoding: 'utf8'})
			.pipe(JSONStream.parse('*'))
			.pipe(es.mapSync(data => ctrl.objects.push(data))
				.on('error', (error) => console.log(error))
			);
	}

	//save to json file (storage??)
	//maybe save ascync with check changes & after timeout
	_save() {
		fs.writeFileSync('source/cards.json', JSON.stringify(this.objects), err => {
			if (err) throw (err);
		});

	}
}

module.exports = new Card();
