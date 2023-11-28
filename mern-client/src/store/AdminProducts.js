import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axios from "axios";
import { userBaseUrl } from "../Helpers/baseUrl";

const initialState = {
    AdminCreateProducts : []
}


// export const CreateProduct = createAsyncThunk("/admin-product", async (data) => {
//    try {
//        const res =  toast.promise(
//             axios.post(userBaseUrl + "admin/add-product", data ),  
//            //  axios.get("http://localhost:8000/admin/get-all-products"),  
//         {
//            loading: "Wait! for creating Products",
//            success: (data) => {
//               console.log(data)
//                return data?.data?.message;
//            },
//            error: (error)=>{
//                toast.error(error?.response?.data?.message);
//            }
//        });
//        console.log((await res).data)
//        return (await res)
//    } catch(error) {
//        toast.error(error?.response?.data?.message);
//    }
// })


export const CreateProduct = createAsyncThunk("/admin-product", async (data) => {
    try {
        const res =  toast.promise(
             axios.post(userBaseUrl + "admin/add-product", data ),
         {
            loading: "Wait! for creating Products",
            success: (data) => {
            //    console.log('Success Response Data:', data);
                return data?.data?.message;
            },
            error: (error)=>{
                toast.error(error?.response?.data?.message);
            }
        });
        // console.log('AsyncThunk Response Data:', (await res).data);
        return ((await res).data);
    } catch(error) {
        console.error('AsyncThunk Error:', error);
        toast.error(error?.response?.data?.message);
    }
 })

 export const deleteProduct = createAsyncThunk("/delete-product", async (id) => {
    try {
        const res =  toast.promise(
             axios.post(userBaseUrl + "admin/delete-product", {id} ),
         {
            loading: "Wait! for deleteing Product",
            success: (data) => {
            //    console.log('Success Response Data:', data);
                return data?.data?.message;
            },
            error: (error)=>{
                toast.error(error?.response?.data?.message);
            }
        });
        // console.log('AsyncThunk Response Data:', (await res).data);
        return ((await res).data);
    } catch(error) {
        console.error('AsyncThunk Error:', error);
        toast.error(error?.response?.data?.message);
    }
 })

//  export const UpdateProduct = createAsyncThunk("/update-product", async ( data) => {
//     // const {id , productData} = payload
//     try {
//         const res =  toast.promise(
//              axios.post(userBaseUrl + "admin/update-product", data ),
//          {
//             loading: "Wait! for updating Product",
//             success: (data) => {
//                console?.log('Success Response Data:', data);
//                 return data?.response?.data?.message;
//             },
//             error: (error)=>{
//                 toast.error(error?.response?.data?.message);
//             }
//         });
//         console.log('AsyncThunk Response Data:', (await res));
//         return ((await res));
//     } catch(error) {
//         console.error('AsyncThunk Error:', error);
//         toast.error(error?.response?.data?.message);
//     }
//  })
 

export const UpdateProduct = createAsyncThunk('update/product', async ({id, data}) => {
    try {
      const response = await axios.post( userBaseUrl + `admin/update-product/${id}`, {data});
      return response.data;
    } catch (error) {
      throw error;
    }
  });
 
const AdminCreateProducts = createSlice({
      name: 'adminProducts',
      initialState,
      reducers: {},
      extraReducers: (builder) =>{
        //  builder.addCase(UpdateProduct.fulfilled, (state, action) => {
        //         state.adminProducts = action?.payload
        //  });
      }
      
})

export default AdminCreateProducts.reducer