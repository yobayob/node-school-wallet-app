import config from '../../configs'
import {Singleton} from 'typescript-ioc';
import {OAuth} from './base'
import axios from 'axios';

export const type = `yandex`;

const credentials = {
	client: {
		id: config.oauth.yandex.client_id,
		secret: config.oauth.yandex.secret,
	},
	auth: {
		tokenHost: 'https://oauth.yandex.ru',
		tokenPath: '/token',
		authorizePath: '/authorize',
	},
};

const callback_uri = config.oauth.yandex.callback_uri;

const authURIConfig = {
	redirect_uri: callback_uri,
};

@Singleton
export class YandexOAuth extends OAuth {

	constructor() {
		super(type, credentials, authURIConfig, callback_uri)
	}

	public async getUserInformation(token: string) {
		const response = await axios.get(
			`https://login.yandex.ru/info`, {
				headers: {
					Authorization: `OAuth ${token}`,
				},
				params: {
					format: 'json',
				},
			});

		return response.data
	}
}
