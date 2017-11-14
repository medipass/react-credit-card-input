const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: './src/index.js',

  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'lib')
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',

        options: {
          presets: ['es2015', 'stage-0', 'react']
        }
      },
      {
        test: /\.svg$/,
        loader: 'file-loader'
      }
    ]
  }
};
