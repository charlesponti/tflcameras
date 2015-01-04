'use strict';

window.$ =
window.jQuery = require('jquery');

// Require Angular dependencies
// This will add these dependencies to the global scope
require('angular');
require('angular-route');
require('angular-resource');

// Application dependencies
require('./templates');
require('./controllers');
require('./directives');
require('./services');

// Declare main application
angular.module('app', [
  'ngRoute',
  'ngResource',
  'templates',
  'app.directives',
  'app.controllers',
  'app.services'
]);

// Add constants
angular.module('app').constant('Constants', require('./constants'));

// Add configuration
angular.module('app').config(require('./config'));

// Bootstrap application
angular.bootstrap(document, ['app']);
