import * as actions from '../actions';
import {handleActions, Action} from 'redux-actions';
import {Card, CardState, Trans} from '../models'
import {prepare} from '../utils/cardInfo';

export const initialState = {
	data: [],
	transactions: [],
	activeCardId: null,
	activeCard: null,
	isAdding: false,
	stage: "",
} as CardState;

export default handleActions<CardState, any>({
	[actions.INITIAL_CARDS]: (state: CardState, action: Action<{cards: any, transactions: any}>): CardState => {
		if (!action.payload) {
			return {
				...state,
			}
		}
		return {
			...state,
			data: action.payload.cards,
			transactions: action.payload.transactions,
		}
	},
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
			stage: "success",
			isAdding: false,
		};
	},
	[actions.CARD_CREATE_FAILED]: (state: CardState, action: Action<Card>): CardState => {
		console.log(action);
		return {
			...state,
			stage: "error",
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
	[actions.TRANSACTION_CREATE_SUCCESS]: (state: CardState, action: Action<Trans>): CardState => {
		state.data.forEach((card: any) => {
			if (action.payload && card.id === action.payload.cardId) {
				card.balance += action.payload.sum
			}
			if (action.payload && card.id === state.activeCardId) {
				state.activeCard = prepare(card);
				if (card.id === action.payload.cardId) {
					state.transactions.unshift(action.payload);
				}
			}
		});
		return {
			...state,
		}
	},
	[actions.TRANSACTIONS_GET_SUCCESS]: (state: CardState, action: Action<Trans[]>): CardState => {
		if (!action.payload) {
			return {
				...state,
			}
		}
		return {
			...state,
			transactions: action.payload,
		};
	},
}, initialState);
