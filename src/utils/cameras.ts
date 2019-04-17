const fs = require('fs')
const parser = require('xml2json')
const axios = require('axios')
const path = require('path')

export interface CameraResponse {
  data: {
    syndicatedFeed: {
      cameraList: {
        camera: [Camera]
      }
    }
  }
}

export interface Camera {
  id: number
  location: string
  lat: number
  lng: number
}

export interface CamerasResponse {
  cameras: Camera[]
}


axios
  .get('https://www.tfl.gov.uk/cdn/static/cms/documents/camera-list.xml')
  .then((response: CameraResponse) => {
    const camerasJSON = JSON.parse(parser.toJson(response.data))
    const cameras = {
      cameras: camerasJSON.syndicatedFeed.cameraList.camera.map((camera: Camera) => {
        return { ...camera, file: `0000${camera.id}.jpg` }
      })
    }
    fs.writeFileSync(path.resolve(process.cwd(), './public/cameras.json'), JSON.stringify(cameras, null, 2))
  })
