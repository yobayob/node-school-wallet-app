import {writeFile, readFile} from 'fs';
import {Inject, Singleton} from 'typescript-ioc';
import {Transaction, Card} from '../models'
import {TransactionInterface} from '../../common/interfaces/models'
import {log} from '../../common/logger'

@Singleton
export class TransactionManager {
	private objects: Transaction[];
	private name = 'src/source/transactions.json';

	constructor() {
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

	public async create(card: Card, t: TransactionInterface) {
		const self = this;
		return new Promise<Transaction>((resolve, reject) => {
			try {
				t.cardId = card.id;
				const trans = new Transaction(t);
				self.objects.length > 0
					? trans.id = self.objects[self.objects.length - 1].id + 1
					: trans.id = 1;

				self.objects.push(trans);
				card.balance = card.balance + parseFloat(trans.sum);
				card.save();
				self.saveFile();
				log.info(`Create transaction ${trans.id} for card ${card.id}`);
				resolve(trans)
			} catch (err) {
				log.error(`create transaction error`, err);
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
				const trans = [];
				try {
					objects = JSON.parse(data.toString());
					for (const o of objects) {
						trans.push(new Transaction(o))
					}
					resolve(trans);
				} catch (err) {
					log.error(`load file error`, err);
					reject(err)
				}
				log.info(`${this.name} loaded`);
				resolve(objects)
			})
		})
	}

	public saveFile() {
		writeFile(`${this.name}`, JSON.stringify(this.objects), err => {
			if (err) {
				throw(err)
			}
		});
		log.info(`${this.name} saved`);
	}
}
