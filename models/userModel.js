import mongoose from "mongoose";

const userschema= new mongoose.Schema({
name : {
    type: String,
    required: true,
    trim : true,
},
email:{
    type: String,
    required:true,
    unique:true,
},
password:{
    type:String,
    required:true,
},
phone :{
    type : String,
    required:true,
},
address:{
    type:String,
    required:true,
},
},
{timestamps:true}
);



const userModel = mongoose.model('User', userschema);
export default userModel;