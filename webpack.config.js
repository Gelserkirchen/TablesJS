const path = require('path');
const webpack = require('webpack')
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HTMLWebPackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;

const filename = ext => isDev ? `bundle.${ext}` : `bundle.[hash]${ext}`

const jsLoaders = () => {
  const loaders = ['babel-loader']

  if (isDev) {
    loaders.push('eslint-loader')
  }

  return loaders
}

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: ['@babel/polyfill', './index.js'],
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    port: 3000,
    hot: isDev,
    inline: false,
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@core': path.resolve(__dirname, 'src/core'),
    },
  },
  devtool: isDev ? 'source-map' : false,
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebPackPlugin({
      template: 'index.html',
      minify: {
        removeComments: isProd,
        collapseWhitespace: isProd,
      },
    }),
    new CopyPlugin({
      patterns: [
        {from: path.resolve(__dirname, 'src/favicon.ico'),
          to: path.resolve(__dirname, 'dist')},
      ],
    }),
    new MiniCssExtractPlugin({
      filename: filename('css'),
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev,
              reloadAll: true,
            },
          },
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: jsLoaders(),
      },
    ],
  },

}
