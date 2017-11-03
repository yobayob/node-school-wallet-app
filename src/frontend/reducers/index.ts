import { combineReducers } from 'redux';
import cards from './cards.reducer';

const reducers = combineReducers({
	cards,
});

export default reducers;
