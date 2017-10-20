import {Connection, connection, Document, Model, Schema, model} from 'mongoose';
import {ApplicationError} from '../exceptions'

export abstract class SuperModel<T extends Document> {

	public static connection: Connection = connection;

	protected readonly objects: Model<T>;

	constructor(modelName: string, schema: Schema) {
		this.objects = this.createModel(modelName, schema);
	}

	private createModel(modelName: string, schema: Schema): Model<T> {
		return SuperModel.connection.model(modelName, schema);
	}

	async all() {
		return this.objects.find()
	}

	async create(obj: any) {
		return this.objects.create(obj)
	}
}
