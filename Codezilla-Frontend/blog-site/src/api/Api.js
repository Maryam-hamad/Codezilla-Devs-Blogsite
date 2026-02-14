import axios from'axios'


const API = axios.create({
  baseURL: "https://codezilla-devs-blogsite-4.onrender.co"

})

API.interceptors.request.use((req) => {
  const user = JSON.parse(localStorage.getItem("user"))

  if (user?.token){
    req.headers.authorization = `Bearer ${user.token}`
  }

  return req
})



//User Apis <--->
export const registerUser =(data) => API.post("/auth/register" , data)
export const loginUser =(data) => API.post("/auth/login" ,data)

//Blog post API's ---->

export const getAllpost = () => API.get("/posts")
export const getPostById = (id) => API.get(`/posts/${id}`)
export const createPost =(formData) => API.post("/posts" , formData ,{headers: {"Content-Type": "multipart/form-data"}})
export const updatePost = (id, formData) =>
  API.put(`/posts/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" }
})

export const getMyPosts =() => API.get("/mine")
export const deletePost = (id) => API.delete(`/posts/${id}`)


export default API