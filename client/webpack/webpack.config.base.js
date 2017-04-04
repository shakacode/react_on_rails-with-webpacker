/* eslint global-require: 0 */
/* eslint import/no-dynamic-require: 0 */

const webpack = require('webpack');
const { join, resolve } = require('path');
const { readdirSync } = require('fs');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const { env, paths, publicPath, loadersDir } = require('./webpackConfigLoader.js');


module.exports = {

  entry: paths.entry,

  output: { filename: '[name].js', path: resolve('..', paths.output) },

  module: {
    rules: readdirSync(loadersDir).map(file => (
      require(join(loadersDir, file))
    )),
  },

  plugins: [
    new webpack.EnvironmentPlugin(JSON.parse(JSON.stringify(env))),
    new ExtractTextPlugin('[name]-[hash].css'),
    new ManifestPlugin({ fileName: paths.manifest, publicPath, writeToFileEmit: true }),
  ],

  resolve: {
    extensions: paths.extensions,
    modules: [
      resolve('..', paths.source),
      resolve('..', paths.node_modules),
    ],
  },

  resolveLoader: {
    modules: ['..', paths.node_modules],
  },
};
