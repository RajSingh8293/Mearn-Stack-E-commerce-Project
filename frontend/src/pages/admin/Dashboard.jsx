import React from 'react'
// import AdminNav from './AdminNav'
import Layout from '../../Layout/Layout'
import AdminNav from './AdminNav'
import AllProducts from './AllProducts'

const Dashboard = () => {
  return (
    <Layout>
      <section className="flex pb-10">
        <div className="w-[20%]">
          <AdminNav />
        </div>
        <div className="w-[80%] mx-auto p-5 flex gap-4">
          <div className="bg-red-400 rounded-full p-5">
            Total Products : 1280{' '}
          </div>
          <div className="bg-red-400 rounded-full p-5">
            Total Earning : $ 12080{' '}
          </div>
          <div className="bg-red-400 rounded-full p-5">
            Total Orders : 12080{' '}
          </div>
          <div className="bg-red-400 rounded-full p-5">Total Users : 180 </div>
        </div>
      </section>
    </Layout>
  )
}

export default Dashboard
