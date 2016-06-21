'use strict';

var webpack = require('webpack');
var path = require('path');

var config = {
  entry: {
    nexttick: __dirname + '/index.js'
  },
  output: {
    filename: 'neks-tick.js',
    path: __dirname + '/dist',
    library: 'niks-tick',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'eslint-loader' }
    ]
  }
};

/*
 * If bundling for production, optimize output
 */
if (process.env.NODE_ENV === 'production') {
  config.devtool = false;
  config.plugins = [
    new webpack.optimize.UglifyJsPlugin({comments: false})
  ];
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    }
  });
};

module.exports = config;