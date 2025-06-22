import React from "react";
import { useAuth } from "../../context/Auth";
import AdminMenu from "../../components/layout/AdminMenu";
import Layout from "../../components/layout/Layout";


const AdminDashboard = () => {
  const {auth} = useAuth();
  console.log("Admin Dashboard auth:", auth);
  return (
    <Layout>
      <div className="container-fluid">
        <div className="col-md-3">
          <div className="col-md-9">
           <AdminMenu/>
            </div>
            <div className="col-md-9">content</div>
          </div>
          </div>
         
    </Layout>
  );
};

export default AdminDashboard;