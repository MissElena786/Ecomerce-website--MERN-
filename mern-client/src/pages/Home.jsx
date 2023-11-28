import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { GiHamburgerMenu } from 'react-icons/gi'
import { RxCrossCircled } from 'react-icons/rx'
import { useDispatch, useSelector } from 'react-redux'
import MainLayout from '../Layouts/MainLayout'
import { BackgroundBlogCard } from './MainBackgraound'
import { CarouselWithContent } from './carousel'
import axios from 'axios'
import { userBaseUrl } from '../Helpers/baseUrl'


import {
   Card,
   CardHeader,
   CardBody,
   CardFooter,
   Typography,
   Button,} from "@material-tailwind/react";
   
import { fetchAllProduct } from '../store/Products'
import { AddtoCart, getCartProducts } from '../store/Cart'
import toast from 'react-hot-toast'


function Home() {

   const product = useSelector((state) => state?.product?.product)
  //  const [cartbasket, setCartBasket] = useState(false)
  const dispatch = useDispatch()
   const navigate = useNavigate()
   
      const cart = useSelector((state)=> state?.cart?.cart)

      const [text, setText] = useState("")

 
  

      const AddProductInCart = async (id)=>{
      
          const addtocart = await dispatch(AddtoCart(id));
          
          console.log(addtocart)
          if ( addtocart.payload.status === 200 ) {
            const res2 = await dispatch(getCartProducts());
          }
      
           
       }
       console.log(product)



       const filterData = product?.filter((item)=>{
        // console.log(item)
        return item.title.toLowerCase().includes(text);

       })
     
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
    async function displayRazorpay(price) {
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
    
        );

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }

        // console.log(TotalCalculation)
        const result = await axios.post(userBaseUrl + "user/razorpay", { amount : price });

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
            key: "rzp_test_Gqw8ROfS2AzFpM", // Enter the Key ID generated from the Dashboard
            // amount: amount.toString(),
            amount: Number (price * 100 ) ,
            currency: currency,
            name: "Elena of Coder",
            description: "Elena Transaction",
            // image: { logo },
            order_id: order_id,
            handler: async function (response) {
                console.log("response ",response)
                console.log("od",order_id)
                const data = {
                    orderCreationId: order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                    amount : price
                };

                console.log("signature", data.razorpaySignature)
                console.log("paymentID", data.razorpayPaymentId)
                console.log("orderID", data.razorpayOrderId)
                console.log("creationID", data.orderCreationId)
                console.log("d", data)

                const result = await axios.post(userBaseUrl + "user/payment/success", { orderCreationId: order_id,  razorpaySignature: response.razorpay_signature,   razorpayOrderId: response.razorpay_order_id, razorpayPaymentId: response.razorpay_payment_id, amount : price});
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
      <div className='home-wrappe bg-gray-100 min-h-screen'>
         <MainLayout/>

         <div>
            <BackgroundBlogCard/>
         </div>
        
        <div className='w-full bg-[#dfe4ea] p-6  flex  flex-col justify-center items-center'>
          {/* <CarouselWithContent/> */}
          <div className=''>
            <input type="text" name="text" value={text} onChange={(e)=> setText(e.target.value)} className='w-[30rem] px-3 py-1 rounded' placeholder="Search here..." />
          </div>
          <div>
            {/* {product.filter(ele,idx)=>(
              console.log(ele)
            )} */}
          </div>

          <div  className='flex flex-wrap justify-center items-center m-5 gap-5'>
     

      
      {
        filterData.length > 0 ? 

         filterData?.map((itm)=>(
          <Card className="mt-6 w-80 pt-10 " key={itm._id}>
          <CardHeader color="blue-gray" className="relative max-h-40 ">
            <img className=''
              // src={ele.images[0]}
              src={itm.thumbnail}
              alt="card-image"
            />
          </CardHeader>
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              {itm.title}
            </Typography>
            <Typography>
             {itm.description}
            </Typography>
          </CardBody>
          <CardFooter className="pt-0 flex justify-center gap-3">
          
            {/* {ele.cartIsActive ? 
    
            <Button    className="px-3 py-2 bg-red-500 "  onClick={()=> AddProductInCart(ele._id)}> Alredy Aded </Button> 
            :  */}
            
              <Button className={ "px-3 py-2"} onClick={()=> AddProductInCart(itm._id)} >
                 {/* {aded ? "Alredy aded" :  " ADd to cart"} */}
                 add to cart
                 </Button>
    
    
            {/* } */}
    
            <Button className='px-3 py-2' onClick={()=> displayRazorpay(itm.price)}>Buy Now</Button>
          </CardFooter>
        </Card>
    
        ))
        
        : 

        product.map((ele, ind)=>(
          <Card className="mt-6 w-80 pt-10 " key={ele._id}>
      <CardHeader color="blue-gray" className="relative max-h-40 ">
        <img className=''
          // src={ele.images[0]}
          src={ele.thumbnail}
          alt="card-image"
        />
      </CardHeader>
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {ele.title}
        </Typography>
        <Typography>
         {ele.description}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0 flex justify-center gap-3">
      
        {/* {ele.cartIsActive ? 

        <Button    className="px-3 py-2 bg-red-500 "  onClick={()=> AddProductInCart(ele._id)}> Alredy Aded </Button> 
        :  */}
        
          <Button className={ "px-3 py-2"} onClick={()=> AddProductInCart(ele._id)} >
             {/* {aded ? "Alredy aded" :  " ADd to cart"} */}
             add to cart
             </Button>


        <Button className='px-3 py-2' onClick={()=> displayRazorpay(ele.price)} >Buy Now</Button>
        {/* } */}

      </CardFooter>
    </Card>

        ))
      }

    
    
   

          </div>

        </div>
      </div>
   )
   }


export default Home
