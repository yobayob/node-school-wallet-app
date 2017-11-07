import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import * as React from 'react';
import notify from './notify.reducer';
import cards from './cards.reducer';
import pay from './pay.reducer';
import prepaid from './prepaid.reducer';
import withdraw from './withdraw.reducer';
import auth from './auth.reducer';
import fill from './fill.reducer';
import { reducer as toastr } from 'react-redux-toastr';

const reducers = combineReducers({
	notify,
	toastr,
	routing,
	auth,
	cards,
	pay,
	prepaid,
	withdraw,
	fill,
});

export default reducers;
