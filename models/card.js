const
	fs = require('fs'),
	jsonSchema = require('commonjs-utils/lib/json-schema'),
	JSONStream = require('JSONStream'),
	es = require('event-stream'),
	streamify = require('stream-array');


const cardSchema = {
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
	additionalProperties: false
};

// https://gist.github.com/DiegoSalazar/4075533
function luhn(value) {
	if (/[^0-9-\s]+/.test(value)) return false;
	// The Luhn Algorithm. It's so pretty.
	let nCheck = 0,
		bEven = false;

	for (let n = value.length - 1; n >= 0; n--) {
		let cDigit = value.charAt(n),
			nDigit = parseInt(cDigit, 10);
		if (bEven) {
			if ((nDigit *= 2) > 9) nDigit -= 9;
		}

		nCheck += nDigit;
		bEven = !bEven;
	}
	return (nCheck % 10) === 0;
}


class Card {

	constructor(){
		this.schema = cardSchema;
		this.objects = [];
		this._load()
	}

	//create objects
	create(o){
		let ctrl = this;

		return new Promise((resolve, reject) => {
			let v = jsonSchema.validate(o, ctrl.schema);

			if (!v.valid){
				let errors = {};
				// serialize error with schema validation
				v.errors.forEach( item => (errors[item.property] !== undefined)
						? errors[item.property].push(item.message)
						: errors[item.property]=[item.message, ]);

				// fuuu
				if (errors['']!== undefined){
					errors.non_field_errors = errors[''];
					delete errors[''];
				}
				reject(errors);
				return
			}

			if (!luhn(o.cardNumber)){
				reject({cardNumber: 'Can\'t pass the LUHN algorithm '});
				return
			}


			if (-1!==ctrl.objects.findIndex(item => item.cardNumber === o.cardNumber)) {
				reject({cardNumber: 'Card with this id exists'});
				return
			}

			ctrl.objects.push({
				cardNumber: o.cardNumber,
				balance: o.balance
			});
			ctrl._save();
			resolve({
				cardNumber: o.cardNumber,
				balance: o.balance
			});

		})
	}

	//remove object by index
	remove(id){
		let ctrl = this;
		return new Promise((resolve, reject) => {
			try {
				if (parseInt(id)<0){
					reject({'id': 'Card not found'});
					return
				}
				let card = ctrl.objects.splice(id, 1);
				if (card.length>0){
					ctrl._save();
					resolve(card);
					return
				}
				reject({'id': 'Card not found'})
			}
			catch (e) {
				reject(e)
			}
		})
	}

	// return all objects
	all(){
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
	_load(){
		let ctrl = this;
		fs.createReadStream('source/cards.json', {encoding: 'utf8'})
			.pipe(JSONStream.parse('*'))
			.pipe(es.mapSync( data => ctrl.objects.push(data))
			.on('error', (error) => console.log(error))
		);
	}

	//save to json file (storage??)
	//maybe save ascync with check changes & aftertimeout
	_save () {
		streamify(this.objects)
			.pipe(JSONStream.stringify())
			.pipe(fs.createWriteStream('source/cards.json'))
			.on('error', (error) => console.log(error)
		);
	}
}

const objectManager = new Card();
module.exports = objectManager;
