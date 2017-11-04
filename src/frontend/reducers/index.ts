import { combineReducers } from 'redux';
import cards from './cards.reducer';
import history from './history.reducer';
import pay from './pay.reducer';
import prepaid from './prepaid.reducer';

const reducers = combineReducers({
	cards,
	history,
	pay,
	prepaid
});

export default reducers;
