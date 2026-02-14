const cloudinary = require ('../config/cloudinary')

const uploadToCloudinary = ( buffer) => {
  return new Promise ((resolve , reject) => {
    cloudinary.uploader.upload_stream(
      {folder: "posts/"},

      (error , result) => {
        if (error) reject(error)
        else resolve (result)
      }

    ).end(buffer)
  } )


}

module.exports = uploadToCloudinary