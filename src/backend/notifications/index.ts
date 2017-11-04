import * as App from 'koa';
import * as http from 'http';
import {Context} from 'koa';
import * as WebSocket from 'ws';
import {Inject, Singleton} from 'typescript-ioc';
import {ApplicationError} from './../common/exceptions/application.error';

export interface INotifyMessage {
    type: string;
    data: string;
}

@Singleton
export class NotificationServer {

    private wss: WebSocket.Server;

    public start(server: http.Server): void {
        // TODO verifyClient
        this.wss = new WebSocket.Server({ server });
        //this.setListeners();
    }
    public setListeners(walletId: string): void {
        this.wss.on('connection', (client, req) => {
            // TODO 
            // parse req for hash
            // find walletId by hash
            //client.extensions = walletId;

            client.onmessage = message => {};
            client.onerror = error => {console.log(`Ошибка ${error.message}`)};
        });
    }

    public notifyClient(walletId: string, message: INotifyMessage) {
        this.wss.clients.forEach(client => {
            if (client.extensions === walletId) {
                client.send(JSON.stringify(message));
            }
        });
    }

    public notifyClientTest(message: INotifyMessage) {
        this.wss.clients.forEach(client => {
            client.send(JSON.stringify(message));
        })
    }
}


