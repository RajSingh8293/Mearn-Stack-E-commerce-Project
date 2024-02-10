import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAuth } from '../../contexts/auth'
import Layout from '../../Layout/Layout'
import AdminNav from './AdminNav'

const UpdateProduct = () => {
  const [categories, setCategories] = useState([])
  const [name, setName] = useState('')
  const [title, setTitle] = useState('')
  const [productImage, setProductImage] = useState(null)
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')
  const [colors, setColors] = useState('')
  const [description, setDescription] = useState('')
  const [shipping, setShipping] = useState('')
  const [stock, setStock] = useState('')
  const navigate = useNavigate()
  const { auth } = useAuth()
  const { id } = useParams()
  const token = JSON.parse(localStorage.getItem('token'))
  const user = JSON.parse(localStorage.getItem('user'))

  const getProductById = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/v1/product/${id}`)

      const result = await res.json()
      console.log(result)
      setName(result.productById.name)
      setTitle(result.productById.title)
      setProductImage(result.productById.productImage)
      setPrice(result.productById.price)
      setCategory(result.productById.category)
      setColors(result.productById.colors)
      setDescription(result.productById.description)
      setShipping(result.productById.shipping)
      setStock(result.productById.stock)

      // toast.success(res.message)
    } catch (error) {
      toast.error('Something went wrong')
    }
  }

  const getAllCategory = async () => {
    const result = await fetch('http://localhost:3000/api/v1/categories')
    const response = await result.json()
    if (response?.success) {
      setCategories(response?.categories)
    }
  }

  const updateProduct = async (e) => {
    e.preventDefault()
    console.log(
      name,
      title,
      productImage,
      price,
      category,
      colors,
      description,
      shipping,
      stock,
    )

    try {
      let data = new FormData()
      data.append('userId', user._id)
      data.append('category', category)
      data.append('name', name)
      data.append('title', title)
      productImage && data.append('productImage', productImage)
      data.append('price', price)
      data.append('colors', colors)
      data.append('description', description)
      data.append('shipping', shipping)
      data.append('stock', stock)
      const res = await fetch(`http://localhost:3000/api/v1/product/${id}`, {
        method: 'PUT',
        headers: {
          // Authorization: `bearer ${auth.token}`,
          Authorization: `bearer ${token}`,
        },
        body: data,
      })

      const result = await res.json()
      if (result?.success) {
        toast.success(result.message)
        navigate('/dashboard/allproducts')
      } else {
        toast.success(result.message)
      }

      console.log(result)
    } catch (error) {
      toast.error('Something went wrong')
    }
  }

  useEffect(() => {
    getProductById()
    getAllCategory()
  }, [])

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
                Update Product
              </h1>
              <div className="flex justify-center">
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
                  <div className="mb-3 ">
                    <h3 className="text-white mb-1">Title</h3>
                    <input
                      className="w-[100%] py-2 px-3 rounded outline-none border-black border-2"
                      type="text"
                      placeholder="Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <div className="mb-3 flex justify-between gap-2">
                    <div className="w-[100%]">
                      <h3 className="text-white mb-1">Image URL</h3>
                      <input
                        type="file"
                        className="w-[100%] py-2 px-3 rounded outline-none border-black border-2"
                        accept="image/*"
                        placeholder="Enter image url"
                        onChange={(e) => setProductImage(e.target.files[0])}
                      />
                    </div>
                    <div className="">
                      {productImage && (
                        <img className="w-[100px]" src={productImage} alt="" />
                      )}
                    </div>
                  </div>
                  <div className="mb-4">
                    <h3 className="text-white mb-1">Description</h3>
                    <input
                      type="text"
                      className="w-[100%] py-2 px-3 rounded outline-none border-black border-2"
                      placeholder="Description...."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  <div className="mb-4 flex justify-between gap-2">
                    <div className="w-[100%]">
                      <h3 className="text-white mb-1">Price</h3>
                      <input
                        type="text"
                        placeholder="$1000"
                        className="w-[100%] py-2 px-3 rounded outline-none border-black border-2"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="mb-4 flex justify-between gap-2">
                    <div className="w-[100%] ">
                      <h3 className="text-white mb-1">Category</h3>
                      <select
                        className="  w-[100%] py-2 px-3 rounded outline-none border-black border-2 "
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                      >
                        <option>Select category</option>
                        {categories?.map((cat) => (
                          <option key={cat._id} value={cat._id}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="w-[100%] ">
                      <h3 className="text-white mb-1">Colors</h3>

                      <select
                        className="w-[100%] py-2 px-3 rounded outline-none border-black border-2 "
                        value={colors}
                        onChange={(e) => setColors(e.target.value)}
                      >
                        <option>Select Color</option>
                        <option value="black">Black</option>
                        <option value="green">Green</option>
                        <option value="red">Red</option>
                        <option value="white">White</option>
                        <option value="brown">Brown</option>
                        <option value="gray">Gray</option>
                      </select>
                    </div>
                  </div>
                  <div className="mb-4 flex justify-between gap-2">
                    <div className="w-[100%] ">
                      <h3 className="text-white mb-1">Shipping</h3>
                      <select
                        className="w-[100%] py-2 px-3 rounded outline-none border-black border-2 "
                        value={shipping ? 'Yes' : 'No'}
                        onChange={(e) => setShipping(e.target.value)}
                      >
                        <option>Select Option</option>
                        <option value="0">No</option>
                        <option value="1">Yes</option>
                      </select>
                    </div>

                    <div className=" w-[100%]">
                      <h3 className="text-white mb-1">Stock</h3>
                      <input
                        type="number"
                        placeholder="1000"
                        className="w-[100%] py-2 px-3 rounded outline-none border-black border-2"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="mb-4 flex justify-center">
                    <button
                      variant="primary"
                      type="submit"
                      className="w-[100%] bg-black py-2 px-4 text-white rounded hover:bg-red-700"
                      onClick={updateProduct}
                    >
                      Update Product
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

export default UpdateProduct
