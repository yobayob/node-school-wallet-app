import * as React from 'react';
import {renderToString} from 'react-dom/server';
import {App} from '../../frontend/components';
import {ServerStyleSheet, StyleSheetManager} from 'styled-components'

export default () => {
	const sheet = new ServerStyleSheet();
	const html = renderToString(sheet.collectStyles(<App />));
	const style = sheet.getStyleTags();
	return ({html, style})
}

