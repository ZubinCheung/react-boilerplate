const { resolve } = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (options = {}) => {
  return {
    entry: {
      vendor: ['react', 'react-dom', 'react-router'],
      index: './src/index.js',
    },

    output: {
      path: resolve(__dirname, 'dist'),
      chunkFilename: '[id].js?[chunkhash]',
      filename: options.dev ? '[name].js' : '[name]-[chunkhash:6].js?',
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ['babel-loader', 'eslint-loader'],
        }, {
          test: /\.html$/,
          loader: 'html-loader',
          options: {
            attrs: ['img:src', 'link:href'],
          },
        }, {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader', 'postcss-loader'],
          }),

        }, {
          test: /favicon\.png$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]?[hash:6]',
              },
            },
          ],
        }, {
          test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
          exclude: /favicon\.png$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 10000,
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
      }),
      new webpack.optimize.CommonsChunkPlugin({
        names: ['vendor', 'manifest'],
      }),
      new ExtractTextPlugin('[name]-[chunkhash:6].css'),

    ],

    devServer: options.dev ? {
      port: 8100,
      host: '0.0.0.0',
      contentBase: resolve(__dirname, 'dist'),
      historyApiFallback: {
        index: '/assets/',
      },

    } : undefined,
    performance: {
      hints: options.dev ? false : 'warning',
    },
  };
};
