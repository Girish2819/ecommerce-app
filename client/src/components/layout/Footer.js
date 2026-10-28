<<<<<<< HEAD
import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='footer'>
        <h4 className='text-center text-white'>
         All right reserved &copy; {new Date().getFullYear()}
        </h4>
        <p className="text-center mt-3">
          <Link to="/About">About
          </Link> 
          |
          <Link to="/policy">Privacy policy
          </Link> 
          |
          <Link to="/contact">Contact</Link> 
          </p>
    </div>
  )
}

export default Footer
=======
import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner animate-fade-up">
        <p className="site-footer-brand">LuxeMart</p>
        <p className="site-footer-copy">
          All rights reserved © {new Date().getFullYear()}
        </p>
        <ul className="site-footer-links">
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/policy">Privacy Policy</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
>>>>>>> modified/main
