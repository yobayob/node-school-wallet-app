import * as path from 'path';
import * as webpack from 'webpack';
const nodeExternals = require('webpack-node-externals');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const config: webpack.Configuration[] = [{
	entry: ['./src/backend/index.ts'],
	output: {
		path: path.resolve(__dirname, 'dist'),
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
	cache: true,
	entry: {
		main: './src/frontend/app.tsx',
		vendor: [
			'babel-polyfill',
			'react',
			'react-dom',
		],
	},
	output: {
		path: path.resolve(__dirname, './public'),
		filename: '[name].js',
		publicPath: '/dist/',
		chunkFilename: '[chunkhash].js',
	},
	module: {
		loaders: [{
			test: /\.css$/,
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: 'css-loader',
			}),
		}, {
			test: /\.ts(x?)$/,
			exclude: /node_modules/,
			loader: 'babel-loader!ts-loader',
		}, {
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader',
		}],
	},
	plugins: [
		new ExtractTextPlugin('styles.css'),
	],
	resolve: {
		extensions: ['.ts', '.tsx', '.js'],
	},
}];

export default config;
