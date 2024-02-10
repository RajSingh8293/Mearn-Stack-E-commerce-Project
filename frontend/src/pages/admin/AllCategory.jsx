import React, { useContext, useEffect, useState } from 'react'
// import { products } from '../../Data/products'
// import { store } from '../../Contexts/ContextStore'
// import { useDispatch } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../contexts/auth'
import Layout from '../../Layout/Layout'
import AdminNav from './AdminNav'
import { toast } from 'react-toastify'

const AllCategory = () => {
  const [category, setCategor] = useState([])
  const { auth, setAuth } = useAuth()
  const navigate = useNavigate()
  const { id } = useParams()
  const token = JSON.parse(localStorage.getItem('token'))

  // console.log(category)

  const getAllCategory = async () => {
    const result = await fetch('http://localhost:3000/api/v1/categories')
    const response = await result.json()
    setCategor(response?.categories)
  }

  const deleteCategory = async (id) => {
    // console.log(data)
    const result = await fetch(`http://localhost:3000/api/v1/category/${id}`, {
      method: 'DELETE',
      // headers: {
      //   // authorization: `bearer ${auth.token}`,
      //   authorization: `bearer ${token}`,
      // },
    })
    const res = await result.json()
    if (res) {
      toast.success(res.message)
    }
    console.log(res)
    getAllCategory()
  }

  useEffect(() => {
    getAllCategory()
  }, [])

  return (
    // <Layout>
    <Layout>
      <section className="flex">
        <div className="w-[20%]">
          <AdminNav />
        </div>
        <div className="w-[80%]">
          <section className=" w-[100%] px-10">
            <h1 className="text-center pt-5 text-2xl font-bold underline">
              All Categories ({category?.length})
            </h1>
            <div className="w-[90%] flex justify-center py-8 ">
              <table className="w-full lg:max-w-[800px] md:max-w-[800px]">
                <thead>
                  <tr>
                    <th className="py-2">Id</th>
                    <th className="py-2">Category Name</th>
                    <th className="py-2">Operations</th>
                  </tr>
                </thead>
                <tbody>
                  {category.map((item) => (
                    <tr key={item._id}>
                      <td className="border px-4 py-2">{item._id}</td>
                      <td className="border px-4 py-2">{item.name}</td>
                      <td className="border px-2 mx-4 my-2">
                        <Link
                          to={`/dashboard/updatecategory/${item._id}`}
                          className="mr-3"
                        >
                          <button
                            className="bg-green-400 py-2 px-3 rounded"
                            // onClick={() => updateProduct(item)}
                          >
                            Update
                          </button>
                        </Link>
                        <button
                          className="bg-red-400 py-2 px-3 rounded"
                          onClick={() => deleteCategory(item._id)}
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

export default AllCategory
