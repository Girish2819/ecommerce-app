import React, { useState, useEffect } from "react";
import Layout from "./../components/layout/Layout";
import "../Styles/Homepage.css";
<<<<<<< HEAD
import { useNavigate } from "react-router-dom";
=======
import { useNavigate, Link } from "react-router-dom";
>>>>>>> modified/main
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

<<<<<<< HEAD
  // GET ALL CATEGORIES
  const getAllCategory = async () => {
    try {
     const { data } = await axios.get(
  `${process.env.REACT_APP_API}/api/v1/category/get-category`
);

if (data?.success) {
  setCategories(data?.categories);
=======
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.categories);
>>>>>>> modified/main
      }
    } catch (error) {
      console.log(error);
    }
  };

<<<<<<< HEAD
  // GET TOTAL COUNT
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
  `${process.env.REACT_APP_API}/api/v1/product/product-count`
);
=======
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-count`
      );
>>>>>>> modified/main
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

<<<<<<< HEAD
  // GET PRODUCTS
=======
>>>>>>> modified/main
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
<<<<<<< HEAD
  `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
);
=======
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
      );
>>>>>>> modified/main
      setProducts(data.products);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

<<<<<<< HEAD
  // LOAD MORE
=======
>>>>>>> modified/main
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
<<<<<<< HEAD
  `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
);
=======
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
      );
>>>>>>> modified/main
      setProducts((prev) => [...prev, ...data?.products]);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

<<<<<<< HEAD
  console.log("API:", process.env.REACT_APP_API);

  // FILTER HANDLER
=======
>>>>>>> modified/main
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

<<<<<<< HEAD
  // FILTER PRODUCTS
=======
>>>>>>> modified/main
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

<<<<<<< HEAD
  // INITIAL LOAD
=======
>>>>>>> modified/main
  useEffect(() => {
    getAllCategory();
    getTotal();
    getAllProducts();
  }, []);

<<<<<<< HEAD
  // LOAD MORE TRIGGER
=======
>>>>>>> modified/main
  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

<<<<<<< HEAD
  // FILTER EFFECT
=======
>>>>>>> modified/main
  useEffect(() => {
    if (checked.length || radio.length) {
      filterProduct();
    } else {
      getAllProducts();
    }
  }, [checked, radio]);

  return (
<<<<<<< HEAD
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
=======
    <Layout title="LuxeMart — All Products">
      <div className="homepage-wrapper">
        <div className="homepage-hero">
          <div className="homepage-hero-content">
            <div>
              <h1 className="hero-title">
                Discover <em>Elegant</em> Products
              </h1>
              <p className="hero-subtitle">
                Curated collections for modern living — shop trends, essentials,
                and timeless pieces in one place.
              </p>
              <div className="hero-cta-row">
                <Link to="/categories" className="btn-primary-modern">
                  Browse categories
                </Link>
                <button
                  type="button"
                  className="btn-ghost-modern"
                  style={{ color: "#faf9f7", borderColor: "rgba(255,255,255,0.35)" }}
                  onClick={() =>
                    document
                      .getElementById("products-grid")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Shop now
                </button>
              </div>
            </div>
            <div className="hero-stat-pill">
              <span className="hero-stat-value">{total || "—"}</span>
              <span className="hero-stat-label">Products</span>
            </div>
          </div>
        </div>

        <div className="homepage-container">
          <div className="homepage-layout">
            <aside className="filter-sidebar">
              <h4 className="filter-section-title">Category</h4>
              {categories?.map((c) => (
                <Checkbox
                  key={c._id}
                  onChange={(e) => handleFilter(e.target.checked, c._id)}
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
                type="button"
                className="btn-reset-filter"
                onClick={() => window.location.reload()}
              >
                Reset filters
              </button>
            </aside>

            <section id="products-grid">
              <div className="products-section-header">
                <h2 className="products-section-title">All products</h2>
                {products?.length > 0 && (
                  <span className="products-count-badge">
                    Showing {products.length}
                    {total ? ` of ${total}` : ""}
                  </span>
                )}
              </div>

              {loading && products.length === 0 ? (
                <div className="products-grid">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="products-loading-shimmer" />
                  ))}
                </div>
              ) : (
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
                              setCart([...cart, p]);
                              localStorage.setItem(
                                "cart",
                                JSON.stringify([...cart, p])
                              );
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

              <div className="load-more-wrap">
                {products && products.length < total && (
                  <button
                    type="button"
                    className="btn-load-more"
                    disabled={loading}
>>>>>>> modified/main
                    onClick={(e) => {
                      e.preventDefault();
                      setPage(page + 1);
                    }}
                  >
<<<<<<< HEAD
                    <span>
                      {loading ? "Loading..." : "Load More"}
                    </span>
                  </button>
                )}
              </div>
            </div>
=======
                    {loading ? "Loading…" : "Load more"}
                  </button>
                )}
              </div>
            </section>
>>>>>>> modified/main
          </div>
        </div>
      </div>
    </Layout>
  );
};

<<<<<<< HEAD
export default HomePage;
=======
export default HomePage;
>>>>>>> modified/main
