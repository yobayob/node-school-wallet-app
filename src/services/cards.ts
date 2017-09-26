import { writeFile, readFile } from 'fs';
import { Inject, Singleton } from 'typescript-ioc';
import { Card } from '../models'


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

	public async create(o: {balance: number, cardNumber: string}) {
		const self = this;
		return new Promise<Card>((resolve, reject) => {
			try {
				resolve(new Card(o))
			} catch (err) {
				reject(err)
			}
		})
	}

	public async deleteByIndex(id: number) {
		const self = this;
		return new Promise((resolve, reject) => {
			try {
				resolve()
			} catch (err) {
				reject(err)
			}
		})
	}

	public async loadFile(): Promise<Card[]>  {
		const self = this;
		return new Promise<Card[]> ((resolve, reject) => {
			readFile(`${self.name}`, (err, data) => {
			if (err) {
				reject(err)
			}
			let objects;
			const cards = [];
			try {
				objects = JSON.parse(data.toString());
				for (const o of objects){
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
