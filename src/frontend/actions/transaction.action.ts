import {fetch} from '../utils';
import { createAction } from 'redux-actions';
import * as action from './types';
import {} from '../models'

export const getTransactions = (id: number) => {
	return async (dispatch: any, getState: any) => {
		const {activeCardId} = getState().cards;
		try {
			dispatch({
				type: action.TRANSACTIONS_GET_STARTED,
			});
			const response = await fetch.get(`/cards/${activeCardId}/transactions`);
			dispatch({
				type: action.TRANSACTIONS_GET_SUCCESS,
				payload: response,
			});
		} catch (err) {
			dispatch({
				type: action.TRANSACTIONS_GET_FAILED,
				payload: err,
			});
		}
	};
};
