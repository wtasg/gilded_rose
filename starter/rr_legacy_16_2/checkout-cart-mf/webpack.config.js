var path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'remoteEntry.js',
    library: 'CheckoutCartMF',
    libraryTarget: 'window'
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, use: { loader: 'babel-loader', options: { presets: ['@babel/preset-env', '@babel/preset-react'] } } }
    ]
  },
  devServer: {
    headers: { 'Access-Control-Allow-Origin': '*' },
    disableHostCheck: true
  }
};

