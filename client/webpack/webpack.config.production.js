/* eslint global-require: 0 */

const webpack = require('webpack');
const merge = require('webpack-merge');
const CompressionPlugin = require('compression-webpack-plugin');
const sharedConfig = require('./webpack.config.base.js');

module.exports = merge(sharedConfig, {
  output: { filename: '[name]-[chunkhash].js' },

  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.(js|css|svg|eot|ttf|woff|woff2)$/,
    }),
  ],
});
