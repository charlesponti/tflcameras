const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const env = process.env.NODE_ENV
const HTMLWebpackPlugin = require('html-webpack-plugin')

const config = {
  mode: env === 'production' ? 'production' : 'development',
  entry: path.resolve(__dirname, './src/scripts/main.js'),
  output: {
    filename: '[name].js',
    path: path.join(__dirname, './public/assets')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        use: [
          {
            loader: 'eslint-loader'
          }
        ]
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: 'ng-annotate-loader'
          },
          {
            loader: 'babel-loader'
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
          'postcss-loader'
        ]
      }
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './src/index.html',
      filename: '../index.html'
    })
  ]
}

if (process.env.STATS) {
  config.plugins.push(
    new BundleAnalyzerPlugin({ analyzerMode: 'static' })
  )
}

module.exports = config
