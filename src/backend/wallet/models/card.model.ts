import {Document, Schema} from 'mongoose';
import {Singleton} from 'typescript-ioc';
import {SuperModel} from '../../common/models'
import {checkLuhn} from '../../common/utils'
import {ApplicationError} from '../../common/exceptions';

export interface ICard {
	balance: number;
	cardNumber: string;
}

export interface ICardModel extends ICard, Document {
}
export const CardSchema: Schema = new Schema({
	balance: Number,
	cardNumber: {type: String, index: {unique: true}},
});

export interface ICardModel extends ICard, Document {
}

@Singleton
export class CardModel extends SuperModel<ICardModel> {

	constructor() {
		super('card', CardSchema)
	}

	public async create(o: { balance: number, cardNumber: string }) {
		if (!checkLuhn(o.cardNumber)) {
			throw new ApplicationError('Luhn invalid', 400)
		}
		return super.create(o)
	}
}

