import React, { Children, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { GiHamburgerMenu } from 'react-icons/gi'
import { RxCrossCircled } from 'react-icons/rx'
import { useDispatch, useSelector } from 'react-redux'
// import { logout } from '../pages/store/AuthSlice'
import { logout } from '../store/AuthSlice'
import {FaShoppingCart} from "react-icons/fa"

import toast from 'react-hot-toast'
function MainLayout() {


   const [hidden, setHidden] = useState(true)
   const dispatch = useDispatch()
   const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn)
   const role = useSelector((state) => state?.auth?.role)
   const state  = useSelector((state)=> state.auth.data)
   const cart  = useSelector((state)=> state?.cart?.cart?.length)
   

   const navigate = useNavigate()

   const menu = () => {
      setHidden(false)
   }

   const cross = () => {
      setHidden(!hidden)

   }

   const Logout = ()=>{
      dispatch(logout())

   }
   return (
      <div className='fixed z-10'>
         <div>
            <header className='relative '>
               <div className='  absolute md: text-3xl top-2   '
                  onClick={menu}>
                  <GiHamburgerMenu />

               </div>
               <div className='absolute md: text-3xl top-2 left-10'>
                  <Link to={"/cart"}>
                  
{/* <button type="button" class="relative inline-flex items-center p-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> */}
<FaShoppingCart/>
 
  <span class="sr-only"></span>
  <div class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-2 dark:border-gray-900">{cart}</div>
{/* </button> */}

                  </Link>
               </div>
               
               {/* <div className='w-[17rem] min-h-screen relative px-5 py-5 bg-slate-50'> */}
               <div className={`${hidden ? "hidden" : ""} w-[17rem] min-h-screen relative border-1 p-2 border-[#ddd] px-5 py-5 bg-gray-200`}>
                  <div className='absolute top-2 right-2 text-2xl' onClick={cross}>
                     <RxCrossCircled />
                  </div>
                  <h3 className='mb-5 text-3xl '>{state?.fullName}</h3>
                  <ul>
                     {
                        isLoggedIn && role === 'ADMIN' && (
                           <li>
                              <Link to="/admin/dashboard"> Admin DashBoard</Link>
                           </li>
                        )

                     }
                     <li className='hover:bg-gray-300 p-2'><Link to={"/"}>Home</Link></li>
                     <li className='hover:bg-gray-300 p-2'><Link to={`/about`}>About Us</Link></li>
                     <li className='hover:bg-gray-300 p-2'><Link to={`/contact`}>Contact Us</Link></li>
                     {/* {
                        isLoggedIn && role === 'USER' && ( */}
                     {/* <li className='hover:bg-gray-300 p-2'><Link to={`/my-order`}>My Orders</Link></li> */}
                        {/* )
                   } */}


                  </ul>
                  <div className='absolute flex bottom-0 left-0  w-full'>
                     {
                        isLoggedIn &&

                     <button className='w-[50%] mr-1 p-2 rounded bg-blue-gray-900 text-white' onClick={() => navigate("/profile")}>Profile</button>
                   
             
                     }
                     {
                        isLoggedIn ?
                     <button className='w-[50%] p-2  bg-blue-gray-900 rounded text-white' onClick={Logout}>Logout</button>
                     :
                     <div className='absolute flex bottom-0 left-0 w-full'>
                       <button className='w-[50%] mr-1 rounded  bg-blue-gray-900 p-2 text-white' onClick={() => navigate("/login")}>Login</button>
                       
                      <button className='w-[50%]  p-2 rounded bg-blue-gray-900 text-white' onClick={() => navigate("/signup")}>Signup</button>

                     </div>
                   
                     }

                  </div>

               </div>
            </header>


         </div>


      </div>
   )
}

export default MainLayout
