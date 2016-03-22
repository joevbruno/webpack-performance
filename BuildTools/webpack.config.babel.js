import webpack from 'webpack'; // eslint-disable-line no-unused-vars
import path from 'path';
import friendlyFormatter from 'eslint-friendly-formatter';
import autoprefixer from 'autoprefixer';
import settings from './config';
const {
  contentBase,
  publicPath,
  devServer,
  sourceMaps,
  entries,
  includes,
  outputDir,
  outputFileName,
  nodeModules,
  cssLoaderConfig,
  eslint,
  webpackPlugins,
  autoprefixerBrowsers,
  externals
} = settings;

const config = {
  devtool: sourceMaps,
  devServer,
  externals,
  cache: true,
  contentBase,
  entry: entries,
  output: {
    path: outputDir,
    filename: `[name].${outputFileName}`,
    publicPath,
    pathinfo: true,
    hotUpdateMainFilename: 'hot/[hash].hot-update.json',
    hotUpdateChunkFilename: 'hot/[id].[hash].hot-update.js'
  },
  resolve: {
    unsafeCache: true,
    extensions: ['', '.jsx', '.scss', '.js', '.json'],
    alias: { // TODO: Should we be using resolve.root instead?  See janpaul123's comment: https://github.com/webpack/webpack/issues/1574#issuecomment-157520561
      Controls: path.resolve(__dirname, '../SharedComponents/Controls/Index.js'),
      Utils: path.resolve(__dirname, '../App/Utils/Index.js'),
      MockedData: path.resolve(__dirname, '../MockedData/Index.js')
    }
  },
  module: {
    noParse: [],
    loaders: [
      {
        test: /\.jsx?$/, // A regexp to test the require path. accepts either js or jsx
        loader: 'babel-loader?cacheDirectory',
        exclude: [nodeModules],
        include: includes
      },
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file-loader?name=[name].[ext]'
      },
      {
        test: /\.json$/, loaders: ['json']
      },
    ].concat(cssLoaderConfig)
  },
  sassLoader: {
    includePaths: [
      path.resolve(__dirname, '../App/Styles/Tools'),
      require('bourbon').includePaths
    ]
  },
  toolbox: {
    theme: 'App/Styles/04-Themes/theme.scss'
  },
  postcss: [
    autoprefixer({ browsers: autoprefixerBrowsers })
  ],
  plugins: webpackPlugins
};

export default config;

if (eslint) {
  config.module.preLoaders = [eslint];
  config.eslint = {
    configFile: path.resolve(process.cwd(), '.eslintrc.json'),
    formatter: friendlyFormatter
  };
}
