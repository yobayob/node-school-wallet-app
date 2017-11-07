import {Schema, SequenceDocument, SequenceSchema, connection} from 'mongoose';
import {Singleton} from 'typescript-ioc';
import {SuperModel} from '../../common/models';

const _name = `banks`;

export interface IBank {
	userId: number,
	amount: number,
}

export interface IBankModel extends IBank, SequenceDocument {
}
export const BankSchema: SequenceSchema = new Schema({
	userId: {
		type: Number,
		index: {unique: true},
		required: true,
	},
	amount: {
		type: Number,
		required: true,
	},
	goal: {
		type: String,
		required: true,
	},
	dateEnd: {
		type: Date,
		required: true,
	},
}) as SequenceSchema;

@Singleton
export class BankModel extends SuperModel<IBankModel> {

	constructor() {
		super(_name, BankSchema);
	}
}

