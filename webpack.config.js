'use strict';

const webpack = require('webpack');
const path = require('path');
const widget = require('./package.json').name;
const jsPath = 'src/widget';
const jsEntry = require('./package.json').entrypoint + '.js';
const buildPath = 'build/' + widget + '/widget';
const buildFile = widget + '.js';
const ArcGISPlugin = require('@arcgis/webpack-plugin');

var config = {
  entry: {
    app: path.join(__dirname, jsPath, jsEntry),
  },

  output: {
    libraryTarget: 'amd',
    path: path.resolve(__dirname, buildPath),
    publicPath: '',
    filename: buildFile,
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: [
          'cache-loader',
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
        ],
      },
    ],
  },

  externals: [
    {
      dojoBaseDeclare: 'dojo/_base/declare',
      widgetBase: 'mxui/widget/_WidgetBase',
    },
    function (context, request, callback) {
      if (/pe-wasm$/.test(request)) {
        return callback(null, 'amd ' + request);
      }
      callback();
    },
  ],

  plugins: [
    new ArcGISPlugin({
      useDefaultAssetLoaders: false,
      features: {
        '3d': false,
      },
      locales: ['de'],
    }),
  ],

  node: {
    process: false,
    global: false,
    fs: 'empty',
  },
};

module.exports = config;
