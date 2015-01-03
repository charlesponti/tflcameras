'use strict';

var _ = require('lodash');

/**
 * @ngInject
 */
module.exports = function(Cameras) {

  /**
   * @desc Reference to controller
   * @type {Object}
   */
  var vm = this;

  /**
   * @desc Title displayed in template
   * @type {String}
   */
  this.title = "The TFL Is Watching";

  /**
   * @desc Google map
   * @type {google.maps.Map}
   */
  var map = new google.maps.Map(document.getElementById('map-canvas'), {
    zoom: 14,
    center: new google.maps.LatLng(51.508742, -0.120850),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  /**
   * @desc Info windows
   * @type {Array}
   */
  vm.infos = [];

  /**
   * @desc Close all info windows
   * @return {Object}
   */
  vm.closeInfos = function() {
    _.each(vm.infos, function(window) {
      window.close();
    });
    return vm;
  };

  /**
   * @desc Add marker with info window to map
   * @param {[type]} camera [description]
   */
  vm.addMarker = function(camera) {
    // Create marker for camera
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(camera.lat, camera.lng),
      map: map,
      title: camera.location,
      clickable: true,
      icon: {
        url: 'images/camera.png',
        size: new google.maps.Size(81, 81),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(0, 0),
        scaledSize: new google.maps.Size(25, 25)
      }
    });

    // Create infowindow for marker
    var infowindow = new google.maps.InfoWindow({
      content: Cameras.getImageUrl(camera.file)+"<br><br>"+camera.location
    });

    // Add info window to list of info windows
    vm.infos.push(infowindow);

    // Add listener to marker for click event
    return google.maps.event.addListener(
      marker,
      'click',
      vm.onMarkerClick.bind(vm, map, marker, infowindow)
    );
  };

  /**
   * @desc
   * @param {google.maps.Map} map
   * @param {google.maps.Marker} marker
   * @param {google.maps.InfoWindow} infowindow
   */
  vm.onMarkerClick = function(map, marker, infowindow) {
    vm.closeInfos();
    infowindow.open(map, marker);
  };

  /**
   * @desc Handle successful request for cameras
   * @param {Object} data Response from request
   */
  vm.onCameraLoadSuccess = function(data) {
    _.each(data.cameras, vm.addMarker);
  };

  // Retrieve cameras
  Cameras
    .get()
    .then(vm.onCameraLoadSuccess);

  return vm;
};
