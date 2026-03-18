import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import "../Styles/CategoryProduct.css"; 

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
      const { data } = await axios.get(
        `/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  return (
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
                src={`/api/v1/product/product-photo/${p._id}`}
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
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;