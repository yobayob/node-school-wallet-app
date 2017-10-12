import * as React from 'react';
import {hydrate} from 'react-dom';
import {App} from './components';

// this is crazy
const w = window as any;
const appData = w.__data;

hydrate(<App data={appData}/>, document.getElementById('root'));

require('./components/Fonts.css');
require('antd/dist/antd.css');
