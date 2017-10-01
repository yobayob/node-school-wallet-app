import * as React from 'react';
import {Link} from 'react-router';

const Home = () => (
	<div>
		<p>Hello, world</p>
		<Link to='/about'>
			About
		</Link>
	</div>
);

export default Home;
