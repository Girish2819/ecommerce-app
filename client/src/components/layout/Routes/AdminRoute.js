import { useEffect, useState } from "react";
import { useAuth } from "../../../context/Auth";
import { Outlet, Navigate } from "react-router-dom";
import axios from "axios";
import Spinners from "../Spinners";

export default function AdminRoute() {
  const [ok, setOk] = useState(false);
  const [auth, setAuth, loading] = useAuth();
  
  useEffect(() => {
    if (loading) return;

    const authCheck = async () => {
      try {
       const res = await axios.get(
  `${process.env.REACT_APP_API}/api/v1/auth/admin-auth`,
  {
    headers: {
      Authorization: `Bearer ${auth?.token}`,
    },
  }
);

        if (res.data.ok) {
          setOk(true);
        } else {
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
  }, [auth?.token, loading]);

  //  Render based on check
  if (loading) {
    return <Spinners path="" />;
  }
  if (!auth?.token) {
    return <Navigate to="/login" />;
  }
  return ok ? <Outlet /> : <Spinners path="" />;
}
