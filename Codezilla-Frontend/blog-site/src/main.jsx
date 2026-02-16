import {StrictMode } from 'react'
import {createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Register from './pages/Register.jsx'
import { AuthProvider } from "./context/AuthContext";
import Login from './pages/Login.jsx'
import Createblog from './pages/Createblog.jsx'
import ViewBlog from './pages/Viewblog.jsx'
import Home from './pages/Home.jsx'
import Library from './pages/Library.jsx'
import Editpost from "./pages/Editpost.jsx"
import Landingpage from "./pages/Landingpage.jsx"
import Terms from './pages/Terms.jsx'
import Privacy from './pages/Privacy.jsx'

const router =createBrowserRouter([
  {
    path: "/",
    element:<App/>,
    children:[
    {
      path:'register',
      Component: Register
    },

    {
      path:"login",
      Component : Login
    },
    {
      path:'create-post',
      Component:Createblog
    },
    {
      path:'/posts/:id',
      Component: ViewBlog

    },
    {
      path:'home',
      Component: Home
    },

    {path:'library',
      Component:Library

    },

    {
      path:'editpost/:id',
      Component:Editpost
    },
     {path:'/',
      Component:Landingpage

    },
    {path:'terms-of-service',
      Component:Terms

    },
    {
      path:'privacy-policies',
      Component:Privacy
    }
 
    ]
  }
]
  
)


createRoot(document.getElementById('root')).render(
  <StrictMode >
    <AuthProvider>

      <RouterProvider router ={router}/>

    </AuthProvider>
   
  </StrictMode>,
)
