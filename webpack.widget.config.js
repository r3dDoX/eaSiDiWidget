const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config');

const jsPath = 'src/widget';
const jsEntry = require('./package.json').entrypoint + '.js';
const path = require('path');
const widget = require('./package.json').name;
const buildPath = 'build/' + widget + '/widget';
const buildFile = widget + '.js';

module.exports = merge(baseConfig, {
  entry: {
    app: path.join(__dirname, jsPath, jsEntry),
  },

  output: {
    libraryTarget: 'amd',
    path: path.resolve(__dirname, buildPath),
    publicPath: '',
    filename: buildFile,
  },

  externals: {
    dojoBaseDeclare: 'dojo/_base/declare',
    widgetBase: 'mxui/widget/_WidgetBase',
  },
});
