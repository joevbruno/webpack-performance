import express from 'express';
import path from 'path';
import webpack from 'webpack';
import compression from 'compression';
// import favicon from 'serve-favicon';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import config from '../../webpack.config.babel';
import util from 'util';
import { debug as DEBUG, publicPath } from '../../config';

const server = express();

server.set('env', DEBUG ? 'development' : 'production');
server.set('port', process.env.PORT || 3000);
server.set('view engine', 'jade');
server.disable('x-powered-by');
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(cookieParser());
server.use(compression());

const compiler = webpack(config);
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackMiddleware = require('webpack-dev-middleware');
server.use(morgan('dev'));
server.use(webpackMiddleware(compiler, {
  historyApiFallback: true,
  publicPath,
  noInfo: true,
  stats: { colors: true }
}));
server.use(webpackHotMiddleware(compiler));
server.use(express.static(path.resolve(__dirname, '../../../Dist')));

server.get('*', (request, response) => {
  util.log('Making request...');
  response.sendFile(path.resolve(__dirname, '../Public', 'index.html'));
});

server.listen(server.get('port'), () => {
  util.log(`Offline server running in ${server.get('env')} on port ${server.get('port')}`);
});
