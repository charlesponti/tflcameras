'use strict'

var _ = require('lodash')

/**
 * @ngInject
 */
module.exports = function (Cameras, $timeout) {
  /**
   * @desc Reference to controller
   * @type {Object}
   */
  var vm = this

  /**
   * @desc Title displayed in template
   * @type {String}
   */
  this.title = 'The TFL Is Watching'

  /**
   * @desc Google map
   * @type {google.maps.Map}
   */
  var map = new google.maps.Map(document.getElementById('map-canvas'), {
    zoom: 14,
    center: new google.maps.LatLng(51.508742, -0.120850),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  })

  /**
   * @desc Info windows
   * @type {Array}
   */
  vm.infos = []

  /**
   * @desc Close all info windows
   * @return {Object} vm
   */
  vm.closeInfos = function () {
    // Loop through all info boxes and close them.
    _.each(vm.infos, function (infowindow) {
      return infowindow.close()
    })

    return vm
  }

  /**
   * @desc Add marker with info window to map
   * @param {Object} camera Camera details
   * @return {Object} vm
   */
  vm.addMarker = function (camera) {
    // Create marker for camera
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(camera.lat, camera.lng),
      map: map,
      title: camera.location,
      clickable: true,
      // TODO Investigate and resolve memory leak issue with marker animation
      // Commenting out due to odd memory leak issue
      // animation: google.maps.Animation.DROP,
      icon: {
        url: 'images/camera.png',
        size: new google.maps.Size(81, 81),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(0, 0),
        scaledSize: new google.maps.Size(25, 25)
      }
    })

    // Create infowindow for marker
    var infowindow = new google.maps.InfoWindow({
      content: Cameras.getImageUrl(camera.file) + '<br><br>' + camera.location
    })

    // Add info window to list of info windows
    vm.infos.push(infowindow)

    // Add listener to marker for click event
    google.maps.event.addListener(
      marker,
      'click',
      vm.onMarkerClick.bind(vm, map, marker, infowindow)
    )

    return vm
  }

  /**
   * @desc Handle click event of marker
   * @param {google.maps.Map} map
   * @param {google.maps.Marker} marker
   * @param {google.maps.InfoWindow} infowindow
   * @return {Object} vm
   */
  vm.onMarkerClick = function (map, marker, infowindow) {
    vm.closeInfos()
    infowindow.open(map, marker)
    return vm
  }

  /**
   * @desc Handle successful request for cameras
   * @param {Object} data Response from request
   */
  vm.onCameraLoadSuccess = function (response) {
    vm.cameras = response.data.cameras

    for (var i = 0; i < vm.cameras.length; i++) {
      vm.addMarker(vm.cameras[i])
    }

    return vm
  }

  // Retrieve cameras
  Cameras.get().then(vm.onCameraLoadSuccess)

  /**
   * @desc Add cameras to map
   * @return {Object} vm
   */
  vm.addMarkersToMap = function () {
    // Adding delay because map fires 'idle' event before all frames have been
    // populated. This delay will not fully ensure that all frames are loaded as
    // that is dependant upon network connection and device/browser performance.
    // This delay will simply add a little buffer so the marker animation is
    // less "janky".
    $timeout(function () {
      return _.each(vm.cameras, vm.addMarker)
    }, 1500)

    return vm
  }

  // Add cameras to map once it is idle
  // google.maps.event.addListenerOnce(map, 'idle', vm.addMarkersToMap);

  return vm
}
