import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

import reducers from './reducers';
const STORE = createStore(reducers);

import {App} from './containers';

const Main = () => (
	<Provider store={ STORE }>
		<App />
	</Provider>
);

ReactDOM.render(<Main />, document.body);


