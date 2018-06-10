const fs = require('fs')
const parser = require('xml2json')
const axios = require('axios');
const path = require('path');

axios
  .get('https://www.tfl.gov.uk/cdn/static/cms/documents/camera-list.xml')
  .then(function (response) {
    const camerasJSON = JSON.parse(parser.toJson(response.data))
    const cameras = {
      cameras: camerasJSON.syndicatedFeed.cameraList.camera.map(function (c) {
        return { ...c, file: `0000${c.id}.jpg` }
      })
    }
    fs.writeFileSync(path.resolve(__dirname, '../public/cameras.json'), JSON.stringify(cameras))
  })