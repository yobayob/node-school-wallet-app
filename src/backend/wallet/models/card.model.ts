import {Schema, SequenceDocument, SequenceSchema, connection} from 'mongoose';
import {Singleton} from 'typescript-ioc';
import {SuperModel} from '../../common/models'
import {checkLuhn} from '../../common/utils'
import {ApplicationError} from '../../common/exceptions';

const _name = `cards`;

export interface ICard {
	balance: number;
	cardNumber: string;
}

export interface ICardModel extends ICard, SequenceDocument {
}
export const CardSchema: SequenceSchema = new Schema({
	balance: {
		type: Number,
		required: true,
	},
	cardNumber: {
		type: String,
		index: {unique: true},
		required: true,
	},
}) as SequenceSchema;

export interface ICardModel extends ICard, Document {
}

@Singleton
export class CardModel extends SuperModel<ICardModel> {

	constructor() {
		super(_name, CardSchema);
	}

	public create(o: { balance: number, cardNumber: string }) {
		if (!checkLuhn(o.cardNumber)) {
			throw new ApplicationError('Luhn invalid', 400)
		}
		return super.create(o)
	}
}

