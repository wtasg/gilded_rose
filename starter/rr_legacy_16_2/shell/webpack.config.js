var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, use: { loader: 'babel-loader', options: { presets: ['@babel/preset-env', '@babel/preset-react'] } } }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './public/index.html' }),
    new webpack.DefinePlugin({
      'process.env.CART_MF_URL': JSON.stringify(process.env.CART_MF_URL || 'http://localhost:28011/remoteEntry.js'),
      'process.env.OTP_MF_URL': JSON.stringify(process.env.OTP_MF_URL || 'http://localhost:28012/remoteEntry.js')
    })
  ],
  devServer: {
    historyApiFallback: false,
    disableHostCheck: true
  }
};

