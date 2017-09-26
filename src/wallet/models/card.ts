export class Card {
	public id: number;
	public balance: number;
	public cardNumber: string;

	constructor(o: {balance: number, cardNumber: string, id?: number}) {
		this.id = o.id || -1;
		this.balance = o.balance;
		this.cardNumber = o.cardNumber;
	}
}
