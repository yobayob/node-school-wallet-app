import reduxThunk from 'redux-thunk';
import {createStore, applyMiddleware, compose} from 'redux';
import reducers from '../reducers';

const logger = (store: any) => (next: any) => (action: any) => {
	console.group(action.type);
	console.info('dispatching', action);
	let result = next(action);
	console.log('next state', store.getState());
	return result
};

const store = createStore(reducers, compose(applyMiddleware(reduxThunk, logger)));
export default store;
