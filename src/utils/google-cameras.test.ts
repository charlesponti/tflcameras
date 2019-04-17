import { addMarker } from "./google-cameras";

function Marker() {}
function Point() {}
function Size() {}
function LatLng() {}
function InfoWindow() {}

global.google = {
  maps: {
    Marker,
    Point,
    Size,
    LatLng,
    InfoWindow,
    event: {
      addListener() {}
    }
  }
}

describe("GoogleCameras", () => {
  test("it should addMarker", () => {
    addMarker({ id: 123, lat: 1, lng: 2, location: "1234" });
  });
});
