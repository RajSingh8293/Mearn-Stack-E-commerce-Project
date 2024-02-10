import React from 'react'
// import FacebookIcon from '@mui/icons-material/Facebook'
// import LinkedInIcon from '@mui/icons-material/LinkedIn'
// import TwitterIcon from '@mui/icons-material/Twitter'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <section className="">
      <hr className="my-10" />
      <div className="mx-10 flex justify-between py-20 flex-wrap gap-10 ">
        <div className="footer-section">
          <h3 className="text-4xl font-semibold mb-4 text-gray-800 ">
            E-Commerce
          </h3>
          <p className="my-4 opacity-9 text-gray-800">
            Text: +00(234)23-45-666
          </p>
          <p className="my-4 opacity-9 text-gray-800">Mon – Fri: 8 am – 8 pm</p>
          <p className="my-4 opacity-9 text-gray-800">Sat – Sun: 8 am – 7 pm</p>
        </div>
        <div className="footer-section ">
          <h3 className="text-xl font-semibold mb-4 text-gray-800 uppercase">
            ABOUT{' '}
          </h3>
          <p className="my-4 opacity-9 text-gray-800"> Our Story </p>
          <p className="my-4 opacity-9 text-gray-800"> Careers </p>
          <p className="my-4 opacity-9 text-gray-800"> Influencers </p>
          <p className="my-4 opacity-9 text-gray-800"> Join our team </p>
        </div>
        <div className="footer-section ">
          <h3 className="text-xl font-semibold mb-4 uppercase">
            Customer Services{' '}
          </h3>
          <p className="my-4 opacity-9 text-gray-800"> Contact Us </p>
          <p className="my-4 opacity-9 text-gray-800"> Customer Services </p>
          <p className="my-4 opacity-9 text-gray-800"> Find Store </p>
          <p className="my-4 opacity-9 text-gray-800"> Book Anpointment </p>
          <p> Shpping & Returns </p>
        </div>

        <div className="footer-section ">
          <h3 className="text-xl font-semibold uppercase">Sigup for email</h3>
          <p className="pt-4 opacity-9 text-gray-800">
            Enjoy 15% off* your forst order when sign up to our newsletter
          </p>

          <div className="my-5 border flex justify-between rounded overflow-hidden items-center bg-slate-50 w-[100%] h-[50px] border-1 ">
            <input
              type="email "
              className="h-[100%] px-4 w-[100%] outline-none "
              placeholder="Your e-email address"
            />{' '}
            <button className="w-[100px] px-4 bg-black text-white  h-[100%] flex justify-center items-center">
              Subscribe
            </button>
          </div>
          {/* <div className="social-media flex gap-4 pt-3">
            <p>
              <Link to="/">
                <FacebookIcon className="font-size-40px" />
              </Link>
            </p>
            <p>
              <Link to="/">
                <LinkedInIcon className="w-[40px]" />
              </Link>
            </p>
            <p>
              <Link to="/">
                <TwitterIcon className="w-[40px]" />
              </Link>
            </p>
          </div> */}
        </div>
      </div>

      <hr />
      <div className="my-5 flex justify-center items-center">
        <h3 className="text-gray-600">All Rights Reserved.</h3>
      </div>
    </section>
  )
}

export default Footer
