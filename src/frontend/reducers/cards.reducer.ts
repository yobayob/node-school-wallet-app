import * as actions from '../actions';
import {handleActions, Action} from 'redux-actions';
import {Card, CardState} from '../models'

export const initialState = {
	data: [],
	activeCardId: null,
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
	[actions.CARD_SET]: (state: CardState, action: Action<number>): CardState => {
		if (!action.payload) {
			return initialState
		}
		return {
			...state,
			isAdding: false,
			activeCardId: action.payload,
		}
	},
}, initialState);
