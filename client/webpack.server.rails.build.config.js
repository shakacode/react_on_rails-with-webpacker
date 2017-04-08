const { resolve } = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.client.base.config.js');
const { devServer, publicPath, paths } = require('./webpackConfigLoader.js');

module.exports = merge(baseConfig, {
  devServer: {
    host: devServer.host,
    port: devServer.port,
    compress: true,
    historyApiFallback: true,
    contentBase: resolve(paths.output),
    publicPath,
  },
});
