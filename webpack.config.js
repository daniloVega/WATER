const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const webfontsGenerator = require('@vusion/webfonts-generator');
const CopyPlugin = require('copy-webpack-plugin');

const path = require('path');
const fs = require('fs');

const dist =  path.resolve(__dirname, 'dist');

const allSvg = [];
const allSvgImages = fs.readdirSync('./src/assets/svg');
allSvgImages.forEach(file => {
	allSvg.push('./src/assets/svg/' + file);
});

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

webfontsGenerator({
	files: allSvg,
	//dest: `${dist}/assets/fonts/`,
	dest: path.resolve(__dirname, 'src/assets/fonts/'),
	types: ['woff2', 'woff', 'svg'],
	fontName: 'svgicons',
	cssDest: './src/scss/_icon-font.scss',
	cssFontsUrl: `../assets/fonts/`,
	templateOptions: {
		classPrefix: 'icon-',
		baseSelector: '.icon',
	}
});

module.exports = {
	mode: 'development',
	entry: [
		'./src/scss/style.scss',
		'./src/js/script.js',
	],
	output: {
		filename: 'js/script.js',
		path: dist,
	},
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
		new CopyPlugin({
			patterns: copyPaterns
		})
	],
}