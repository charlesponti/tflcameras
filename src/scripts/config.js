'use strict'

/**
 * @ngInject
 */
module.exports = function ($locationProvider, $routeProvider) {
  // Set HTML5 pushState
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  })

  // Set routes
  return $routeProvider
    .when('/', {
      templateUrl: 'home.html',
      controller: 'HomeCtrl as home'
    })
    .otherwise({
      redirectTo: '/'
    })
}
