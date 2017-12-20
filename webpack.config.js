const path = require('path');

module.exports = {
  entry: './src/index.js',

  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'lib'),
    libraryTarget: 'commonjs2'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',

        options: {
          presets: ['env', 'react'],
          plugins: [
            'transform-class-properties',
            'transform-object-rest-spread'
          ]
        }
      }
    ]
  }
};
