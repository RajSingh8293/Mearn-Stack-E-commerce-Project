import React from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AuthProvider } from './contexts/auth'
import Routers from './routers/Routers'

const App = () => {
  return (
    <AuthProvider>
      <ToastContainer />
      <Routers />
    </AuthProvider>
  )
}

export default App
