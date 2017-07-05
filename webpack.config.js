var configs = module.exports = {
	entry: {
	   main: [
			'babel-polyfill',
		   './src/shiver.js'
		]
	},
	output: {
		libraryTarget: 'commonjs2',
		path: __dirname + '/lib',
		publicPath: '/lib',
		filename: 'shiver.js'
	},
	target: 'node',
	module: {
		loaders: [
			{
				test: /\.js?$/,
				loader: 'babel-loader',
				exclude: /(node_modules|bower_components)/,
				query: {
					presets: [ 'es2015', 'es2017' ]
				}
			}
		]
	}
};
