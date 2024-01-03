'use strict'

const path = require('path');
const autoprefixer = require('autoprefixer')
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //extrae css
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin"); //minify css
const TerserPlugin = require("terser-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const webpack = require('webpack')
const dotenv = require('dotenv')

const env = dotenv.config().parsed
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next])
  return prev
}, {})

module.exports = {
  mode: "production",
  entry: {
    app: './src/index.js',
    '../../service-worker': './src/vendor/sw2.js',
    dashboard: './src/dashboard.js',
  },
  output: {
    path: path.resolve(__dirname, 'docs'),
    filename: 'assets/js/[name].js',
  },
  performance: {
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  module: {
    rules: [
      { //css para extraer
      test: /\.(svg)$/i,
      type: 'asset/resource',
     
      generator: {
        filename: 'asset/svg/[hash][ext]'

      }
    },
      
      { //css para extraer
        test: /\.(png|jpg|jpeg|svg|gif)$/i,
        type: 'asset/resource',

        generator: {
          filename: 'assets/img/[hash][ext]'

        }
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[hash][ext]'

        }
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(scss)$/,
        use: [{
            // Adds CSS to the DOM by injecting a `<style>` tag
            loader: 'style-loader'
          },
          {
            // Interprets `@import` and `url()` like `import/require()` and will resolve them
            loader: 'css-loader'
          },
          {
            // Loader for webpack to process CSS with PostCSS
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: () => [
                  autoprefixer
                ]
              }
            }
          },
          {
            // Loads a SASS/SCSS file and compiles it to CSS
            loader: 'sass-loader'
          }
        ]
      }
   ],
  },
  optimization: {
    minimize: true,
    minimizer: [
     new CssMinimizerPlugin(),
      new TerserPlugin({
        test: /\.js(\?.*)?$/i,
      }),
    ],
  },
  plugins: [
    new webpack.DefinePlugin(envKeys),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'assets/css/[name].min.css'
    }),
    new HtmlWebpackPlugin({
      title: 'Hecho a Mano',
      hash: true,
      filename: 'index.html',
      template: './src/index.html',
      chunks: ['app', 'service-worker'],
      favicon: "./src/favicon.ico",
      manifest: "./src/manifest.json"
    }),
    new HtmlWebpackPlugin({
      title: 'Dashboard',
      hash: true,
      filename: 'crud.html',
      template: './src/crud.html',
      chunks: ['dashboard']
    }),
    new HtmlWebpackPlugin({
      title: 'Registrar',
      filename: 'registrar.html',
      template: './src/registro.html'
    }),
    new HtmlWebpackPlugin({
      title: 'Fuera de Servicio',
      filename: 'offline.html',
      template: './src/offline.html'
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "./src/manifest.webmanifest",
          to: "manifest.json",
         
        },
        {
          from: "./src/assets/icon",
          to: "assets/icon",
         
        }
      ],
    })
  ],
  resolve: {
    extensions: ['.js']
  },
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    compress: true,
    port: 9000,
    hot: true
  },
}