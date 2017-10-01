import {Route, IndexRoute, Router} from 'react-router';
import * as React from 'react';
import Master from './components/Master';
import About from './components/About';
import Home from './components/Home';

const routes = () => (
	<Route path='/' component={Master}>
		<IndexRoute component={Home}/>
		<Route path='/about' component={About}/>
	</Route>
);
export default routes;
