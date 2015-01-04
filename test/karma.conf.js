'use strict';

module.exports = function(config) {
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
      'browserify',
      'jasmine'
    ],

    files: [
      'test/googlemapsmock.js',
      'src/scripts/main.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'test/unit/**/*.js'
    ],

    preprocessors: {
      'test/unit/**/*.js': ['browserify'],
      'src/scripts/**/*.js': ['browserify']
    },

    browserify: {
      debug: true
    },

    plugins: [
      'karma-jasmine',
      'karma-bro',
      'karma-chrome-launcher'
    ]

  });
};
