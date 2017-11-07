import * as actions from './types'
import { toastr } from 'react-redux-toastr';

export const socketsConnecting = (ws: WebSocket) => (dispatch: any) => {
	toastr.info(`hello`, `hello`);
	ws.onmessage = (event: MessageEvent) => {
		console.log(event);
		dispatch(socketsMessageReceiving(event.data))
	};

	dispatch({
		type: actions.SOCKETS_CONNECTING,
		payload: ws,
	});
};

export const socketsDisconnecting = () => (dispatch: any) => dispatch({
	type: actions.SOCKETS_DISCONNECTING,
});

export const socketsMessageSending = () => (dispatch: any) => dispatch({
	type: actions.SOCKETS_MESSAGE_SENDING,
});

export const socketsMessageReceiving = (msg: string) => (dispatch: any) => {
	toastr.clean();
	toastr.info(`Info`, msg);
	dispatch({
		type: actions.SOCKETS_MESSAGE_RECEIVING,
		payload: msg,
	});
};
