import {Schema, model} from "mongoose"



const AddressSchema = new Schema({
   
   user_id : {
      type : String,
      required : [true,' User id is required'],
      // unique : true
      
   }, 
   h_number : {
      type : String,
      required : [true,'house number is required'],
   },
   street :{
      type : String,
      required : [true,'Street Number is required is required'],
      trim : true
   },
   landmark :{
      type:  String,
      required:[true , "landmark is required"],
      trim :true,
   },
   district :{
      type:  String,
      required:[true , "district is required"],
      trim :true,
   },
   state :{
      type:  String,
      required : [true,'state is required' ],
   },
   country :{
      type:  String,
      required : [true, 'country is required' ],
   },
   pinCode : {
      type : String,
      required : [true, 'pin code is required' ],
   },
   
},{
   
   timestamps: true
}
)



const Address = model('address', AddressSchema)

export default Address