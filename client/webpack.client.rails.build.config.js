const webpack = require('webpack');

const merge = require('webpack-merge');
const config = require('./webpack.client.base.config');
const { env } = require('./webpackConfigLoader.js');
const CompressionPlugin = require('compression-webpack-plugin');

const productionBuild = env.NODE_ENV === 'production';

if (productionBuild) {
  module.exports = merge(config, {
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
} else {
  module.exports = merge(config, {
    devtool: 'sourcemap',

    stats: {
      errorDetails: true,
    },

    output: {
      pathinfo: true,
    },
  });
}
