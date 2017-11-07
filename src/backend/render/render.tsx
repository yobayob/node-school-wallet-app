import * as React from 'react';
import {renderToString} from 'react-dom/server';
import {App, Login, StartPage, Pay, Goal} from '../../frontend/components';
import {ServerStyleSheet} from 'styled-components'
import * as serialize from 'serialize-javascript';
import store from '../../frontend/store'
import { Provider } from 'react-redux';
import { initialState } from '../../frontend/actions'
import { match, RouterContext } from 'react-router'
import {ApplicationError} from '../common/exceptions';

const routes = [
	{
		path: '/',
		component: StartPage,
	}, {
		path: '/pay',
		component: Pay,
	}, {
		path: '/card',
		component: App,
	}, {
		path: '/login',
		component: Login,
	}, {
		path: '/goals',
		component: Goal,
	},
];

export function getSSR(location: string, appData?: any): Promise<React.ReactElement<any>> {
	return new Promise((resolve, reject) => {
		match({routes, location}, (err: any, redirect: any, props: any) => {
			if (err) {
				throw new ApplicationError(err);
			}
			const sheet = new ServerStyleSheet();
			let viewData = '';
			if (appData) {
				viewData = `window.__data=${serialize(appData)};`;
				store.dispatch(initialState(appData));
			}
			const html = renderToString(sheet.collectStyles(
				<Provider store={store}>
					<RouterContext {...props}/>
				</Provider>
			));
			const style = sheet.getStyleTags();
			resolve (
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
				</html>,
			)
		})
	})
}

