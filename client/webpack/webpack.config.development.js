const merge = require('webpack-merge');
const sharedConfig = require('./webpack.config.base.js');

module.exports = merge(sharedConfig, {
  devtool: 'sourcemap',

  stats: {
    errorDetails: true,
  },

  output: {
    pathinfo: true,
  },
});
