export class Card {
	public balance: number;
	public cardNumber: string;

	constructor(o: {balance: number, cardNumber: string}) {
		this.balance = o.balance;
		this.cardNumber = o.cardNumber;
	}
}
