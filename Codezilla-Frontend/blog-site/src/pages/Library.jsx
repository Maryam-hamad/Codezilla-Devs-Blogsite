import React from 'react'
import {useEffect , useState} from 'react'
import {Link} from 'react-router-dom'
import {getMyPosts} from '../api/Api'
import './Library.css'
import Librarycard from '../components/Librarycard'
import { Flex, Spin } from 'antd';




function Library() {
  
  const [posts , setPosts] = useState([])
  const [loading , setLoading] = useState(true)

  useEffect(()=>{
    
    async function Load(){
      try{
        const res =await getMyPosts()
        setPosts(res.data)
     
      }catch(err){
       console.error(err)
      }
      finally{
        setLoading(false)
      }
    }
    Load()
  },[])
 
  if (loading) {
  return (
    <Flex align="center" justify="center" className="spin-wrap">
      <Spin size="large" />
    </Flex>
  )
}

  return (
    <div className='library-container'>

      <div className='header-section'>
        <h1> Manage and Share your brilliant ideas</h1>
      </div>

      <div className="card-container">
        {posts.length === 0 ? (
          <p>Create your first post</p>
        ) : (
          posts.map(post => (
            <Librarycard key={post._id} post={post} />
          ))
        )}
      </div>
    </div>
  )
}

export default Library
