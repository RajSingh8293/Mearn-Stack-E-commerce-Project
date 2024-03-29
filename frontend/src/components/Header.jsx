import React, { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Avatar from '@mui/material/Avatar'
import { deepPurple } from '@mui/material/colors'
import { MdOutlineAddShoppingCart } from 'react-icons/md'
import { NavLink, useNavigate } from 'react-router-dom'
// import { useAuth } from '../contexts/auth'

const navigation = [
  { name: 'Home', href: '/', current: true },
  { name: 'Shop', href: '/shop', current: false },
  { name: 'Cart', href: '/cart', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Header() {
  // const { auth, setAuth } = useAuth()
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'))
  // console.log(user?.role)

  const logout = () => {
    // setAuth({
    //   ...auth,
    //   user: null,
    //   token: '',
    // })
    localStorage.removeItem('user')
    navigate('/login')
  }
  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <NavLink to="/">
                    <h1 className="text-2xl text-white font-bold">
                      Raj Technical
                    </h1>
                  </NavLink>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? 'bg-gray-900 text-white'
                            : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium',
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                    {user?.role == 'Admin' && (
                      <NavLink
                        to="/dashboard"
                        className="text-gray-300  hover:text-white px-3 py-2 text-sm font-medium"
                      >
                        Dashboard
                      </NavLink>
                    )}

                    {user?.role === 'Customer' && (
                      <NavLink
                        to="/orders"
                        className="text-gray-300  hover:text-white px-3 py-2 text-sm font-medium"
                      >
                        Orders
                      </NavLink>
                    )}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <NavLink to="/cart">
                  <button
                    type="button"
                    className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View notifications</span>

                    <MdOutlineAddShoppingCart
                      className="h-6 w-6"
                      aria-hidden="true"
                    />
                  </button>
                </NavLink>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      {user ? (
                        <Avatar
                          sx={{ bgcolor: deepPurple[500] }}
                          className="capitalize"
                        >
                          {user?.username?.slice(0, 1)}
                          {/* {user.user?.username} */}
                        </Avatar>
                      ) : (
                        <Avatar sx={{ bgcolor: deepPurple[500] }}>A</Avatar>
                      )}
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {user && (
                        <Menu.Item>
                          {({ active }) => (
                            <NavLink
                              to="/profile"
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700',
                              )}
                            >
                              Profile
                            </NavLink>
                          )}
                        </Menu.Item>
                      )}

                      {user ? (
                        <Menu.Item>
                          {({ active }) => (
                            <NavLink
                              to="/login"
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700',
                              )}
                              onClick={logout}
                            >
                              Logout
                            </NavLink>
                          )}
                        </Menu.Item>
                      ) : (
                        <Menu.Items>
                          <Menu.Item>
                            {({ active }) => (
                              <NavLink
                                to="/login"
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700',
                                )}
                              >
                                Login
                              </NavLink>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <NavLink
                                to="/register"
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700',
                                )}
                              >
                                Register
                              </NavLink>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      )}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium',
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
