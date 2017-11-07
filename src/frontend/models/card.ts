export type Trans = {
	id: 		number,
	cardId:		number,
	data: 		string;
	type: 		string;
	sum: 		string;
	time: 		string;
}

export type Card = {
	id?: number,
	cardNumber: string,
	balance: number,
	error?: string | null,
}

export type CardState = {
	data: Card[],
	transactions: Trans[],
	activeCard: any,
	isAdding: boolean,
	activeCardId: number | null,
	stage: string
};
