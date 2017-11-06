import * as oauth2 from 'simple-oauth2';
import {ApplicationError} from '../../common/exceptions/application.error';
import {IUser} from '../models';
import {createHash} from 'crypto';
import {App} from "../../app";

interface IAuthUri {
	redirect_uri?: string,
	scope?: string,
	state?: string
}

export interface IUserInfo {
	id: number,
	type: string,
}

export interface IOauth {
	authorizationUri: string,
	type: string,
	callback_uri: string,

	callback: (code: string) => Promise<IUser>,
	getToken: (options: any) => Promise<oauth2.AccessToken>,
	getUserInformation: (token: string) => Promise<IUserInfo>,
}

/**
 * Abstact class for oauth
 * client - wrapper for connection to oauth server
 * callback uri - default callback after auth
 * type - name of auth
 */
export abstract class OAuth implements IOauth {

	protected client: oauth2.OAuthClient;
	public authorizationUri: string;
	public type: string;
	public callback_uri: string;

	static userHash(id: any, type: string): string {
		return createHash('md5').update(String(id)).update(type).digest('hex');
	}

	static prepareUserInfo(user: IUserInfo): IUser {
		const hash = OAuth.userHash(user.id, user.type);
		return {
			hash,
		}
	}

	constructor(type: string, credentials: oauth2.ModuleOptions, authURIConfig: IAuthUri, callback_uri: string) {
		this.type = type;
		this.callback_uri = callback_uri;
		this.client = oauth2.create(credentials);
		this.authorizationUri =	this.client.authorizationCode.authorizeURL(authURIConfig)
	}

	private async getTokenInfo(code: string) {
		const options = {
			code,
			redirect_uri: this.callback_uri,
		};
		console.log(options);
		const token = await this.client.authorizationCode.getToken(options as oauth2.AuthorizationTokenConfig);
		return this.client.accessToken.create(token)
	}

	public async getToken(code: string) {
		const tokenInfo = (await this.getTokenInfo(code)) as any;
		if (tokenInfo.error) {
			throw new ApplicationError(tokenInfo.error, 400);
		}
		if (!tokenInfo.token) {
			throw new ApplicationError('Failed parse', 400);
		}
		console.log(tokenInfo);
		return tokenInfo.token.access_token;
	}

	public async getUserInformation(token: string): Promise<IUserInfo> {
		throw new ApplicationError(`Not implemnted`)
	}

	public async callback(code: string): Promise<IUser> {
		const token = await this.getToken(code);
		console.log(token);
		const userInfo = await this.getUserInformation(token);
		return OAuth.prepareUserInfo(userInfo)
	}
}
