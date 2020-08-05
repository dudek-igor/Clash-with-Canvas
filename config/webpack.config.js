// Import path from path
const path = require('path');

// Plugins
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Settings
const settings = {
  mode: 'development',
  entry: {
    index: './source/index.js',
  },
  output: {
    filename: 'js/[hash].[name]-bundle.js',
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
        use: ['style-loader','css-loader'],
      },
      {
        test: /\.(sass|scss)$/,
        use: [ 'style-loader','css-loader','sass-loader']
      },
      {
        test: /\.(jpg|png|svg|gif|jpeg)$/,
        use: ['file-loader',],
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
      template: 'source/templates/template.html'
    }),
    // new HtmlWebpackPlugin({
    //   title: "Nowa Podstrona",
    //   filename: "podstrona.html"
    // }),
  ],
  devServer: {
    open: true,
    port: 5001,
    host: 'localhost',
    hot: true,
    contentBase: path.resolve(__dirname,'../','public'),
  }
}

//Export
module.exports = settings;