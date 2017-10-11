import {writeFile, readFile} from 'fs';
import {Inject, Singleton} from 'typescript-ioc';
import {Transaction, Card} from '../models'
import {TransactionInterface} from '../../common/interfaces/models'
import {log} from '../../common/logger'

@Singleton
export class TransactionManager {
	private objects: Transaction[];
	private name = 'src/backend/source/transactions.json';

	constructor() {
		this.loadFile()
	}

	public async all(card: Card) {
		return (this.objects.filter((item) => item.cardId === card.id));
	}

	public async create(card: Card, t: TransactionInterface) {
		t.cardId = card.id;
		const trans = new Transaction(t);
		this.objects.length > 0
			? trans.id = this.objects[this.objects.length - 1].id + 1
			: trans.id = 1;
		this.objects.push(trans);
		card.balance = card.balance + parseFloat(trans.sum);
		card.save();
		this.saveFile();
		log.info(`Create transaction ${trans.id} for card ${card.id}`);
		return trans
	}

	public async loadFile() {
		readFile(`${this.name}`, (err, data) => {
			if (err) {
				throw err
			}
			let objects;
			const trans: TransactionInterface[] = [];
			objects = JSON.parse(data.toString());
			objects.forEach((item: any) => trans.push(new Transaction(item)));
			log.info(`${this.name} loaded`);
			this.objects = objects
			})
	}

	public saveFile() {
		writeFile(`${this.name}`, JSON.stringify(this.objects), (err) => {
			if (err) {
				throw(err)
			}
		});
		log.info(`${this.name} saved`);
	}
}
