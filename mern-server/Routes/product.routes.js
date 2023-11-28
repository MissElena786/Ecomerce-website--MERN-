
// import Express, { application }  from "express";
import express from 'express'
import cookieParser from 'cookie-parser';
import { addProduct, addTOCart, deleteCartProduct, deleteProduct, getAllCartProducts, getAllProducts, updateProduct } from '../Controllers/products.controller.js';
const ProductRoutes = express.Router()
const app = express()
// const {} =

app.use(cookieParser());


ProductRoutes.post("/add-product", addProduct )
ProductRoutes.get("/get-all-products", getAllProducts )
ProductRoutes.get("/get-cart-products", getAllCartProducts )
ProductRoutes.post("/delete-product", deleteProduct )
ProductRoutes.post("/update-product/:id", updateProduct )
ProductRoutes.post("/add-to-cart", addTOCart )
ProductRoutes.post("/remove-cart", deleteCartProduct )




export  default ProductRoutes
