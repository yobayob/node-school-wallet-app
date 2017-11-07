import * as http from 'http';
import * as koa from 'koa';
import * as WebSocket from 'ws';
import {Inject, Singleton} from 'typescript-ioc';
import {ApplicationError} from './../common/exceptions';

export interface INotifyMessage {
	type: string;
	data: string;
}

@Singleton
export class NotificationServer {

	private wss: WebSocket.Server;

	public start(server: http.Server): void {

		// TODO verifyClient
		this.wss = new WebSocket.Server({
			verifyClient(info, done) {
				done(true);
			},
			server,
		});
		this.setListeners();
	}

	// TODO: parse req for hash
	// find walletId by hash
	// client.extensions = walletId;
	public setListeners(): void {
		this.wss.on('connection', (client: any, req: any) => {
			client.send(`Hello!`);
			client.onmessage = (message: any) => {
			};
			client.onerror = (error: any) => {
				console.log(`error ${error.message}`)
			};
		});
	}

	public notifyClient(walletId: string, message: INotifyMessage) {
		this.wss.clients.forEach((client: any) => {
			if (client.extensions === walletId) {
				client.send(JSON.stringify(message));
			}
		});
	}

	// метод для тестирования
	public notifyClientTest(message: INotifyMessage) {
		this.wss.clients.forEach((client: any) => {
			client.send(JSON.stringify(message));
		})
	}
}


