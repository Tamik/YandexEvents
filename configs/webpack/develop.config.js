'use strict'

const path = require('path')
const DotEnvPlugin = require('webpack-dotenv-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {
  NoEmitOnErrorsPlugin,
  DefinePlugin,
  LoaderOptionsPlugin,
  HotModuleReplacementPlugin,
  NamedModulesPlugin,
} = require('webpack')

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://127.0.0.1:8080',
    'webpack/hot/only-dev-server',
    path.join(__dirname, '../../src/js/index.js'),
  ],
  output: {
    path: path.resolve(__dirname, '../../www'),
    filename: 'index.js',
    publicPath: 'http://127.0.0.1:8080/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            query: {
              modules: true,
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|svg)$/,
        loader: 'file-loader?name=[name].[ext]',
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
    modules: [
      path.join(__dirname, '../../src/js'),
      path.join(__dirname, '../../node_modules'),
    ],
  },
  devServer: {
    host: '127.0.0.1',
    port: 8080,
    contentBase: path.join(__dirname, '../../www'),
    hot: true,
    stats: {
      colors: true,
      assets: false,
      timing: false,
      chunks: false,
      version: false,
    },
  },
  plugins: [
    new NoEmitOnErrorsPlugin(),
    new LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new HotModuleReplacementPlugin(),
    new NamedModulesPlugin(),
    new DotEnvPlugin({
      sample: path.join(__dirname, '../../.env'),
      path: path.join(__dirname, '../../.env'),
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, '../../src/index.dev.html'),
    }),
  ],
}
