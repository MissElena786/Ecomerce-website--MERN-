import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import toast from "react-hot-toast"
import { userBaseUrl } from "../Helpers/baseUrl"



// const initialState = {
//    address  : {}
// }
const initialState = {
   address: [],
   address  : localStorage.getItem("address") || ""
   // loading: false,
   // error: null,
 };


// export const AddAddressThunk = createAsyncThunk("add-address", async (data)=>{
//    try {
//       const res = toast.promise(
//          axios.post(userBaseUrl + "/add-address", data ),
//          {
//             loading : "wait for creating your Address",
//             success : (data)=>{
//                return data?.data?.message
//             },
//             error : (error)=>{
//                toast.error(error?.response?.data?.message);
//             }

//          }, )
//          return (await res)?.data      
//    } catch (error) {
//       toast.error(error?.response?.data?.message);
//    }
// })

// export const addAddress = createAsyncThunk('address/add', async (data) => {
//    try {
//        const res = await axios.post(userBaseUrl + 'user/add-address', data);

//        const response = await toast.promise(res, {
//            loading: 'Waiting for creating Address',
//            success: (data) => {
//                return data?.data?.message;
//            },
//            error: (error) => {
//                toast.error(error?.response?.data?.message);
//            },
//        });
//        console.log( await res)
//        return (await res)
//    } catch (error) {
//        toast.error(error?.response?.data?.message);
//        throw error; // Re-throw the error so it's propagated as a rejection.
//    }
// });

export const addAddress = createAsyncThunk('address/addAddress', async (addressData) => {
   try {
     const response = await axios.post( userBaseUrl + 'user/add-address', addressData);
     return response.data;
   } catch (error) {
     throw error;
   }
 });


const addressSlice = createSlice({
    name : "address",
    initialState,
    reducers : {},
    extraReducers : (builder)=>{
      builder
      // .addCase(addAddress.pending, (state) => {
      //   state.loading = true;
      //   state.error = null;
      // })
      .addCase(addAddress.fulfilled, (state, action) => {
      //   state.loading = false;
      console.log(action.payload.address)
      localStorage.setItem("address", action.payload.address)
        state.address = [ action.payload.address];
      })
      // .addCase(addAddress.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.error.message;
      // });
  },
    
}) 

export default addressSlice.reducer