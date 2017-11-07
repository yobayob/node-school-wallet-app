import { Context } from 'koa';
import { Inject, Singleton } from 'typescript-ioc';
import {Validate} from '../../common/utils';
import {goalCreateSchema, goalPaySchema} from '../schema'
import {GoalModel, CardModel, TransactionModel} from '../models'

@Singleton
export class GoalController {

	constructor(
		@Inject private goals: GoalModel,
		@Inject private cards: CardModel,
		@Inject private trans: TransactionModel,
	) {}

	public async createGoal(ctx: Context) {
		ctx.state.user = await ctx.state.user;
		const goal = {...ctx.request.body, userId: await ctx.state.user.id};
		Validate(goal, goalCreateSchema);
		ctx.body = await this.goals.create(goal);
	}

	public async pay(ctx: Context) {
		Validate(ctx.request.body, goalPaySchema);
		const goal = await this.goals.get({id: ctx.params.goalId});
		const card = await this.cards.get({id: ctx.request.body.id});
		ctx.body = await this.trans.payGoal(card, goal, ctx.params.amount)
	}
}
