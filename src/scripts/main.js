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

// mount on window for testing
angular.module('app', [
  'ngRoute',
  'ngResource',
  'templates',
  'app.directives',
  'app.controllers'
]);

angular.module('app').constant('Constants', require('./constants'));

angular.module('app').config(require('./config'));

angular.bootstrap(document, ['app']);
