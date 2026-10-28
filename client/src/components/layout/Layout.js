<<<<<<< HEAD
import React from 'react'
import Header from './Header'
import Footer from './Footer'
import {Helmet} from 'react-helmet'
import { Toaster } from 'react-hot-toast';
  

const Layout = ({children, title ,description, keywords, author}) => {
  return (
    <div>
       <Helmet>
           <meta charSet="UTF-8" />
           <meta name="description" content={description} />
           <meta name="keywords" content={keywords} />
           <meta name="author" content={author} />
           <title>{title}</title>
        </Helmet>
     <Header />
     <main style={{minHeight: "75vh"}}>
        <Toaster/>
        {children}
     </main>
    <Footer />
    </div>

  )
}

export default Layout
=======
import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";
import ChatWidget from "./ChatWidget";

const Layout = ({
  children,
  title,
  description,
  keywords,
  author,
  currentProduct,
}) => {
  return (
    <div className="app-shell">
      <Helmet>
        <meta charSet="UTF-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main className="app-main animate-page">{children}</main>
      <Footer />
      <ChatWidget product={currentProduct} />
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            borderRadius: "12px",
            fontFamily: "var(--font-sans)",
          },
        }}
      />
    </div>
  );
};

export default Layout;
>>>>>>> modified/main
