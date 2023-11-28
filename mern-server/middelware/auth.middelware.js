import jwt  from "jsonwebtoken"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
dotenv.config()
cookieParser()


// const isLoggedIn = async (req,res, next)=>{
//      const token  = req.cookies
//    //   const token  = req.params
//      if(!token){
//       return res.status(500).json({
//          success :false,
//          message : "unauthenticated, please login again"
//        })
//      }

//      const userDetails = await jwt.verify(token , process.env.JWT_SECRET )

//      req.user = userDetails

//      next()

// }


// const isLoggedIn = async (req, res, next) => {
//    const token  = req.cookies;
//    console.log(token)

//    if (!token) {
//       return res.status(500).json({
//          success :false,
//          message : "unauthenticated, please login again"

//        })
//    }

//    const userDetails = await jwt.verify(token, `${process.env.JWT_SECRET}`);

//    req.user = userDetails;

//    next();
// }
const isLoggedIn = async (req, res, next) => {
   const token = req.body// Replace 'yourCookieName' with the actual cookie name
   console.log(token);
 
   if (!token) {
     return res.status(500).json({
       success: false,
       message: "unauthenticated, please login again"
     });
   }
 
 

   try {
      // const userDetails = await jwt.verify(token, process.env.JWT_SECRET);
      const userDetails = await jwt.verify(token, `${process.env.JWT_SECRET}`)
      req.user = userDetails;
      console.log(userDetails.email)
      next();
    } catch (err) {
      console.error("JWT verification error:", err);
      return res.status(401).json({
        success: false,
        message: "Invalid token, please login again",
      });
    }
 };




export {
   isLoggedIn
}