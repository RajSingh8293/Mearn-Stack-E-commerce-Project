import React from 'react'
import Layout from '../../Layout/Layout'
import AdminNav from './AdminNav'

const Orders = () => {
  return (
    <Layout>
      <section className="flex">
        <div className="w-[20%]">
          <AdminNav />
        </div>
        <div className="w-[80%] p-5">
          <h1>Orders</h1>
        </div>
      </section>
    </Layout>
  )
}

export default Orders
