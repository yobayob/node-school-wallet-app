import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import cards from './cards.reducer';
import pay from './pay.reducer';
import prepaid from './prepaid.reducer';
import withdraw from './withdraw.reducer';
const reducers = combineReducers({
	routing: routerReducer,
	cards,
	pay,
	prepaid,
	withdraw,
});

export default reducers;
