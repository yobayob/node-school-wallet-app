import 'reflect-metadata';;
import { Container } from 'typescript-ioc';
import { App } from './app'

const app = Container.get(App);
app.start();
