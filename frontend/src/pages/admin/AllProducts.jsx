import React, { useContext, useEffect, useState } from 'react'
// import { products } from '../../Data/products'
// import { store } from '../../Contexts/ContextStore'
// import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/auth'
import Layout from '../../Layout/Layout'
import AdminNav from './AdminNav'
import { toast } from 'react-toastify'

const AllProducts = () => {
  const [products, setProducts] = useState([])
  // const [filterProducts, setFilterProducts] = useState([])
  // const [womenfilterProducts, setWomenFilterProducts] = useState([])
  const [category, setCategory] = useState([])
  // const { auth, setAuth } = useAuth()
  const navigate = useNavigate()
  const token = JSON.parse(localStorage.getItem('token'))

  const getAllCategory = async () => {
    const result = await fetch('http://localhost:3000/api/v1/categories')
    const response = await result.json()
    // console.log(response.categories)
    if (response?.success) {
      setCategory(response?.categories)
    }
  }

  const getAllProducts = async () => {
    const result = await fetch('http://localhost:3000/api/v1/products')

    const response = await result.json()
    console.log(response)
    const data = await response.products
    // const filterdata = await data.filter(
    //   (cat) => cat.category.name == 'Men Clothes',
    // )
    // setFilterProducts(filterdata)

    // const filterdataWomen = await data.filter(
    //   (cat) => cat.category.name == 'Women Clothes',
    // )
    // setWomenFilterProducts(filterdataWomen)

    setProducts(data)
  }

  const updateProduct = (id) => {
    navigate(`/dashboard/updateproduct/${id}`)
  }
  const deleteProduct = async (id) => {
    const result = await fetch(`http://localhost:3000/api/v1/product/${id}`, {
      method: 'delete',
      headers: {
        // authorization: `bearer ${auth.token}`,
        authorization: `bearer ${token}`,
      },
    })
    const response = await result.json()
    console.log(response)
    if (response) {
      toast.success(response.message)
      getAllProducts()
    }
  }

  useEffect(() => {
    getAllProducts()
    getAllCategory()
  }, [])

  return (
    // <Layout>
    <Layout>
      <section className="flex">
        <div className="w-[20%]">
          <AdminNav />
        </div>
        <div className="w-[80%] ">
          {/* <div>
            <div>
              <ul>
                {filterProducts.map((data) => (
                  <li key={data._id}>{data.name}</li>
                ))}
              </ul>
              <ul>
                {womenfilterProducts.map((data) => (
                  <li key={data._id}>{data.name}</li>
                ))}
              </ul>
            </div>
            <div className="w-[90%] flex justify-center py-8 ">
              <table className="w-full lg:max-w-[800px] md:max-w-[800px]">
                <thead>
                  <tr>
                    <th className="py-2">Image</th>
                  </tr>
                </thead>
                <tbody>
                  {filterProducts.map((item) => (
                    <tr key={item._id}>
                      <td className=" border px-4 py-2 h-[80px] w-[100px]">
                        <img
                          className="h-[100%]"
                          src={item.productImage}
                          alt=""
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div> */}
          <section className=" w-[100%]">
            <h1 className="text-center pt-5 text-2xl font-bold underline">
              All Products ({products?.length})
            </h1>
            <div className="w-[90%] flex justify-center py-8 ">
              <table className="w-full lg:max-w-[800px] md:max-w-[800px]">
                <thead>
                  <tr>
                    <th className="py-2">Image</th>
                    <th className="py-2">Name</th>
                    <th className="py-2">Category</th>
                    <th className="py-2">Price</th>
                    <th className="py-2">Operations</th>
                  </tr>
                </thead>
                <tbody>
                  {products?.map((item) => (
                    <tr key={item._id}>
                      <td className=" border px-4 py-2 h-[80px] w-[100px]">
                        <img
                          className="h-[100%]"
                          src={item?.productImage?.url}
                          alt=""
                        />
                      </td>
                      <td className="border px-4 py-2">{item.name}</td>
                      {/* {category.map((cat) => (
                        <td className="border px-4 py-2" key={cat._id}>
                          {cat.name}
                        </td>
                      ))} */}
                      <td className="border px-4 py-2">{item.category.name}</td>
                      <td className="border px-4 py-2">${item.price}</td>
                      <td className="border px-2 mx-4 my-2">
                        {/* <Link
                          to={`/dashboard/updateproduct/${item._id}`}
                          className="mr-3"
                        > */}
                        <button
                          className="bg-green-400 py-2 px-3 rounded"
                          onClick={() => updateProduct(item._id)}
                        >
                          Update
                        </button>
                        {/* </Link> */}
                        <button
                          className="bg-red-400 py-2 px-3 rounded"
                          onClick={() => deleteProduct(item._id)}
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
    // </Layout>
  )
}

export default AllProducts
