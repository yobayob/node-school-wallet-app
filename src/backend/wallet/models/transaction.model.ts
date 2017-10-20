import {Schema, SequenceDocument, SequenceSchema} from 'mongoose';
import {SuperModel} from '../../common/models/supermodel';
import {Singleton} from 'typescript-ioc';
import {ICardModel} from './';
import {ApplicationError} from '../../common/exceptions/application.error';

// Types of transaction
const CARD2CARD = `card2card`;
const PREPAID_CARD = `prepaidCard`;
const PAYMENT_MOBILE = `paymentMobile`;

export interface ITransaction {
	cardId: 	number;
	data: 		string;
	type: 		string;
	sum: 		string;
}

export interface ITransactionModel extends ITransaction, SequenceDocument {}

export const TransactionSchema: SequenceSchema = new Schema({
	cardId: 	Number,
	data: 		String,
	type: 		String,
	sum: 		Number,
	time: 		{type: Date, default: Date.now },
},
// {timestamps: { createdAt: 'time'},} - maybe
) as SequenceSchema;

@Singleton
export class TransactionModel extends SuperModel<ITransactionModel> {

	constructor() {
		super('Transaction', TransactionSchema)
	}

	public async createCardTransaction(card: ICardModel, data: string, type: string, sum: number) {
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
	public async transfer(cardSend: ICardModel, cardRecieve: ICardModel, sum: number) {
		if (sum === 0) {
			throw new ApplicationError(`Invalid sum`, 400)
		}
		if (cardSend.balance < sum) {
			throw new ApplicationError(`Insufficient funds on card ${cardSend.cardNumber}`, 400)
		}
		cardSend.balance -= sum;
		cardRecieve.balance += sum;
		const transSend = {
			cardId: cardSend.id,
			sum: -sum,
			data: `Transfer to ${cardRecieve.cardNumber}`,
			type: CARD2CARD,
		};
		const transRecieve = {
			cardId: cardRecieve.id,
			sum,
			data: `Transfer from ${cardSend.cardNumber}`,
			type: CARD2CARD,
		};
		const saveAtomic = Promise.all([this.create(transSend), this.create(transRecieve)]);
		await saveAtomic; // lol
		cardSend.save();
		cardRecieve.save();
		return [transSend, transRecieve];
	}

	public async pay(card: ICardModel, data: string, amount: number) {
		return this.createCardTransaction(card, data, PAYMENT_MOBILE, -amount)
	}

	public async fill(card: ICardModel, data: string, amount: number) {
		return this.createCardTransaction(card, data, PREPAID_CARD, amount)
	}

	public async delete(obj: any) {
		throw new ApplicationError(`Transaction can't be removed`)
	}
}
