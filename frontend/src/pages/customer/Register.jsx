import { NavLink, useNavigate } from 'react-router-dom'
import Layout from '../../Layout/Layout'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
// import { useAuth } from '../../contexts/auth'
import axios from 'axios'

export default function Register() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  // const { auth, setAuth } = useAuth()

  const registerHandle = async (e) => {
    e.preventDefault()
    console.log(username, email, password)
    if (username == '' || email == '' || password == '') {
      toast.error('All fields are required !')
    }
    try {
      const result = await fetch('http://localhost:3000/api/v1/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      })
      const response = await result.json()
      console.log(response)
      if (response && response.success) {
        toast.success(response.message)
        // setAuth({
        //   ...auth,
        //   user: response.user,
        //   token: response.token,
        // })
        localStorage.setItem('user', JSON.stringify(response.user))
        localStorage.setItem('token', JSON.stringify(response.token))
        navigate('/')
      } else {
        toast.error(response.message)
      }
    } catch (error) {
      toast.error('Something went wrong')
    }
  }

  return (
    <Layout title="register">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Register
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            action="#"
            method="POST"
            encType="multipart/form-data"
          >
            <div className="flex items-center border-b border-indigo-600 py-2">
              <input
                className="text-gray-600 appearance-none bg-transparent border-none w-full  mr-3 py-1 px-2 leading-tight focus:outline-none"
                type="text"
                placeholder="Username"
                aria-label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="flex  items-center border-b border-indigo-600 py-3">
              <input
                className=" text-gray-600 appearance-none bg-transparent border-none w-full  mr-3 py-1 px-2 leading-tight focus:outline-none"
                type="email"
                placeholder="Your email address"
                aria-label="Full name"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex items-center border-b border-indigo-600 py-2">
              <input
                className=" text-gray-600 appearance-none bg-transparent border-none w-full  mr-3 py-1 px-2 leading-tight focus:outline-none"
                type="password"
                placeholder="Password"
                aria-label="Full name"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={registerHandle}
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            <span>Have an account </span>
            <NavLink
              to="/login"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              login
            </NavLink>
          </p>
        </div>
      </div>
    </Layout>
  )
}
