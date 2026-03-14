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
import Products from './pages/Admin/Products';
import UpdateProducts from './pages/Admin/UpdateProduct';
import Users from './pages/Admin/Users';
import Profile from './pages/user/Profile';
import Orders from './pages/user/Orders';
import Search from "./pages/Search";
import ProductDetails from "./pages/ProductDetails";
import Categories from "./pages/Categories";
import CategoryProduct from "./pages/CategoryProduct";

function App() {
  return (
    <>
      <Routes>

        {/* PUBLIC ROUTES */}
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/category/:slug" element={<CategoryProduct />} />
        <Route path="/search" element={<Search />} />

        {/* DASHBOARD ROUTES */}
        <Route path="/dashboard">
          <Route element={<AdminRoute />}>
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="admin/create-category" element={<CreateCategory />} />
            <Route path="admin/create-product" element={<CreateProducts />} />
            <Route path="admin/products" element={<Products />} />
            <Route path="admin/product/:slug" element={<UpdateProducts />} />
            <Route path="admin/users" element={<Users />} />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route path="user" element={<Dashboard />} />
            <Route path="user/profile" element={<Profile />} />
            <Route path="user/orders" element={<Orders />} />
          </Route>
        </Route>

        {/* AUTH ROUTES */}
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/login" element={<Login />} />

        {/* OTHER ROUTES */}
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />

        <Route path="*" element={<PageNotFound />} />

      </Routes>
    </>
  );
}

export default App;