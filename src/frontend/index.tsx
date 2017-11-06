import * as React from 'react';
import {hydrate} from 'react-dom';
import { Provider } from 'react-redux';
import {App, Login } from './components';
import store from './store';
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore  } from 'react-router-redux'
import { initialState, checkAuth } from './actions'
// this is crazy
const w = window as any;
const appData = w.__data || {cards: [], transactions: []};

store.dispatch(checkAuth());
store.dispatch(initialState(appData));

const history = syncHistoryWithStore(browserHistory, store);
hydrate(
		<Provider store={store}>
			<Router history={history}>
				<Route path='/' component={App}/>
				<Route path='/login' component={Login}/>
			</Router>
		</Provider>,
	document.getElementById('root'));

require('./public/fonts.css');
require('react-select/dist/react-select.css');
require('antd/dist/antd.css');
