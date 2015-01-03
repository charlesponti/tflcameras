'use strict';

/**
 * @ngInject
 */
module.exports = function($locationProvider, $routeProvider) {

  // Set HTML5 pushState
  $locationProvider.html5Mode(true);

  // Set routes
  return $routeProvider
    .when('/about', {
      templateUrl: 'about.html',
      controller: 'AboutCtrl as about'
    })
    .when('/', {
      templateUrl: 'home.html',
      controller: 'HomeCtrl as home'
    })
    .otherwise({
      redirectTo: '/'
    });

};
