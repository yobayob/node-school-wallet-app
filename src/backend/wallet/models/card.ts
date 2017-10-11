import { CardManager } from '../services/cards';
import { Container } from 'typescript-ioc';
import { ApplicationError } from '../../common/exceptions';

export class Card {

	private service: CardManager = Container.get(CardManager);

	public id: number;
	public balance: number;
	public cardNumber: string;

	constructor(
		o: {balance: number, cardNumber: string, id?: number},
	) {
		this.id = o.id || -1;
		this.balance = o.balance;
		this.cardNumber = o.cardNumber;
	}

	public save(): void {
		this.service.saveFile()
	}

	public addToBalance(sum: number): void {
		if (sum < 0 && Math.abs(this.balance) < Math.abs(sum)) {
			throw new ApplicationError('Insufficient funds', 400)
		}
		this.balance += sum
	}

	toJSON() {
		return ({
			id: this.id,
			balance: this.balance,
			cardNumber: this.cardNumber,
		})
	}
}
