import config from '../../configs'
import {Singleton} from 'typescript-ioc';
import {OAuth} from './base'
import axios from 'axios';

export const type = `github`;

const credentials = {
	client: {
		id: config.oauth.github.client_id,
		secret: config.oauth.github.secret,
	},
	auth: {
		tokenHost: 'https://github.com',
		tokenPath: '/login/oauth/access_token',
		authorizePath: '/login/oauth/authorize',
	},
};

const callback_uri = config.oauth.github.callback_uri;

const authURIConfig = {
	redirect_uri: callback_uri,
	scope: 'notifications',
	state: '3(#0/!~',
};

@Singleton
export class GithubOauth extends OAuth {

	constructor() {
		super(type, credentials, authURIConfig, callback_uri)
	}

	public async getUserInformation(token: string) {
		const response = await axios.get(`https://api.github.com/user`, {
			params: {
				access_token: token,
			},
		});
		return {type: this.type, id: response.data.id};
	}
}
