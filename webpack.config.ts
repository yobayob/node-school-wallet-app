import * as path from 'path';
import * as webpack from 'webpack';
import * as fs from 'fs';
const nodeExternals = require('webpack-node-externals');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const getExternals = () => {
	return fs.readdirSync('node_modules')
		.concat(['react-dom/server'])
		.filter((mod) => mod !== '.bin')
		.reduce((externals: any, mod) => {
			externals[mod] = `commonjs ${mod}`;
			return externals;
		}, {});
}


const env = process.env.NODE_ENV === 'production' ? 'production' : 'development';
//webpack.Configuration[]
const config: any = [{
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
			{
				test: /\.css$/,
				loader: 'ignore-loader'
			}
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
		new webpack.DefinePlugin({
			'process.env': { NODE_ENV: JSON.stringify(env) },
			'NODE_ENV': JSON.stringify(env)
		}),
		new ExtractTextPlugin('styles.css'),
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: true,
			compress: {
			  warnings: false
			}
		}),
		new webpack.ContextReplacementPlugin(/moment[\\\/]locale$/, /^\.\/(en|ko|ja|zh-cn)$/),
	],
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
	},
},
{
	entry: {
		index: path.resolve(__dirname, './src/backend/render/render.tsx')
	},
	target: 'node',
	externals: getExternals(),
	module: {
		rules: [
			{
				test: /\.tsx$/,
				exclude: /node_modules/,
				loader: 'babel-loader!ts-loader'
			},
			{
				test: /\.css$/,
				loader: 'ignore-loader'
			}
		]
	},
	output: {
		filename: '[name].server.js',
		path: path.resolve(__dirname, './src/backend/render'),
		libraryTarget: 'umd'
	}
}];
console.log(`Building for ${env}`)
// Временный костыль
// нужно нормально вставить в сборку
if (process.env.BUNDLE_REPORT) {
	const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
	config[1].plugins.push(new BundleAnalyzerPlugin())
}

export default config;
