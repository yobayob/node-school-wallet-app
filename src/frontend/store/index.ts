import reduxThunk from 'redux-thunk';
import {createStore, applyMiddleware, compose} from 'redux';
import { routerMiddleware } from 'react-router-redux'
import { browserHistory } from 'react-router'

import reducers from '../reducers';
import logger from 'redux-logger';

let middleware: any = [reduxThunk, routerMiddleware(browserHistory)];

if (__ENV__ !== 'production') {
	middleware = [...middleware, logger];
}

const store = createStore(reducers, applyMiddleware(...middleware));
export default store;
