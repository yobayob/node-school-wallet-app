import {Schema, SequenceDocument, SequenceSchema, connection} from 'mongoose';
import {Singleton} from 'typescript-ioc';
import {SuperModel} from '../../common/models'
import {checkLuhn} from '../../common/utils'
import {ApplicationError} from '../../common/exceptions';
import {ITransactionModel} from './transaction.model';

export interface ICard {
	balance: number;
	cardNumber: string;

	transactions: () => void
}

export interface ICardModel extends ICard, SequenceDocument {
}
export const CardSchema: SequenceSchema = new Schema({
	balance: Number,
	cardNumber: {type: String, index: {unique: true}},
}) as SequenceSchema;

export interface ICardModel extends ICard, Document {
}

@Singleton
export class CardModel extends SuperModel<ICardModel> {

	constructor() {
		super('Card', CardSchema);
	}

	public async create(o: { balance: number, cardNumber: string }) {
		if (!checkLuhn(o.cardNumber)) {
			throw new ApplicationError('Luhn invalid', 400)
		}
		return super.create(o)
	}
}

