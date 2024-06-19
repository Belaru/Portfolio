const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    liveReload: true,
    hot: true,
    open: true,
    static: ['./'],
  },
});
