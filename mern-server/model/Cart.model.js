import {Schema, model} from "mongoose"



const CartSchema = new Schema({
   title : {
      type : String,
      required : [true,'title is required'],
      trim : true,

   },
   // cartIsActive : {
   //    type : Boolean,
   // },
   product_id : {
      type : String,
      required : [true,'id is required'],
      unique : true

   }, 
   description :{
      type : String,
      required : [true,'discription is required is required'],
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
   images :{
      type:  String,
      // required : [true, 'image is required' ],
   },
   rating : {
      type :String,
      // enum : ['4.8', ''],
      default : "4.8"
   },
   thumbnail :{
      type:  String,
      required : [true, 'thumbnail is required' ],
   },
   stoke : {
      type :String,
      default : "100"
   },
   quantity : {
      type : Number,
      default : 1
   },
   images : {
      type :String,
   },
   brand : {
      type :String,
   },
   category : {
      type :String,
   }

   
},{
   
   timestamps: true
}
)



const Cart = model('cart', CartSchema)

export default Cart