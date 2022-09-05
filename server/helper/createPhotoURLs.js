const cloudinary = require('cloudinary').v2;
cloudinary.config({
  secure: true
});
require('dotenv').config();
const axios = require('axios');

var createPhotoURL = (req, res, next) => {
  if (!req.body.data.rawPhotos) {
    console.log('test')
    // !req.body.rawPhotos;
    next();
  }

  var photos;
  if (req.body.data.rawPhotos) {
    photos = req.body.data.rawPhotos;
  }
  // if (req.body.rawPhotos) {
  //   console.log('req.body.photos: ', req.body.rawPhotos);
  //   photos = req.body.rawPhotos;
  // }

  var APIrequests = uploadPhotoToCloudinary(photos);

  return Promise.all(APIrequests)
    .then((results) => {
      var formattedPhotos = [];
      results.forEach((photo, index) => {
        formattedPhotos.push(photo.url);
      })
      req.body.data.photos = formattedPhotos;
      delete req.body.data.rawPhotos;
    })
    .catch((err) => {
      throw err;
    })
}

var uploadPhotoToCloudinary = (photos) => {
  //returns an array of API calls to cloudinary
  var array = [];
  photos.forEach((photo) => {
    array.push(cloudinary.uploader.upload(photo));
  });
  return array;
}

module.exports = createPhotoURL;