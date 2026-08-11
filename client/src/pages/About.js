import React from 'react'
import Layout from '../components/layout/Layout'

const About = () => {
  return (
    <Layout Title={"About-Us E-commerce App"}>
       <div className="row about">
        <div className="col-md-6">
          <img 
            src="/images/aboutus.jpg"
            alt="about us"
            style={{ width: '100%' }}
          />
        </div>
        <div className="col-md-6">
          <h1 className="text-black text-center">ABOUT US</h1>
          <p className="text-justify mt-2">
            Welcome to our e-commerce platform! We are dedicated to providing you with the best online shopping experience. Our mission is to offer a wide range of high-quality products at competitive prices, ensuring customer satisfaction every step of the way.
          </p>
          <p className="mt-3">
            Our team works tirelessly to curate a diverse selection of items, from electronics to fashion, home goods, and more. We believe in transparency, quality, and exceptional customer service.
          </p>
          <p className="mt-3">
            Thank you for choosing us for your shopping needs. We look forward to serving you!
          </p>
        </div>
      </div>
    </Layout>
  )
}
Layout.defaultProps = {
  Title: " E-commerce App shop-now",
  description: "mern stack project",
  keywords: "mern,react,node,mongodb",
  auther: "Girish Ranjan",
};
export default About