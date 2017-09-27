import {writeFile, readFile} from 'fs';
import {Inject, Singleton} from 'typescript-ioc';
import {Transaction, Card} from '../models'
import {CardManager} from './cards'
import {TransactionInterface} from '../../common/interfaces/models'

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
				resolve(self.objects.filter(item => item.cardId === card.id));
			} catch (e) {
				reject(e)
			}
		})
	}

	public async create(c: Card, t: TransactionInterface) {
		const self = this;
		return new Promise<Transaction>((resolve, reject) => {
			try {
				if (t.cardId !== c.id || c.id < 0) {
					reject('Card id incorrect')
				}
				const trans = new Transaction(t);
				trans._card = c;
				self.objects.length > 0
					? trans.id = self.objects[self.objects.length - 1].id + 1
					: trans.id = 1;

				self.objects.push(trans);
				self.saveFile();
				resolve(trans)
			} catch (err) {
				console.log(err);
				reject(err)
			}
		})
	}

	public async loadFile(): Promise<Transaction[]> {
		const self = this;
		return new Promise<Transaction[]>((resolve, reject) => {
			readFile(`${self.name}`, (err, data) => {
				if (err) {
					reject(err)
				}
				let objects;
				const cards = [];
				try {
					objects = JSON.parse(data.toString());
					for (const o of objects) {
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

	public saveFile() {
		writeFile(`${this.name}`, JSON.stringify(this.objects), err => {
			if (err) {
				throw(err)
			}
		})
	}
}
