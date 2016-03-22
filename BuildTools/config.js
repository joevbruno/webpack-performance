import path from 'path';
import webpack from 'webpack';
import VSFixSourceMapsPlugin from 'vs-fix-sourcemaps';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import WebpackNotifierPlugin from 'webpack-notifier';

const DEBUG = process.env.NODE_ENV !== 'production';
const LINT = process.env.LINT_CODE || false;
const OFFLINE = process.env.OFFLINE || false;
const PLATFORM = process.env.PLATFORM || 'web';
const BUILDLIKEPROD = process.env.BUILDLIKEPROD || false;
const TURBO = process.env.TURBO || false;
const sourceMaps = 'cheap-module-eval-source-map';
const nodeModules = path.resolve(__dirname, '../node_modules');
const contentBase = path.resolve(__dirname, '../');
const publicPath = BUILDLIKEPROD ? '/UI/Dist/' : 'http://localhost:3000/UI/Dist/';

const includes = [
  path.resolve(__dirname, '../App'),
  path.resolve(__dirname, '../Modules'),
  path.resolve(__dirname, '../SharedComponents'),
  path.resolve(__dirname, '../MockedData')
];

const externals = {
  $: '$'
};

const cssFileName = 'styles.css';
const cssConfig = TURBO ? 'css?modules&importLoaders=1&localIdentName=[local]___[hash:base64:4]!' :
'css?modules&sourceMap&importLoaders=2&localIdentName=[local]___[hash:base64:4]!';
const scssConfig = 'sass?sourceMap&outputStyle=expanded!';
const toolboxConfig = 'toolbox';
const stylesConfig = cssConfig + scssConfig + toolboxConfig;
const cssLoader = 'style!' + stylesConfig;

const cssLoaderConfig = DEBUG && !BUILDLIKEPROD ? {
  test: /\.(scss|css)$/,
  loader: cssLoader,
} : {
  test: /\.(scss|css)$/,
  loader: ExtractTextPlugin.extract('style-loader', stylesConfig),
};

const toolboxThemeFile = path.resolve(__dirname, '../Themes/theme.scss');

const eslint = LINT ? {
  test: /\.jsx$/,
  loader: 'eslint-loader',
  exclude: [nodeModules],
} : null;

const hotMiddleware = [
  'eventsource-polyfill',
  'webpack-hot-middleware/client?reload=true', // reload if cannot hot reload
  // 'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
];
const entries = [
    path.resolve(__dirname, '../App/Components/Index.jsx')
  ].concat(hotMiddleware);

const resolveExt = ['', '.jsx', '.scss', '.js', '.json'];

const dlls = [
  new webpack.DllReferencePlugin({
    context: '.',
    manifest: require(path.resolve(__dirname, '../Dist/vendors-manifest.json'))
  })
];

const env = [
  DEBUG ? new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('development'),
      BABEL_ENV: JSON.stringify('development'),
    }
  }) :
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production'),
      BABEL_ENV: JSON.stringify('production'),
    }
  }),
  new webpack.DefinePlugin({
    'process.env': {
      OFFLINE,
      PLATFORM
    }
  })
];

const plugins = [
  // new webpack.optimize.CommonsChunkPlugin({
  //   name: 'common',
  //   minChunks: 2,
  //   chunks: ['main.webpackBundle', 'inbox']
  // }),
  new webpack.NoErrorsPlugin(),
  new VSFixSourceMapsPlugin(),
];


const commonPlugins = BUILDLIKEPROD ? plugins.concat([
  new ExtractTextPlugin(cssFileName, { allChunks: true })
]) : plugins;


const webpackPlugins = DEBUG ? [
  new webpack.HotModuleReplacementPlugin(),
  new WebpackNotifierPlugin(),
  // new VSFixSourceMapsPlugin()
] : [
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.OccurenceOrderPlugin(),
  new ExtractTextPlugin(cssFileName, { allChunks: true })
];

export default {
  debug: DEBUG,
  platform: PLATFORM,
  offline: OFFLINE,
  publicPath,
  resolveExt,
  toolboxThemeFile,
  cssLoaderConfig,
  stylesConfig,
  includes,
  externals,
  entries,
  webpackPlugins: webpackPlugins.concat(env).concat(dlls).concat(commonPlugins),
  contentBase,
  cssLoader,
  outputDir: path.resolve(__dirname, '../Dist'),
  outputFileName: 'webpackBundle.js',
  cssFileName,
  nodeModules,
  sourceMaps,
  eslint,
  devServer: {
    contentBase,
    colors: true,
    quiet: true,
    noInfo: true,
    publicPath,
    historyApiFallback: true,
    host: '127.0.0.1', // localhost
    port: 3000,
    hot: true
  }
};
