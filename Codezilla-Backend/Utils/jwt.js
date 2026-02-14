const jwt = require ('jsonwebtoken')
const dotenv = require('dotenv')

const createToken =  (userId) =>{

  return jwt.sign(
    { id:userId },
    process.env.JWT_SECRET ,
    {expiresIn : '30d'}
  )
   
}


module.exports = createToken