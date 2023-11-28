import Razorpay from "razorpay";
import PAYMENT from "../model/Payment.model.js";
import Cart from "../model/Cart.model.js";
import crypto from "crypto"
import dotenv from "dotenv"
dotenv.config()



 const key_id = `${process.env.RAZORPAY_KEY_ID}`
 const key_secret = `${process.env.RAZORPAY_SECRET}`


 

 const RazorpayPayment = async (req, res)=>{

  try {
    const { amount } = req.body;
    // const numericAmount = Number(amount);
    console.log('Amount Type:', typeof amount, 'Amount Value:', amount);

    const numericAmount = parseInt(amount * 100); // Convert to paise and make it an integer


     
if (numericAmount < 100) {
    return res.status(400).json({ message: "Invalid amount. Minimum amount is 1 INR." });
 }

    // The rest of your existing Razorpay payment creation code
    const instance = new Razorpay({
      key_id: key_id,
      key_secret: key_secret,
    });

    const options = {
      amount: numericAmount, // Use the amount received from the frontend
      currency: "INR",
      receipt: "receipt_order_74394",
    };

    const order = await instance.orders.create(options);

    if (!order) return res.status(500).send("Some error occurred");
    console.log(order)
  
    // const payment = await PAYMENT.create({
    //   orderCreationId: order.order_id,
    //   razorpayPaymentId: order.id,
    //   razorpayOrderId: order.order_id,
    //     amount: numericAmount,
    //     status : "created"
    //   });
    //   if (!payment) return res.status(500).send("somthing went wrong in payment entries in database");
    // console.log(order);

    // const product = await Cart.deleteMany({})
    // if (!product) return res.status(500).send("order not placed");

    res.json({
        success : true,
        order, 
        message : "order Placed successfully"
        // payment
    });
  } catch (error) {
    res.status(500).send(error);
  }
// });

  }


  const  fetchAlloreders  = async (req, res)=>{
        const  {u_id}  = req.body
        try {
          const orders = await PAYMENT.find({ u_id: u_id });
          if (!orders || orders.length === 0) {
            return res.status(400).json({
              success: false,
              message: "No orders found for this user ID.",
            });
          }
        
          res.status(200).json({
            success: true,
            orders,
            message: "Orders fetched successfully.",
          });
        } catch (error) {
          console.error("Error fetching orders:", error);
          res.status(500).json({
            success: false,
            message: "Internal server error.",
          });
        }
        

      
  }



const paymentSuccess = async( req,res)=>{
  try {
    // getting the details back from our font-end
    const {
      u_id,
      // p_id,
        orderCreationId,
        razorpayPaymentId,
        razorpayOrderId,

        razorpaySignature,
        amount,
    } = req.body;
    console.log(req.body)
    // const numericAmount = parseInt(amount * 100); // Convert to paise and make it an integer

   
    console.log("body", req.body)
    // if (!orderCreationId || !razorpayPaymentId || !razorpayOrderId|| !razorpaySignature || !amount) {
    //     return res.status(400).json({ message: "Invalid request. Missing required fields." });
    //  }

  
    // const shasum = crypto.createHmac("sha256", "w2lBtgmeuDUfnJVp43UpcaiT");

    // shasum.update(`${orderCreationId}|${razorpayPaymentId}`);

    // const digest = shasum.digest("hex");

    // // comaparing our digest with the actual signature
    // if (digest !== razorpaySignature)
    //     return res.status(400).json({ message: "Transaction not legit!" });

    // THE PAYMENT IS LEGIT & VERIFIED
    // YOU CAN SAVE THE DETAILS IN YOUR DATABASE IF YOU WANT
       console.log( "...", razorpaySignature)
       const payment = await PAYMENT.create({
        u_id ,
        // p_id ,
        orderCreationId,
        razorpayPaymentId,
        razorpayOrderId,
        razorpaySignature,
        amount,
        status: "created",
    });
    
    if (!payment) {
        return res.status(400).json({ message: "Failed to save payment details in the database" });
    }

    const product = await Cart.deleteMany({})
    if (!product) {
      return res.status(400).json({ message: "your products is not passes for delivery process" });
  }
    console.log("payment", payment)
        console.log("payment", payment)
        res.status(201).json({
            success: true,
            message : "your product is placed",
            amount,
            payment,
        });


         
} catch (error) {
  console.log(error)
    res.status(500).send(error);
}

}



export {
   RazorpayPayment,
   paymentSuccess,
   fetchAlloreders
}

 