"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var fs = require('fs');
var parser = require('xml2json');
var axios = require('axios');
var path = require('path');
// export default {
//   async get () {
//     return (
axios
    .get('https://www.tfl.gov.uk/cdn/static/cms/documents/camera-list.xml')
    .then(function (response) {
    var camerasJSON = JSON.parse(parser.toJson(response.data));
    var cameras = {
        cameras: camerasJSON.syndicatedFeed.cameraList.camera.map(function (camera) {
            return __assign({}, camera, { file: "0000" + camera.id + ".jpg" });
        })
    };
    fs.writeFileSync(path.resolve(process.cwd(), './public/cameras.json'), JSON.stringify(cameras, null, 2));
});
//     )
//   }
// }
