import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
// import { Helmet } from 'react-helmet'
import { Helmet, HelmetProvider } from 'react-helmet-async'
// import AdminNav from '../pages/admin/AdminNav'

const Layout = ({ children, title, description, keywords, auther }) => {
  return (
    <div>
      <HelmetProvider>
        <Helmet>
          <meta charSet="UTF-8" />
          <meta name="description" content={description} />
          <meta name="keywords" content={keywords} />
          <meta name="author" content={auther} />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>{title}</title>
        </Helmet>
        {/* {location.pathname.startsWith('/dashboard') ? <AdminNav /> : <Header />} */}
        <Header />
        <main>{children}</main>
        <Footer />
      </HelmetProvider>
    </div>
  )
}
Layout.defaultProps = {
  title: 'Ecommerce app - shop now',
  description: 'shop with ecommerce',
  keywords: 'mearn,react,node,mongodb',
  auther: 'learncode',
}

export default Layout
