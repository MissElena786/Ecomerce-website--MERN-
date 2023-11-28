// import InstaUser from "../model/InstaUserModel.js";
import User from "../model/USER.model.js"
import bcrypt from  "bcrypt"
import OTP from "../model/OTP.model.js";
import sendEmail  from "../utils/sendEmail.js"
import dotenv from "dotenv"
dotenv.config()


const cookieOptions = {
  // maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  maxAge:  1 * 24* 60 * 60 * 1000, // 7 days
  httpOnly: true,
  secure: true
}

const UserRegister = async (req, res) => {

try {
  

  const { mobile, fullName, email, password, role } = req.body;

  if (!mobile || !fullName || !email || !password) {
    return res.status(401).json({
      success: false,
      message: "All fields are required",

    });
  }
  // }else if(!fullName){
    
  // }

  const userExiist = await User.findOne({ email  });

  if (userExiist) {
    return res.status(500).json({
      success: false,
      message: "This email is already exist",
    });
  }
   const userMobile = await User.findOne({mobile})
   if(userMobile){
    return res.status(501).json({
      success: false,
      message: "This mobile number is already exist",
    })
   }
  const user = await User.create({
    mobile,
    fullName,
    email,
    password,
    role
  });

  if (!user) {
    return res.status(400).json({
      success: false,
      message: "ragistration is false, please try again!",
    });
  }


  await user.save();
   
  const  token = await user.generateJWTToken()
  res.cookie("token", token , cookieOptions)

  res.status(200).json({
    success: true,
    message: "User registered succesfully",
  });

} catch (error) {
  res.status(400).json({
    success: false,
    message: "Somthing went wrong",
  });  
}
};





const UserLogin = async (req, res, ) => {
  const { email, password } = req.body;
    

  try {
    
 
  if (!email || !password) {
    res.status(401).json({
      success: false,
      message: "email and password is required ",
    });
  }

  const user = await User.findOne({ email })
  
  if(!user){
    return res.status(400).json({
          success :false,
          message : "User not registered"
        })
  }

  const match = await bcrypt.compare(password, user.password);

 

   if(match ){

    const token = await user.generateJWTToken();
    // localStorage.setItem("token", token)
    // user.password = undefined
    res.cookie('token', token, cookieOptions);
    user.save()

    return res.status(200).json({
          success :true,
          login : true,
          message : "login successfully",
          user
        })
   }else{
    return res.status(500).json({
          success :false,
          message : "Password is not matched"
        })

   }


} catch (error) {
  return res.status(500).json({
    success :false,
    message : error.message
  })
  }
}



const logout = async (req, res)=>{
       try {
        res.cookie('token', null, {
          secure: true,
          maxAge: 0,
          httpOnly: true
      });
  
      res.status(200).json({
          success: true,
          message: 'User logged out successfully'
      })
        
       } catch (error) {
        return res.status(500).json({
          success :false,
          message : error.message
        })
       }
}



const getProfile = async (req, res) => {
  try {
    // const  id = req.body;

    const user = await User.findById(req.query.id);
    if(!user){
      res.status(400).json({
        success: false,
        message: "User not found",
        user,
      });
    }

    res.status(200).json({
      success: true,
      message: "User details",
      user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllUSers = async (req,res)=> {
  const {id}  = req.body
  
  
    const users = await User.find({})
    if(!users){
      res.status(400).json({
        success: false,
        message: "users not found",
      });
    }else{
      const admin = await User.findById(id)

      if(admin.role === 'ADMIN'){
        res.status(200).json({
          success: true,
          message: "ALL users :",
          users
        });

      }else{
        res.status(400).json({
          success: false,
          message: "you are not authorized person to acess this Route",
        });
      }

    }

}


const forgot_Password = async (req, res, next) => {
  const { email } = req.body;
  const num = "0123456789";
 
 let otp = Math.trunc(Math.random() * num)
    .toString()
    .slice(0,6)
  // console.log(otp);
  const date = new Date();

  // otp  = Math.trunc(Math.random())

  const user = await User.findOne({ email : email })
  if (!user) {
    return res.status(500).json({
      success: false,
      message: "user not registered",
    });
  }
   
    const subject = `forgot Password`;
    const message = `hellow user your one time user otp is ${otp} at  ${date}
        <br>
        <h3>Code : ${otp} </h3>`;
    try {


        sendEmail(email, subject, message);

      // const isExist = await OTP.findOne({ email });
      // if (!isExist) {
      //   await OTP.create({
      //     email,
      //     otp,
      //   });
      //   res.status(200).json({
      //     success: true,
      //     message: `otp is send to om your mail ${email}`,
      //   });
      // } else if (isExist && isExist.otp == null) {
      //   await OTP.updateOne({
      //     email: email,
      //     otp: otp,
      //   }) 
      //   res.status(200).json({
      //     success: true,
      //     message: `otp is send to om your mail ${email}`,
      //   });
      // }else if (isExist && isExist.otp != null) { 
      //   res.status(200).json({
      //     success: true,
      //     message: `your OTP is already sent, please check in your email ${email}`,
      //   });
      // } else {
      
      //     return res.status(500).json({
      //       success: false,
      //       message: `somthing went wrong`
            
      //     });
           
      //   }

      const isExist = await OTP.findOne({ email });
if (!isExist) {
  await OTP.create({
    email,
    otp,
  });
  res.status(200).json({
    success: true,
    message: `OTP has been sent to your email: ${email}`,
  });
} else if (isExist && isExist.otp === null) {
  await OTP.updateOne(
    { email: email },
    { $set: { otp } }
  );
  res.status(200).json({
    success: true,
    message: `OTP has been updated and sent to your email: ${email}`,
  });
} else if (isExist && isExist.otp !== null) {
  res.status(200).json({
    success: true,
    message: `Your OTP has already been sent. Please check your email: ${email}`,
  });
} else {
  return res.status(500).json({
    success: false,
    message: `Something went wrong`,
  });
}

    }catch (error) {
      if (error.code === 11000) { // MongoDB duplicate key error code
        // Handle duplicate key error
        res.status(400).json({
          success: false,
          message: "An OTP has already been sent to this email. Please check your email.",
        });
      } else {
        // Handle other errors
        res.status(500).json({
          success: false,
          message: "An error occurred while processing your request.",
        });
      }
    }
  }
   
    
    



const VarifyOtp = async (req, res, next) => {
  const { email, otp, password } = req.body;
  if (!email || !otp || !password) {
    res.status(500).json({
      success: false,
      message: `All fields are mandatory.`,
    });
  }

  try {
    const userOTP = await OTP.findOne({ email });

    if (!userOTP) {
      res.status(500).json({
        success: false,
        message: `user not found with this email ${email}`,
      });
    }

    const otpTimestamp = userOTP.updatedAt; // Timestamp when OTP was generated
    const currentTimestamp = new Date();
    console.log(otpTimestamp)
    console.log(currentTimestamp)

    // Calculate the time difference in milliseconds
    const timeDifference = currentTimestamp - otpTimestamp;
    console.log(timeDifference)

    // Check if OTP has expired (10 minutes = 600,000 milliseconds)
    if (timeDifference > 600000) {
      await OTP.updateOne({ email: email }, { $set: { otp: null } });
      res.status(400).json({
        success: false,
        message: `OTP has expired . please request a new otp`,
      });
      
    }

    if (userOTP.otp == otp) {
      const hashedPassword = await bcrypt.hash(password, 10);

      await User.updateOne({ email: email }, { $set: { password: hashedPassword } });

      // Invalidate OTP by setting it to null
      await OTP.updateOne({ email: email }, { $set: { otp: null } });

      res.status(200).json({
        success: true,
        message: `Your password has been changed successfully`,
      });
    } else {
      res.status(500).json({
        success: false,
        message: `your otp is not matched`,
      });
    }
  } catch (error) {
    console.error('Error in VarifyOtp:', error);
    res.status(500).json({
      success: false,
      message: `An error occurred while processing your request,${error}`,
    });
  }
};



const changePassword = async (req, res, next) => {
  const { oldPassword, newPassword, email } = req.body;

  // console.log(i);
  if (!oldPassword || !newPassword) {
    res.status(500).json({
      success: false,
      message: `All Fields are mandatary`,
    });
  }

  try {
    const user = await User.findOne({email})
    console.log(user);

    if (!user) {
      res.status(500).json({
        success: false,
        message: `user not exist`,
      });
    }
  

    // Compare the oldPassword with the stored hashed password
    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    console.log(isPasswordValid);
     console.log(user.password)
    if (!isPasswordValid) {
      res.status(500).json({
        success: false,
        message: `invalid old password`,
      });
    }


    user.password = newPassword;
    console.log(user.password)

    await user.save();

    // user.password = undefined;
    console.log(user.password)

    res.status(200).json({
      success: true,
      message: 'Password changed successfully!',
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};




export { UserRegister, UserLogin , logout, getProfile , getAllUSers ,forgot_Password, VarifyOtp, changePassword};
