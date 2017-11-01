import * as devConfigData from './dev.json';
import * as prodConfigData from './prod.json';

interface IConfig {
	oauth: {
		client_id: string,
		secret: string,
		callback_uri: string,
	}
	db: {
		url: string,
		port: number,
		db: string,
	}
	port: number,
}

let config: IConfig;

if (process.env.MODE === `prod`) {
	console.log(`use prod config`);
	config = (prodConfigData as any) as IConfig;
} else {
	console.log(`use dev config`);
	config = (devConfigData as any) as IConfig;
}

export default config;
