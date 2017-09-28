import { Document, Schema, Model, model} from 'mongoose';


export interface ICard {
	balance: number;
	cardNumber: string;
}

export interface ICardModel extends ICard, Document {
}

export const CardSchema: Schema = new Schema({
	balance: Number,
	cardNumber: {type: String, index: {unique: true}}
});

export const Card: Model<ICardModel> = model<IUserModel>('Card', CardSchema);
