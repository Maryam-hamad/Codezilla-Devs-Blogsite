import {children, createContext , useEffect , useState} from 'react'


export const AuthContext = createContext()

export const AuthProvider = ({children}) =>{

  const [ user ,setUser ] = useState(
    JSON.parse(localStorage.getItem('user'))
  )

  const login = (data) =>{
    localStorage.setItem("user" ,JSON.stringify(data))
    setUser(data)

  }

  const logOut =(data) => {
    localStorage.removeItem("user")
  }

  return (
   <AuthContext.Provider  value ={{ user , login, logOut}}>
    {children}
   </AuthContext.Provider>
  )
}