import {Schema, SequenceDocument, SequenceSchema, connection} from 'mongoose';
import {Singleton} from 'typescript-ioc';
import {SuperModel} from '../../common/models';
import {createHash} from 'crypto'
import {verifyToken} from '../utils';
import {ApplicationError} from '../../common/exceptions';

const _name = `users`;

export const NEW_USER = 0;
export const APPROVE_USER = 10;

export interface IUser {
	hash: string,
	first_name?: string,
	last_name?: string,
	phone?: string,
	status?: number;
}

export interface IUserModel extends IUser, SequenceDocument {
}
export const UserSchema: SequenceSchema = new Schema({
	hash: {
		type: String,
		index: {unique: true},
	},
	first_name: {
		type: String,
	},
	last_name: {
		type: String,
	},
	phone: {
		type: String,
		index: {unique: true},
	},
	status: {
		type: Number,
		default: NEW_USER,
	},
}) as SequenceSchema;

@Singleton
export class UserModel extends SuperModel<IUserModel> {

	constructor() {
		super(_name, UserSchema);
	}

	async getOrCreate(o: IUser) {
		let user: any;
		try {
			user = await this.get(o);
		} catch (err) {
			user = await this.create(o);
		}
		return user
	}

	async getUserFromToken(jwt: string) {
		const claims = (await verifyToken(jwt)) as any;
		if (!claims.hash) {
			throw new ApplicationError(`Incorrect token`, 500)
		}
		return this.get({hash: claims.hash})
	}
}

