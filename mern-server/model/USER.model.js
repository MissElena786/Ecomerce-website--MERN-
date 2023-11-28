import {Schema, model} from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt" 
import dotenv from "dotenv"
dotenv.config()

const UserSchema = new Schema({
   mobile : {
      type : Number,
      required : [true,'Mobile number is required'],
      trim : true,
      unique : [true, "Number is already Exist"]

   },
   fullName :{
      type : String,
      required : [true,'name is required is required'],
      trim : true
   },
   email:{
      type:  String,
      required:[true , "email is required"],
      trim :true,
      unique : true
   },
   password :{
      type:  String,
      required : [true,'password is required' ],
      // select : false
   },
   role: {
      type :String,
      enum : ['USER', 'ADMIN'],
      default : 'USER'
   },

   forgotPasswordToken : String,
   forgotPasswordExpiry : Date
   
},{
   
   timestamps: true
}
)

UserSchema.pre("save", async function(next){
   if(!this.isModified("password")){
      return next()
   }
   this.password = await bcrypt.hash(this.password, 10)
})


UserSchema.methods = {
   // generateJWTToken : async function(){
   //    return  await jwt.sign(
   //       ({   id : this._id.toStringfy(), email : this.email , role : this.role      }),
   //       process.env.JWT_SECRET,
   //       {
   //          expiresIn : process.env.JWT_EXPIRY
   //       }
   //       ) },


   
generateJWTToken: async function() {
   try {
       const token = await jwt.sign(
           { id: this._id, email: this.email, subscription: this.subscription, role: this.role },
           process.env.JWT_SECRET,
           {
               expiresIn: process.env.JWT_EXPIRY,
           }
       );
       return token;
   } catch (error) {
       // Check if the error is a TokenExpiredError
       if (error.name === 'TokenExpiredError') {
           // Handle the JWT expiration error here
           // You can return a specific error message or perform any necessary actions
           console.error('JWT token has expired');
           throw new Error('JWT token has expired');
       } else {
           // Handle other JWT-related errors or unexpected errors
           console.error('JWT generation error:', error.message);
           throw error; // Rethrow the error for further handling or logging
       }
   }
},


   // comparePassword : async function(plainText){
   //       return await bcrypt.compare(plainText, this.password)
   // }
}

const User = model('eusers', UserSchema)

export default User