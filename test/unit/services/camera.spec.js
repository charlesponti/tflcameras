describe('Services: Cameras', function () {
  'use strict'

  var service, httpBackend

  beforeEach(function () {
    angular.mock.module('app')

    angular.mock.inject(function (Cameras, $httpBackend) {
      httpBackend = $httpBackend
      $httpBackend.when('GET', '/cameras.json').respond({ cameras: [] })
      service = Cameras
    })
  })

  afterEach(function () {
    service = undefined
  })

  describe('.getImageUrl', function () {
    it('should corrent url', function () {
      expect(service.getImageUrl('foo'))
        .toEqual("<img class='camera-pic' src='" + service.picUrl + "foo.jpg'>")
    })
  })

  describe('.get()', function () {
    it('should call $http.get', function () {
      service.get()
      httpBackend.expectGET('/cameras.json')
      httpBackend.flush()
    })
  })
})
