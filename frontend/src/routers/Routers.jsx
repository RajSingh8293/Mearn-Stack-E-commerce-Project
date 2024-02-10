import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/customer/Home'
import Shop from '../pages/customer/Shop'
import Cart from '../pages/customer/Cart'
import ProductDetails from '../pages/customer/ProductDetails'
import Nopage from '../pages/customer/Nopage'
import Login from '../pages/customer/Login'
import Register from '../pages/customer/Register'
import AllProducts from '../pages/admin/AllProducts'
import Orders from '../pages/admin/Orders'
import Dashboard from '../pages/admin/Dashboard'
import ProtectedRoute from '../protected_route/AdminProtectedRoute'
import Users from '../pages/admin/Users'
import AddProduct from '../pages/admin/AddProduct'
import UserOrders from '../pages/customer/Orders'
import Profile from '../pages/customer/Profile'
import UserProtected from '../protected_route/UserProtected'
import ProfileProtected from '../protected_route/ProfileProtected'
import UpdateProduct from '../pages/admin/UpdateProduct'
import AllCategory from '../pages/admin/AllCategory'
import AddCategory from '../pages/admin/AddCategory'
import UpdateCategory from '../pages/admin/UpdateCategory'
import AdminProtectedRoute from '../protected_route/AdminProtectedRoute'

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/productdetails/:id" element={<ProductDetails />} />
      <Route path="*" element={<Nopage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* <Route path="/" element={<ProfileProtected />}>
      </Route> */}

      <Route path="/" element={<UserProtected />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/orders" element={<UserOrders />} />
      </Route>

      <Route path="/" element={<AdminProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/allproducts" element={<AllProducts />} />
        <Route path="/dashboard/users" element={<Users />} />
        <Route path="/dashboard/addproduct" element={<AddProduct />} />
        <Route
          path="/dashboard/updateproduct/:id"
          element={<UpdateProduct />}
        />
        <Route path="/dashboard/orders" element={<Orders />} />
        <Route path="/dashboard/categories" element={<AllCategory />} />
        <Route path="/dashboard/category" element={<AddCategory />} />
        <Route
          path="/dashboard/updatecategory/:id"
          element={<UpdateCategory />}
        />
      </Route>
    </Routes>
  )
}

export default Routers
