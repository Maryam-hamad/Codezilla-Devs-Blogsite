import React, {useState ,useContext} from 'react'
import "./Nav.css"
import { Link } from 'react-router-dom'




function Navbar(post) {
  const user = localStorage.getItem("user")

  const[showMenu , setShowMenu] = useState(false)

  const showMenuModal = ()=>{
    setShowMenu(prev => !prev)
  }

  const handleNavigation =() => {
    setShowMenu(false)

  }

 const handleLogout =() =>{
   localStorage.removeItem("user")
    window.location.href="/"

  }

  const openLibrary =(e) =>{
    e.stopPropagation()
    window.location.href ='/library'

  }
  
  const goHome =(e) =>{
    e.stopPropagation()
     window.location.href ='/home'
  }


  return (
    <div className='nav-container'> 

        {user?(
          <>
              <div className="menu" >
                <img src ="/E250.svg"  onClick={(e) => {e.stopPropagation(); showMenuModal()}}/>
              </div>
            
              <div className='logo-container'>
                <Link to='/home'>
                <span>Codezilla</span>
                </Link>
                
              </div>

        
        
              <div className="search-container">
                <img src="/icons8-search.svg" alt="search-icon" 
                />
                <input type="text"  placeholder='Search' />
              </div>

              <div className="write-icon">
                <Link to="/create-post" style={{decoration:"none"}}>
                <img src ="/pen1-svgrepo-com.svg"/>
                <span>Write</span>
                </Link>
                
              </div>

              <div className="notifs">
                <img src="/notification-bell-on-svgrepo-com.svg"/>
              </div>

              <div className ="nav-avatar">
             <div className="nav-avatar">
            {post.author?.avatar ? (
              <img
                src={post.author.avatar}
                alt={post.author.username}
              />
            ) : (
              <span className="avatar-alt">
                {post.author?.username?.charAt(0).toUpperCase() || "?"}
              </span>
            )}
          </div>
              </div>

            </>
          
      ) :(
        <>
        <Link to="/" className='landing-logo'><h1 >Codezilla</h1></Link>
        
          
        
        <div className="nav-buttons">


          <Link to="/login">
            <button className='sign-in' >Sign In</button>
          </Link>

          <Link to="/register">
            <button className='get-started-btn'>Get started</button>
          </Link>
          
          

    
        </div>
      </> 
      )}

      {showMenu &&(
        < div className='menu-container' >
        
                  <div className='user-container'>

                    <div className='home-button'>
                      <button onClick={goHome}>Home</button>
                    </div>
                  
        
                    <div className='write'>

                      <Link to="/create-post" style={{decoration:"none"}}  onClick={handleNavigation}>
                       <img src ="/pen1-svgrepo-com.svg"/>
                       <span>Write</span>
                     </Link>
                      
                    </div>

                    <div className="library">
                     
                     <button onClick={openLibrary}>Library</button>
                     
                    </div>

                    <div className="logout-btn">
                      <button onClick={handleLogout}>Logout</button>
                     </div>
                   
                    
                  </div>
        
                  
        
            
        
              </div>

        
      )}
    </div>
  )
}

export default Navbar