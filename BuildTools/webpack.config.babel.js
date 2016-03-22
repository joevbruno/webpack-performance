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
  contentBase,
  entry: entries,
  output: {
    path: outputDir,
    filename: `[name].${outputFileName}`,
    publicPath, 
    pathinfo: true, 
    hotUpdateMainFilename: 'hot/[hash].hot-update.json'
  },
  resolve: {
    extensions: ['', '.jsx', '.scss', '.js', '.json'],
    alias: {
      Controls: path.resolve('SharedComponents/Controls/Index.js'),
      Utils: path.resolve('App/Utils/Index.js'),
      MockedData: path.resolve('MockedData/Index.js')
    }
  },
  module: {
    noParse: [],
    loaders: [
      {
        test: /\.jsx?$/, 
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
