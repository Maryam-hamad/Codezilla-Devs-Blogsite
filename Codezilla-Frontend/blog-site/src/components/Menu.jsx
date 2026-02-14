import React from 'react'
import { Link} from 'react-router-dom'


function Menu () {
  return (
    <div className='menu-container' >

          <div className='user-container'>

            <div className='home'>
             <Link to='/home'>
              <span>Home</span>
             </Link>
           
            </div>

             <div className='library'>
              <span>Library</span>
             </div>

             <div className="profile">
             <span>Profile</span>
             </div>
           
            
          </div>

          <div className="authors-container">

            <p>Following</p>

          </div>

        

        



      </div>
  )
}

export default Menu