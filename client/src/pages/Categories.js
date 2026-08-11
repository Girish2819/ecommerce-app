import React from "react";
import { Link } from "react-router-dom";
import useCategory from "../hooks/useCategory";
import Layout from "../components/layout/Layout";
import "../Styles/Categories.css";

const Categories = () => {
  const categories = useCategory();

  return (
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
        </div>
      </div>
    </Layout>
  );
};

export default Categories;