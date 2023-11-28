import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

import axios from "axios";
import { userBaseUrl } from "../Helpers/baseUrl";

const initialState = {
    product : localStorage.getItem('products') != undefined ? JSON.parse(localStorage.getItem('products')) : [],
};

export const fetchAllProduct = createAsyncThunk("/fetch-products", async () => {
    try {
        const res =  toast.promise(
             axios.get(userBaseUrl + "admin/get-all-products"),  
            //  axios.get("http://localhost:8000/admin/get-all-products"),  
         {
            loading: "Wait! for fetching all products",
            success: (data) => {
               // console.log(data)
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




const productSLice = createSlice({
   name: 'product',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
   

       builder.addCase(fetchAllProduct.fulfilled, (state, action) => {
           const productData = JSON.stringify(action?.payload);

        //    console.log(productData)
           localStorage.setItem("product", productData);
         //   console.log(action.payload);
           state.product = action?.payload?.products;
       })
      }

   })

   export default productSLice.reducer;