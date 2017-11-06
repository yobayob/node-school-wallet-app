import {IUserModel} from './models/user.model';
import {sign, verify} from 'jsonwebtoken';
import config from '../configs';
import {ApplicationError} from "../common/exceptions/application.error";

export async function createToken(user: IUserModel): Promise<string> {
	const {id, hash, first_name, last_name, phone, status}: any = user;
	return sign({id, hash, first_name, last_name, phone, status}, config.secret)
}

export async function verifyToken(jwt: string): Promise<object | string > {
	return verify(jwt, config.secret);
}
