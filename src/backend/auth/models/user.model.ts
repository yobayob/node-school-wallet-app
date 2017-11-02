import {Schema, SequenceDocument, SequenceSchema, connection} from 'mongoose';
import {Singleton} from 'typescript-ioc';
import {SuperModel} from '../../common/models';
import {createHash} from 'crypto'

const _name = `users`;

const NEW_USER = 0;

export interface IUser {
	userId: number,
	amount: number,
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
		required: true,
	},
	last_name: {
		type: String,
	},
	phone: {
		type: String,
		required: true,
		index: {unique: true},
	},
	status: {
		type: Number,
		default: NEW_USER,
	},
}) as SequenceSchema;

@Singleton
export class UserModel extends SuperModel<IWalletModel> {

	static userHash(type: string, id: any) {
		return user.hash = createHash('md5').update(id).update(type).digest('hex');
	}

	constructor() {
		super(_name, WalletSchema);
	}

	getOrCreate(type: string, id: any) {
		const hash = UserModel.userHash(type, id);
		let user: IUserModel;
		try {
			user = this.get({hash});
		} catch (err) {
			user = this.create({hash});
		}
		return user
	}
}

