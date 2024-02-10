import React, { useEffect, useState } from 'react'
import Layout from '../../Layout/Layout'
// import data from '../../data/Data'
import { NavLink, json } from 'react-router-dom'
import { useAuth } from '../../contexts/auth'

const Home = () => {
  const { auth, setAuth } = useAuth()
  const user = JSON.parse(localStorage.getItem('user'))
  const [data, setData] = useState([])

  const getAllProducts = async () => {
    const result = await fetch('http://localhost:3000/api/v1/products')
    const data = await result.json()
    console.log(data.products)
    setData(data.products)
  }

  useEffect(() => {
    getAllProducts()
  }, [])
  return (
    <Layout title="Home">
      <section className="p-0 w-[100%] flex">
        {/* <pre>{JSON.stringify(auth, null, 4)}</pre> */}
        {/* <pre>{JSON.stringify(user, null, 4)}</pre> */}

        <div className="w-[50%] ">
          <img
            className="w-[100%] h-[100%] object-cover"
            // src="https://m.media-amazon.com/images/S/aplus-media/sc/2fb8a0f8-43a8-41e6-a317-bb551d32308b.__CR0,0,970,600_PT0_SX970_V1___.jpg"
            src="https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1200"
            alt=""
          />
        </div>
        <div className="w-[50%] ">
          <img
            className="w-[100%] h-[100%] object-cover"
            src="https://m.media-amazon.com/images/S/aplus-media/sc/2fb8a0f8-43a8-41e6-a317-bb551d32308b.__CR0,0,970,600_PT0_SX970_V1___.jpg"
            // src="https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1200"
            alt=""
          />
        </div>
      </section>

      <section>
        <div>
          <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                Products
              </h2>

              <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-5 xl:gap-x-8">
                {data.map((product) => (
                  <div
                    key={product._id}
                    className="group relative border rounded max-w-[250px]"
                  >
                    <div
                      className="w
                    h-[200px] flex justify-center aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-white lg:aspect-none group-hover:opacity-75 lg:h-[260px]"
                    >
                      <img
                        src={product.productImage.url}
                        alt={product.title}
                        className="w-[100%] object-cover"
                      />
                    </div>
                    <div className="flex justify-center ">
                      <button className="font-semibold bg-black w-full py-2 text-white z-10 hover:bg-red-700">
                        Add To Cart
                      </button>
                    </div>
                    <div className="px-3 py-4 flex justify-between">
                      <div>
                        <h3 className="text-sm text-gray-700">
                          <NavLink to="/shop">
                            <span
                              aria-hidden="true"
                              className="absolute inset-0"
                            />
                            {product.title}
                          </NavLink>
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          {product.color}
                        </p>
                      </div>

                      <p className="text-sm font-medium text-gray-900">
                        ${product.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default Home
