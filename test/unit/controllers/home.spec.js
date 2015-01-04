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

  describe('.closeInfos()', function() {
    it('should call .close() on vm.infos', function() {
      var infowindow = {
        close: jasmine.createSpy('close')
      };
      ctrl.infos = [
        infowindow
      ];
      ctrl.closeInfos();
      expect(infowindow.close).toHaveBeenCalled();
    });
  });

  describe('.onMarkerClick()', function() {
    it('should close info windows and open new infowindow', function() {
      var infowindow = {
        open: jasmine.createSpy('open'),
        close: jasmine.createSpy('close')
      };
      spyOn(ctrl, 'closeInfos');
      ctrl.onMarkerClick('fooMap', 'fooMarker', infowindow);
      expect(ctrl.closeInfos).toHaveBeenCalled();
      expect(infowindow.open).toHaveBeenCalledWith('fooMap', 'fooMarker');
    });
  });

  describe('.onCameraLoadSuccess()', function() {
    it('should add cameras from response to ctrl.cameras', function() {
      ctrl.onCameraLoadSuccess({ cameras: 'foo' });
      expect(ctrl.cameras).toEqual('foo');
    });
  });
  
});
