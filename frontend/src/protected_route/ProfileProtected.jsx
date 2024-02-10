import React from 'react'
import { useAuth } from '../contexts/auth'
import { Navigate, Outlet } from 'react-router-dom'

const ProfileProtected = () => {
  const { auth, setAuth } = useAuth()
  //   console.log(auth.user.role)

  return auth?.user ? <Outlet /> : <Navigate to="/" />
}

export default ProfileProtected
