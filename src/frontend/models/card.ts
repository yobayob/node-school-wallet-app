export type Card = {
	id?: number,
	cardNumber: string,
	balance: number,
	error?: string | null,
}

export type CardState = {
	data: Card[],
	activeCard: any,
	isAdding: boolean,
	activeCardId: number | null,
};
