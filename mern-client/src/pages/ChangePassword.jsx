import React, { useState } from 'react'
import MainLayout from '../Layouts/MainLayout'
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast'
import { changePassword } from '../store/AuthSlice'
import {useNavigate} from "react-router-dom"
function ChangePassword() {

   const dispatch  = useDispatch()
  const navigate = useNavigate()

   const [values , setValues] = useState({
      email : "",
      oldPassword : "",
      newPassword : ""
    })

  const  onhandleSubmit = async (e)=>{
   e.preventDefault();
   if(!values.email || !values.oldPassword || !values.newPassword) {
       toast.error("Please fill all the details");
       return;
   }
   const response = await dispatch(changePassword(values))
   console.log(response)
   // if(response.payload == undefined){
      setValues({
         email : "",
         oldPassword: "",
         newPassword: ""
      })
 navigate("/profile")
   }
//   }

  const inputHandle = (e)=>{
     const {name,value } = e.target
     setValues({
      ...values,
      [name] : value
     })
  }




  return (
    <div>
      <form className='flex flex-col items-center  p-12' onSubmit={onhandleSubmit}>
         <div>
            <input type='email' className='p-1 rounded border text-black m-2  w-80' onChange={inputHandle}  placeholder='Email' name="email" value={values.email} />
         </div>
         <div>
            <input type='text' className='p-1 rounded border text-black m-2  w-80' onChange={inputHandle}  placeholder='old Password' name="oldPassword" value={values.oldPassword} />
         </div>
         <div>
            <input type='text' className='p-1 rounded border text-black m-2  w-80  ' onChange={inputHandle}  placeholder='new Password' name="newPassword" value={values.newPassword} />
         </div>
         <button  className='p-2 rounded m-4 w-[12rem] text-center bg-blue-gray-900 text-white' type='submit'>change Password</button>

      </form>
      
    </div>
  )
}

export default ChangePassword
