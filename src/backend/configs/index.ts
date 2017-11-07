import * as devConfigData from './dev.json';
import * as prodConfigData from './prod.json';

interface IOAuthConfig {
	client_id: string,
	secret: string,
	callback_uri: string,
}

interface IConfig {
	secret: string,
	oauth: {
		github: IOAuthConfig,
		yandex: IOAuthConfig,
	},
	db: {
		url: string,
		port: number,
		db: string,
	}
	port: number,
}

let config: IConfig;

console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV === `production`) {
	console.log(`use prod config`);
	config = (prodConfigData as any) as IConfig;
} else {
	console.log(`use dev config`);
	config = (devConfigData as any) as IConfig;
}

export default config;
