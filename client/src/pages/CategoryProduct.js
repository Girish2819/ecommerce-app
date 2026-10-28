import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
<<<<<<< HEAD
import "../Styles/CategoryProduct.css"; 
=======
import "../Styles/CategoryProduct.css";
import "../Styles/Homepage.css";
>>>>>>> modified/main

const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [cart, setCart] = useCart();

  useEffect(() => {
    if (params?.slug) getProductsByCat();
  }, [params?.slug]);

  const getProductsByCat = async () => {
    try {
<<<<<<< HEAD
     const { data } = await axios.get(
  `${process.env.REACT_APP_API}/api/v1/product/product-category/${params.slug}`
);
=======
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-category/${params.slug}`
      );
>>>>>>> modified/main
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  return (
<<<<<<< HEAD
    <Layout>
      <div className="category-page">
        {/* Heading */}
        <div className="category-header">
          <h2>Category - {category?.name}</h2>
          <p>{products?.length} results found</p>
        </div>

        {/* Product Grid */}
        <div className="product-grid">
          {products?.map((p) => (
            <div className="product-card" key={p._id}>
              <img
                src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                alt={p.name}
              />

              <div className="product-info">
                <h4>{p.name}</h4>
                <p>{p.description.substring(0, 40)}...</p>
                <h5>₹ {p.price}</h5>

                <div className="product-buttons">
                  <button
                    className="btn details-btn"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More Details
                  </button>

                  <button
                    className="btn cart-btn"
                    onClick={() => {
                      const nextCart = [...cart, p];
                      setCart(nextCart);
                      localStorage.setItem("cart", JSON.stringify(nextCart));
                      toast.success("Item Added to cart");
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
=======
    <Layout title={category?.name ? `${category.name} — LuxeMart` : "Category — LuxeMart"}>
      <div className="category-page">
        <div className="page-hero">
          <div className="page-hero-inner animate-fade-up">
            <p className="page-hero-subtitle">Category</p>
            <h1 className="page-hero-title">{category?.name || "Products"}</h1>
          </div>
        </div>

        <div className="category-page-content">
          <div className="category-page-meta">
            <h2>{products?.length} items</h2>
            <p>Hand-picked for this collection</p>
          </div>

          <div className="products-grid">
            {products?.map((p) => (
              <article className="product-card" key={p._id}>
                <div className="product-card-img-wrap">
                  <img
                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                    alt={p.name}
                  />
                </div>
                <div className="product-card-body">
                  <h5 className="product-card-name">{p.name}</h5>
                  <p className="product-card-desc">
                    {p.description.substring(0, 40)}...
                  </p>
                  <p className="product-card-price">₹ {p.price}</p>
                  <div className="product-card-actions">
                    <button
                      type="button"
                      className="btn-details"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      Details
                    </button>
                    <button
                      type="button"
                      className="btn-add-cart"
                      onClick={() => {
                        const nextCart = [...cart, p];
                        setCart(nextCart);
                        localStorage.setItem("cart", JSON.stringify(nextCart));
                        toast.success("Item added to cart");
                      }}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
>>>>>>> modified/main
        </div>
      </div>
    </Layout>
  );
};

<<<<<<< HEAD
export default CategoryProduct;
=======
export default CategoryProduct;
>>>>>>> modified/main
