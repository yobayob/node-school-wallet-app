import {writeFile, readFile} from 'fs';
import {Inject, Singleton} from 'typescript-ioc';
import {Transaction, Card} from '../models'
import {TransactionInterface} from '../../common/interfaces/models'
import * as moment from 'moment';
import {log} from '../../common/logger'
import {ApplicationError} from "../../common/exceptions/application.error";

@Singleton
export class TransactionManager {
	private objects: Transaction[];
	private name = 'src/backend/source/transactions.json';
	private notSyncId = 0;

	constructor() {
		this.loadFile()
	}

	public async all(card: Card) {
		return (this.objects.filter((item) => item.cardId === card.id));
	}

	private prepare(card: Card, t: TransactionInterface) {
		t.cardId = card.id;
		t.time = moment().format();
		this.notSyncId += 1;
		this.objects.length > 0
			? t.id = this.objects[this.objects.length - 1].id + this.notSyncId
			: t.id = this.notSyncId;
		return new Transaction(t)
	}

	public async create(card: Card, t: TransactionInterface) {
		const trans = this.prepare(card, t);
		this.objects.push(trans);
		card.addToBalance(trans.sum);
		card.save();
		this.saveFile();
		log.info(`Create transaction ${trans.id} for card ${card.id}`);
		return trans
	}

	/*
	cardIn - deliver money
	cardOut - send money
	 */
	public async transfer(cardIn: Card, cardOut: Card, amount: number) {
		const lObj = this.objects.length,
			balanceIn = cardIn.balance,
			balanceOut = cardOut.balance;
		try {
			const tOut = this.prepare(cardOut, {
				data: `transfer to ${cardIn.cardNumber}`,
				type: `transfer`,
				sum: -amount,
			});
			const tIn = this.prepare(cardIn, {
				data: `transfer from ${cardOut.cardNumber}`,
				sum: amount,
				type: 'transfer',
			});
			cardOut.addToBalance(-amount);
			cardIn.addToBalance(amount);
			this.objects.push(tOut, tIn);
			this.saveFile();
			cardOut.save() // file cards.json saved
		} catch (err) {
			cardIn.balance = balanceIn;
			cardOut.balance = balanceOut;
			this.notSyncId = 0;
			this.objects = this.objects.slice(0, lObj); // rol(lol?)lback
			throw err
		}
		return true
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
		this.notSyncId = 0;
		log.info(`${this.name} saved`);
	}
}
