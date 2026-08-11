import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/Auth';
import { useLocation } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [ auth, setAuth ] = useAuth();
  const location = useLocation();

  //  Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`, {
        email,
        password,
      });

      if (res && res.data.success) {
        toast.success(res.data.message);

        // ✅ Set auth in context
        setAuth({
          user: res.data.user,
          token: res.data.token,
        });

        // ✅ Save to localStorage
         localStorage.setItem("auth", JSON.stringify({
        user: res.data.user,
        token: res.data.token,
      }));

      axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;

        // ✅ Redirect back to intended page (if any), else Home
        navigate(location?.state || "/");
    }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title="Login">
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-control"
              placeholder="Enter your Email"
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-control"
              placeholder="Enter Password"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
          <div className="mb-3 mt-3">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate('/forgot-password')}
            >
              Forgot Password
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
