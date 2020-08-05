// Import path from path
const path = require('path');

// Plugins
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

// Settings
const settings = {
  mode: 'production',
  entry: {
    index: './source/index.js',
  },
  output: {
    filename: 'js/[contenthash:4].[name]-bundle.js',
    path: path.resolve(__dirname, '../','build')
  },
  module: {
    rules: [
      {
        test: /\.txt$/,
        use: 'raw-loader',
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [require('autoprefixer')]
            }
          }
        ]
      },
      {
        test: /\.(sass|scss)$/,
        use: [MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [require('autoprefixer')]
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.(jpg|png|svg|gif|jpeg)$/,
        use: 
        [
          {
            loader: 'file-loader',
            options: {
              name: '[name]-[contenthash:6].[ext]',
              outputPath: 'images',
              // publicPath: '../images'
            }
          }, 
          {
            loader: 'image-webpack-loader',
              options: {
                mozjpeg: {
                quality: 70,
                progressive: true //false
              }
            }
          }
        ]
      },
      {
        test: /\.(js|ts)$/,
        //wyłączamy node_modules
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', 
                {
                  useBuiltIns: 'usage', 
                  corejs: '2.0.0'
                }
              ],
              "@babel/preset-typescript"
            ],
            plugins: [
              "@babel/plugin-proposal-class-properties",
            ]
          }
        }
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "Nowa Aplikacja",
      template: 'source/templates/template.html',
      minify:{
        collapseWhitespace: true,
      }
    }),
    // new HtmlWebpackPlugin({
    //   title: "Nowa Podstrona",
    //   filename: "podstrona.html",
    // minify:{
    //   collapseWhitespace: true,
    // }
    // }),
    new MiniCssExtractPlugin({
      filename: '[contenthash:4].[name]-style.css',
    })
    // new CopyPlugin({
    //   patterns: [
    //     {
    //     from: "public/images",
    //     to: 'images'
    //     },
        // {
        // from: "public/videos",
        // to: 'videos'
        // }
      // ]
    // })
  ],
}

//Export
module.exports = settings;