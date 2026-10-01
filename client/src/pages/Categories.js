import React from "react";
import { Link } from "react-router-dom";
import useCategory from "../hooks/useCategory";
import Layout from "../components/layout/Layout";
import "../Styles/Categories.css";

const Categories = () => {
  const categories = useCategory();

  return (
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
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
