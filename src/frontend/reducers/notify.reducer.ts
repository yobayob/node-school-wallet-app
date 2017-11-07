import {handleActions, Action} from 'redux-actions';
import * as actions from '../actions';

type SocketState = {
	loaded: boolean,
	message: string,
	connected: boolean,

	socket?: any,
}

export const initialState = {
	loaded: false,
	message: 'Connecting...',
	connected: false,
} as SocketState;

export default handleActions<SocketState, any>({
	[actions.SOCKETS_CONNECTING]: (state: SocketState, action: Action<any>): SocketState => {
		if (!action.payload) {
			return {
				...state,
			}
		}
		return {
			loaded: true,
			message: 'Connecting...',
			connected: false,
			socket: action.payload,
		};
	},
	[actions.SOCKETS_DISCONNECTING]: (state: SocketState, action: Action<any>): SocketState => {
		if (!action.payload) {
			return {
				...state,
			}
		}
		return {
			loaded: true,
			message: 'Disconnecting...',
			connected: true,
		};
	},
	[actions.SOCKETS_MESSAGE_SENDING]: (state: SocketState, action: Action<string>): SocketState => {
		if (!action.payload) {
			return {
				...state,
			}
		}
		return {
			...state,
			loaded: true,
			message: 'send',
			connected: true,
		};
	},
	[actions.SOCKETS_MESSAGE_RECEIVING]: (state: SocketState, action: Action<string>): SocketState => {
		if (!action.payload) {
			return {
				...state,
			}
		}
		return {
			...state,
			loaded: true,
			message: action.payload,
			connected: true,
		};
	},
}, initialState);
