import React from 'react'
// import { useAuth } from '../contexts/auth'
import { Navigate, Outlet } from 'react-router-dom'

const AdminProtectedRoute = () => {
  // const { auth, setAuth } = useAuth()
  const user = JSON.parse(localStorage.getItem('user'))
  console.log(user)

  return user?.role === 'Admin' ? <Outlet /> : <Navigate to="/login" />
  // return auth?.user?.role === 'Admin' ? (
  //   <Outlet />
  // ) : (
  //   <Navigate to="/dashboard" />
  // )
}

export default AdminProtectedRoute
