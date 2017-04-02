// Note: You must restart bin/webpack-watcher for changes to take effect
/* eslint global-require: 0 */
/* eslint import/no-dynamic-require: 0 */

const webpack = require('webpack')
const { basename, join, resolve } = require('path')
const { sync } = require('glob')
const { readdirSync } = require('fs')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const extname = require('path-complete-extname')
const { env, paths, publicPath, loadersDir } = require('./configuration.js')

const extensionGlob = `*{${paths.extensions.join(',')}}*`
const packPaths = sync(join(paths.source, paths.entry, extensionGlob))

module.exports = {

  entry: [
    'es5-shim/es5-shim',
    'es5-shim/es5-sham',
    'babel-polyfill',
    'HelloWorld/startup/registration',
  ],

  output: { filename: '[name].js', path: resolve(paths.output, paths.entry) },

  module: {
    rules: readdirSync(loadersDir).map(file => (
      require(join(loadersDir, file))
    ))
  },

  plugins: [
    new webpack.EnvironmentPlugin(JSON.parse(JSON.stringify(env))),
    new ExtractTextPlugin('[name]-[hash].css'),
    new ManifestPlugin({ fileName: paths.manifest, publicPath, writeToFileEmit: true })
  ],

  resolve: {
    extensions: paths.extensions,
    modules: [
      resolve(paths.source),
      resolve(paths.node_modules)
    ],
  },
}
