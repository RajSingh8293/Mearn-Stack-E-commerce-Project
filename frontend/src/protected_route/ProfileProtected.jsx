import React from 'react'
import { useAuth } from '../contexts/auth'
import { Navigate, Outlet } from 'react-router-dom'

const ProfileProtected = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  return user?.user ? <Outlet /> : <Navigate to="/" />
}

export default ProfileProtected
