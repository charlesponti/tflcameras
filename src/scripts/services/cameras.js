'use strict'

/**
 * ngInject
 */
module.exports = ['$q', '$http', function ($q, $http) {
  /**
   * @desc Reference to service
   * @type {Object}
   */
  var service = {}

  service.picUrl = 'http://www.tfl.gov.uk/tfl/livetravelnews/trafficcams/cctv/'

  /**
   * @desc Retrieve cameras
   * @return {Promise}
   */
  service.get = function () {
    var defer = $q.defer()

    $http
      .get('/cameras.json')
      .then(function (response) {
        return defer.resolve(response)
      })
      .catch(function (response) {
        return defer.reject(response)
      })

    return defer.promise
  }

  /**
   * @desc Construct url of camera image
   * @param {String} file
   * @return {String}
   */
  service.getImageUrl = function (file) {
    return "<img class='camera-pic' src='" + service.picUrl + file + ".jpg'>"
  }

  return service
}]
