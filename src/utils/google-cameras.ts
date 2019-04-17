import { Camera, CamerasResponse } from "./cameras";
import CamerasService from './tfl-cameras'
import cameraImage from '../camera.png'

let map: google.maps.Map;

const infos: google.maps.InfoWindow[] = [];

const service = new CamerasService()

export const addMarker = (camera: Camera) => {
  // Create marker for camera
  const marker = new google.maps.Marker({
    clickable: true,
    // TODO Investigate and resolve memory leak issue with marker animation
    // Commenting out due to odd memory leak issue
    // animation: google.maps.Animation.DROP,
    icon: {
      anchor: new google.maps.Point(30, 30),
      scaledSize: new google.maps.Size(25, 25),
      size: new google.maps.Size(81, 81),
      url: cameraImage,
    },
    map,
    position: new google.maps.LatLng(camera.lat, camera.lng),
    title: camera.location,
  });

  // Create infowindow for marker
  const infowindow = new google.maps.InfoWindow({});

  infos.push(infowindow);

  // Add listener to marker for click event
  google.maps.event.addListener(
    marker,
    "click",
    () => onMarkerClick(map, marker, infowindow, camera),
  );
};

export const closeInfos = () => {
  // Loop through all info boxes and close them.
  infos.map((infowindow) => {
    return infowindow.close();
  });
};

export const onMarkerClick = (
  map: google.maps.Map,
  marker: google.maps.Marker,
  infowindow: google.maps.InfoWindow,
  camera: Camera) => {
  closeInfos();
  infowindow.open(map, marker);
  // TfL no longer provides realtime camera feed due to security concerns
  // infowindow.setContent(`${service.getImageUrl(camera.id)}<br><br>${camera.location}`);
  infowindow.setContent(camera.location);
};

const onCameraLoadSuccess = (response: CamerasResponse) => {
  for (const camera of response.cameras) {
    addMarker(camera);
  }
};

export function addCamerasToMap(cameras: Camera[]) {
  map = new google.maps.Map(document.getElementById("map-canvas"), {
    center: new google.maps.LatLng(51.508742, -0.120850),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    zoom: 14,
  });



  const addMarkersToMap = () => {
    // Adding delay because map fires 'idle' event before all frames have been
    // populated. This delay will not fully ensure that all frames are loaded as
    // that is dependant upon network connection and device/browser performance.
    // This delay will simply add a little buffer so the marker animation is
    // less "janky".
    setTimeout(() => {
      // Retrieve cameras
      onCameraLoadSuccess({ cameras })
    }, 1500);
  };

  // Add cameras to map once it is idle
  google.maps.event.addListenerOnce(map, 'idle', addMarkersToMap);
}
