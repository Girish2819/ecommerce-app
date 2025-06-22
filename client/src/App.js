
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import About from './pages/About';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import PageNotFound from './pages/PageNotFound';
import Register from './pages/AUTH/Register';
import Login from './pages/AUTH/Login';
import Dashboard from './pages/user/Dashboard';
import PrivateRoute from './components/layout/Routes/Private';
import ForgotPassword from './pages/AUTH/ForgotPassword';
import AdminRoute from './components/layout/Routes/AdminRoute';
import AdminDashboard from './pages/Admin/AdminDashboard';
import CreateCategory from './pages/Admin/CreateCategory';
import CreateProducts from './pages/Admin/CreateProducts';
import Users from './pages/Admin/Users';
import Profile from './pages/user/Profile';
import Orders from './pages/user/Orders';


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard">
          <Route element={<AdminRoute />}>
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="admin/create-category" element={<CreateCategory />} />
            <Route path="admin/create-product" element={<CreateProducts />} />
            <Route path="admin/users" element={<Users />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="user" element={<Dashboard />} />
            <Route path="user/profile" element={<Profile />} />
            <Route path="user/orders" element={<Orders />} />
          </Route>
        </Route>

        <Route path="/Register" element={<Register />} />
        <Route path="/forgot-Password" element={<ForgotPassword />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/About" element={<About />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Policy" element={<Policy />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>

    </>
  );
}

export default App;
