import { useEffect, useState } from "react";
import { useAuth } from "../../../context/Auth";
import { Outlet, Navigate } from "react-router-dom";
import axios from "axios";
import Spinners from "../Spinners";

export default function AdminRoute() {
  const [ok, setOk] = useState(false);
  const { auth, setAuth } = useAuth();
  console.log('AdminRoute auth:', auth);
  useEffect(() => {
    const authCheck = async () => {
      try {
        const res = await axios.get('/api/v1/auth/admin-auth', {
          headers: {
            Authorization: auth?.token,
          },
        });

        //  Check if response is ok and user is admin
        console.log("Admin Auth check response:", res.data);
        if (res.data.ok) {
          setOk(true);
          // console.log("Admin Auth check successful:", res.data.user);
          // Update auth with user info
          // const updatedAuth = {
          //   ...auth,
          //   user: res.data.user,
          // };

          // setAuth(updatedAuth);
          // localStorage.setItem("auth", JSON.stringify(updatedAuth));
        } else {
          // console.log("Admin Auth check failed: User is not an admin");
          setOk(false);
        }
      } catch (err) {
        console.log("Admin Auth check failed:", err);
        setOk(false);
      }
    };

    if (auth?.token) {
      authCheck();
    } else {
      setOk(false);
    }
  }, [auth?.token]);

  //  Render based on check
  if (!auth?.token) {
    return <Navigate to="/login" />;
  }
  // console.log('AdminRoute ok:', ok);
  return ok ? <Outlet /> : <Spinners path="" />;
}
