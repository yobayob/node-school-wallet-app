import {Schema, SequenceDocument, SequenceSchema, connection} from 'mongoose';
import {Singleton} from 'typescript-ioc';
import {SuperModel} from '../../common/models';
import {createHash} from 'crypto'

const _name = `users`;

const NEW_USER = 0;
const APPROVE_USER = 10;

export interface IUser {
	hash: string,
	first_name: string,
	last_name: string,
	phone: string,
	status: number;
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

	static userHash(type: string, id: any): string {
		return createHash('md5').update(id).update(type).digest('hex');
	}

	constructor() {
		super(_name, UserSchema);
	}

	async getOrCreate(type: string, id: any) {
		const hash = UserModel.userHash(type, id);
		let user: any;
		try {
			user = await this.get({hash});
		} catch (err) {
			user = await this.create({hash});
		}
		return user
	}
}

