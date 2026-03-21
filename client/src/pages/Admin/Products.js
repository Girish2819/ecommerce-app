import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/layout/AdminMenu";
import Layout from "./../../components/layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import "../../Styles/DashboardShell.css";
const Products = () => {
  const [products, setProducts] = useState([]);

  //getall products
  const getAllProducts = async () => {
    try {
  const { data } = await axios.get(
    `${process.env.REACT_APP_API}/api/v1/product/get-product`
  );
  setProducts(data.products);
} catch (error) {
      console.log(error);
      toast.error("Someething Went Wrong");
    }
  };

  //lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <Layout>
      <div className="dashboard-shell">
        <div className="dashboard-hero-full">
          <div className="hero-inner">
            <h1>Admin Panel</h1>
          </div>
        </div>

        <div className="dashboard-body">
          <div className="dashboard-sidebar">
            <AdminMenu />
          </div>

          <div className="dashboard-content">
            <h2 className="text-center mb-3">All Products List</h2>

            <div className="admin-products-grid">
              {products?.map((p) => (
                <Link
                  key={p._id}
                  to={`/dashboard/admin/product/${p.slug}`}
                  className="product-link"
                >
                  <div className="card">
                    <img
                      src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{p.name}</h5>
                      <p className="card-text">{p.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;