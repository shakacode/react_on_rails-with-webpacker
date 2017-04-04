const { resolve } = require('path');
const merge = require('webpack-merge');
const devConfig = require('./webpack.config.development.js');
const { devServer, publicPath, paths } = require('./webpackConfigLoader.js');

module.exports = merge(devConfig, {
  devServer: {
    host: devServer.host,
    port: devServer.port,
    compress: true,
    historyApiFallback: true,
    contentBase: resolve(paths.output, paths.entry),
    publicPath,
  },
});
