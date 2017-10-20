import { Document, Schema, Model, model} from 'mongoose';

export interface ITransaction {
	cardId: 	number;
	data: 		string;
	type: 		string;
	time: 		string;
	sum: 		string;
}

export interface ITransactionModel extends ITransaction, Document {}

export const TransactionSchema: Schema = new Schema({
	cardId: Number,
	data: String,
	type: String,
	time: String,
	sum: Number,
});

export const Transaction: Model<ITransactionModel> = model<ITransactionModel>('Transaction', TransactionSchema);

