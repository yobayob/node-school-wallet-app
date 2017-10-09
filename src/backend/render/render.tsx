import * as React from 'react';
import {renderToString} from 'react-dom/server';
import {App} from '../../frontend/components';
import {ServerStyleSheet, StyleSheetManager} from 'styled-components'

export default () => {
	const sheet = new ServerStyleSheet();
	const html = renderToString(sheet.collectStyles(<App />));
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
				<script type='text/javascript' src='main.js'/>
				<script type='text/javascript' src='vendor.js'/>
			</body>
		</html>
	);
}

