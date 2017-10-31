import {Singleton} from 'typescript-ioc';
import * as oauth2 from 'simple-oauth2'
import {ApplicationError} from '../../common/exceptions';

const credentials = {
	client: {
		id: '<client-id>',
		secret: '<client-secret>',
	},
	auth: {
		tokenHost: 'https://github.com',
		tokenPath: '/login/oauth/access_token',
		authorizePath: '/login/oauth/authorize',
	},
};

const tokenConfig = {
	code: '<code>',
	redirect_uri: 'http://localhost:3000/callback',
};

const authURIConfig = {
	redirect_uri: 'http://localhost:3000/callback',
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

	async getToken(options: oauth2.AuthorizationTokenConfig) {
		this.client.authorizationCode.getToken(options, (err: any, res: oauth2.Token) => {
			if (err) {
				throw new ApplicationError('Authentication failed')
			}
			return this.client.accessToken.create(res)
		})
	}
}
