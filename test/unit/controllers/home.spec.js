describe('Controllers: HomeCtrl', function() {
  'use strict';

  var ctrl, cameraService;

  beforeEach(function() {
    // Load application
    angular.mock.module('app');

    // Inject test dependecies
    angular.mock.inject(function($controller, $rootScope, Cameras, $q) {
      spyOn(Cameras, 'get').and.returnValue($q.defer().promise);
      cameraService = Cameras;
      ctrl = $controller('HomeCtrl', {
        $scope: $rootScope,
        Cameras: cameraService
      });
    });
  });

  afterEach(function() {
    ctrl =
    cameraService = undefined;
  });

  it('should load cameras', function() {
    expect(cameraService.get).toHaveBeenCalled();
  });

  describe('.title', function() {
    it('should have correct value', function() {
      expect(ctrl.title).toEqual('The TFL Is Watching');
    });
  });

});
