import React, { useState, useEffect } from "react";
import Layout from "./../components/layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import axios from "axios";
import toast from "react-hot-toast";
import "../Styles/ProductDetails.css";

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useCart();

  useEffect(() => {
    let active = true;

    const getProduct = async () => {
      setLoading(true);
      setProduct(null);
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`
        );
        if (active) setProduct(data?.product || null);
      } catch (error) {
        console.error("Unable to load product details:", error);
        if (active) setProduct(null);
      } finally {
        if (active) setLoading(false);
      }
    };

    if (params.slug) getProduct();
    return () => {
      active = false;
    };
  }, [params.slug]);

  const addToCart = (item) => {
    const nextCart = [...cart, item];
    setCart(nextCart);
    localStorage.setItem("cart", JSON.stringify(nextCart));
    toast.success("Item added to cart");
  };

  return (
    <Layout
      title={product?.name ? `${product.name} — LuxeMart` : "Product — LuxeMart"}
      currentProduct={product}
    >
      <div className="product-detail-page">
        {loading ? (
          <p className="product-detail-message" role="status">
            Loading product...
          </p>
        ) : !product ? (
          <p className="product-detail-message" role="alert">
            Product not found.
          </p>
        ) : (
          <>
            <div className="page-hero">
              <div className="page-hero-inner animate-fade-up">
                <p className="page-hero-subtitle">Product details</p>
                <h1 className="page-hero-title">{product.name}</h1>
              </div>
            </div>

            <div className="product-detail-container">
              <div className="product-detail-grid">
                <div className="product-detail-gallery">
                  {product._id && (
                    <img
                      src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
                      alt={product.name}
                    />
                  )}
                </div>

                <div className="product-detail-info">
                  <p className="product-detail-eyebrow">Product details</p>
                  <h2 className="product-detail-title">{product.name}</h2>
                  <p className="product-detail-price">₹ {product.price}</p>
                  <p className="product-detail-desc">{product.description}</p>

                  <div className="product-detail-meta">
                    {product?.category?.name && (
                      <span className="product-detail-tag">
                        {product.category.name}
                      </span>
                    )}
                  </div>

                  <div className="product-detail-actions">
                    <button
                      type="button"
                      className="btn-primary-modern"
                      onClick={() => addToCart(product)}
                    >
                      Add to cart
                    </button>
                    <button
                      type="button"
                      className="btn-ghost-modern"
                      onClick={() => navigate("/cart")}
                    >
                      View cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default ProductDetails;
