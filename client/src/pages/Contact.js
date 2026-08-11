import React from 'react'
import Layout from '../components/layout/Layout'
import { BiMailSend, BiPhoneCall, BiSupport } from 'react-icons/bi' // ✅ Import these icons

const Contact = () => {
  return (
    <Layout Title={"Contact Us"}>
      <div className="row contacts">
        <div className="col-md-6">
          <img 
            src="/images/contacT.webp"
            alt="contacts"
            style={{ width: '100%' }}
          />
        </div>
        <div className="col-md-4"> 
          <h1 className=" bg-black text-white text-center">CONTACT US</h1> 
          <p className="text-justify mt-2">
            Any query and info about product, feel free to call anytime. We are available 24x7.
          </p>
          <p className="mt-3">
            <BiMailSend /> : www.help@ecommerceapp.components
          </p>
          <p className="mt-3">
            <BiPhoneCall /> : +91 1234567890
          </p>
          <p className="mt-3">
            <BiSupport /> : 1800-123-4567 (toll free)
          </p>
        </div>
      </div>
    </Layout>
  )
}

export default Contact
