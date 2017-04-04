const { env, publicPath } = require('../configuration.js');

module.exports = {
  test: /\.(jpeg|png|gif|svg|eot|ttf|woff|woff2)$/i,
  use: [{
    loader: 'file-loader',
    options: {
      publicPath,
      name: '[name]-[hash].[ext]',
    },
  }],
};
