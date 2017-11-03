import * as actions from '../actions';
import {handleActions, Action} from 'redux-actions';
import {Card} from '../models'

export const initialState: Card = {
	cardNumber: '',
	balance: 0,
	error: null,
};

export default handleActions<Card>({
	[actions.CARD_CREATE_SUCCESS]: (state: Card, action: Action<Card>): Card => {
		if (!action.payload) {
			return initialState
		}
		return {
			id: action.payload.id,
			cardNumber: action.payload.cardNumber,
			balance: action.payload.balance,
		};
	},
	[actions.CARD_CREATE_FAILED]: (state: Card, action: Action<Card>): Card => {
		if (!action.payload) {
			return state
		}
		return {
			...state,
			error: action.payload.error,
		};
	},
}, initialState);
