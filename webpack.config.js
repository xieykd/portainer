const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');

module.exports = {
  entry: './app/__module.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist/public')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          'auto-ngtemplate-loader',
          {
            // enforce: 'pre',
            loader: 'eslint-loader'
          }
        ]
      },
      {
        test: /\.html$/,
        exclude: path.resolve(__dirname, './app/index.html'),
        use: [
          { loader: 'ngtemplate-loader', options: { relativeTo: __dirname } },
          { loader: 'html-loader' }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader?sourceMap']
      }
    ]
  },
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin({
      template: './app/index.html'
    }),
      new WebpackBuildNotifierPlugin({
        title: "My Project Webpack Build",
        logo: path.resolve("./assets/favicon-32x32.png"),
        suppressSuccess: true
      })
  ]
};