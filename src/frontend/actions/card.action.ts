import {fetch} from '../utils';
import { getTransactions } from './transaction.action';
import * as action from './types';
import { Card } from '../models'

export const setAddingMode = (mode: boolean) => {
	return async (dispatch: any) => {
		dispatch({
			type: action.ADDING_MODE,
			payload: mode,
		})
	}
}

export const getCards = () => {
	return async (dispatch: any) => {
		dispatch({
			type: action.CARDS_GET_STARTED,
		});
		const response = await fetch.get(`/cards`);
		dispatch({
			type: action.CARDS_GET_SUCCESS,
			payload: response as Card[],
		})
	};
};

export const createCard = (cardNumber: string) => {
	return async (dispatch: any) => {
		const balance = 0; // TODO: fix this on backend
		try {
			dispatch({
				type: action.CARD_CREATE_STARTED,
			});
			const response = await fetch.post(`/cards`, {cardNumber, balance});
			dispatch({
				type: action.CARD_CREATE_SUCCESS,
				payload: response as Card,
			})
		} catch (err) {
			dispatch({
				type: action.CARD_CREATE_FAILED,
				payload: String(err),
			})
		}
	}
};

export const removeCard = (id: number) => {
	return async (dispatch: any) => {
		try {
			dispatch({
				type: action.CARD_REMOVE_STARTED,
			});
			const response = await fetch.del(`/cards/${id}`);
			dispatch({
				type: action.CARD_REMOVE_SUCCESS,
			})
		} catch (err) {
			dispatch({
				type: action.CARD_REMOVE_FAILED,
				payload: err,
			})
		}
	}
};

export const setCard = (id: number) => (dispatch: any, getState: any) => {
	const {activeCardId} = getState().cards;
	if (activeCardId === id) return;
	dispatch({
		type: action.CARD_SET,
		payload: id,
	});
	dispatch(getTransactions(id));
};
