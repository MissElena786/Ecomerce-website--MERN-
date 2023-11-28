import { configureStore } from "@reduxjs/toolkit"
import AuthSliceReducer from "./AuthSlice"
import productSliceReducer from "./Products"
import CartSliceReducer from "./Cart"
import AdminProducts from "./AdminProducts"
import AddressReducer from "./address"

const store = configureStore({
   reducer : {
      auth : AuthSliceReducer,
      product  : productSliceReducer,
      cart : CartSliceReducer,
      adminProducts :  AdminProducts,
      address : AddressReducer

   },
   middleware: (getDefaultMiddleware) =>
   getDefaultMiddleware({
     serializableCheck: false,
   }),
   devTools: true
})

export default store