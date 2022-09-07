const cloudinary = require('cloudinary').v2;
cloudinary.config({
  secure: true
});
require('dotenv').config();
const axios = require('axios')

var createPhotoURL = (req, res, next) => {
  if (!req.body.photos) {
    next();
  }

  var photos = req.body.photos;

  var APIrequests = uploadPhotoToCloudinary(photos);

  return Promise.all(APIrequests)
    .then((results) => {
      var formattedPhotos = [];
      results.forEach((photo, index) => {
        formattedPhotos.push(photo.url);
      })
      req.body.photos = formattedPhotos;
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