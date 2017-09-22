const fs = require('fs');
const jsonSchema = require('commonjs-utils/lib/json-schema');

const cardSchema = {
	type: 'object',
	properties: {
		cardNumber: {
			type: 'number',
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
	value = value.toString();
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
					v.errors.forEach( item => (errors[item.property] !== undefined)
						? errors[item.property].push(item.message)
						: errors[item.property]=[item.message, ]);
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
		fs.readFile('source/cards.json', (err, content)=>{
			if (err) {
				throw new (err)
			}
			ctrl.objects = JSON.parse(content);
		})
	}

	//save to json file (storage??)
	_save () {
		fs.writeFile('source/cards.json', JSON.stringify(this.objects), err => {
			if (err) throw err;
		});

	}
}

const objectManager = new Card();
module.exports = objectManager;
