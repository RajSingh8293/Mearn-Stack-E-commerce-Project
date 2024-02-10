import React, { Fragment } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/auth'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', current: true },
  { name: 'All-Products', href: '/dashboard/allproducts', current: false },
  { name: 'Add-Product', href: '/dashboard/addproduct', current: false },
  { name: 'Users', href: '/dashboard/users', current: false },
  { name: 'All-Category', href: '/dashboard/categories', current: false },
  { name: 'Add-Category', href: '/dashboard/category', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function AdminNav() {
  const { auth, setAuth } = useAuth()

  return (
    <section>
      <div className="w-20% bg-gray-800 p-2 h-[100vh] pt-10">
        <div className="flex flex-col justify-start gap-3 px-10">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={classNames(
                item.current
                  ? 'bg-gray-900 text-white '
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                'rounded-md px-3 py-2 text-sm font-medium',
              )}
              aria-current={item.current ? 'page' : undefined}
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      </div>
    </section>
  )
}
