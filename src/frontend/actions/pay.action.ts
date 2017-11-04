import {fetch} from '../utils';
import * as action from './types';

export const payMobile = (amount: number, data: string) => {
	return async (dispatch: any, getState: any) => {
		const {activeCardId} = getState().cards;

		try {
			dispatch({
				type: action.PAY_START,
			});
			const response = await fetch.post(`/cards/${activeCardId}/pay`, {amount, data});
			dispatch({
				type: action.PAY_SUCCESS,
				payload: response,
			})
		} catch (err) {
			dispatch({
				type: action.PAY_FAILED,
				payload: String(err),
			})
		}
	}
};

