import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

import axios from "axios";
import {userBaseUrl} from "../Helpers/baseUrl"

const initialState = {

    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    role: localStorage.getItem('role') || "",
    data: localStorage.getItem('data') != undefined ? JSON.parse(localStorage.getItem('data')) : {},
  

};

export const createAccount = createAsyncThunk("/auth/signup", async (data) => {
    try {
        const res =  toast.promise(
             axios.post(userBaseUrl + "user/register", data),  
         {
            loading: "Wait! creating your account",
            success: (data) => {
                return data?.data?.message;
            },
            error: (error)=>{
                toast.error(error?.response?.data?.message);
            }
        });
        return res?.data
    } catch(error) {
        toast.error(error?.response?.data?.message);
    }
})


export const login = createAsyncThunk('/auth/login', async (data) => {
    try {
        const response = await toast.promise(
            axios.post(userBaseUrl + 'user/login', data),
            {
                loading: 'Wait! authentication in progress...',
                success: (data) => {
                    console.log(data);
                    // Assuming data is an object with a 'message' field
                    return data?.data?.message;
                },
                error: (error) => {
                    return error?.response?.data?.message;
                }
            }
        );

        return response; // Return the response from toast.promise
    } catch (error) {
        toast.error(error?.response?.data?.message);
        throw error; // Re-throw the error to indicate that the action failed
    }
});


export const logout = createAsyncThunk("/auth/logout", async () => {
    try {
        const res = await toast.promise(
            axios.get( userBaseUrl + "user/logout"),
             {
            loading: "Wait! logout in progress...",
            success: (data) => {
            
                return data?.data?.message;
            },
            error: "Failed to log out"
        });
        return res
    } catch(error) {
        toast.error(error?.response?.data?.message);
    }
});


export const forgotPassword = createAsyncThunk("/auth/forgot-password", async (data) => {
    try {
        const res =  toast.promise(
             axios.post(userBaseUrl + "user/forgot-p", data),  
         {
            loading: "Wait send the otp on your mail",
            success: (data) => {
                return data?.data?.message;
            },
            error: (error)=>{
                toast.error(error?.response?.data?.message);
            }
        });
        return res?.data
    } catch(error) {
        toast.error(error?.response?.data?.message);
    }
})

export const verifyOTP = createAsyncThunk("/auth/verify-otp", async (data) => {
    try {
        const res =  toast.promise(
             axios.post(userBaseUrl + "user/verify-otp", data),  
         {
            loading: "Wait for reset your password..",
            success: (data) => {
                return data?.data?.message;
            },
            error: (error)=>{
                toast.error(error?.response?.data?.message);
            }
        });
        return res?.data
    } catch(error) {
        toast.error(error?.response?.data?.message);
    }
})

export const changePassword= createAsyncThunk("/auth/changePassword", async (data) => {
    try {
        const res =  toast.promise(
             axios.post(userBaseUrl + "user/change-password", data),  
         {
            loading: "Wait for change your password..",
            success: (data) => {
                return data?.data?.message;
            },
            error: (error)=>{
                toast.error(error?.response?.data?.message);
            }
        });
        return res?.data
    } catch(error) {
        toast.error(error?.response?.data?.message);
    }
})






const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
    

        builder.addCase(login.fulfilled, (state, action) => {
            const userData = JSON.stringify(action?.payload?.data?.user);
            localStorage.setItem("data", userData);
            localStorage.setItem("isLoggedIn", true);
            localStorage.setItem("role", action?.payload?.data?.user?.role);
            console.log(action.payload);
            state.isLoggedIn = true;
            state.data = action?.payload?.data?.user;
            state.role = action?.payload?.data?.user?.role;
        })
        .addCase(logout.fulfilled, (state) => {
            localStorage.clear();
            state.data = {};
            state = {};
            // state.product = {};
            state.isLoggedIn = false;
            state.role = "";
        })
        .addCase(forgotPassword.fulfilled, (state, action) => {
     
            state.data = action?.payload?.data?.user;

        })
        .addCase(verifyOTP.fulfilled, (state, action) => {
            state.data = action?.payload?.data?.user;
        })
        // .addCase(changePassword.fulfilled, (state, action) => {
        //     state.data = action?.payload?.data?.user;
        // })
      
    }
});

// export const {} = authSlice.actions;
export default authSlice.reducer;