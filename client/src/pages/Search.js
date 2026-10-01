import React from "react";
import Layout from "./../components/layout/Layout";
import { useSearch } from "../context/search";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import "../Styles/Homepage.css";

const Search = () => {
  const [values] = useSearch();
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const count = values?.results?.length ?? 0;

  return (
    <Layout title="Search — LuxeMart">
      <div className="homepage-wrapper">
        <div className="page-hero">
          <div className="page-hero-inner animate-fade-up">
            <h1 className="page-hero-title">Search results</h1>
            <p className="page-hero-subtitle">
              {count < 1
                ? "No products matched your search"
                : `Found ${count} product${count === 1 ? "" : "s"}`}
            </p>
          </div>
        </div>

        <div className="section-container" style={{ paddingTop: 40, paddingBottom: 48 }}>
          {count > 0 && (
            <div className="products-grid">
              {values?.results?.map((p) => (
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
                      {p.description?.substring(0, 40)}...
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
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Search;
