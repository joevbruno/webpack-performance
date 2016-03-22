import browserSync from 'browser-sync';
import webpack from 'webpack';
import webpackConfig from '../../webpack.config.babel.js';
import { publicPath } from '../../config';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
// const apicache = require('apicache').options({ debug: true }).middleware;
const compiler = webpack(webpackConfig);
const browserSyncOptions = {
  proxy: {
    target: 'http://localhost:1452',
    middleware: [
      webpackDevMiddleware(compiler, {
        publicPath,
        historyApiFallback: true,
        hot: true,
        noInfo: true, // only warning & errors
        quiet: false,
        stats: { colors: true }
      }),
      webpackHotMiddleware(compiler),
      // apicache('1 hour')
    ]
  },
  port: 3000,
  logLevel: 'info',
  logConnections: false,
  open: true,
};

browserSync.init(browserSyncOptions);
