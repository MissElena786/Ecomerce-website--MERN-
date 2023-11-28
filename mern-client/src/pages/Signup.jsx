import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { BsPersonCircle } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

// import { isEmail, isValidPassword } from '../Helpers/regexMatcher';
// import { isEmail } from '../Helpers/regexMatcher';

import MainLayout from '../Layouts/MainLayout';
import { createAccount } from '../store/AuthSlice';

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

function Signup() {

    const dispatch = useDispatch();
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

        
        // if(!isEmail(signupData.email)) {
        //     toast.error("Invalid email id");
        //     return;
        // }
        // checking password validation
        // if(!isValidPassword(signupData.password)) {
        //     toast.error("Password should be 6 - 16 character long with atleast a number and special character");
        //     return;
        // }

        const formData = new FormData();
        formData.append("fullName", signupData.fullName);
        formData.append("mobile", signupData.mobile);
        formData.append("email", signupData.email);
        formData.append("password", signupData.password);
        formData.append("role", signupData.role);

        // dispatch create account action
        const response = await dispatch(createAccount(signupData));
        console.log(response)
        // if(response?.payload?.status === 200)
            navigate("/login");

        setSignupData({
            fullName: "",
            email: "",
            password: "",
            mobile : ""
        });


    }

    return (
      <div>
        <MainLayout/>
            <div className='flex overflow-x-auto items-center justify-center h-[100vh]'>
                {/* <form noValidate onSubmit={createNewAccount} className='flex flex-col justify-center gap-3 rounded-lg p-4 w-96 shadow-[0_0_10px_black]'>
                    <h1 className="text-center text-2xl font-bold">Registration Page</h1>

                   
                  
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="fullName" className='font-semibold'> Name </label>
                        <input 
                            type="text" 
                            required
                            name="fullName"
                            id="fullName"
                            placeholder="Enter your name.."
                            className="bg-transparent px-2 py-1 border"
                            onChange={handleUserInput}
                            value={signupData.fullName}
                        />
                    </div>

                    <div className='flex flex-col gap-1'>
                        <label htmlFor="mobile" className='font-semibold'> Mobile </label>
                        <input 
                            type="number" 
                            required
                            name="mobile"
                            id="mobile"
                            placeholder="Enter your MObile.."
                            className="bg-transparent px-2 py-1 border"
                            onChange={handleUserInput}
                            value={signupData.mobile}
                        />
                    </div>

                    <div className='flex flex-col gap-1'>
                        <label htmlFor="email" className='font-semibold'> Email </label>
                        <input 
                            type="email" 
                            required
                            name="email"
                            id="email"
                            placeholder="Enter your email.."
                            className="bg-transparent px-2 py-1 border"
                            onChange={handleUserInput}
                            value={signupData.email}
                        />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="password" className='font-semibold'> Password </label>
                        <input 
                            type="password" 
                            required
                            name="password"
                            id="password"
                            placeholder="Enter your password.."
                            className="bg-transparent px-2 py-1 border"
                            onChange={handleUserInput}
                            value={signupData.password}
                        />
                    </div>

                    <button type="submit" className='mt-2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer'>
                        Create account
                    </button>

                    <p className="text-center">
                        Already have an account ? <Link to="/login" className='link text-accent cursor-pointer'> Login</Link>
                    </p>

                </form> */}


<Card className="w-96">
        <CardHeader
          variant="gradient"
          color="gray"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
            Sign Up
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
            Sign Up
          </Button>
          <Typography variant="small" className="mt-6 flex justify-center">
            you have an account?
            <Link to={"/login"}>
           
            <Typography
              as="a"
              variant="small"
              color="blue-gray"
              className="ml-1 font-bold"
            >
              Sign In
            </Typography>
            </Link>
          </Typography>
        </CardFooter>
      </Card>
                

            </div>
            </div>
    );
}

export default Signup;