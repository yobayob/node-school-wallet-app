import * as React from 'react';
import {Link, IndexLink} from 'react-router';

const About = () => (
	<div> PRIVET
		<p>Server side</p>
		<IndexLink to='/'>Home</IndexLink>
	</div>
);

export default About;
