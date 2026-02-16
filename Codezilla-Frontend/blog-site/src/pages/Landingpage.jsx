import { Link ,useNavigate} from "react-router-dom";
import "./Landing.css";

function Landing({ post }) {

  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("user"));


  const goToOne = () => {
    const postPath = "/posts/69938d269a8699a198f38118"; 

    if (user) {
      
      navigate(postPath);
    } else {
      
      navigate("/register", { state: { redirectTo: postPath } });
    }
  };


  const goToTwo = () => {
  
    const postPath = "/posts/69938d9a9a8699a198f3811b";

    if (user) {
      navigate(postPath);
    } else {
      navigate("/register", { state: { redirectTo: postPath } }); 
    }
  };


  const goToThree = () => {
   const postPath = "/posts/69938df79a8699a198f3811e"; 

   if (user) {
   
    navigate(postPath);
   } else {
    navigate("/register", { state: { redirectTo: postPath } });
  }
};

  

  
  return (
    <div className="landing">

      
      <div className="hero">
        <div className="hero-content">
          <h1>Where developers share ideas<br />and catch what’s happening in tech.</h1>
          <p>
            Real experiences, practical lessons, and trends shaping the future
            of software development.
          </p>
          <Link to="/register">
           <div className="hero-actions">
            <button className="btn primary">Start Reading</button>
            <button className="btn ghost">Become a Writer</button>
          </div>
          </Link>
         
        </div>

        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="mac book"
          />
        </div>
      </div>

   
      <div className="values">
        <div className="value-card">
          <img
            src="https://plus.unsplash.com/premium_photo-1683121132274-953b07f17ec7?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Writing code"
          />
          <h3>Real Dev Stories</h3>
          <p>From bugs to breakthroughs, written by developers.</p>
        </div>

        <div className="value-card">
          <img
            src="https://images.unsplash.com/photo-1604591259403-81d6c9cf87d7?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Team discussion"
          />
          <h3>Tech Trends</h3>
          <p>AI, Web, Mobile, and the future of software.</p>
        </div>

        <div className="value-card">
          <img
            src="https://plus.unsplash.com/premium_photo-1661878265739-da90bc1af051?q=80&w=1572&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Learning together"
          />
          <h3>Learn & Grow</h3>
          <p>A community built around sharing and learning.</p>
        </div>
      </div>

      
      <div className="featured">
       
        <h2>Featured Stories</h2>
        <div className="featured-grid">
          
          <div className="featured-card"   onClick={goToOne}>
            <img
              src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
            <h4>How I Learned React in 30 Days</h4>
          </div>
         
          

           
           <div className="featured-card">
            <img
              src="https://plus.unsplash.com/premium_photo-1661877737564-3dfd7282efcb?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="AI coding"
            />
            <h4 onClick={goToTwo}>Why AI Will Change Coding Forever</h4>
          </div>
         

          
           
           <div className="featured-card">
            <img
              src="https://images.unsplash.com/photo-1602992708529-c9fdb12905c9?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Startup team"
            />
            <h4 onClick={goToThree}>From Junior to Senior Developer</h4>
          </div>
          
          
        </div>
      </div>

     
     <div className="cta-section">
        <h2>Have something to share?</h2>
        <p>Publish your ideas and help shape the developer community.</p>
        <Link to="/register">
        <button>Start Writing Today</button>
        </Link>
      </div>
     
      

    
      <footer className="footer">
        <p>© 2026 Codezilla Devs Blog. Built for developers.</p>
      </footer>

    </div>
  );
}

export default Landing