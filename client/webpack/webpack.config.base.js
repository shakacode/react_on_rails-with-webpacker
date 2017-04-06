/* eslint global-require: 0 */
/* eslint import/no-dynamic-require: 0 */

const webpack = require('webpack');
const { join, resolve } = require('path');
const { readdirSync } = require('fs');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const { env, paths, publicPath, loadersDir } = require('./webpackConfigLoader.js');


module.exports = {

  entry: {
    vendor: [
      'es5-shim/es5-shim',
      'es5-shim/es5-sham',
      'babel-polyfill',
    ],

    main: [
      'bundles/HelloWorld/startup/registration',
    ],
  },

  output: { filename: '[name]-bundle.js', path: resolve('..', paths.output) },

  module: {
    rules: readdirSync(loadersDir).map(file => (
      require(join(loadersDir, file))
    )),
  },

  plugins: [
    new webpack.EnvironmentPlugin(JSON.parse(JSON.stringify(env))),
    new ExtractTextPlugin('[name]-[hash].css'),
    new ManifestPlugin({ fileName: paths.manifest, publicPath, writeToFileEmit: true }),
    new webpack.optimize.CommonsChunkPlugin({

      // This name 'vendor' ties into the entry definition
      name: 'vendor',

      // We don't want the default vendor.js name
      filename: 'vendor-bundle.js',

      // Passing Infinity just creates the commons chunk, but moves no modules into it.
      // In other words, we only put what's in the vendor entry definition in vendor-bundle.js
      minChunks: Infinity,

    }),
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
