import { combineReducers } from 'redux';
import cards from './cards.reducer';
import pay from './pay.reducer';
import prepaid from './prepaid.reducer';
import withdraw from './withdraw.reducer';

const reducers = combineReducers({
	cards,
	pay,
	prepaid,
	withdraw,
});

export default reducers;
