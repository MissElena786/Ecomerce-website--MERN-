



import React from "react";
import logo from "../assets/logo-social.png";
import { useDispatch, useSelector } from "react-redux";
// import "./App.css";
import axios from "axios";
import { userBaseUrl } from "../Helpers/baseUrl";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getCartProducts } from "../store/Cart";
import MainLayout from "../Layouts/MainLayout";

function App() {
   const cart = useSelector((state) => state?.cart?.cart)
   const u_id = useSelector((state) => state?.auth?.data?._id)
//    const p_arr = useSelector((state) => state?.cart?.cart)

   const navigate = useNavigate()

   const dispatch = useDispatch()

   const calculation =  cart?.map((e, i)=>{
      let total = 0
       return total =+   Number(e.price)

     })
     
   //   const flag = localStorage.getItem("flag", addfleg)

console.log(calculation)
   function sumArray(arr) {
       let total = 0
       for(let i = 0 ; i < arr?.length; i++){
           total += arr[i]
       }
       return Number(total)
   }
  const TotalCalculation = sumArray(calculation)
//   const amnt = TotalCalculation
       
       
    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }
    async function displayRazorpay() {
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
    
        );

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }

        console.log(TotalCalculation)
        const result = await axios.post(userBaseUrl + "user/razorpay", { amount : TotalCalculation });

        if (!result) {
            alert("Server error. Are you online?");
            return;
        }
           console.log("kjkdvd")
           console.log(result)
        const {  amount,   id : order_id, currency } = result?.data?.order;
        console.log('Amount Type:', typeof amount, 'Amount Value:', amount);

         const amnt  = Number(amount)
        const options = {
            key: `${import.meta.env.RAZORPAY_KEY}`, // Enter the Key ID generated from the Dashboard
            // amount: amount.toString(),
            amount: Number (TotalCalculation * 100 ) ,
            currency: currency,
            name: "Elena of Coder",
            description: "Elena Transaction",
            image: { logo },
            order_id: order_id,
            handler: async function (response) {
                console.log("response ",response)
                console.log("od",order_id)
                const data = {
                    orderCreationId: order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                    amount : TotalCalculation
                };

                console.log("signature", data.razorpaySignature)
                console.log("paymentID", data.razorpayPaymentId)
                console.log("orderID", data.razorpayOrderId)
                console.log("creationID", data.orderCreationId)
                console.log("d", data)

                const result = await axios.post(userBaseUrl + "user/payment/success", { u_id : u_id, orderCreationId: order_id,  razorpaySignature: response.razorpay_signature,   razorpayOrderId: response.razorpay_order_id, razorpayPaymentId: response.razorpay_payment_id, amount : TotalCalculation});
                if(result){
                    toast.success(result?.data?.message)
                     await  dispatch(getCartProducts())
                    navigate("/payment-success")

                }
                     console.log("success", result)
                // alert(result?.data?.message);
            },
            prefill: {
                name: "Elena",
                email: "elenaofcoder@gmail.com",
                contact: "9999999999",
            },
            notes: {
                address: "Codding journey of elena",
            },
            theme: {
                // color: "#61dafb",
                color: "#009432",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }

    return (
        <div className="App">
            <div>
                <MainLayout/>
            </div>
            <header className="App-header">
            <div className='flex justify-center w-full '>
           <div className= 'rounded bg-black text-center text-white mt-10 w-[50%]   pb-10 mb-[2rem]'>
             <h1 className='text-2xl m-3'>Order Now</h1>
             <div className=' grid grid-cols-2'>
              <div className='text-xl'>
              <p>Total Items</p>
             { cart?.length}
              </div>
             <div className='text-xl'>
              <p >Total</p>
             {  TotalCalculation }
             </div>
             </div>
             <button className="App-link mt-3 bg-gray-300  text-black font-semibold p-2 rounded px-3" onClick={displayRazorpay}>
                    pay now {TotalCalculation}
                </button>
           </div>
        </div>
                
            </header>

          
        </div>
    );
}

export default App;
