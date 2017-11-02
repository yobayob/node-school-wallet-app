import * as oauth2 from 'simple-oauth2';
import {ApplicationError} from '../../common/exceptions/application.error';

interface IAuthUri {
	redirect_uri?: string,
	scope?: string,
	state?: string
}

export interface IOauth {
	authorizationUri: string
	type: string
	callback_uri: string

	getToken: (options: any) => Promise<oauth2.AccessToken>
	getUserInformation: (token: string) => Promise<any>
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

	constructor(type: string, credentials: oauth2.ModuleOptions, authURIConfig: IAuthUri, callback_uri: string) {
		this.type = type;
		this.callback_uri = callback_uri;
		this.client = oauth2.create(credentials);
		this.authorizationUri =	this.client.authorizationCode.authorizeURL(authURIConfig)
	}

	public async getToken(options: any) {
		if (!options.code) {
			throw new ApplicationError(`Not valid AuthorizationTokenConfig`)
		}
		options.redirect_uri = this.callback_uri;
		const token = await this.client.authorizationCode.getToken(options as oauth2.AuthorizationTokenConfig);
		return this.client.accessToken.create(token)
	}

	getUserInformation(token: string): any {
		throw new ApplicationError(`Not implemnted`)
	}
}
