import { CardManager } from '../services/cards'
import { Container } from 'typescript-ioc';

export class Card {

	private service: CardManager = Container.get(CardManager);  // dependcy injection

	public id: number;
	public balance: number;
	public cardNumber: string;

	constructor(
		o: {balance: number, cardNumber: string, id?: number}
	) {
		this.id = o.id || -1;
		this.balance = o.balance;
		this.cardNumber = o.cardNumber;
	}

	save(): void {
		this.service.saveFile()
	}

	toJSON() {
		return ({
			id: this.id,
			balance: this.balance,
			cardNumber: this.cardNumber,
		})
	}
}
