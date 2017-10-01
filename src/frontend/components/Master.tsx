import * as React from 'react';
import * as PropTypes from 'prop-types';

const Master = ({children}: any) => (
	<div>
		<p className='title'>React Server Render</p>
		{children}
	</div>
);
export default (Master);
