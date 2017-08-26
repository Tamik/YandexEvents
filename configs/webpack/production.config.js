'use strict'

const path = require('path')
const DotEnvPlugin = require('webpack-dotenv-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {
  NoEmitOnErrorsPlugin,
  DefinePlugin,
  LoaderOptionsPlugin,
  optimize: {
    UglifyJsPlugin,
  },
} = require('webpack')

module.exports = {
  entry: [
    path.join(__dirname, '../../src/js/index.js'),
  ],
  output: {
    path: path.resolve(__dirname, '../../www'),
    filename: 'assets/js/index.js',
    publicPath: './',
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
            loader: 'css-loader',
            query: {
              modules: true,
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.(png|jpe?g|svg)$/,
        loader: 'file-loader?name=./assets/[name].[ext]',
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
    new DotEnvPlugin({
      sample: path.join(__dirname, '../../.env'),
      path: path.join(__dirname, '../../.env'),
    }),
    new UglifyJsPlugin({
      beautify: false,
      comments: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true,
      },
      compress: {
        screw_ie8: true,
        sequences: true,
        booleans: true,
        loops: true,
        unused: true,
        warnings: false,
        drop_console: true,
        unsafe: true,
      },
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, '../../src/index.prod.html'),
      minify: {
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        minifyJS: true,
        removeComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        sortAttributes: true,
        useShortDoctype: true,
      },
    }),
  ],
}
