import React from 'react'
import MainLayout from '../Layouts/MainLayout'
import { useParams, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import '../App.css'

function Profile() {
   const params = useParams()
   // const isLoggedIn  = useSelector((state)=> state.auth.isLoggedIn)
   const data = useSelector((state)=> state.auth.data)
   // console.log(id)
  return (
    <div className='min-h-screen bg-gray-200'>
      <MainLayout/>
      <main className='flex justify-center items-                     center text-black'>
      <div className='main text-center  bg-gray-900  border border-white'>
            <h1 className='text-2xl font-bold'>Profile</h1>
            <div className='grid grid-cols-2 gap-20 p-5'>

             
               <div className=''>
                  <p>Name</p>
                  <p>Email</p>
                  <p>Number</p>
                  <p>Role</p>

               </div>
               <div className=''>
                  <p>{data?.fullName}</p>
                  <p>{data?.email}</p>
                  <p>{data?.mobile}</p>
                  <p>{data?.role}</p>

               </div>

            </div>

         <button className='btn bg-white mr-5 p-1 rounded text-black'> <Link  to="/forgot-password" >Forgot Password</Link></button>
         <button className='btn bg-white   p-1 rounded text-black'> <Link to='/change-password'>Password Change</Link></button>
       
         </div>

      </main>
    </div>
  )
}

export default Profile
