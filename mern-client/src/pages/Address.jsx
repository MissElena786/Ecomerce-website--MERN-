import React, { useState } from 'react'
import {MdAttachEmail} from "react-icons/md"
import { useNavigate , Link} from 'react-router-dom';
import {BsFillTelephoneOutboundFill} from "react-icons/bs"
import {ImLocation2} from "react-icons/im"
import  { addAddress } from "../store/address"
import toast from 'react-hot-toast';

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,

} from "@material-tailwind/react";
import MainLayout from '../Layouts/MainLayout';
import { useDispatch, useSelector } from 'react-redux';

function Address() {

  const navigate = useNavigate();
  const dispatch = useDispatch()
  const u_id =  useSelector((state)=>  state?.auth?.data?._id)
   console.log(u_id)

   const storedDataString = localStorage?.getItem("address") || [];
const storedData = JSON?.parse(storedDataString);
console.log(storedData);
    

  const [AddressData, setAddressData] = useState({
      // user_id : u_id,
      user_id : `${u_id}`,
      h_number : "",
      street : " 8",
      landmark : "",
      district : "jaipur",
      state : "Rajsthan",
      country : "india",
      pinCode : ""
  });

  function handleUserInput(e) {
      const {name, value} = e.target;
      setAddressData({
          ...AddressData,
          [name]: value
      })
  }



  const  AddAddress = async (event) =>{
      event.preventDefault();
      // if(!signupData.email || !signupData.password || !signupData.fullName || !signupData.avatar) {
      // if(!AddressData.user_id || !AddressData.state || !AddressData.pinCode || !AddressData.h_number )  {
      //     toast.error("Please fill all the details");
      //     return;
      // }

    const res = await dispatch(addAddress(AddressData))
    console.log(res)
    toast.success("Address created successfully")
   
    const addData = res?.payload?.address
    if (addData) {
      try {
        // Convert the object to a string using JSON.stringify
        const addDataString = JSON?.stringify(addData);
      //   localStorage.setItem("flag", true )
    
        // Save the string to localStorage
        localStorage.setItem("address", addDataString);
      } catch (error) {
        console.error("Error saving data to localStorage:", error);
      }
    }
    
   
      // setSignupData({
      //     fullName: "",
      //     email: "",
      //     password: "",
      //     mobile : ""
      // });
  }

  return (
    <div className=''>
      <MainLayout/>
     <div className='flex justify-center p-5'> 
<Card className="w-96">
        <CardHeader
          variant="gradient"
          color="gray"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
            Address
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
        <Input label="User ID"
   type="text" 
   required
   name="user_id"
   id="user_id"
//    placeholder="Enter your name.."
   className="bg-transparent px-2 py-1 border"
   onChange={handleUserInput}
   value={AddressData.user_id}
           size="lg" />
        <Input label="House Number"
   type="text" 
   required
   name="h_number"
   id="h_numver"
//    placeholder="Enter your name.."
   className="bg-transparent px-2 py-1 border"
   onChange={handleUserInput}
   value={AddressData.h_number}
           size="lg" />
            <Input label="Street number"
            type="text" 
            required
            name="street"
            id="street"
            // placeholder="Enter your email.."
            className="bg-transparent px-2 py-1 border"
            onChange={handleUserInput}
            value={AddressData.street}
           size="lg" />
            <Input label="LandMark"
            type="text" 
            required
            name="landmark"
            id="landmark"
            // placeholder="Enter your email.."
            className="bg-transparent px-2 py-1 border"
            onChange={handleUserInput}
            value={AddressData.landmark}
           size="lg" />
             <Input label="district"
             type="text" 
             required
             name="district"
             id="district"
            //  placeholder="Enter your MObile.."
             className="bg-transparent px-2 py-1 border"
             onChange={handleUserInput}
             value={AddressData.district}
           size="lg" />
         <Input label="state"
     type="text" 
     required
     name="state"
     id="state"
    //  placeholder="Enter your password.."
     className="bg-transparent px-2 py-1 border"
     onChange={handleUserInput}
     value={AddressData.state}
          size="lg" />
         
         <Input label="country"
     type="text" 
     required
     name="country"
     id="country"
    //  placeholder="Enter your password.."
     className="bg-transparent px-2 py-1 border"
     onChange={handleUserInput}
     value={AddressData.country}
          size="lg" />
           <Input label="Pin Code Number"
     type="number" 
     required
     name="pinCode"
     id="pinCode"
    //  placeholder="Enter your password.."
     className="bg-transparent px-2 py-1 border"
     onChange={handleUserInput}
     value={AddressData.pinCode}
          size="lg" />
          {/* <div className="-ml-2.5">
            <Checkbox label="Remember Me" />
          </div> */}
        </CardBody>
        <CardFooter className="pt-0">
          <Button variant="gradient" onClick={AddAddress} fullWidth>
            Add Address
          </Button>
          
        </CardFooter>
      </Card>
    </div>

    <div className='flex justify-around bg-blue-gray-100 p-4'>
      <div className='text-center flex justify-center items-center flex-col '>
       <MdAttachEmail/> 
      <i>bgulnaz009@gmail.com</i>
      </div>
      <div className='text-center flex justify-center items-center flex-col '>
       <ImLocation2/>
       <i>Jaipur Rajassthan</i>
      </div>
      <div className='text-center flex justify-center items-center flex-col '>

      <BsFillTelephoneOutboundFill/> 
      <i>8302459017</i>

      </div>
    </div>
    </div>   
  )
}

export default Address
