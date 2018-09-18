const DIR = require('./webpack.config.routes');

const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';

module.exports = ({ host, port } = {}) => ({
  devServer: {
    compress: true,
    clientLogLevel: 'none',
    contentBase: DIR.APP.PUBLIC,
    watchContentBase: true,
    stats: 'errors-only',
    publicPath: DIR.PUBLIC_URL,
    noInfo: true,
    quiet: true,
    watchOptions: {
      ignored: /node_modules/,
      // Polling in case it's run on vm
      aggregateTimeout: 300,
      poll: 1000,
    },
    https: protocol === 'https',
    host,
    port,
    historyApiFallback: {
      disableDotRule: true,
    },
    open: true,
    overlay: true,
  },
});