'use strict';

module.exports = angular.module('app.controllers', [])
  .controller('HomeCtrl', require('./home'))
  .controller('AboutCtrl', require('./about'));
