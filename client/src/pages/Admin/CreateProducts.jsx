import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import "../../Styles/CreateProduct.css";
import "../../Styles/DashboardShell.css";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState(null);

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) setCategories(data.categories);
    } catch (error) {
      toast.error("Error fetching categories");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);
      productData.append("shipping", shipping);

      const { data } = await axios.post(
        "/api/v1/product/create-product",
        productData
      );

      if (data?.success) {
        toast.success("Product Created Successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Create Product"}>
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
            <div className="create-product-panel">

              <div className="create-product-header">
                <h1>Create Product</h1>
                <p>Add a new product to your store</p>
              </div>

              <form onSubmit={handleCreate}>

                {/* CATEGORY */}
                <div className="field-group cp-select-wrap">
                  <label className="field-label">Category</label>
                  <Select
                    placeholder="Select a category"
                    size="large"
                    onChange={(value) => setCategory(value)}
                  >
                    {categories?.map((c) => (
                      <Option key={c._id} value={c._id}>
                        {c.name}
                      </Option>
                    ))}
                  </Select>
                </div>

                {/* PHOTO */}
                <div className="field-group">
                  <label className="field-label">Product Image</label>

                  <label className="photo-upload-label">
                     {photo ? photo.name : "Upload Photo"}
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={(e) => setPhoto(e.target.files[0])}
                    />
                  </label>

                  {photo && (
                    <div className="photo-preview-wrap">
                      <img
                        src={URL.createObjectURL(photo)}
                        alt="preview"
                      />
                    </div>
                  )}
                </div>

                {/* NAME */}
                <div className="field-group">
                  <label className="field-label">Product Name</label>
                  <input
                    type="text"
                    className="cp-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                {/* DESCRIPTION */}
                <div className="field-group">
                  <label className="field-label">Description</label>
                  <textarea
                    className="cp-textarea"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                {/* PRICE + QUANTITY */}
                <div className="cp-row-2col">
                  <div className="field-group">
                    <label className="field-label">Price</label>
                    <input
                      type="number"
                      className="cp-input"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>

                  <div className="field-group">
                    <label className="field-label">Quantity</label>
                    <input
                      type="number"
                      className="cp-input"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </div>
                </div>

                {/* SHIPPING */}
                <div className="field-group cp-select-wrap">
                  <label className="field-label">Shipping</label>
                  <Select
                    placeholder="Select shipping"
                    size="large"
                    onChange={(value) => setShipping(value)}
                  >
                    <Option value="0">No</Option>
                    <Option value="1">Yes</Option>
                  </Select>
                </div>

                {/* BUTTON */}
                <button className="btn-create-product" type="submit">
                   Create Product
                </button>

              </form>
            </div>
          </div>
      </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;