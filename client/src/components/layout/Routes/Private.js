import { useEffect,useState } from "react"; 
import { useAuth } from "../../../context/Auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinners from "../Spinners"; // Importing a spinner component for loading state


export default function PrivateRoute(){
    const [ok, setOk] = useState(false);
    const {auth, setAuth} = useAuth()
    useEffect(() => {
        const authcheck = async () => {
        try {
    const res = await axios.get('/api/v1/auth/user-auth', {
      headers: {
        Authorization: auth?.token
      }
    });
        if (res.data.ok) {
            setOk(true);
            setAuth({
            ...auth,
            user: res.data.user,
            token: auth?.token // keep the same token
      });
      // localStorage.setItem("auth", JSON.stringify({
      //   ...auth,
      //   user: res.data.user
      // }));
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
    setOk(false); // If no token, redirect to login via spinner
  }
    }, [auth ?.token]);
    return ok ? <Outlet/> :<Spinners/>;

}