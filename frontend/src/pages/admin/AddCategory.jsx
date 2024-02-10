import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAuth } from '../../contexts/auth'
import Layout from '../../Layout/Layout'
import AdminNav from './AdminNav'

const AddCategory = () => {
  const [name, setName] = useState('')
  const navigate = useNavigate()
  const { auth } = useAuth()
  const token = JSON.parse(localStorage.getItem('token'))

  const addCategory = async (e) => {
    e.preventDefault()
    console.log(name)

    try {
      const res = await fetch('http://localhost:3000/api/v1/category', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `bearer ${auth.token}`,
          Authorization: `bearer ${token}`,
        },
        body: JSON.stringify({ name }),
      })

      const result = await res.json()
      console.log(result)
      if (result) {
        toast.success(res.message)
        navigate('/dashboard/categories')
      }

      console.log(result)
    } catch (error) {
      toast.error('Something went wrong')
    }
  }

  return (
    <Layout title="Add-Product">
      <section className="flex">
        <div className="w-[20%]">
          <AdminNav />
        </div>
        <div className="w-[80%]">
          <section className="py-5">
            <div className="container mx-auto">
              <h1 className="text-3xl font-semibold underline text-center pb-5">
                Add Product
              </h1>
              <div className="flex justify-center ">
                <div className="addproduct_for bg-gray-600 w-[600px] py-3 px-4 rounded">
                  <div className="mb-3 ">
                    <h3 className="text-white mb-1">Name</h3>
                    <input
                      className="w-[100%] py-2 px-3 rounded outline-none border-black border-2"
                      type="text"
                      placeholder="T-Shirt"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="mb-4 flex justify-center">
                    <button
                      variant="primary"
                      type="submit"
                      className="w-[100%] bg-black py-2 px-4 text-white rounded hover:bg-red-700"
                      onClick={addCategory}
                    >
                      AddProduct
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </Layout>
  )
}

export default AddCategory
