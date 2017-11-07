import { handleActions, Action } from 'redux-actions';
import { Pay, Trans } from '../models';
import * as actions from '../actions';

export const initialState = {
	stage: 'contract',
	transaction: null,
} as Pay;

export default handleActions<Pay, any>({
	[actions.FILL_SUCCESS]: (state: Pay, action: Action<Trans>): Pay => {
		if (!action.payload) {
			return {
				...state,
			}
		}
		return {
			...state,
			transaction: action.payload,
			stage: 'success',
		};
	},
	[actions.FILL_FAILED]: (state: Pay, action: Action<any>): Pay => {
		console.log(action);
		return {
			...state,
			transaction: null,
			stage: 'error',
		};
	},
	[actions.FILL_REPEAT]: (state: Pay, action: Action<any>): Pay => {
		console.log(action);
		return {
			...state,
			transaction: null,
			stage: 'contract',
		};
	},
}, initialState);
