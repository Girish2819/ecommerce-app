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
