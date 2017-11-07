import {Schema, SequenceDocument, SequenceSchema, connection} from 'mongoose';
import {Singleton} from 'typescript-ioc';
import {SuperModel} from '../../common/models';

const _name = `goals`;

export interface IGoal {
	userId:  number,
	amount:  number,
	goal: 	 string,
	dateEnd: string,
}

export interface IGoalModel extends IGoal, SequenceDocument {
}
export const GoalSchema: SequenceSchema = new Schema({
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
export class GoalModel extends SuperModel<IGoalModel> {

	constructor() {
		super(_name, GoalSchema);
	}
}

