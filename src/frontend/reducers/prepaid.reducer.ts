import { handleActions, Action } from 'redux-actions';
import { Trans } from '../models';
import * as actions from '../actions';

type TransferState = {
	transaction: any,
	stage: 'contract' | 'success' | 'error',
};

export const initialState = {
	stage: 'contract',
	transaction: null,
} as TransferState;

export default handleActions<TransferState, any>({
	[actions.PREPAID_SUCCESS]: (state: TransferState, action: Action<Trans>): TransferState => {
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
	[actions.PREPAID_REPEAT]: (state: TransferState, action: Action<any>): TransferState => {
		console.log(action);
		return {
			...state,
			transaction: null,
			stage: 'contract',
		};
	},
	[actions.PREPAID_FAILED]: (state: TransferState, action: Action<any>): TransferState => {
		return {
			...state,
			transaction: null,
			stage: 'error',
		};
	},
}, initialState);
