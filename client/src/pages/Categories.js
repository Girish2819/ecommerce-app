import React from "react";
import { Link } from "react-router-dom";
import useCategory from "../hooks/useCategory";
import Layout from "../components/layout/Layout";
import "../Styles/Categories.css";

const Categories = () => {
  const categories = useCategory();

  return (
<<<<<<< HEAD
    <Layout title={"All Categories"}>
      <div className="categories-page">
        <h2>All Categories</h2>

        <div className="categories-grid">
          {(categories || []).map((c) => (
            <Link
              key={c._id}
              to={`/category/${c.slug}`}
              className="category-card"
            >
              {/* Dummy Image */}
              <img
                src={`https://via.placeholder.com/300x200?text=${c.name}`}
                alt={c.name}
              />

              <div className="category-name">
                <h4>{c.name}</h4>
              </div>
            </Link>
          ))}
=======
    <Layout title="All Categories — LuxeMart">
      <div className="categories-page">
        <div className="page-hero categories-hero">
          <div className="page-hero-inner animate-fade-up">
            <h1 className="page-hero-title">Shop by category</h1>
            <p className="page-hero-subtitle" style={{ margin: "0 auto" }}>
              Explore curated collections tailored to your style
            </p>
          </div>
        </div>

        <div className="categories-content">
          <div className="categories-grid">
            {(categories || []).map((c) => (
              <Link
                key={c._id}
                to={`/category/${c.slug}`}
                className="category-card"
              >
                <img
                  src={`https://via.placeholder.com/400x280/f0ebe3/e07a4a?text=${encodeURIComponent(c.name)}`}
                  alt={c.name}
                />
                <div className="category-name">
                  <h4>{c.name}</h4>
                </div>
              </Link>
            ))}
          </div>
>>>>>>> modified/main
        </div>
      </div>
    </Layout>
  );
};

<<<<<<< HEAD
export default Categories;
=======
export default Categories;
>>>>>>> modified/main
