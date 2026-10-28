import React, { useState, useEffect } from "react";
import Layout from "./../components/layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import axios from "axios";
import toast from "react-hot-toast";

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [cart, setCart] = useCart();

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = (item) => {
    const nextCart = [...cart, item];
    setCart(nextCart);
    localStorage.setItem("cart", JSON.stringify(nextCart));
    toast.success("Item added to cart");
  };

  return (
    <Layout title={product.name ? `${product.name} — LuxeMart` : "Product — LuxeMart"} currentProduct={product}>
      <div className="product-detail-page">
        <div className="page-hero">
          <div className="page-hero-inner animate-fade-up">
            <p className="page-hero-subtitle">Product details</p>
            <h1 className="page-hero-title">{product.name || "Loading…"}</h1>
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
              <p className="product-detail-eyebrow">Featured item</p>
              <h2 className="product-detail-title">{product.name}</h2>
              <p className="product-detail-price">₹ {product.price}</p>
              <p className="product-detail-desc">{product.description}</p>

              <div className="product-detail-meta">
                {product?.category?.name && (
                  <span className="product-detail-tag">{product.category.name}</span>
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

        <section className="related-section">
          <h3 className="related-section-title">You may also like</h3>
          {relatedProducts.length < 1 ? (
            <p className="related-empty">No similar products found</p>
          ) : (
            <div className="related-grid">
              {relatedProducts?.map((p) => (
                <article className="related-card" key={p._id}>
                  <div className="related-card-img">
                    <img
                      src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p?._id}`}
                      alt={p.name}
                    />
                  </div>
                  <div className="related-card-body">
                    <h5>{p.name}</h5>
                    <p>{p.description?.substring(0, 30)}...</p>
                    <p className="related-card-price">₹ {p.price}</p>
                    <div className="related-card-actions">
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
                        onClick={() => addToCart(p)}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </Layout>
  );
};

export default ProductDetails;
