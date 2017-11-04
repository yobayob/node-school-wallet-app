import * as actions from '../actions';
import {handleActions, Action} from 'redux-actions';
import {Card, CardState} from '../models'
import {Trans} from '../models/history.model';
import {prepare} from '../utils/cardInfo';

export const initialState = {
	data: [],
	activeCardId: null,
	activeCard: null,
	isAdding: false,
} as CardState;

export default handleActions<CardState, any>({
	[actions.ADDING_MODE]: (state: CardState, action: Action<boolean>): CardState => {
		if (!action.payload) {
			return {
				...state,
				isAdding: false,
			}
		}
		return {
			...state,
			activeCardId: null,
			activeCard: null,
			isAdding: action.payload,
		};
	},
	[actions.CARD_CREATE_SUCCESS]: (state: CardState, action: Action<Card>): CardState => {
		if (!action.payload) {
			return {
				...state,
			}
		}
		state.data.push(action.payload);
		return {
			...state,
			isAdding: false,
		};
	},
	[actions.CARDS_GET_SUCCESS]: (state: CardState, action: Action<Card[]>): CardState => {
		if (!action.payload) {
			return initialState
		}
		return {
			...state,
			data: action.payload,
		}
	},
	[actions.CARD_SET]: (state: CardState, action: Action<any>): CardState => {
		if (!action.payload) {
			return initialState
		}
		return {
			...state,
			isAdding: false,
			activeCard: action.payload,
			activeCardId: action.payload.id,
		}
	},
	[actions.TRANSFER_SUCCESS]: (state: CardState, action: Action<Trans[]>): CardState => {
		state.data.forEach((card: any) => {
			if (action.payload) { // fuck typescript!!!
				action.payload.forEach((trans: Trans) => {
				if (card.id === trans.cardId) {
					card.balance += trans.sum
				}
				if (card.id === state.activeCardId) {
					state.activeCard = prepare(card);
				}
			});
			}
		});
		return {
			...state,
		}
	},
}, initialState);
