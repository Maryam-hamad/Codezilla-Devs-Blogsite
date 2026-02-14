const express= require('express')
const {getAllpost, getPostById ,createPost, getMyPosts , updatePost , deletePost , uploadImage}= require('../Controllers/postController')

const protect =require ('../Middlewares/authMiddleware')
const upload = require('../config/multer')


const router = express.Router()

router.get("/posts" , getAllpost)

router.get("/posts/:id" , getPostById)

router.post("/posts" ,protect, upload.single("image"), createPost)

router.get("/mine", protect, getMyPosts);

router.put("/posts/:id" ,protect, updatePost)

router.delete("/posts/:id" ,protect, deletePost)




module.exports = router