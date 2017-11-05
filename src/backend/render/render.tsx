import * as React from 'react';
import {renderToString} from 'react-dom/server';
import {App, Login} from '../../frontend/components';
import {ServerStyleSheet} from 'styled-components'
import * as serialize from 'serialize-javascript';
import store from '../../frontend/store'
import { Provider } from 'react-redux';
import { initialState } from '../../frontend/actions'
export default (appData: {cards: any, transactions: any} = {cards: [], transactions: []}) => {
	const sheet = new ServerStyleSheet();
	const viewData = `window.__data=${serialize(appData)};`;
	// const html = renderToString(sheet.collectStyles(<App data={appData}/>));
	store.dispatch(initialState(appData))
	const html = renderToString(sheet.collectStyles(
	<Provider store={store}>
			<App/>
	</Provider>));
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
				<script type='text/javascript' src='react.js'/>
				<script type='text/javascript' src='vendor.js'/>
				<script type='text/javascript' src='main.js'/>
			</body>
		</html>
	);
}

export function renderLogin() {
	const sheet = new ServerStyleSheet();
	//const viewData = `window.__data=${serialize(appData)};`;
	// const html = renderToString(sheet.collectStyles(<App data={appData}/>));
	// store.dispatch(initialState(appData))
	const html = renderToString(sheet.collectStyles(
	<Provider store={store}>
			<Login/>
	</Provider>));
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
				<script type='text/javascript' src='react.js'/>
				<script type='text/javascript' src='vendor.js'/>
				<script type='text/javascript' src='main.js'/>
			</body>
		</html>
	);
}
