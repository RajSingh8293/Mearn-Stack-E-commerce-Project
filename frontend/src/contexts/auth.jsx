import React, { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: '',
  })
  useEffect(() => {
    const data = localStorage.getItem('user')
    if (data) {
      const parseData = JSON.parse(data)
      setAuth({
        ...auth,
        user: parseData.user,
        token: parseData.token,
      })
    }
  }, [])
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

// custom hook
export const useAuth = () => {
  return useContext(AuthContext)
}
