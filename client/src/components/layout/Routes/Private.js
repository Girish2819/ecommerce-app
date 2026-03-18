import { useEffect, useState } from "react";
import { useAuth } from "../../../context/Auth";
import { Outlet, Navigate } from "react-router-dom";
import axios from "axios";
import Spinners from "../Spinners"; // Importing a spinner component for loading state


export default function PrivateRoute() {
  const [ok, setOk] = useState(false);
  const [auth, setAuth, loading] = useAuth();
  
  useEffect(() => {
    if (loading) return;

    const authcheck = async () => {
      try {
        const res = await axios.get('/api/v1/auth/user-auth', {
          headers: {
            Authorization: `Bearer ${auth?.token}`
          }
        });
        if (res.data.ok) {
          setOk(true);
        } else {
          setOk(false);
        }
      } catch (err) {
        setOk(false);
        console.log("Auth check error", err);
      }
    };
    if (auth?.token) {
      authcheck();
    } else {
      setOk(false); // If no token, redirect to login
    }
  }, [auth?.token, loading]);
  
  if (loading) return <Spinners path="" />;
  return !auth?.token ? <Navigate to="/login" /> : ok ? <Outlet /> : <Spinners />;

}