import { useState, useEffect ,useContext} from 'react'
import API from '../api/Api'
import { AuthContext } from '../context/AuthContext'
import { Link ,useNavigate,useLocation} from 'react-router-dom'
import './Register.css'


function Register() {
  const navigate = useNavigate();
  const location = useLocation();


  useEffect(() => {
    if(localStorage.getItem("user")){
      window.location.href ='/home'
    }

  },[])


  

  const [form, setForm] = useState({
   username: " ",
   email: " ",
   password:" "
  })

  const { login } = useContext(AuthContext)

  const redirectToHome = location.state?.redirectToHome;
  const postPath = location.state?.postPath;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await API.post("/auth/register", form);
    login(res.data);

    const redirectToPost = location.state?.postPath;

    if (redirectToPost) {
      window.location.href = `/home?to=${encodeURIComponent(redirectToPost)}`;
    } else {
      window.location.href = "/home";
    }
 };


   


  return (
    <div className="reg-container">

      <div className='form-container'>
        <form onSubmit={handleSubmit}>

          <h1>Join Codezilla.</h1>

          <div className="input-container">
            <input type="text"  placeholder='Name' onChange ={(e) => setForm({...form, username: e.target.value})}/>

            <input type="email"  placeholder='Email' onChange ={(e) => setForm({...form, email: e.target.value})}/>

            <input type="password"  placeholder='Password' onChange={(e) => setForm({...form, password: e.target.value})}/>

          </div>
          <div className="submit-button">
            <button>REGISTER</button>
          </div>

        </form>
      
      </div>
      <p>Already have an account? <Link to="/login">Sign In</Link></p>
       
      <div className='terms-container'>
        <p>By clicking "Sign in", you accept codzilla's <Link to="/terms-of-service">Terms of Service </Link> and <Link to="privacy-policies">Privacy Policy</Link>.</p> 
      </div>

    </div>
    
  )
}

export default Register