import {IOauth} from './base'
import {GithubOauth, type as githubType} from './github'
import {YandexOAuth, type as yaType} from './yandex'
import {Inject} from 'typescript-ioc';
import {ApplicationError} from '../../common/exceptions';

const defaultTypes = [
	githubType,
	yaType,
];

class OauthManager {
	constructor(
		@Inject public github: GithubOauth,
		@Inject public yandex: YandexOAuth,
	) {}

	public getOauthByType(type: string): IOauth {
		if (type === githubType) {
			return this.github
		}
		if (type === yaType) {
			return this.yandex
		}
		throw new ApplicationError(`Invalid authorization method`, 400)
	}
}

export {
	OauthManager,
	defaultTypes,
	IOauth,
};
