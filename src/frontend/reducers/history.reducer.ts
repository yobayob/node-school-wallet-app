import {handleActions, Action} from 'redux-actions';
import {Trans, HistoryState} from '../models';
import * as actions from '../actions';

export const initialState = {
	data: [],
} as HistoryState;

export default handleActions<HistoryState, any>({
	[actions.TRANSACTIONS_GET_SUCCESS]: (state: HistoryState, action: Action<Trans[]>): HistoryState => {
		if (!action.payload) {
			return {
				...state,
			}
		}
		return {
			...state,
			data: action.payload,
		};
	},
}, initialState);
