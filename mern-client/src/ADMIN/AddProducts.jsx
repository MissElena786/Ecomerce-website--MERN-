import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
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
import { CreateProduct } from '../store/AdminProducts';
import { fetchAllProduct } from '../store/Products';

function AddProducts() {

   const navigate = useNavigate();



   const [productData, setProductData] = useState({
      title : "",
        description: "", price: "",
         discountPercentage: "35",
          thumbnail: "",
           rating: "4.8",
            stoke: "100",
  });

  const dispatch = useDispatch()


   function handleUserInput(e) {
      const { name, value } = e.target;
      setProductData({
         ...productData,
         [name]: value
      })
   }



   async function createNewProduct(event) {
      event.preventDefault();
   
      const response = await dispatch(CreateProduct(productData));
      console.log(response)
       if(response.payload.success){
       navigate("/admin/dashboard")
       dispatch(fetchAllProduct())
     
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
                     <Button variant="gradient" onClick={createNewProduct} fullWidth>
                        Add Product
                     </Button>

                  </CardFooter>
               </Card>

            </div>
      
         </div>      
      </div>

      
   )
}

export default AddProducts
