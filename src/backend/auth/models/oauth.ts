import {Singleton} from 'typescript-ioc';
import * as oauth2 from 'simple-oauth2';
import axios from 'axios';
import config from '../../configs'

const credentials = {
	client: {
		id: config.oauth.client_id,
		secret: config.oauth.secret,
	},
	auth: {
		tokenHost: 'https://github.com',
		tokenPath: '/login/oauth/access_token',
		authorizePath: '/login/oauth/authorize',
	},
};

const authURIConfig = {
	redirect_uri: config.oauth.callback_uri,
	scope: 'notifications',
	state: '3(#0/!~',
};

@Singleton
export class OAuth {

	private client: oauth2.OAuthClient;
	public authorizationUri: string;

	constructor() {
		this.client = oauth2.create(credentials);
		this.authorizationUri =	this.client.authorizationCode.authorizeURL(authURIConfig)
	}

	async getToken(options: any) {
		options.redirect_uri = config.oauth.callback_uri;
		const token = await this.client.authorizationCode.getToken(options);
		return this.client.accessToken.create(token)
	}

	async getUserInformation(token: string) {
		const response = await axios.get(`https://api.github.com/user?access_token=${token}`);
		return response.data
	}
}
