import React, { useState, useEffect } from "react";
import UserMenu from "../../components/layout/UserMenu";
import Layout from "./../../components/layout/Layout";
import { useAuth } from "../../context/Auth";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const Profile = () => {
  // context
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  // get user data
  useEffect(() => {
    const { email, name, phone, address } = auth?.user ?? {};
    setName(name || "");
    setPhone(phone || "");
    setEmail(email || "");
    setAddress(address || "");
  }, [auth?.user]);

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        "/api/v1/auth/profile",
        {
          name,
          email,
          password,
          phone,
          address,
        },
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );

      if (data?.error) {
        toast.error(data?.error);
        return;
      }

      // ✅ Update auth context with new user data
      const updatedAuth = { ...auth, user: data?.updatedUser };
      setAuth(updatedAuth);

      // ✅ Update localStorage
      localStorage.setItem("auth", JSON.stringify(updatedAuth));

      // ✅ Update axios default header (already has token, but ensure it persists)
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${auth?.token}`;

      toast.success("Profile Updated Successfully");

      // Redirect back (Cart triggers /dashboard/user/profile)
      navigate(location?.state || "/cart");
    } catch (error) {
      console.log("Profile update error:", error);
      toast.error(
        error?.response?.data?.error ||
          error?.response?.data?.message ||
          "Failed to update profile"
      );
    }
  };

  return (
    <Layout title={"Your Profile"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>

          <div className="col-md-9">
            <div className="form-container ">
              <form onSubmit={handleSubmit}>
                <h4 className="title">USER PROFILE</h4>

                <div className="mb-3">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                    placeholder="Enter Your Name"
                    autoFocus
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="email"
                    value={email}
                    className="form-control"
                    placeholder="Enter Your Email"
                    disabled
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    placeholder="Enter Your Password"
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="form-control"
                    placeholder="Enter Your Phone"
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="form-control"
                    placeholder="Enter Your Address"
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  UPDATE
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;