import { useState, useContext, createContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });
   
  useEffect(() => {
    const data = localStorage.getItem("auth"); // ✅ Use the correct key
    if (data) {
      try {
        const parsedData = JSON.parse(data);
        setAuth({
          user: parsedData.user || null,
          token: parsedData.token || "",
        });
        //default axios headers
        axios.defaults.headers.common["Authorization"] = parsedData.token;

      } catch (error) {
        console.error("Error parsing auth data", error);
      }
    }
  }, [auth?.user?.name]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
