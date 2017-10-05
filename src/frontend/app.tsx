import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {App} from './components';

// TODO: fix serialize css

ReactDOM.render(<App />, document.getElementById('root'));

require('./components/Fonts.css');
require('antd/dist/antd.css');
