import {Schema, SequenceDocument, SequenceSchema, connection} from 'mongoose';
import {Singleton} from 'typescript-ioc';
import {SuperModel} from '../../common/models'
import {checkLuhn} from '../../common/utils'
import {ApplicationError} from '../../common/exceptions';
import {getErrorByKey} from '../../../common/errors/getter';

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
	user_id: {
		type: Number,
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

	public create(o: { balance: number, cardNumber: string, user_id: number }) {
		if (!checkLuhn(o.cardNumber)) {
            console.log(getErrorByKey('logic.card.invalid'));
            throw new ApplicationError('logic.card.invalid', 400)
		}
		console.log(getErrorByKey('logic.card.invalid'));
		return super.create(o)
	}
}
