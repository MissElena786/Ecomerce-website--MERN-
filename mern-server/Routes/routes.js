// import Express, { application }  from "express";
import express from 'express'
import {  UserRegister, UserLogin, logout, getProfile, getAllUSers, forgot_Password, VarifyOtp, changePassword } from "../Controllers/controllers.js";
import { isLoggedIn } from "../middelware/auth.middelware.js";
import cookieParser from 'cookie-parser';
import { AddAddress } from '../Controllers/address.controller.js';
import { RazorpayPayment, fetchAlloreders, paymentSuccess } from '../Controllers/Payment.controller.js';
const Routes = express.Router()
const app = express()
import cors from "cors"
// const {} =

app.use(express.json({ extended: false }));
app.use(cookieParser());
app.use(cors({
   origin : "*",
   credentials : true,

   // withCredentials : true,
   optionsSuccessStatus: 200

}))

Routes.post("/register",UserRegister )
Routes.post("/login",UserLogin )
Routes.get("/logout", logout )
// Routes.get("/me", isLoggedIn, getProfile )
Routes.get('/me',  getProfile);
Routes.post('/all-users',  getAllUSers);
Routes.post('/forgot-p',  forgot_Password);
Routes.post('/verify-otp',  VarifyOtp);
Routes.post('/change-password',  changePassword);
Routes.post('/add-address',  AddAddress);
Routes.post('/razorpay',  RazorpayPayment);
Routes.post('/payment/success',  paymentSuccess);
Routes.post('/my-orders',  fetchAlloreders);



export  default Routes
