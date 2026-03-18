import React, { useState, useEffect } from "react";
import Layout from "./../components/layout/Layout";
import "../Styles/Homepage.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // GET ALL CATEGORIES
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.categories);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // GET TOTAL COUNT
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  // GET PRODUCTS
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setProducts(data.products);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // LOAD MORE
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setProducts((prev) => [...prev, ...data?.products]);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // FILTER HANDLER
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  // FILTER PRODUCTS
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  // INITIAL LOAD
  useEffect(() => {
    getAllCategory();
    getTotal();
    getAllProducts();
  }, []);

  // LOAD MORE TRIGGER
  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  // FILTER EFFECT
  useEffect(() => {
    if (checked.length || radio.length) {
      filterProduct();
    } else {
      getAllProducts();
    }
  }, [checked, radio]);

  return (
    <Layout title={"All Products - Best offers"}>
      <div className="homepage-wrapper">
        
        {/* HERO */}
        <div className="homepage-hero">
          <h1 className="hero-title">
            Discover <em>Elegant</em> Products
          </h1>
          <p className="hero-subtitle">Curated for Modern Living</p>
        </div>

        <div className="homepage-container">
          <div className="row">
            
            {/* SIDEBAR */}
            <div className="col-md-3">
              <div className="filter-sidebar">
                <h4 className="filter-section-title">Category</h4>

                {categories?.map((c) => (
                  <Checkbox
                    key={c._id}
                    onChange={(e) =>
                      handleFilter(e.target.checked, c._id)
                    }
                  >
                    {c.name}
                  </Checkbox>
                ))}

                <hr className="filter-divider" />

                <h4 className="filter-section-title">Price</h4>

                <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                  {Prices?.map((p) => (
                    <div key={p._id}>
                      <Radio value={p.array}>{p.name}</Radio>
                    </div>
                  ))}
                </Radio.Group>

                <button
                  className="btn-reset-filter"
                  onClick={() => window.location.reload()}
                >
                  Reset Filters
                </button>
              </div>
            </div>

            {/* PRODUCTS */}
            <div className="col-md-9">
              <h1 className="products-section-title">All Products</h1>

              <div className="products-grid">
                {products?.map((p) => (
                  <div className="product-card" key={p._id}>
                    
                    <div className="product-card-img-wrap">
                      <img
                        src={`/api/v1/product/product-photo/${p._id}`}
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
                          className="btn-details"
                          onClick={() =>
                            navigate(`/product/${p.slug}`)
                          }
                        >
                          Details
                        </button>

                        <button
                          className="btn-add-cart"
                          onClick={() => {
                            setCart([...cart, p]);
                            localStorage.setItem(
                              "cart",
                              JSON.stringify([...cart, p])
                            );
                            toast.success("Item Added to cart");
                          }}
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* LOAD MORE */}
              <div className="load-more-wrap">
                {products && products.length < total && (
                  <button
                    className="btn-load-more"
                    onClick={(e) => {
                      e.preventDefault();
                      setPage(page + 1);
                    }}
                  >
                    <span>
                      {loading ? "Loading..." : "Load More"}
                    </span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;