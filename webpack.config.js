const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');


/** @type {webpack.Configuration} */
module.exports = {
  mode: 'development',
  //devtool: "source-map",
  entry: path.join(__dirname, 'app.js'),
  output: {
    path: __dirname + '/dist',
    filename: 'index.js'
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: ['style-loader', {
        loader: 'css-loader',
        options: {
          url: true
        }
      }]
    },
    {
      test: /\.(jpe?g|png|ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
      use: 'base64-inline-loader'
    }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      inject: 'body'
    })
  ]
};
