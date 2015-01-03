describe('Controllers: AboutCtrl', function() {
  'use strict';

  var ctrl;

  beforeEach(function() {
    // Inject module
    angular.mock.module('app');

    // Mock controller
    angular.mock.inject(function($controller) {
      ctrl = $controller('AboutCtrl');
    });
  });

  afterEach(function() {
    ctrl = undefined;
  });

  describe('.title', function() {
    it('should have correct value', function() {
      expect(ctrl.title).toEqual("All About Facade-Angular");
    });
  });

  describe('.body', function() {
    it('should have correct value', function() {
      expect(ctrl.body)
        .toEqual("This is a boilerplate for building an Angular application");
    });
  });

});
