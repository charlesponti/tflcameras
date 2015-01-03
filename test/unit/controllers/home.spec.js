describe('Controllers: HomeCtrl', function() {
  'use strict';

  var ctrl;

  beforeEach(function() {
    angular.mock.module('app');

    angular.mock.inject(function($controller) {
      ctrl = $controller('HomeCtrl');
    });
  });

  afterEach(function() {
    ctrl = undefined;
  });

  describe('.title', function() {
    it('should have correct value', function() {
      expect(ctrl.title).toEqual("Welcome to Facade-Angular");
    });
  });

});
