import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { login } from '../store/AuthSlice'
import MainLayout from "../Layouts/MainLayout"
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

function Login() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const STATE = [
        localStorage.getItem("data", {}),
        localStorage.getItem("role", "")

    ]

    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    function handleUserInput(e) {
        const {name, value} = e.target;
        setLoginData({
            ...loginData,
            [name]: value
        })
    }

    async function onLogin(event) {
        event.preventDefault();
        if(!loginData.email || !loginData.password) {
            toast.error("Please fill all the details");
            return;
        }

        // dispatch create account action
        const response = await dispatch(login(loginData));
        // console.log("...", response)
        if(response?.payload?.status === 200){
          navigate("/")
        }
      

      }

    return (
      <>
      <MainLayout/>
    
            <div className='flex overflow-x-auto items-center justify-center h-[100vh]'>
                {/* <form noValidate onSubmit={onLogin} className='flex flex-col justify-center gap-3 rounded-lg p-4 s w-96 shadow-[0_0_10px_black]'>
                    <h1 className="text-center text-2xl font-bold">Login Page</h1>
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
                            value={loginData.email}
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
                            value={loginData.password}
                        />
                    </div>

                    <button type="submit" className='mt-2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer'>
                       Login
                    </button>

                    <p className="text-center">
                        Donot hanve an account ? <Link to="/signup" className='link text-accent cursor-pointer'> Signup</Link>
                    </p>

                </form> */}

<Card className="w-96">
        <CardHeader
          variant="gradient"
          color="gray"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
            Sign In
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <Input label="Email"
            type="email" 
            required
            name="email"
            id="email"
            // placeholder="Enter your email.."
            className="bg-transparent px-2 py-1 border"
            onChange={handleUserInput}
            value={loginData.email}
           size="lg" />
          <Input label="Password"
            type="password" 
            required
            name="password"
            id="password"
            // placeholder="Enter your password.."
            className="bg-transparent px-2 py-1 border"
            onChange={handleUserInput}
            value={loginData.password}
          size="lg" />
          <div className="-ml-2.5">
            <Checkbox label="Remember Me" />
          </div>
        </CardBody>
        <CardFooter className="pt-0">
          <Button variant="gradient" onClick={onLogin} fullWidth>
            Sign In
          </Button>
          <Typography variant="small" className="mt-6 flex justify-center">
            Don&apos;t have an account?
            <Link to={"/signup"}>
           
            <Typography
              as="a"
              to="/signup"
              variant="small"
              color="blue-gray"
              className="ml-1 font-bold"
            >
              Sign up
            </Typography>
            </Link>
          </Typography>
        </CardFooter>
      </Card>
            </div>
            </>
    );

}
export default Login;




   
 

