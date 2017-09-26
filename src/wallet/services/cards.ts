import {writeFile, readFile} from 'fs';
import {Inject, Singleton} from 'typescript-ioc';
import {Card} from '../models'
import {checkLuhn} from '../../common/utils';
import * as ts from "typescript/lib/tsserverlibrary";
import Err = ts.server.Msg.Err;


@Singleton
export class CardManager {
	private objects: Card[];
	private name = 'src/source/cards.json';

	constructor() {
		this.loadFile().then(
			data => this.objects = data
		)
	}

	public async all() {
		const self = this;
		return new Promise<Card[]>((resolve, reject) => {
			try {
				resolve(self.objects);
			} catch (e) {
				reject(e)
			}
		})
	}

	public async get(id: number) {
		const self = this;
		return new Promise<Card>((resolve, reject) => {
			try {
				const card = self.objects.find(item => item.id === id);
				if (!card) {
					reject(card);
					return
				}
				resolve(card)
			} catch (err) {
				reject(err)
			}
		});
	}

	public async create(o: { balance: number, cardNumber: string }) {
		const self = this;
		return new Promise<Card>((resolve, reject) => {
			try {
				if (!checkLuhn(o.cardNumber)) {
					reject({"error": "Luhn invalid"});
					return
				}
				if (-1 !== self.objects.findIndex(item => item.cardNumber === o.cardNumber)) {
					reject({"error": "Card exists"});
					return
				}
				const id = self.objects[self.objects.length - 1].id + 1;
				const card = new Card(o);
				card.id = id;
				this.objects.push(card);
				this.saveFile();
				resolve(card)
			} catch (err) {
				reject(err)
			}
		})
	}

	public async remove(id: number) {
		const self = this;
		return new Promise((resolve, reject) => {
			try {
				const index = self.objects.findIndex(item => item.id === id);
				if (index===-1){
					reject({"error":"Card not found"});
					return
				}
				self.objects.splice(index, 1);
				self.saveFile();
				resolve()
			} catch (err) {
				reject(err)
			}
		})
	}

	public async loadFile(): Promise<Card[]> {
		const self = this;
		return new Promise<Card[]>((resolve, reject) => {
			readFile(`${self.name}`, (err, data) => {
				if (err) {
					reject(err)
				}
				let objects;
				const cards = [];
				try {
					objects = JSON.parse(data.toString());
					for (const o of objects) {
						cards.push(new Card(o))
					}
					resolve(cards);
				} catch (err) {
					reject(err)
				}
				resolve(objects)
			})
		})
	}

	private saveFile() {

		writeFile(`${this.name}`, JSON.stringify(this.objects), err=> {
			if (err) {
				console.log(err)
			}
		})
	}
}
