import React from "react";
import { useAuth } from "../../context/Auth";
import AdminMenu from "../../components/layout/AdminMenu";
import Layout from "../../components/layout/Layout";
import "../../Styles/AdminDashboard.css";


const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout>
      <div className="admin-dashboard">
        <div className="admin-container">
          <div className="dashboard-hero">
            <h1>Admin Dashboard</h1>
          </div>

          <div className="dashboard-layout">
            <div className="dashboard-panel">
              <AdminMenu />
            </div>

            <div className="info-card">
              <div className="info-row">
                <div className="info-label">Admin Name</div>
                <div className="info-value">{auth?.user?.name}</div>
              </div>
              <div className="info-row">
                <div className="info-label">Admin Email</div>
                <div className="info-value">{auth?.user?.email}</div>
              </div>
              <div className="info-row">
                <div className="info-label">Admin Contact</div>
                <div className="info-value">{auth?.user?.phone}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;