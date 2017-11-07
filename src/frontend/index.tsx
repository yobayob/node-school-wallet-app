import * as React from 'react';
import {hydrate} from 'react-dom';
import {Provider} from 'react-redux';
import {App, Login, Pay, StartPage} from './components';
import store from './store';
import {Router, Route, browserHistory} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'
import {initialState, checkAuth, socketsConnecting} from './actions'
import './firebase'

// this is crazy
const w = window as any;
const appData = w.__data || {cards: [], transactions: []};


store.dispatch(checkAuth());
store.dispatch(initialState(appData));

store.dispatch(socketsConnecting(
	new WebSocket('ws://localhost:3000')
));

const history = syncHistoryWithStore(browserHistory, store);
hydrate(
	<Provider store={store}>
		<Router history={history}>
			<Route path='/' component={StartPage}/>
			<Route path='/card' component={App}/>
			<Route path='/pay' component={Pay}/>
			<Route path='/login' component={Login}/>
		</Router>
	</Provider>,
	document.getElementById('root'));

require('./public/fonts.css');
require('react-select/dist/react-select.css');
require('antd/dist/antd.css');
require('react-redux-toastr/lib/css/react-redux-toastr.min.css');

