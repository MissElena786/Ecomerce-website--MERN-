import {Schema, model} from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt" 
import dotenv from "dotenv"
dotenv.config()

const ProductSchema = new Schema({
   // title : {
   //    type : String,
   //    required : [true,'title is required'],
   //    trim : true,

   // },
   // description :{
   //    type : String,
   //    required : [true,'discription is required is required'],
   //    trim : true
   // },
   // price :{
   //    type:  String,
   //    required:[true , "price is required"],
   //    trim :true,
   // },
   // discountPercentage :{
   //    type:  String,
   //    required : [true,'discount is required' ],
   // },
   // images :{
   //    type:  String,
   //    // required : [true, 'image is required' ],
   // },
   // rating : {
   //    type :String,
   //    // enum : ['4.8', ''],
   //    default : "4.8"
   // },
   // stoke : {
   //    type :String,
   //    default : "100"
   // }


   title : {
      type : String,
      required : [true,'title is required'],
      trim : true,

   },
   description :{
      type : String,
      required : [true,'description is required is required'],
      trim : true
   },
   price :{
      type:  String,
      required:[true , "price is required"],
      trim :true,
   },
   discountPercentage :{
      type:  String,
      required : [true,'discount is required' ],
   },
   thumbnail :{
      type:  String,
      required : [true, 'thumbnail is required' ],
   },
   cartIsActive : {
      type : Boolean,
      default : false
   },
   rating : {
      type :String,
      // enum : ['4.8', ''],
      default : "4.8"
   },
   stoke : {
      type :String,
      default : "100"
   },
   images : {
      type : Array
   },
   brand : {
      type :String,
   },
   category : {
      type :String,
      default : "womens"
   }


   
},{
   
   timestamps: true
}
)



const Product = model('products', ProductSchema)

export default Product