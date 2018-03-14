const path = require('path');
const webpack = require('webpack');

module.exports = {
	entry:'./public/js/init.js',
	output:{
		filename:'production.js',
		path:path.resolve(__dirname,'public/dist/')
	},
	watch: true,
	module:{
		loaders: [
           {
           	 test:/\.js$/,
           	 exclude:/node_modules/,
           	 loader:'babel-loader',
           	 query:{
           	 	presets:['react','es2015','stage-1']
           	 }
           },
	       {
	                test: /\.css$/,
	                loader: "style-loader!css-loader"
	       },
	       {
	       	        test: /\.(png|jpg|gif|svg)$/,
	       	        loader: 'url-loader?limit=8192'
	       },
	       {
	                test: /\.less$/,
	                include: /styles/,
	                loader: 'less-loader'
	       }
		]
	},
	plugins: [
	  new webpack.ProvidePlugin({
	    "React": "react",
	  }),
	]
}
