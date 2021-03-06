import {Schema, SequenceDocument, SequenceSchema} from 'mongoose';
import {SuperModel} from '../../common/models/supermodel';
import {Singleton} from 'typescript-ioc';
import {ICardModel, IGoal} from './';
import {ApplicationError} from '../../common/exceptions/application.error';

// Types of transaction
const CARD2CARD = `card2card`;
const PREPAID_CARD = `prepaidCard`;
const PAYMENT_MOBILE = `paymentMobile`;
const CARD2GOAL = `CARD2GOAL`;

const _name = `transactions`;

export interface ITransaction {
	cardId: 	number;
	data: 		string;
	type: 		string;
	sum: 		string;
	time: 		string;
}

export interface ITransactionModel extends ITransaction, SequenceDocument {}

export const TransactionSchema: SequenceSchema = new Schema({
	cardId: {
		type: Number,
		required: true,
		},
	data: {
		type: String,
		required: true,
		},
	type: {
		type: String,
		required: true,
		},
	sum: {
		type: Number,
		required: true,
		},
	time: {
		type: Date,
		default: Date.now,
	},
},
// {timestamps: { createdAt: 'time'},} - maybe
) as SequenceSchema;

@Singleton
export class TransactionModel extends SuperModel<ITransactionModel> {

	constructor() {
		super(_name, TransactionSchema)
	}

	public createCardTransaction(card: ICardModel, data: string, type: string, sum: number) {
		if (sum === 0) {
			throw new ApplicationError(`Invalid sum`, 400)
		}
		if (card.balance < -sum && sum < 0) {
			throw new ApplicationError(`Insufficient funds`, 400)
		}
		card.balance += sum;
		card.save();
		const obj = {cardId: card.id, data, type, sum};
		return this.create(obj)
	}

	/**
	 * This func is incorrect, because this is not atomic operation
	 * TODO: fix this
	 * cardSend - card, which send money
	 * cardRecieve - card, which recieve money
	 */
	public transfer(cardSend: ICardModel, cardRecieve: ICardModel, sum: number) {
		if (sum === 0) {
			throw new ApplicationError(`Invalid sum`, 400)
		}
		if (cardSend.balance < sum) {
			throw new ApplicationError(`Insufficient funds on card ${cardSend.cardNumber}`, 400)
		}
		console.log(cardSend.balance, sum);
		cardSend.balance -= sum;
		console.log(cardRecieve);
		cardRecieve.balance += sum;
		const transSend = {
			cardId: cardSend.id,
			sum: -sum,
			data: `${cardRecieve.cardNumber}`,
			type: CARD2CARD,
		};
		const transRecieve = {
			cardId: cardRecieve.id,
			sum,
			data: `${cardSend.cardNumber}`,
			type: CARD2CARD,
		};
		const saveAtomic = Promise.all([
			this.create(transSend),
			this.create(transRecieve),
			],
		);
		cardSend.save();
		cardRecieve.save();
		return saveAtomic; // lolkek
	}

	public payGoal(card: ICardModel, goal: any, amount: number) {
		const data = `${goal.id}`;
		return this.createCardTransaction(card, data, CARD2GOAL, -amount)
	}

	public pay(card: ICardModel, data: string, amount: number) {
		return this.createCardTransaction(card, data, PAYMENT_MOBILE, -amount)
	}

	public fill(card: ICardModel, data: string, amount: number) {
		return this.createCardTransaction(card, data, PREPAID_CARD, amount)
	}

	public async delete(obj: any) {
		throw new ApplicationError(`Transaction can't be removed`)
	}
}
