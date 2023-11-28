import React, { useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import MainLayout from '../Layouts/MainLayout';
import {
   Card,
   CardHeader,
   CardBody,
   CardFooter,
   Typography,
   Input,
   Checkbox,
   Button,
   Textarea,

} from "@material-tailwind/react";
import { useDispatch } from 'react-redux';
import {  UpdateProduct } from '../store/AdminProducts';
import { fetchAllProduct } from '../store/Products';
import axios from 'axios';
import { userBaseUrl } from '../Helpers/baseUrl';
import toast from 'react-hot-toast';



function EditProcuts() {

   const navigate = useNavigate();
   // const location = useLocation()
   const {id}  = useParams()
   // console.log(location)
   console.log(id)

   const dispatch = useDispatch()
   const [productData, setProductData] = useState({
      title : "",
        description: "",
         price: "",
         discountPercentage: "35",
          thumbnail: "",
           rating: "4.8",
            stoke: "100",
  });


   function handleUserInput(e) {
      const { name, value } = e.target;
      setProductData({
         ...productData,
         [name]: value
      })
   }


   async function updateProduct(event) {
      event.preventDefault();
   
      // const response = await dispatch(UpdateProduct( {id : id, productData : productData}));
      // const response = await dispatch(UpdateProduct(productData));
      const response = await  axios.post(userBaseUrl + `admin/update-product/${id}`, productData)
      console.log(response)
      if(response?.data?.success == true){
         dispatch(fetchAllProduct())
         toast.success(response?.data?.message)
         navigate("/admin/dashboard")
          setProductData({
            title : "",
            description: "",
             price: "",
             discountPercentage: "35",
              thumbnail: "",
               rating: "4.8",
                stoke: "100",
          })
      }
      // console.log(id, productData)
   //     if(response?.payload?.success){

   //       const res = await dispatch(fetchAllProduct());

   // setProductData({
   //    // ...productData, 
   //    title : "",
   //    description: "",
   //     price: "",
   //     discountPercentage: "35",
   //      thumbnail: "",
   //       rating: "4.8",
   //        stoke: "100",
   // })
   // }

   }
   return (
      <div>
         <div className=''>
            <MainLayout />
            <div className='flex justify-center p-5'>
               <Card className="w-96">
                  <CardHeader
                     variant="gradient"
                     color="gray"
                     className="mb-4 grid h-28 place-items-center"
                  >
                     <Typography variant="h3" color="white">
                        Product
                     </Typography>
                  </CardHeader>
                  <CardBody className="flex flex-col gap-4">

                     <Input label="title"
                        type="text"
                        required
                        name="title"
                        id="title"
                        className="bg-transparent px-2 py-1 border"
                        onChange={handleUserInput}
                        value={productData.title}
                        size="lg" />
                    
                     <Input label="Price"
                        type="number"
                        required
                        name="price"
                        id="price"
                        //    placeholder="Enter your name.."
                        className="bg-transparent px-2 py-1 border"
                        onChange={handleUserInput}
                        value={productData.price}
                        size="lg" />
                     <Input label="Discount"
                        type="number"
                        required
                        name="discountPercentage"
                        id="discountPercentage"
                        //  placeholder="Enter your password.."
                        className="bg-transparent px-2 py-1 border"
                        onChange={handleUserInput}
                        value={productData.discountPercentage}
                        size="lg" />
                         <Input label="Rating"
                        type="number"
                        required
                        name="rating"
                        id="rating"
                        className="bg-transparent px-2 py-1 border"
                        onChange={handleUserInput}
                        value={productData.rating}
                        size="lg" />
                         <Input label="Stoke"
                        type="number"
                        required
                        name="stoke"
                        id="stoke"
                        className="bg-transparent px-2 py-1 border"
                        onChange={handleUserInput}
                        value={productData.stoke}
                        size="lg" />
                         <Input label="Thumbnail"
                        type="text"
                        required
                        name="thumbnail"
                        id="thumbnail"
                        className="bg-transparent px-2 py-1 border"
                        onChange={handleUserInput}
                        value={productData.thumbnail}
                        size="lg" />
                         <Textarea label="discription"
                        type="text"
                        required
                        name="description"
                        id="description"
                        // placeholder="Enter your email.."
                        className="bg-transparent px-2 py-1 border"
                        onChange={handleUserInput}
                        value={productData.description}
                        size="lg" />
                     {/* <div className="-ml-2.5">
            <Checkbox label="Remember Me" />
          </div> */}
                  </CardBody>
                  <CardFooter className="pt-0">
                     <Button variant="gradient" onClick={updateProduct} fullWidth>
                        Update Product
                     </Button>

                  </CardFooter>
               </Card>

            </div>
      
         </div>      
      </div>

      
   )
}

export default EditProcuts
