import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { forgotPassword, verifyOTP } from '../store/AuthSlice'
import {  useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
function ForgotPassword() {
  //  const email = useSelector((state)=> state?.auth?.data?.email)
  //  console.log(email)
   const [otp_flag, setOtpFlag] = useState(false)
   const dispatch = useDispatch()
   const navigate = useNavigate()


   const [values, setValues] = useState({
      email : "",
      otp : "",
      password : ""
   })

   function handleUserInput(e) {
    const {name, value} = e.target;
    setValues({
        ...values,
        [name]: value
    })
}

   
   const handleSubmit =async  (e) =>{
      e.preventDefault()
      if(!values.email ){
        //  toast.error("Email is required")
         return toast.error("Email is required")

      }
     const responce = await dispatch(forgotPassword(values))
      setOtpFlag(true)

   }

  
   
   const resetOtp = async (e)=>{
    e.preventDefault()
     
    if(!values.email || !values.otp || !values.password){
      toast.error("All Fields are required")
   }
        const responce  = await dispatch(verifyOTP(values))
        console.log(responce)
        if(responce.success)
        {
          navigate("/profile")
        }
   }
  return (
    <div className='bg-gray-100 p-8 flex   justify-center min-h-screen w-full pb-20'>
       <form  className=' flex j items-center flex-col'>
         <div className=''>
        <input type="text"  className= 'p-1 rounded border text-black m-2  w-80'  value={values.email} name='email' placeholder='Enter Email' onChange={handleUserInput} />
       
       {
         otp_flag && 
        <>
          <div>
           <input type="number"  className= 'p-1 rounded border text-black m-2  w-80'    value={values.otp} name='otp' placeholder='Enter OTP' onChange={handleUserInput}  />
          </div>
          <div>
           <input type="text"  className= 'p-1 rounded border text-black m-2  w-80'    value={values.password} name='password' placeholder='Enter new  password ' onChange={handleUserInput}  />
          </div>
        </>
         
        }
        </div>

       {
         otp_flag ? 
         <button onClick={resetOtp} className='p-2 rounded m-4 w-[7rem] text-center bg-blue-gray-900 text-white'>reset OTP</button>
         : 
         <button onClick={handleSubmit}  className='p-2 rounded m-4 w-[7rem] text-center bg-blue-gray-900 text-white'  >send OTP</button>

       }
 
       </form>
      
    </div>
  )
}

export default ForgotPassword
