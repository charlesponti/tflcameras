'use strict';

/**
 * @desc Create function
 * @return {Function}
 */
var noop = function() {
	return function() {};
};

/**
 * Mock of Google Maps
 * @return {Object}
 */
var google = {
	maps: {
		event: {
			addDomListener: noop(),
			addDomListenerOnce: noop(),
			addListener: noop(),
			addListenerOnce: noop(),
			bind: noop(),
			clearInstanceListeners: noop(),
			clearListeners: noop(),
			forward: noop(),
			removeListener: noop(),
			trigger: noop(),
			vf: noop()
		},
		LatLng: (function() {
			function LatLng(lat, lng) {
				this.latitude = parseFloat(lat);
				this.longitude = parseFloat(lng);
			}

			LatLng.prototype.lat = function() {
				return this.latitude;
			};

			LatLng.prototype.lng = function() {
				return this.longitude;
			};

			return LatLng;
		})(),
		setMap: noop(),
		getMap: noop(),
		LatLngBounds: (function() {

			function LatLngBounds(ne, sw) {
				this.ne = ne;
				this.sw = sw;
			}

			LatLngBounds.prototype.getSouthWest = function() {
				return this.sw;
			};

			LatLngBounds.prototype.getNorthEast = function() {
				return this.ne;
			};

			return LatLngBounds;
		})(),
		Marker: (function() {
			function Marker() {}
			Marker.prototype.getAnimation = noop();
			Marker.prototype.getClickable = noop();
			Marker.prototype.getCursor = noop();
			Marker.prototype.getDraggable = noop();
			Marker.prototype.getFlat = noop();
			Marker.prototype.getIcon = noop();
			Marker.prototype.getPosition = noop();
			Marker.prototype.getShadow = noop();
			Marker.prototype.getShape = noop();
			Marker.prototype.getTitle = noop();
			Marker.prototype.getVisible = noop();
			Marker.prototype.getZIndex = noop();
			Marker.prototype.setAnimation = noop();
			Marker.prototype.setClickable = noop();
			Marker.prototype.setCursor = noop();
			Marker.prototype.setDraggable = noop();
			Marker.prototype.setFlat = noop();
			Marker.prototype.setIcon = noop();
			Marker.prototype.setPosition = noop();
			Marker.prototype.setShadow = noop();
			Marker.prototype.setShape = noop();
			Marker.prototype.setTitle = noop();
			Marker.prototype.setVisible = noop();
			Marker.prototype.setZIndex = noop();
			Marker.prototype.setMap = noop();
			Marker.prototype.getMap = noop();
			return Marker;
		})(),
		OverlayView: noop(),
		MarkerImage: noop(),
		Map: (function() {
			function Map() {}
			Map.prototype.setCenter = noop();
			return Map;
		})(),
		Point: noop(),
		Size: noop(),
		InfoWindow: noop(),
		MapTypeId: {}
	}
};

/**
 * @desc Attach google to global if in running in Node
 */
if (typeof module != 'undefined') {
	module.exports = google;
}

/**
* @desc Attach google to global if in running in browser
*/
if (typeof window != 'undefined') {
	window.google = google;
}
