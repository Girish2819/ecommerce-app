import JWT from "jsonwebtoken";
import {registerController} from '../controllers/authController.js';
import userModel from "../models/userModel.js";
//protecting routes token base 
export const requireSignIn=async (req, res, next) => {
   try{
     const decode =JWT.verify(req.headers.authorization, process.env.JWT_SECRET);
    //  console.log("Decoded user:", decode);
     req.user = decode; // attach user info to request object
    next();
   }catch (error) {
       console.log(error);
       res.status(401).send({
           success: false,
           message: 'Unauthorized Access',
           error
       });
   }

};

// admin access
export const isAdmin = async (req, res, next) => {
    try{
        // console.log("hi we are here",req.user)
        const user =await userModel.findById(req.user.id)
        // console.log("User role:", user);
        if (user.role !== '1') {
            return res.status(401).send({
                success: false,
                message: 'UnAuthorized Access'
            });
        } else{
            next();
        }
    }catch (error) {
        console.log(error);
        res.status(401).send({
            success: false,
             error,
            message: 'Error in Admin Middleware',
           
        });
    }
};