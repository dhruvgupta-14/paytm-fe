import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const ProtectedRoute = ({children}) => {
  const navigate=useNavigate()
  useEffect(()=>{
    const token=localStorage.getItem("token")
    if(!token) navigate('/signin')
    else navigate('/dashboard')  
  },[])
  return (
    <div>
      {children}
    </div>
  )
}

export default ProtectedRoute