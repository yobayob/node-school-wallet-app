import * as path from 'path';
import * as webpack from 'webpack';

const nodeExternals = require('webpack-node-externals');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const env = process.env.NODE_ENV === 'production' ? 'production' : 'development';
console.log(`Building for ${env}`);

const ExtractCSS = new ExtractTextPlugin({
	filename: 'styles.css',
});

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
				test: /\.css$/,
				use: 'ignore-loader',
			},
			{
				test: /\.ts|tsx?$/,
				exclude: ['node_modules'],
				use: [
					'ts-loader',
				],
			}, {
				test: /\.css$/,
				loader: 'style-loader!css-loader',
				exclude: /node_modules/,
			},
		],
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify(env)
			},
			__ENV__: JSON.stringify(env)
		})
	],
	externals: [nodeExternals()],
	devtool: 'source-map',
	target: 'node',
}, {
	cache: true,
	entry: {
		main: './src/frontend/index.tsx',
		vendor: [
			'styled-components',
			'card-info',
			'moment',
			'axios',
			'elliptic',
			'readable-stream',
			'node-libs-browser',
			'bn.js',
			'jsonwebtoken',
		],
		react: [
			'react',
			'react-dom',
			'react-select',
			'react-input-autosize',
			'react-redux',
			'react-router-redux',
			'react-router',
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
			use: ExtractCSS.extract({
				fallback: 'style-loader',
				use: [
					'css-loader?minimize',
				],
			}),
		}, {
			test: /\.ts(x?)$/,
			loader: 'ts-loader',
		}],
	},
	plugins: [
		ExtractCSS,
		new webpack.ContextReplacementPlugin(/moment[\\\/]locale$/, /^\.\/(ru)$/),
		new webpack.optimize.CommonsChunkPlugin({
			names: ['vendor', 'react'],
			filename: '[name].js',
		}),
		new webpack.HashedModuleIdsPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify(env)
			},
			__ENV__: JSON.stringify(env)
		}),
		new webpack.optimize.UglifyJsPlugin({
			mangle: {
				screw_ie8: true,
			},
			compress: {
				screw_ie8: true,
				dead_code: true,
				warnings: false,
			},
			beautify: false,
			sourceMap: false,
			comments: false,
		}),
		// new BundleAnalyzerPlugin({
		// 	analyzerMode: 'static',
		// 	reportFilename: './report.html',
		// }),
	],
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
	},
}];

export default config;
