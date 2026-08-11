
import Layout from '../../components/layout/Layout'
import React ,{useState} from 'react'
import toast from 'react-hot-toast'; // Import Toaster and toast for notifications
import axios from 'axios'; // Import axios for making HTTP requests
import {useNavigate}  from 'react-router-dom'; // Import react-router for navigation

const ForgotPassword = () => {
      const[email,setEmail]=useState("")
      const[newPassword,setNewPassword]=useState("")
      const[answer,setAnswer]=useState("")
      const navigate = useNavigate(); // Initialize useNavigate hook for navigation

       // Form submit handler  
  const handleSubmit= async(e)=>{
    e.preventDefault();
    try{
        const res = await axios.post('/api/v1/auth/forgot-password',{
          email,
          newPassword,
          answer,
        });
      if(res && res.data.success){
        toast.success(res.data.message);
        navigate( "/Login"); // Navigate to login page on successful registration
      }else{
        toast.error(res.data.message);
      }
    }catch(error){
      console.log(error);
      toast.error("Something went wrong");
    }
  }
  return (
    <Layout Title={"Forgot Password"}>
    <div className='form-container'>
        <h1>Forgot Password</h1>


          <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input 
          type="email" 
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          required
          className="form-control" 
          id="exampleInputEmail"  
          placeholder=" Enter your Email" />
        </div>

        <div className="mb-3">
          <input 
          type="text" 
          value={answer}
          onChange={(e)=>setAnswer(e.target.value)}
          required
          className="form-control" 
          id="exampleInputanswer"  
          placeholder=" Enter your favouriteAnswer" />
        </div>

        <div className="mb-3">
          <input 
          type="password" 
          value={newPassword}
          onChange={(e)=>setNewPassword(e.target.value)}
          required
          className="form-control" 
          id="exampleInputPassword1" 
          placeholder=" Set Password" />
        </div>
        <button
        type="submit"
        className="btn btn-primary">
          Reset Password
        </button>
        <div className="mb-3" style={{marginTop: '10px'}}>
        </div>
      </form>

      </div>
    </Layout>
  )
}

export default ForgotPassword