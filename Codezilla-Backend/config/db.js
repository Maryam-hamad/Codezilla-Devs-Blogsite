const mongoose = require ('mongoose')
const dotenv = require ('dotenv')

const connectDb = async () => {
  try{
    await mongoose.connect(process.env.MONGO_URI)
    console.log('codzilla DB connected.....')

  }
  catch(error){
    console.error('')
    process.exit(1)
  }
}

module.exports = connectDb