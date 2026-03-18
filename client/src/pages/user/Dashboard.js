import React from 'react'
import Layout from '../../components/layout/Layout';
import UserMenu from '../../components/layout/UserMenu';
import { useAuth } from '../../context/Auth';
import "../../Styles/UserDashboard.css";

const Dashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout Title={"dashboard"}>
      <div className="user-dashboard">
        <div className="container cart-main-container">
          <div className="dashboard-hero">
            <h1>User Dashboard</h1>
          </div>

          <div className="dashboard-layout">
            <div className="dashboard-panel">
              <UserMenu />
            </div>

            <div className="info-card">
              <div className="info-row">
                <div className="info-label">Name</div>
                <div className="info-value">{auth?.user?.name}</div>
              </div>
              <div className="info-row">
                <div className="info-label">Email</div>
                <div className="info-value">{auth?.user?.email}</div>
              </div>
              <div className="info-row">
                <div className="info-label">Address</div>
                <div className="info-value">{auth?.user?.address}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard