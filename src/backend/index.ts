import 'reflect-metadata';
import { Container } from 'typescript-ioc';
import { App } from './app'

/**
 * get main app instance from container (IoC) and start app
 * os.exit(1) if start failed
 */
const start = async () => {
	try {
		const app = Container.get(App);
		await app.start();
	} catch (err) {
		console.log(`App start failed`);
		console.log(err);
		process.exit(1)
	}
};

start();

