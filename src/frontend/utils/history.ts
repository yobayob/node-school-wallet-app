export default function prepareHistory(cardsList: any[], transactionsData: any[]) {
	return transactionsData.map((data: any) => {
		const card = cardsList.find((item: any) => item.id === Number(data.cardId));
		return card ? Object.assign({}, data, {card}) : data;
	});
}
