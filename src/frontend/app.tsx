import * as React from 'react';
import {hydrate} from 'react-dom';
import {App} from './components';

// TODO: fix serialize css

hydrate(<App />, document.getElementById('root'));

require('./components/Fonts.css');
require('antd/dist/antd.css');

