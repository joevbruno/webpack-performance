import webpack from 'webpack'; // eslint-disable-line no-unused-vars
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import autoprefixer from 'autoprefixer';

export default {
  debug: true,
  devtool: 'source-map',
  entry: {
    vendors: [
      'mixin-decorator',
      'classnames',
      'history',
      'core-js',
      'react-proxy',
      'react-dock',
      'redbox-react',
      'redux-devtools-dispatch',
      'redux-devtools-dock-monitor',
      'react-transform-hmr',
      'react-transform-catch-errors',
      'react-deep-force-update',
      'webpack-hot-middleware',
      'react',
      'react-dom',
      'react-router',
      'react-addons-pure-render-mixin',
      'react-addons-css-transition-group',
      'react-toolbox',
      'redux',
      'react-redux',
      'redux-promise',
      'redux-thunk',
      'redux-devtools',
      'redux-logger',
      'redux-devtools-log-monitor',
      'redux-unhandled-action',
      'lodash',
      'babel-polyfill',
      'postal',
      'postal.diagnostics',
      'postal.federation',
      'postal.xframe'
    ],
    global: ['./App/Styles/Global.js']
  },
  resolve: {
    extensions: ['', '.jsx', '.scss', '.js', '.json']
  },
  output: {
    filename: '[name].bundle.js',
    path: 'Dist/',
    library: '[name]_lib',
  },
  module: {
    loaders: [
      {
        test: /(\.scss|\.css)$/,
        loader: ExtractTextPlugin.extract('style-loader',
        'css?modules&sourceMap&importLoaders=1&localIdentName=[local]___[hash:base64:5]!'
        + 'postcss!' + 'sass?outputStyle=expanded&sourceMap!' + 'toolbox'),
      },
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file-loader?name=[name].[ext]'
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: [/node_modules/]
      },
      {
        test: /\.json$/, loaders: ['json']
      },
    ]
  },
  sassLoader: {
    includePaths: [
      // path.resolve(__dirname, './App/Styles/Tools'),
      require('bourbon').includePaths
    ]
  },
  toolbox: {
    theme: 'App/Styles/04-Themes/theme.scss'
  },
  postcss: [autoprefixer],
  plugins: [
    new ExtractTextPlugin('[name].css', { allChunks: true }),
    new webpack.DllPlugin({
      path: 'Dist/[name]-manifest.json',
      name: '[name]_lib'
    })
  ],
};
