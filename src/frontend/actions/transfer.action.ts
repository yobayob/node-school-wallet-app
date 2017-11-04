import { fetch } from '../utils';
import * as action from './types';
import {} from '../models'



export const prepaidRepeat = () => {
	return async (dispatch: any, getState: any) => {
		if (getState().prepaid.stage === 'success') {
			dispatch({
				type: action.PREPAID_REPEAT,
			})
		}
	}
};

export const prepaid = (cardId: number, amount: number) => {
	return async (dispatch: any, getState: any) => {
		const {activeCardId}: any = getState().cards;
		if (!activeCardId) return;
		dispatch({
			type: action.PREPAID_START,
		});
		try {
			const response = await fetch.post(`/cards/${cardId}/transfer`, {cardId: activeCardId, amount});
			dispatch({
				type: action.PREPAID_SUCCESS,
				payload: response[1],
			});
			(response as any[]).forEach((trans) => {
				dispatch({
					type: action.TRANSACTION_CREATE_SUCCESS,
					payload: trans,
				});
			})
		} catch (err) {
			dispatch({
				type: action.PREPAID_FAILED,
				payload: err,
			});
		}
	}
};

export const withdraw = (cardId: number, amount: number) => {
	return async (dispatch: any, getState: any) => {
		const {activeCardId}: any = getState().cards;
		if (!activeCardId) return;
		dispatch({
			type: action.WITHDRAW_START,
		});
		try {
			const response = await fetch.post(`/cards/${activeCardId}/transfer`, {cardId, amount});
			dispatch({
				type: action.WITHDRAW_SUCCESS,
				payload: response[0],
			});
			(response as any[]).forEach((trans) => {
				dispatch({
					type: action.TRANSACTION_CREATE_SUCCESS,
					payload: trans,
				});
			})
		} catch (err) {
			dispatch({
				type: action.WITHDRAW_FAILED,
				payload: err,
			});
		}
	}
};

export const withdrawRepeat = () => {
	return async (dispatch: any, getState: any) => {
		if (getState().witdraw.stage === 'success') {
			dispatch({
				type: action.WITHDRAW_REPEAT,
			})
		}
	}
};
