import { useSelect } from '@material-tailwind/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AddtoCart, getCartProducts, productRemovefromCart } from '../store/Cart'
import { RiDeleteBinFill } from "react-icons/ri"
import Lottie from 'react-lottie'
import toast from 'react-hot-toast'
import animationData from "../assets/Animation - 1698518584970.json"
// import Razorpay from 'razorpay'
// import Razorpay from 'razorpay'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import MainLayout from '../Layouts/MainLayout'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { userBaseUrl } from '../Helpers/baseUrl'

function Cart() {


  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };


  const cart = useSelector((state) => state?.cart?.cart)
  // console.log(cart)
  const [addfleg , setAddFleg] = useState(false)
  const navigate = useNavigate()

     const calculation =  cart?.map((e, i)=>{
       let total = 0
        return total =+   Number(e.price)

      })
      
      const flag = localStorage.getItem("flag", addfleg)

 console.log(calculation)
    function sumArray(arr) {
        let total = 0
        for(let i = 0 ; i < arr?.length; i++){
            total += arr[i]
        }
        return Number(total)
    }
   const TotalCalculation = sumArray(calculation)

    const AskMeLater = ()=>{
       setAddFleg(true)

        // localStorage.setItem("flag", true)
    }
    const yesAddress = ()=>{
      // setAddFleg(true)
      navigate("/address")
    }
  const dispatch = useDispatch()
  const removeItem = async (id) => {
    const res = await dispatch(productRemovefromCart(id))
    if (res) {
      dispatch(getCartProducts())
    }
  }
  
  console.log(localStorage.getItem("address")?.length)

 


  return (
    <div className='min-h-screen  flex flex-col justify-center items-center'>
      <div className='flex justify-start absolute top-0 left-0'>
      <MainLayout className="text-black absolute " />
        
      </div>
      <div className='relative'>
      <h1 className='text-center text-4xl font-semi-bold p-4'> Cart  </h1>

      </div>
        

        {
          localStorage.getItem("address")?.length > 2 ? 
          ""
          : 

           !addfleg  ?
      <div className='bg-red-400 w-[50%] text-center p-2 rounded text-white font-semibold '>
        <h1 className='text-xl'>Please fill  your  address</h1>
        <button onClick={yesAddress} className= 'p-[1px] mt-3 bg-yellow-700 p px-3 rounded'>yes</button>
        <button onClick={AskMeLater} className= 'p-[1px] ml-3 bg-yellow-700 px-3 x-3 rounded' >Ask me later</button>
      </div>
      : 
      ""
        }

      <div>

      </div>

      <div className='flex flex-wrap justify-center items-center m-5 gap-5'>
        {
          cart && 
           cart?.length > 0 ?
          cart?.map((ele, idx) =>
          (

            <Card key={ele?._id} className="w-full max-w-[50rem] relative flex-row">


              <img

                src={ele?.thumbnail}
                alt="card-image"
                className="h-[200px] w-[200px] object-cover"
              />
              <CardBody>


                <Typography variant="h4" color="blue-gray" className="mb-1">
                  {ele?.title}
                </Typography>
                <Typography variant="h6" color="gray" className="mb-1  uppercase grid grid-row-3 grid-cols-2">
                  <p>  ₹	{ele?.price} </p>

                  {/* <p className="badge badge-danger">{ele.rating}</p> */}
                  {/* <button className="btn badge w-16 rounded-2xl text-lg font-bold bg-red-500"> */}

                  <span>  <span class="bg-red-500 text-white text-lg w-20 p- text-center  font-medium mr-2 px-2.5 py-0.5 rounded-full ">{ele.discountPercentage} % </span>OFF</span>



                  <p> {ele?.category}</p>
                  <p>{ele?.discountPercentage}</p>
                </Typography>
                <div className='grid grid-cols-2 text-left '>
                  <div>
                    <label for="quantity">Quantity</label>
                    <select name="quantity" label="quantity" id="quantity">
                      <option value="1" className='p-1 text-center'>1</option>
                      <option value="2" className='p-1 text-center'>2</option>
                      <option value="3" className='p-1 text-center'>3</option>
                      <option value="4" className='p-1 text-center'>4</option>
                      <option value="5" className='p-1 text-center'>5</option>
                      <option value="6" className='p-1 text-center'>6</option>
                      <option value="7" className='p-1 text-center'>7</option>
                      <option value="8" className='p-1 text-center'>8</option>
                      <option value="9" className='p-1 text-center'>9</option>
                      <option value="10" className='p-1 text-center'>10</option>
                    </select>
                  </div>
                  <p className='border-2 px-2 w-16'>{ele?.rating}
                    ⭐
                  </p>
                </div>
                <Typography color="gray" className="mb-8 font-normal">
                  {
                    ele?.description
                  }
                </Typography>
                {/* <Button variant="text" className="flex items-center ">
                Learn More
              </Button> */}


              </CardBody>
              <div className='w-14 mr-3'>

                {/* <button className=' text-xl  text-green-500'><BiSolidEditAlt/></button> */}
                <button onClick={() => removeItem(ele._id)} className='ml-3 text-xl text-red-500'><RiDeleteBinFill /></button>
              </div>
            </Card>

          )
         
          )
          :
          <div>
          <Lottie 
          options={defaultOptions}
            height={400}
            width={400}
          />
        </div>
    
        }



      </div>
        <div className='flex justify-center w-full '>
           <div className= 'rounded bg-yellow-700 text-center w-[50%]   pb-10 mb-[2rem]'>
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
             <button  onClick={()=>navigate("/payment")} className= 'mt-3 bg-red-500 text-white font-semibold p-2 rounded px-3'>Order Now</button>


           </div>
        </div>
    </div>
  )
}

export default Cart
