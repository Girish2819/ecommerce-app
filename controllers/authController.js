 import { comparePassword, hashPassword } from "../helpers/authHelper.js";
 import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";
 
 
 export const registerController = async (req, res) => {
  try {
    const {name,email,password,phone,address, answer}= req.body
    //valiation 
    if(!name){
        return res.send({error:'Nmae is Required'})
    }
    if(!email){
        return res.send({error:'Email is Required'})
    }
    if(!password){
        return res.send({error:'password is Required'})
    }
    if(!phone){
        return res.send({error:'Phone is Required'})
    }
    if(!address){
        return res.send({error:'Address is Required'})
    }

    if(!answer){
        return res.send({error:'Answer is Required'})
    }

    //check  user 
    const existingUser = await userModel.findOne({email})
    // existing user 
    if (existingUser){
        return res.status(200).send({
            success: false,
            message:'Already Register please login'
        })
    }
    //register user 
    const hashedPassword= await hashPassword(password)
    const user = await new userModel({
        name, 
        email,
        phone, 
        address,
        password:hashedPassword,
        answer,
    }).save()
     
    res.status(201).send({
        success: true,
        message:'User Register successfully',
        user
    })
} catch (error){
  res.status(500).send({
    success:false,
    message:'Error in Registration',
    error
  })
}
  };

 //POST LOGIN
    export const loginController = async (req, res) =>{
        try{
            const {email, password}= req.body;
            //validation
            if(!email || !password){
                return res.status(404).send({
                    success:false,
                    message:'Invalid Email or Password'
                })
            }
            //check user
            const user = await userModel.findOne({email})
            //user not found
            if (!user){
                return res.status(404).send({
                    success:false,
                    message:'Email is not registered'
                });
            }
            const match = await comparePassword(password,user.password)
            //password not matched
            if (!match){
                return res.status(200).send({
                    success:false,
                    message:'Invalid Password'
                })
            }
            //token
            const token = await JWT.sign({id:user._id}, process.env.JWT_SECRET, {
                expiresIn: '7d'
            });
            res.status(200).send({
                success:true,
                message:'Login Successfully',
                user:{
                    name:user.name,
                    email:user.email,
                    phone:user.phone,
                    address:user.address,
                    role:user.role,
                },
                token,
            })
        } catch (error){
            console.log(error);
            res.status(500).send({
                success:false,
                message:'Error in Login',
                error
        })
    }
};
// forgot password controller
export const forgotPasswordController = async(req,res) => {
    try {
        const { email, answer, newPassword } = req.body;

        // Validate input
        if (!email ) {
            return res.status(400).send({ message: 'Email is required' });
        }
        if (!answer ) {
            return res.status(400).send({ message: 'answer is required' });
        }
        if (!newPassword ) {
            return res.status(400).send({ message: 'New Password is required' });
        }

        // Find user by email
        const user = await userModel.findOne({ email, answer });
        if (!user) {
           console.log("User not found with email and answer:", email, answer);
           return res.status(404).send({
            success: false,
            message: "Wrong Email Or Answer",
      });
        }

        const hashedPassword = await hashPassword(newPassword);
         user.password = hashedPassword;
        await user.save();

        res.status(200).send({
         success: true,
         message: "Password reset successfully",
    });
    }
    catch (error) {
        console.error("Forgot password error:", error);
        res.status(500).send({ 
            success: false, 
            message: 'Something went wrong ', 
            error
         });
    }
}
        
       
// test controller
export const testController = (req, res) => {
    res.send("Protected Route");
};