import { TransactionManager } from '../services/transactions'
import { Container } from 'typescript-ioc';
import { Card } from './card';
import * as ts from 'typescript/lib/tsserverlibrary';
import Err = ts.server.Msg.Err;

export class Transaction {

	// private service: TransactionManager = Container.get(TransactionManager);  // dependcy injection

	public id: 		number;
	public cardId: 	number;
	public type: 	string;
	public data: 	string;
	public time: 	string;
	public sum: 	string;

	constructor(o: any) {
		this.id = o.id;
		this.cardId = o.cardId;
		this.type = o.type;
		this.data = o.data;
		this.time = o.time;
		this.sum = o.sum;
	}

	toJSON() {
		return ({
			id: this.id,
			cardId: this.cardId,
			type: this.type,
			data: this.data,
			time: this.time,
			sum: this.sum
		})
	}
}
