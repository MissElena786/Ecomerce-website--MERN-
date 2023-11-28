import mongoose, { Schema, model } from "mongoose";


const otpSchema = new Schema({
   
   email : {
      type : String,
      required : [true," email is required"],
      unique : true
   },
   otp : {
      type : String,
      required : true,
      default: null 

   }, 
   
},{
   timestamps: true,
})

const OTP =  model("otp", otpSchema)
export default OTP
