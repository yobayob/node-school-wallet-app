import { combineReducers } from 'redux';
import cards from './cards.reducer';
import history from './history.reducer';

const reducers = combineReducers({
	cards,
	history,
});

export default reducers;
