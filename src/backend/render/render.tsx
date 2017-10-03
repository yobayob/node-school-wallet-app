import * as React from 'react';
import {renderToString} from 'react-dom/server';
import {App} from '../../frontend/components'

export default () => (
	renderToString(
		<App/>,
	)
);
