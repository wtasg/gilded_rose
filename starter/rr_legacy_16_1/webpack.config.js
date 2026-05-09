const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// TODO: split into dev/prod configs someday
module.exports = {
  entry: './src/index.js',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[hash].js',
    publicPath: '/'
  },

  // quick workaround for source maps in prod
  devtool: 'source-map',

  resolve: {
    extensions: ['.js', '.jsx'],
    // added this so we dont have to write full paths
    alias: {
      src: path.resolve(__dirname, 'src')
    }
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      // FIXME: image handling is broken for some paths
      {
        test: /\.(png|jpg|gif|svg)$/,
        type: 'asset/resource'
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html'
    })
  ],

  devServer: {
    port: 3000,
    historyApiFallback: true,
    // TODO: proxy real API when backend is ready
    hot: true,
    open: false
  },

  // rendering everything so performance mode not needed yet
  performance: {
    hints: false
  }
};
