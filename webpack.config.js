const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const env = process.env.NODE_ENV
const devMode = env === 'development'
const prodMode = env === 'production'
const testMode = env === 'test'

const config = {
  mode: prodMode ? 'production' : 'development',
  devtool: prodMode ? 'sourcemap' : 'inline-source-map',
  entry: path.resolve(__dirname, './src/scripts/main.js'),
  output: {
    filename: '[name].js',
    path: path.join(__dirname, './public/assets')
  },
  module: {
    rules: [
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
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
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
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css'
    })
  ]
}

config.module.rules.unshift(
  testMode
    ? {
      test: /\.js$/,
      enforce: 'pre',
      use: [{ loader: 'eslint-loader', options: { envs: ['jasmine'] } }]
    }
    : { test: /\.js$/, enforce: 'pre', use: [{ loader: 'eslint-loader' }] }
)

if (prodMode) {
  config.optimization = {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  }
}

if (process.env.STATS) {
  config.plugins.push(
    new BundleAnalyzerPlugin({ analyzerMode: 'static' })
  )
}

module.exports = config
