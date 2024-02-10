import React, { useContext, useEffect, useState } from 'react'

import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/auth'
import Layout from '../../Layout/Layout'
import AdminNav from './AdminNav'
import { toast } from 'react-toastify'

const Users = () => {
  const [users, setUsers] = useState([])
  const { auth, setAuth } = useAuth()
  const token = JSON.parse(localStorage.getItem('token'))

  // console.log(users)

  const getUsers = async () => {
    const result = await fetch('http://localhost:3000/api/v1/users', {
      headers: {
        // authorization: `bearer ${auth.token}`,
        authorization: `bearer ${token}`,
      },
    })
    const response = await result.json()
    console.log(response.users)
    setUsers(response.users)
  }

  // const deleteProduct = (data) => {
  //   console.log(data)
  // }

  const deleteUser = async (id) => {
    const result = await fetch(
      `http://localhost:3000/api/v1/delete-user/${id}`,
      {
        method: 'delete',
      },
    )
    const response = await result.json()
    if (response?.success) {
      toast.success(response.message)
      console.log(response)
      getUsers()
    }
  }
  useEffect(() => {
    getUsers()
  }, [])

  return (
    <Layout>
      <section className="flex">
        <div className="w-[20%]">
          <AdminNav />
        </div>
        <div className="w-[80%]">
          <section className=" w-[100%] px-10">
            <h1 className="text-center pt-5 text-2xl font-bold underline">
              All Users ({users?.length})
            </h1>
            <div className="w-[90%] flex justify-center py-8 ">
              <table className="w-full lg:max-w-[800px] md:max-w-[800px]">
                <thead>
                  <tr>
                    <th className="py-2">Id</th>
                    <th className="py-2">Name</th>
                    <th className="py-2">Email</th>
                    <th className="py-2">Role</th>
                    <th className="py-2">Operations</th>
                  </tr>
                </thead>
                <tbody>
                  {users?.map((user) => (
                    <tr key={user._id}>
                      <td className="border px-4 py-2">{user._id}</td>
                      <td className="border px-4 py-2">{user.username}</td>
                      <td className="border px-4 py-2">{user.email}</td>
                      <td className="border px-4 py-2">{user.role}</td>
                      <td className="border px-2 mx-4 my-2">
                        <button className="bg-blue-400 py-2 px-3 mr-2 rounded">
                          <Link to={`dashboard/update-user/${user._id}`}>
                            Update
                          </Link>
                        </button>
                        <button
                          className="bg-red-400 py-2 px-3 rounded"
                          onClick={() => deleteUser(user._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </section>
    </Layout>
  )
}

export default Users
