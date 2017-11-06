import { handleActions, Action } from 'redux-actions';
import * as actions from '../actions';

type IAuthState = {
	stage: 'success'|'signup'|'signin',
	user: any,
}

export const initialState = {
	stage: 'signin',
	user: null,
} as IAuthState;

export default handleActions<IAuthState, any>({
	[actions.AUTH_SIGNUP]: (state: IAuthState, action: Action<any>): IAuthState => {
		console.log(`continue auth`);
		return {
			...state,
			stage: 'signup',
		};
	},
	[actions.AUTH_SUCCESS]: (state: IAuthState, action: Action<any>): IAuthState => {
		if (!action.payload) {
			return {
				...state,
			}
		}
		return {
			...state,
			stage: 'success',
			user: action.payload,
		};
	},
}, initialState);
