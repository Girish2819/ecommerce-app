import React from "react";
import Layout from '../../components/layout/Layout'
import { useAuth } from "../../context/Auth";
const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout>
          
    </Layout>
  );
};

export default AdminDashboard;