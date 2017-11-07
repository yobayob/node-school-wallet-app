import {Schema, SequenceDocument, SequenceSchema, connection} from 'mongoose';
import {Singleton} from 'typescript-ioc';
import {SuperModel} from '../../common/models';

const _name = `goals`;

export interface IGoal {
	userId:  number,
	amount:  number,
	today: 	 number,
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
	today: {
		type: Number,
		default: 0,
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

