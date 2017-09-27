export declare interface CardInterface {
	id?: number;
	cardNumber: string;
	balance: number
}

export declare interface TransactionInterface {
	id?: number;
	cardId: number;
}
