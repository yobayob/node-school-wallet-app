import * as React from 'react';
import {hydrate} from 'react-dom';
import {App} from './components';

// this is crazy
const w = window as any;
const appData = w.__data;

// TODO передать конфиг и до
appData.socket = new WebSocket('ws://localhost:3000');
//appData.socket = new WebSocket('wss://localhost:3000/ws');

hydrate(<App data={appData}/>, document.getElementById('root'));

require('./components/Fonts.css');
require('react-select/dist/react-select.css');
require('antd/dist/antd.css');
