import * as path from 'path';
import * as webpack from 'webpack';
const nodeExternals = require('webpack-node-externals');
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
					test: /\.ts|tsx?$/,
					exclude: ['node_modules'],
					use: [
						'awesome-typescript-loader',
					],
				},
			],
		},
		externals: [nodeExternals()],
		devtool: 'source-map',
		target: 'node',
	}, {
		entry: ['./src/frontend/index.ts'],
		output: {
			path: path.resolve(__dirname, 'dist/frontend'),
			filename: 'bundle.js',
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
					exclude: ['node_modules'],
					use: [
						'awesome-typescript-loader',
					],
				}, {
					test: /\.css$/,
					exclude: ['node_modules'],
					use: [
						'style-loader',
						'css-loader',
						'postcss-loader',
					],
				},
			],
		},
		plugins: [],
		devtool: 'source-map',
	}];

export default config;
