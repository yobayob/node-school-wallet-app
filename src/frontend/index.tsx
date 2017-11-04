import * as React from 'react';
import {hydrate} from 'react-dom';
import { Provider } from 'react-redux';
import {App} from './components';
import store from './store';

// this is crazy
const w = window as any;
const appData = w.__data;

hydrate(
	<Provider store={store}>
		<App data={appData}/>
	</Provider>,
	document.getElementById('root'));
//<App data={appData}/>
require('./public/fonts.css');
require('react-select/dist/react-select.css');
require('antd/dist/antd.css');
