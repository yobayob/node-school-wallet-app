import reduxThunk from 'redux-thunk';
import {createStore, applyMiddleware, compose} from 'redux';
import reducers from '../reducers';
import logger from 'redux-logger';

let middleware: any = [reduxThunk];

if (__ENV__ !== 'production') {
	middleware = [...middleware, logger];
}

const store = createStore(reducers, applyMiddleware(...middleware));
export default store;
