import * as mongoose from 'mongoose';
import {
	Connection,
	connection, DocumentQuery,
	Model,
	Schema,
	SequenceDocument,
	SequenceSchema,
	Error,
} from 'mongoose';

import {ApplicationError} from '../exceptions';
import * as mongooseSequence from 'mongoose-sequence';

const AutoIncrement = mongooseSequence(mongoose);

const SAVE_METHODS = [`save`, `update`, `findOneAndUpdate`, `insertMany`];

/**
 * This is wrapper on default mongoose model.
 * Supermodel can use as injectable arg in constructor to another class and
 * it used mongoose sequence.
 */
export abstract class SuperModel<T extends SequenceDocument> {

	public static connection: Connection = connection;

	/**
	 * current model
	 * yon can't access to object properties from controller
	 * every model must be extend from SuperModel and override
	 * needed methods
	 */
	protected readonly objects: Model<T>;

	/**
	 * Handling errors from mongodb
	 * More code and errors  - https://github.com/mongodb/mongo/blob/master/src/mongo/base/error_codes.err
	 */
	public static handleErrors(name: string) {
		return async (error: any, res: any, next: any) => {
			if (error.name === `MongoError` && error.code === 11000) {
				await next(new ApplicationError(`The ${name} returned a duplicate error`, 400))
			} else {
				await next()
			}
		}
	}

	constructor(modelName: string, schema: SequenceSchema) {
		this.createHandlers(modelName, schema);
		this.prepareSequences(modelName, schema);
		this.objects = this.createModel(modelName, schema);
	}

	private prepareSequences(modelName: string, schema: Schema): void {
		schema.plugin(AutoIncrement, {id: modelName, inc_field: 'id'});
		schema.set('toJSON', {
			transform: (doc: any, ret: any, options: any) => {
				delete ret._id;
				delete ret.__v;
				return ret
			},
		});
	}

	private createHandlers(modelName: string, schema: Schema): void {
		const handlerError = SuperModel.handleErrors(modelName);
		SAVE_METHODS.forEach((item) => {
			schema.post(item, handlerError)
		});
	}

	private createModel(modelName: string, schema: Schema): Model<T> {
		return SuperModel.connection.model(modelName, schema);
	}

	/**
	 * List of all items
	 */
	public all() {
		return this.objects.find()
	}

	/**
	 * Create item. If item not found throw Application Error
	 */
	public create(obj: any) {
		return this.objects.create(obj)
	}

	/**
	 * Get item. If item not found throw Application Error
	 */
	public async get(obj: any) {
		const res = await this.objects.findOne(obj);
		if (res) {
			return res
		}
		throw new ApplicationError(`Object with params ${JSON.stringify(obj)} not found`, 404)
	}

	/**
	 * Filter items
	 */
	public filter(obj: any) {
		return this.objects.find(obj)
	}

	/**
	 * Remove item. If item not found throw Application Error
	 */
	public async delete(obj: any) {
		const item = await this.get(obj);
		if (item) {
			await item.remove()
		}
	}

	public stream(obj?: any) {
		return this.objects.find().cursor({transform: JSON.stringify});
	}
}
