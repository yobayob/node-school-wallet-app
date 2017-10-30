import * as React from 'react';
import {renderToString} from 'react-dom/server';
import App from '../../frontend/components/App';
import {ServerStyleSheet} from 'styled-components'
import serialize from 'serialize-javascript';

module.exports = (appData: {} = {}) => {
	const sheet = new ServerStyleSheet();
	const viewData = `window.__data=${serialize(appData)};`;
	const html = renderToString(sheet.collectStyles(<App data={appData}/>));
	const style = sheet.getStyleTags();
	return (
		<html>
			<head>
				<title>Node School App</title>
				<link rel='shortcut icon' href='/public/favicon.ico'/>
				<link rel='stylesheet' type='text/css' href='styles.css'/>
				<style type='text/css' dangerouslySetInnerHTML={{__html: style}}/>
			</head>
			<body>
				<div id='root' dangerouslySetInnerHTML={{__html: html}}/>
				<script dangerouslySetInnerHTML={{__html: viewData}}/>
				<script type='text/javascript' src='main.js'/>
				<script type='text/javascript' src='vendor.js'/>
			</body>
		</html>
	);
}