import React from 'react'
import Layout from '../../Layout/Layout'
import { useAuth } from '../../contexts/auth'

const Profile = () => {
  // const { auth } = useAuth()
  const user = JSON.parse(localStorage.getItem('user'))

  return (
    <Layout>
      <section className="px-10 p-5">
        <div className="py-2">
          <h1 className="text-3xl">User Profile</h1>
        </div>
        <div>
          <h1 className="py-2">
            <span className="font-bold capitalize mr-2">Name :</span>

            <span className="capitalize">{user?.username} !</span>
          </h1>
          <h1 className="py-2">
            <span className="font-bold capitalize mr-2">Role :</span>

            <span className="capitalize">{user?.role} !</span>
          </h1>
          <p>
            <span className="font-bold capitalize mr-2">Email :</span>
            <span> {user?.email}</span>
          </p>
        </div>
      </section>
    </Layout>
  )
}

export default Profile
