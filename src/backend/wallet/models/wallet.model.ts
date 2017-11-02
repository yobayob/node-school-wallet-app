import {Schema, SequenceDocument, SequenceSchema, connection} from 'mongoose';
import {Singleton} from 'typescript-ioc';
import {SuperModel} from '../../common/models';

const _name = `wallets`;

export interface IWallet {
	userId: number,
	amount: number,
}

export interface IWalletModel extends IWallet, SequenceDocument {
}
export const WalletSchema: SequenceSchema = new Schema({
	userId: {
		type: Number,
		index: {unique: true},
		required: true,
	},
	amount: {
		type: Number,
		required: true,
	},
}) as SequenceSchema;

@Singleton
export class WalletModel extends SuperModel<IWalletModel> {

	constructor() {
		super(_name, WalletSchema);
	}
}

