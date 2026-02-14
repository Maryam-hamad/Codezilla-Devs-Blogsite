import React, { useEffect , useState } from 'react'
import Postcard from '../components/Postcard'
import './Home.css'
import {getAllpost} from '../api/Api'
import { Flex, Spin } from 'antd';




function Home() {

  const[posts ,setPosts] =useState([])
  const[loading ,setLoading] = useState(true)



  useEffect(() =>{
    async function loadPosts(){
      try{
       const res = await getAllpost()
       setPosts(res.data)

      }catch (error){
        console.error(error.message)
      }finally{
        setLoading(false)
      }
      
    }
    loadPosts()
  },[])
 

  return (
    
    <div className='home-container'>
      

      <div className="post-container">
        <div className="post-header">
          <p>For you</p>

          <div className="postcards">

            {loading ?(
            <Flex align="center" gap="middle">
              <Spin size="large" className='spin'/>
            </Flex>
        ):( <>
          {posts.map(post => <Postcard   key={post._id} post={post}/>  )}
          </>) }
    

          </div>
         

        </div>
        
     
      </div>


    </div>

      
   

    
   
    
        
    
  )
}

export default Home