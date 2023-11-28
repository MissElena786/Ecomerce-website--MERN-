import React, { useState } from 'react'
import {MdAttachEmail} from "react-icons/md"
import { useNavigate , Link} from 'react-router-dom';
import {BsFillTelephoneOutboundFill} from "react-icons/bs"
import {ImLocation2} from "react-icons/im"

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

function Contact() {

  const navigate = useNavigate();

    

  const [signupData, setSignupData] = useState({
      fullName: "",
      email: "",
      password: "",
      avatar: "",
      mobile : "",
      role :""
  });

  function handleUserInput(e) {
      const {name, value} = e.target;
      setSignupData({
          ...signupData,
          [name]: value
      })
  }



  async function createNewAccount(event) {
      event.preventDefault();
      // if(!signupData.email || !signupData.password || !signupData.fullName || !signupData.avatar) {
      if(!signupData.email || !signupData.password || !signupData.fullName || !signupData.mobile )  {
          toast.error("Please fill all the details");
          return;
      }

      
   

      const formData = new FormData();
      formData.append("fullName", signupData.fullName);
      formData.append("mobile", signupData.mobile);
      formData.append("email", signupData.email);
      formData.append("password", signupData.password);
      formData.append("role", signupData.role);

      // dispatch create account action
      // const response = await dispatch(createAccount(signupData));
     ;

      setSignupData({
          fullName: "",
          email: "",
          password: "",
          mobile : ""
      });


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
            Contact Us
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
        <Input label="Name"
   type="text" 
   required
   name="fullName"
   id="fullName"
//    placeholder="Enter your name.."
   className="bg-transparent px-2 py-1 border"
   onChange={handleUserInput}
   value={signupData.fullName}
           size="lg" />
             <Input label="Mobile"
             type="number" 
             required
             name="mobile"
             id="mobile"
            //  placeholder="Enter your MObile.."
             className="bg-transparent px-2 py-1 border"
             onChange={handleUserInput}
             value={signupData.mobile}
           size="lg" />
          <Input label="Email"
            type="email" 
            required
            name="email"
            id="email"
            // placeholder="Enter your email.."
            className="bg-transparent px-2 py-1 border"
            onChange={handleUserInput}
            value={signupData.email}
           size="lg" />
          <Input label="Password"
     type="password" 
     required
     name="password"
     id="password"
    //  placeholder="Enter your password.."
     className="bg-transparent px-2 py-1 border"
     onChange={handleUserInput}
     value={signupData.password}
          size="lg" />
          {/* <div className="-ml-2.5">
            <Checkbox label="Remember Me" />
          </div> */}
        </CardBody>
        <CardFooter className="pt-0">
          <Button variant="gradient" onClick={createNewAccount} fullWidth>
            Contact
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

export default Contact
