const path = require('path');
const appDirectory = path.resolve(__dirname, '../');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const tsLoaderConfiguration = {
  test: /\.tsx?$/,
  use: {
    loader: 'ts-loader',
    options: {
      compilerOptions: {
        noEmit: false,
      },
      transpileOnly: true,
    },
  },
};

const babelLoaderConfiguration = {
  test: /\.(js)x?$/,
  // Add every directory that needs to be compiled by Babel during the build.
  include: [
    path.resolve(appDirectory, 'index.web.js'),
    path.resolve(appDirectory, 'src'),
    path.resolve(appDirectory, 'node_modules/react-native'),
  ],
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      // The 'metro-react-native-babel-preset' preset is recommended to match React Native's packager
      presets: [
        'module:metro-react-native-babel-preset',
        '@babel/preset-env',
        '@babel/preset-react',
        '@babel/preset-typescript',
        '@babel/preset-flow',
      ],
      // Re-write paths to import only the modules needed by the app
      plugins: ['react-native-web'],
    },
  },
};

const imageLoaderConfiguration = {
  test: /\.(gif|jpe?g|png|svg)$/,
  use: {
    loader: 'url-loader',
    options: {
      name: '[name].[ext]',
      esModule: false,
    },
  },
};

const cssLoader = {
  test: /\.css$/i,
  loader: 'css-loader',
  options: {
    url: true,
  },
};

module.exports = {
  mode: 'development',
  entry: [
    // load any web API polyfills
    // path.resolve(appDirectory, 'polyfills-web.js'),
    // your web-specific entry file
    path.resolve(appDirectory, 'index.web.js'),
  ],
  plugins: [
    new HtmlWebpackPlugin({
      template: './web/index.html',
      publicPath: '/',
    }),
  ],
  // configures where the build ends up
  output: {
    filename: 'bundle.[chunkhash].js',
    // chunkfileName: '[name].[chunkhash].js',
    path: path.resolve(appDirectory, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      babelLoaderConfiguration,
      imageLoaderConfiguration,
      tsLoaderConfiguration,
      cssLoader,
    ],
  },
  resolve: {
    alias: {
      'react-native$': 'react-native-web',
    },
    extensions: ['.tsx', '.ts', '.web.js', '.js'],
  },
};
