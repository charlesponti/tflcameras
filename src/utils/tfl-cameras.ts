import { Camera, CamerasResponse } from "./cameras";

class CamerasService {
  picUrl = 'http://www.tfl.gov.uk/tfl/livetravelnews/trafficcams/cctv/'

  async get(): Promise<CamerasResponse> {
    const res = await fetch('/cameras.json')
    const json = await res.json()
    return json
  }

  /**
   * @desc Construct url of camera image
   * @param {String} file
   * @return {String}
   */
  getImageUrl (file: number): string {
    return `<img class='camera-pic' src='${this.picUrl + file}.jpg'>`
  }
}

export default CamerasService
