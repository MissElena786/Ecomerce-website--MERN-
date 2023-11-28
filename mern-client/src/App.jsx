import React, { useEffect, useState } from 'react' 
import './App.css'
import  Login from './pages/Login'

import { Toaster } from 'react-hot-toast'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Profile from './pages/Profile'
import ForgotPassword from './pages/ForgotPassword'
import ChangePassword from './pages/ChangePassword'
import Cart from './pages/Cart'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllProduct } from './store/Products'
import { getCartProducts } from './store/Cart'
import AdminDashboard from "./ADMIN/AdminDashboard"
import AddProducts from './ADMIN/AddProducts'
import EditProcuts from './ADMIN/EditProcuts'
import Address from './pages/Address'
import Payment from './pages/Payment'
import PaymentSuccess from './pages/PaymentSuccess'
import MyOrder from "./pages/MyOrder"


function App() {
  const dispatch  = useDispatch()
  const [cartbasket, setCartBasket] = useState(false)


  // const cart = useSelector((state)=> state.cart.cart)
  // console.log(cart)
  




useEffect(()=>{
    const res = dispatch(getCartProducts())
    const res1 = dispatch(fetchAllProduct())
     
  },[cartbasket])

  // const res1 = dispatch(fetchAllProduct())


  return (
    <>
   <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/signup' element={<Signup/>} />
      <Route path='/about' element={<About/>} />
      <Route path='/address' element={<Address/>} />
      <Route path='/payment-success' element={<PaymentSuccess/>} />
      <Route path='/cart' element={<Cart/>} />
      <Route path='/contact' element={<Contact/>} />
      <Route path='/profile' element={<Profile/>} />
      <Route path='/payment' element={<Payment/>} />
      <Route path='/my-order' element={<MyOrder/>} />
      <Route path='/add-product' element={<AddProducts/>} />
      <Route path='admin/dashboard/update-product/:id' element={<EditProcuts/>} />
      <Route path='/forgot-password' element={<ForgotPassword/>} />
      <Route path='/change-password' element={<ChangePassword/>} />
      <Route path='/admin/dashboard' element={<AdminDashboard/>} />
      

    </Routes>
      <Toaster/>
   </BrowserRouter>
    </>
  )
}

export default App
