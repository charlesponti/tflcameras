module.exports = function (config) {
  config.set({

    basePath: '../',

    proxies: {
      '/': 'http://localhost:9876/'
    },

    urlRoot: '/__karma__/',

    browsers: [
      'Chrome'
    ],

    frameworks: [
      'jasmine'
    ],

    files: [
      'test/googlemapsmock.js',
      'src/scripts/main.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'test/unit/**/*.js'
    ],

    preprocessors: {
      'test/unit/**/*.js': ['webpack', 'sourcemap'],
      'src/scripts/**/*.js': ['webpack', 'sourcemap']
    },

    webpack: require('../webpack.config'),

    plugins: [
      'karma-webpack',
      'karma-sourcemap-loader',
      'karma-jasmine',
      'karma-chrome-launcher'
    ]
  })
}
