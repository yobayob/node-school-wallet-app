import {writeFile, readFile} from 'fs';
import {Inject, Singleton} from 'typescript-ioc';
import {Card} from '../models'
import {checkLuhn} from '../../common/utils';
import * as ts from 'typescript/lib/tsserverlibrary';
import {ApplicationError} from '../../common/exceptions';
import {log} from '../../common/logger'

@Singleton
export class CardManager {
	private objects: Card[];
	private name = 'src/backend/source/cards.json';

	constructor() {
		this.loadFile()
	}

	public async all() {
		return this.objects
	}

	public async get(id: number) {
		const card = this.objects.find((item) => item.id === id);
		if (!card) {
			throw new ApplicationError(`Get card ${id} failed`, 400)
		}
		return card;
	}

	public async create(o: { balance: number, cardNumber: string }) {
		if (!checkLuhn(o.cardNumber)) {
			throw new ApplicationError('Luhn invalid', 400)
		}
		if (-1 !== this.objects.findIndex((item) => item.cardNumber === o.cardNumber)) {
			throw new ApplicationError('Card exists', 400)
		}
		const card = new Card(o);
		// TODO: this is bug, use sequence
		this.objects.length > 0
			? card.id = this.objects[this.objects.length - 1].id + 1
			: card.id = 1;

		this.objects.push(card);
		this.saveFile();
		log.info(`Card ${card.id} created`);
		return card
	}

	public async remove(id: number) {
		const index = this.objects.findIndex((item) => item.id === id);
		if (index === -1) {
			throw new ApplicationError('Card not found', 400)
		}
		this.objects.splice(index, 1);
		this.saveFile();
		log.info(`Card ${id} removed`);
	}

	private async loadFile() {
		readFile(`${this.name}`, (err, data) => {
			if (err) {
				throw err
			}
			let objects: any[];
			const cards: Card[] = [];
			objects = JSON.parse(data.toString());
			objects.forEach((item: any) => cards.push(new Card(item)));
			this.objects = cards;
		})
	}

	public saveFile() {
		writeFile(`${this.name}`, JSON.stringify(this.objects), (err) => {
			if (err) {
				log.error(`Save ${this.name} failed`, err)
			}
		});
		log.info(`${this.name} saved`);
	}
}
