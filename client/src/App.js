
import { Routes,Route} from 'react-router-dom';
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
 

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage />} />
     <Route path="/dashboard">
       <Route element={<PrivateRoute />}>
    <Route path="user" element={<Dashboard />} />
       </Route>
       <Route element={<AdminRoute />}>
    <Route path="admin" element={<AdminDashboard />} />
       </Route>
     </Route>

      <Route path="/Register" element={<Register/>} />
      <Route path="/forgot-Password" element={<ForgotPassword/>} />
      <Route path="/Login" element={<Login/>} />
      <Route path="/About" element={<About/>} />
      <Route path="/Contact" element={<Contact/>} />
      <Route path="/Policy" element={<Policy />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
   
    </>
  );
}

export default App;
