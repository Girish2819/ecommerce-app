import React from 'react'
import Layout from '../components/layout/Layout'

const Policy = () => {
  return (
    <Layout Title={"Policy"}>
       <div className="row policy">
        <div className="col-md-6">
          <img 
            src="/images/policY.webp"
            alt="about us"
            style={{ width: '100%' }}
          />
        </div>
        <div className="col-md-6">
          <h1 className="text-black text-center">OUR POLICY</h1>
          <p className="text-justify mt-2">
            Welcome to our e-commerce platform! We are committed to providing you with a safe and enjoyable shopping experience. Our policies are designed to ensure transparency, security, and customer satisfaction.
          </p>
          <p className="mt-3">
            We prioritize your privacy and data security. All transactions are encrypted, and we do not share your personal information with third parties without your consent.
          </p>
          <p className="mt-3">
            For any queries or concerns, please feel free to contact our customer support team. We are here to assist you 24/7.
          </p>
          <p className="mt-3">
            Thank you for choosing us for your shopping needs. We look forward to serving you with the best products and services!
          </p>
        </div>
      </div>
    </Layout>
  )
}

export default Policy