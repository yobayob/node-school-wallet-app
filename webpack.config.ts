import * as path from 'path';
import * as webpack from 'webpack';

const HtmlWebpackPlugin = require('html-webpack-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const BabiliPlugin = require("babili-webpack-plugin");

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
				// {
				// 	test: /\.js?$/,
				// 	use: [
				// 		'babel-loader',
				// 	],
				// },
			],
		},
		devtool: 'source-map',
		plugins: [
			// new BabiliPlugin(),
		],
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
						//'babel-loader',
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
			// new ExtractTextPlugin('style.css'),
			new HtmlWebpackPlugin({
				title: 'Yamoney Node.js School',
			}),
			//new webpack.optimize.UglifyJsPlugin(),
		],
		devtool: 'source-map',
	}];

export default config;
