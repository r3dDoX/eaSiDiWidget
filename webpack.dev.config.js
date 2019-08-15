const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const path = require('path');

module.exports = merge(baseConfig, {
  entry: {
    app: path.join(__dirname, 'src/dev.js'),
  },

  plugins: [
    new HtmlWebpackPlugin(),
  ],
});
