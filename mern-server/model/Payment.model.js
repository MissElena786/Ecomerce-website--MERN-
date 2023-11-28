import mongoose, { Schema, model } from "mongoose";


const PaymentSchema = new Schema({
    u_id : {
      type : String,
      required : [true , 'user id is required']
    },
   //  p_id:{
   //    type : String,
   //    required : [true, "product id i required"]
   //  },
   orderCreationId : {
      type : String,
      // required : [true," order creation ID is required"],
      // unique : true
   },
   razorpayPaymentId: {
      type : String,
      // required : true,
      // unique : true
   },
   razorpayOrderId : {
      type : String,
      // required : [true,"razorpay order id is required"],
      // unique : true
   },
   amount : {
      type : String,
      required : [true, "amount is required"], 
   },

   razorpaySignature:{
      type : String,
      // required : [true, "signature is required"],
      default  : ""
   },
   
      status: {
         type: String,
         enum: ['created', 'not-created', 'pending'],
         required: true,
         default : "pending"
       },
   
   
      },
      {
   timestamps: true,
      }
)

const PAYMENT =  model("payments", PaymentSchema)
export default PAYMENT
