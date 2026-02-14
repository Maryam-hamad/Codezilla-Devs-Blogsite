//page not fount

const notFound =(req,res,next) =>{
  const error = new Error(`Not found-${req.originalUrl}`)
  res.status(404)
  next(error)
}

//errorHandler 

const errorHandler =(error,req ,res ,next) =>{
  res.status(500).json({
  message:error.message
  })

}

module.exports = {notFound,errorHandler}

