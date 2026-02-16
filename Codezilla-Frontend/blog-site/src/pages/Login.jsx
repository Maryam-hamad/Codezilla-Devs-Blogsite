import React, {useState ,useContext, useEffect } from 'react'
import API from '../api/Api'
import {Link} from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import './Login.css'



function Login() {

  useEffect(() => {
    if(localStorage.getItem("user")){
    window.location.href= "/home"

  }
  },[])

  const [email , setEmail] = useState('')
  const [password , setPassword] = useState('')

  const {login }= useContext(AuthContext)

  const handleLogin = async (e) =>{
    e.preventDefault()
    const res = await API.post("/auth/login" ,{ email , password})
    login(res.data)
    window.location.href= "/home"
   
  }


  return (
    <div className='main-login-container'>
      
        <div className="login-container">
        <h1>Welcome Back.</h1>
        <div className="input-container">

          <input type="email"  placeholder='Email' onChange={(e) => setEmail(e.target.value)}/>
          <input type ="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
          <button onClick={handleLogin}>LOGIN</button>
        </div>

      </div>


     
      

      <p>No account?<Link to ="/register">Create one</Link></p>
      <p>Forgot email or trouble signing in? <Link to={"https://wa.link/1qjygp"}>Get help.</Link></p>

      <div className='terms-container'>
      <p>By clicking "Sign in", you accept codzilla's <Link to="/terms-of-service">Terms of Service </Link> and <Link to="privacy-policies">Privacy Policy</Link>.</p> 
      </div>
      

    </div>
  )
}

export default Login