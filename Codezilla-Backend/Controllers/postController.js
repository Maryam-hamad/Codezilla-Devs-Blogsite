const Post = require ('../Models/postModel')
const uploadToCloudinary = require ('../Utils/cloudinaryUpload')



//Get all post

const getAllpost = async (req ,res) => {

  const allPost =  await Post.find().sort({createdAt:-1})

  .populate("author","_id username email");
  console.log(allPost[0].author);

  res.status(200).json(allPost)

}


//get single post by id 

const getPostById = async (req , res) =>{

  const post =  await Post.findById(req.params.id)
  .populate("author","_id username email");
  if(!post) return res.status(400).json({error:"post not found"})

  res.status(200).json(post)

}

//Create post

const createPost = async (req, res) => {
  console.log("reached controller");

  let imageUrl = null;

  if (req.file) {
    const result = await uploadToCloudinary(req.file.buffer);
    imageUrl = result.secure_url;
  }

  const newPost = await Post.create({
    title: req.body.title,
    subtitle: req.body.subtitle,
    content: req.body.content,
    imageUrl: imageUrl,
    author: req.user._id, // 
  });

  res.status(201).json(newPost);
};

const getMyPosts = async (req, res) => {
  const posts = await Post.find({ author: req.user._id })
  .sort({ createdAt: -1 });
  res.json(posts);
};

// Update post

const updatePost = async (req, res) => {
 
  const post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }

  post.title = req.body.title || post.title;
  post.subtitle = req.body.subtitle || post.subtitle;
  post.content = req.body.content || post.content;

  if (req.file) {
    post.imageUrl = req.file.path;
  }

  const updatedPost = await post.save();

  res.status(200).json(updatedPost);
  
};


//Delete Post

const deletePost = async (req, res) => {

  const post =await  Post.findById(req.params.id)

  if(!post) return res.status(400).json({ error: "post not found"})

  await post.deleteOne()

  res.status(200).json({
    message:" Post deleted successfully"
  })
}








module.exports = {getAllpost ,getPostById ,createPost ,getMyPosts , updatePost , deletePost }