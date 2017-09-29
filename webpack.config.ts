import * as path from 'path';
import * as webpack from 'webpack';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const config: webpack.Configuration[] = [
	{
		entry: ['./src/backend/index.ts'],
		output: {
			path: path.resolve(__dirname, 'dist/backend'),
			filename: 'backend.js',
		},
		resolve: {
			extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
		},
		module: {
			rules: [
				{
					test: /\.ts?$/,
					use: [
						'awesome-typescript-loader',
					],
				},
			],
		},
		devtool: 'source-map',
		target: 'node',
	}, {
		entry: ['./src/frontend/index.ts'],
		output: {
			path: path.resolve(__dirname, 'dist/frontend'),
			filename: 'frontend.js',
		},
		devServer: {
			contentBase: './',
			open: true,
			inline: true,
		},
		resolve: {
			extensions: ['.ts', '.tsx', '.js'],
		},
		module: {
			rules: [
				{
					test: /\.tsx?$/,
					use: [
						'awesome-typescript-loader',
					],
				}, {
					test: /\.css$/,
					use: [
						'style-loader',
						'css-loader',
						'postcss-loader',
					],
				},
			],
		},
		plugins: [
			new HtmlWebpackPlugin({
				title: 'Yamoney Node.js School',
			}),
		],
		devtool: 'source-map',
	}];

export default config;
