export type Trans = {
	id: 		number,
	data: 		string;
	type: 		string;
	sum: 		string;
	time: 		string;
}

export type HistoryState = {
	data: Trans[],
};
