const fs = require('fs'),
	JSONStream = require('JSONStream'),
	es = require('event-stream'),
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

	constructor(){
		this.schema = cardSchema;
		this.objects = [];
		this._load()
	}

	//create objects
	create(o){
		let ctrl = this;

		return new Promise((resolve, reject) => {

			if (!luhn(o.cardNumber)){
				reject({cardNumber: ['Can\'t pass the LUHN algorithm', ]});
				return
			}

			if (-1!==ctrl.objects.findIndex(item => item.cardNumber === o.cardNumber)) {
				reject({cardNumber: ['Card with this id exists']});
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
	deleteByIndex(id){
		let ctrl = this;
		return new Promise((resolve, reject) => {
			try {
				if (parseInt(id)<0){
					reject({'id': ['Card not found']});
					return
				}
				let card = ctrl.objects.splice(id, 1);
				if (card.length>0){
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
	//maybe save ascync with check changes & after timeout
	_save () {
		fs.writeFile('source/cards.json', JSON.stringify(this.objects), err => {
			if (err) throw (err);
		});

	}
}

module.exports = new Card();
