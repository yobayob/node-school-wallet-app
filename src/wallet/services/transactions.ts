import { writeFile, readFile } from 'fs';
import { Inject, Singleton } from 'typescript-ioc';
import { Transaction, Card } from '../models'
import {CardManager} from './cards'

@Singleton
export class TransactionManager {
	private objects: Transaction[];
	private name = 'src/source/transactions.json';

	constructor(@Inject private cards: CardManager) {
		this.loadFile().then(
			data => this.objects = data
		)
	}

	public async all(card: Card) {
		const self = this;
		return new Promise<Transaction[]>(async (resolve, reject) => {
			try {
				resolve(self.objects.filter(item =>item.cardId === card.id ));
			} catch (e) {
				reject(e)
			}
		})
	}

	public async create(o: {balance: number, cardNumber: string}) {
		const self = this;
		return new Promise<Transaction>((resolve, reject) => {
			try {
				const card = new Transaction(o);
				resolve(card)
			} catch (err) {
				reject(err)
			}
		})
	}

	public async loadFile(): Promise<Transaction[]>  {
		const self = this;
		return new Promise<Transaction[]> ((resolve, reject) => {
			readFile(`${self.name}`, (err, data) => {
			if (err) {
				reject(err)
			}
			let objects;
			const cards = [];
			try {
				objects = JSON.parse(data.toString());
				for (const o of objects){
					cards.push(new Transaction(o))
				}
				resolve(cards);
			} catch (err) {
				reject(err)
			}
			console.log('Source readed');
			resolve(objects)
		})
		})
	}

	public async saveFile() {
		const self = this;
		return new Promise((resolve, reject) => {
			writeFile(`${self.name}`, JSON.stringify(this.objects), err => {
				if (err) {
					reject(err)
				}
				resolve()
			})
		})
	}

}
