import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import cards from './cards.reducer';
import pay from './pay.reducer';
import prepaid from './prepaid.reducer';
import withdraw from './withdraw.reducer';
import auth from './auth.reducer';

const reducers = combineReducers({
	routing,
	auth,
	cards,
	pay,
	prepaid,
	withdraw,
});

export default reducers;
