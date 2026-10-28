import React, { useState, useEffect } from "react";
import Layout from "./../components/layout/Layout";
<<<<<<< HEAD
=======
import "../Styles/ProductDetails.css";
>>>>>>> modified/main
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
<<<<<<< HEAD
=======

>>>>>>> modified/main
const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [cart, setCart] = useCart();

<<<<<<< HEAD
  //initalp details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);
  //getProduct
  const getProduct = async () => {
   try {
  const { data } = await axios.get(
    `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`
  );
=======
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`
      );
>>>>>>> modified/main
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
<<<<<<< HEAD
  //get similar product
=======

>>>>>>> modified/main
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
<<<<<<< HEAD
  return (
    <Layout>
      <div className="row container mt-2">
        <div className="col-md-6">
          <img
            src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
            className="card-img-top"
            alt={product.name}
            height="300"
            width={"350px"}
          />
        </div>
        <div className="col-md-6 ">
          <h1 className="text-center">Product Details</h1>
          <h6>Name : {product.name}</h6>
          <h6>Description : {product.description}</h6>
          <h6>Price : {product.price}</h6>
          <h6>Category : {product?.category?.name}</h6>
          <button
            className="btn btn-secondary ms-1"
            onClick={() => {
              const nextCart = [...cart, product];
              setCart(nextCart);
              localStorage.setItem("cart", JSON.stringify(nextCart));
              toast.success("Item Added to cart");
            }}
          >
            ADD TO CART
          </button>
        </div>
      </div>
      <hr />
      <div className="row container">
        <h6>Similar Products</h6>
        {relatedProducts.length < 1 && (
          <p className="text-center">No Similar Products found</p>
        )}
        <div className="d-flex flex-wrap">
          {relatedProducts?.map((p) => (
            <div className="card m-2" style={{ width: "18rem" }} key={product._id}>
              <img
                src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p?._id}`}
                className="card-img-top"
                alt={product.name}
              />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description.substring(0, 30)}...</p>
                <p className="card-text"> $ {product.price}</p>
                <button
                  className="btn btn-primary ms-1"
                  onClick={() => navigate(`/product/${product.slug}`)}
                >
                  More Details
                </button>
                <button
                  className="btn btn-secondary ms-1"
                  onClick={() => {
                    const nextCart = [...cart, p];
                    setCart(nextCart);
                    localStorage.setItem("cart", JSON.stringify(nextCart));
                    toast.success("Item Added to cart");
                  }}
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          ))}
        </div>
=======

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
>>>>>>> modified/main
      </div>
    </Layout>
  );
};

<<<<<<< HEAD
export default ProductDetails;
=======
export default ProductDetails;
>>>>>>> modified/main
