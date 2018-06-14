require('../styles/main.scss')

// Require Angular dependencies
// This will add these dependencies to the global scope
require('angular')
require('angular-route')

// Application dependencies
require('./controllers')
// require('./directives')
require('./services')

// Declare main application
angular.module('app', [
  'ngRoute',
  // 'app.directives',
  'app.controllers',
  'app.services'
])

// Add constants
// angular.module('app').constant('Constants', require('./constants'))

// Add configuration
angular.module('app').config(require('./config'))

// Bootstrap application
angular.bootstrap(document, ['app'])
