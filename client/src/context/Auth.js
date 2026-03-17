import { useState, useContext, createContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = localStorage.getItem("auth");

    if (data) {
      try {
        const parsedData = JSON.parse(data);

        const user = parsedData?.user || null;
        const token = parsedData?.token || "";

        setAuth({ user, token });

        // ✅ ONLY set header if token exists
        if (token) {
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        } else {
          delete axios.defaults.headers.common["Authorization"];
        }

      } catch (error) {
        console.error("Error parsing auth data", error);
      }
    }

    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={[auth, setAuth, loading]}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };