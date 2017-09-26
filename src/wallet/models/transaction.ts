export class Transaction {
	public id: 		number;
	public cardId: 	number;
	public type: 	string;
	public data: 	string;
	public time: 	string;
	public sum: 	string;

	constructor(o:any){
		this.id = o.id;
		this.cardId = o.cardId;
		this.type = o.type;
		this.data = o.data;
		this.time = o.time;
		this.sum = o.sum;
	}

	async card(){

	}
}
