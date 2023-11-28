import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

import axios from "axios";
import { userBaseUrl } from "../Helpers/baseUrl";

const initialState = {
    // cart : localStorage.getItem('cart') != undefined ? JSON.parse(localStorage.getItem('cart')) : [],
    cart  : [],
    cartItems: localStorage.getItem('cart-item') || "",

};


export const AddtoCart = createAsyncThunk("/add-to-cart", async (id) => {
    try {
        const res =  toast.promise(
             axios.post(userBaseUrl + "admin/add-to-cart", {id}),  
            //  axios.get("http://localhost:8000/admin/get-all-products"),  
         {
            loading: "Wait! for fetching all products",
            success: (data) => {
               console.log(id)
                return data?.data?.message;
            },
            error: (error)=>{
                toast.error(error?.response?.data?.message);
            }
        });
        // console.log((await res).data)
        return (await res).data
    } catch(error) {
        toast.error(error?.response?.data?.message);
    }
})


export const getCartProducts = createAsyncThunk("/get-cart-products", async () => {
    try {
        const res =  toast.promise(
             axios.get(userBaseUrl + "admin/get-cart-products" ),  
            //  axios.get("http://localhost:8000/admin/get-all-products"),  
         {
            loading: "Wait! for fetching Cart products",
            success: (data) => {
                return data?.data?.message;
            },
            error: (error)=>{
                toast.error(error?.response?.data?.message);
            }
        });
        // console.log((await res).data)
        return (await res).data
    } catch(error) {
        toast.error(error?.response?.data?.message);
    }
})
export const MyOrders = createAsyncThunk("/my-orders", async (u_id) => {
    try {
        const res =  toast.promise(
             axios.post(userBaseUrl + "user/my-orders",{u_id }),  
            //  axios.get("http://localhost:8000/admin/get-all-products"),  
         {
            loading: "Wait! for fetching your orders products",
            success: (data) => {
                return data?.data?.message;
            },
            error: (error)=>{
                toast.error(error?.response?.data?.message);
            }
        });
        // console.log((await res).data)
        return (await res).data
    } catch(error) {
        toast.error(error?.response?.data?.message);
    }
})

export const productRemovefromCart = createAsyncThunk("/remove-cart", async (id) => {
    try {
        const res =  toast.promise(
             axios.post(userBaseUrl + "admin/remove-cart", {id} ),  
            //  axios.get("http://localhost:8000/admin/get-all-products"),  
         {
            loading: "Waiting for remove item from cart",
            success: (data) => {
                return data?.data?.message;
            },
            error: (error)=>{
                toast.error(error?.response?.data?.message);
            }
        });
        // console.log((await res).data)
        return (await res)?.data
    } catch(error) {
        toast.error(error?.response?.data?.message);
    }
})



const CarttSLice = createSlice({
   name: 'cart',
   initialState,
   reducers: {},
   extraReducers: (builder) => {


    builder.addCase(AddtoCart.fulfilled, (state, action) => { 
        if (state.cart) {
            state.cart =  action.payload
            // localStorage.setItem("cart-item" , state.cart);
            console.log(action.payload);
        } 
      
      });
      builder.addCase(productRemovefromCart.fulfilled, (state, action) => { 
        if (state.cart) {
            state.cart = [ state?.cart];
        } 
      
      });
  
      builder.addCase(getCartProducts.fulfilled, (state, action) => {
        state.cart = action?.payload?.products;
        console.log("get cart prosucts", state.cart)
        // Optionally, you can update the local storage here.
        // const cartData = JSON.stringify(action.payload);
        // localStorage.setItem("cart", cartData);
      });
  
      }

   })

   export default CarttSLice.reducer;