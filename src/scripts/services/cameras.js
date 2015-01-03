'use strict';

/**
 * ngInject
 */
module.exports = function($q, $http) {
  var picUrl = 'http://www.tfl.gov.uk/tfl/livetravelnews/trafficcams/cctv/';

  return {
    /**
     * @desc Retrieve cameras
     * @return {Promise}
     */
    get: function() {
      var defer = $q.defer();

      $http
        .get('/cameras.json')
        .success(function(response) {
          return defer.resolve(response);
        })
        .error(function(response) {
          return defer.reject(response);
        });

      return defer.promise;
    },
    /**
     * @desc Construct url of camera image
     * @param {String} file
     * @return {String}
     */
    getImageUrl: function(file) {
      return "<img class='camera-pic' src='"+ picUrl + file + "'>";
    }
  };
};
