import { Document, Schema, Model, model} from 'mongoose';

export interface ITransaction {
	cardId: number;
	data: string;
	type: string;
	time: string;
	sum: string;
}

export interface ITransactionModel extends ITransaction, Document {
}

export const TransactionSchema: Schema = new Schema({
	balance: Number,
	cardNumber: {type: String, index: {unique: true}}
});

export const Transaction: Model<ITransactionModel> = model<ITransactionModel>('Card', TransactionSchema);
