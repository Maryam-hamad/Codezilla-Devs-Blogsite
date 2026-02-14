const User = require ('../Models/userModel')
const createToken = require('../Utils/jwt')






// Create user 


const registerUser = async (req,res) =>{
  

  const {username ,email , password } = req.body

  const userExist = await User.findOne({email})
  if(userExist) return res.status(401).json({message:"user already exist"})

  const user = await User.create({username ,email, password})

  res.status(201).json({
    _id :user._id,
    username: user.username,
    email :user.email,
    token:createToken(user._id)
  })
}

 

//Login User

const loginUser = async (req,res) =>{
  
  const {email , password} = req.body

  const existingUser = await User.findOne({email})

  if (!existingUser)return res.status(401).json({error:"User not found "})

  await existingUser.matchPassword(password)

    
  return res.status(200).json({
    _id :existingUser._id,
    username:existingUser.username,
    email:existingUser.email,
    token:createToken(existingUser._id)

  })
}


const logOut = async (req,res) =>{

  const user =  await User.findbyId({user:req.user._id})

  if(!user)return res.status(400).json({message:"Logout Failed"})
  
    res.status(200).json({
      message: "Logged out successfully"
    })
}

module.exports= {registerUser , loginUser ,logOut}
