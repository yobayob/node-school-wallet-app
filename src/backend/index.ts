import 'reflect-metadata';
import { Container } from 'typescript-ioc';
import { App } from './app'

/**
 * get main app instance from container (IoC) and start app
 * os.exit(1) if start failed
 */
const start = async () => {
	try {
		// TODO: make it cleaner.
		// suppress console messages in production mode. Only official logger messages
		if (process.env.NODE_ENV === 'production') {
			console.log = () => {};
		}
		const app = Container.get(App);
		await app.start();
	} catch (err) {
		console.log(`App start failed`);
		console.log(err);
		process.exit(1)
	}
};

start();

