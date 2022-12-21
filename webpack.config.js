const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const IconfontPlugin = require('iconfont-plugin-webpack');
const CopyPlugin = require('copy-webpack-plugin');

const path = require('path');

const copyPaterns = [
	{
		from: './src/assets',
		to: path.resolve(__dirname, './dist/assets')
	},
	{
		from: './src/favicon.ico',
		to: path.resolve(__dirname, './dist')
	},
	{
		from: '*.html',
		to: path.resolve(__dirname, './dist'),
		context: './src/',
	},
];

module.exports = {
	mode: 'development',
	output: {
		filename: 'js/script.js',
		path: path.resolve(__dirname, 'dist'),
	},
	entry: [
		'./src/scss/style.scss',
		'./src/js/script.js',
	],
	module: {
		rules: [{
			test: /\.scss$/,
			use: [
				MiniCssExtractPlugin.loader,
				{
					loader: 'css-loader',
					options: {
						url: false
					}
				},
				{
					loader: 'postcss-loader',
					options: {
						postcssOptions: {
							plugins: [
								'autoprefixer',
							]
						}
					}
				},
				'sass-loader',
			]
		},],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "css/style.css"
		}),
		new StylelintPlugin({
			configFile: '.stylelintrc.json',
		}),
		new IconfontPlugin({
			src: './src/assets/svg',
			family: 'icon-font',
			dest: {
				font: './src/assets/fonts/[family].[type]',
				css: './src/scss/_icon-font.scss',
			},
			watch: {
				pattern: './src/assets/svg/*.svg',
				cwd: undefined
			}
		}),
		new CopyPlugin({
			patterns: copyPaterns
		})
	],
}