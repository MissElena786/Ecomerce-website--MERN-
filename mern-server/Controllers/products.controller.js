import Product from "../model/product.model.js"
import Cart from "../model/Cart.model.js"




const addProduct = async (req, res)=>{
   const {title,  description, price, discountPercentage, thumbnail, rating, stoke} = req.body

   try {
      const product  = await Product.create({
         title, description,price,   discountPercentage , thumbnail, rating, stoke
      })

      if(!product){
         return res.status(400).json({
            success: false,
            message: `Failed to create Product, please try again`,
          });
      }

      return res.status(200).json({
         success: true,
         message: `Product created successfully`,
         product
       });

      
   } catch (error) {
      return res.status(500).json({
         success: false,
         message: `ERROR : ${error}`,
       });
   }

}

const addTOCart = async (req,res)=>{
   // const deleteProduct =async (req, res)=>{
      const {id, quantity} = req.body
   
      try {

         if(!id){
            return res.status(500).json({
               success: false,
               message: `Id is required`,
             });
         }

         const product = await Product.findById(id)
         console.log(product)
         if(!product){
            return res.status(500).json({
               success: false,
               message: `product not found`,
             });
         }
         if(product.length < 0){
            return res.status(500).json({
               success: false,
               message: `product is empty`,
             });
         }
         
         
         const cartProduct = await Cart.insertMany({
            quantity : quantity,
            product_id : product._id,
            title : product.title,
            description : product.description,
            thumbnail : product.thumbnail,
            price : product.price,
            stoke : product.stoke,
            discountPercentage  : product.discountPercentage,
            rating : product.rating,
            brand : product.brand,
            images : product.images[0],
            category : product.category,
         })
         
         product.cartIsActive = true
         product.save()

         if(!cartProduct){
               return res.status(500).json({
                  success: false,
                  message: `product not added`,
                });
         }
   
           res.status(200).json({
            success: true,
            status : 200,
            message: `Add to CArt successfully`,
            cartProduct
          });         
      } catch (error) {
   
         if(error.name == "DocumentNotFoundError"){
            return res.status(500).json({
               success: false,
               message: `this item is not found : ${error}`,
             });
         }
         if(error.name == "MongoBulkWriteError"){
            return res.status(500).json({
               success: false,
               message: `Already product added in the cart...!`,
             });
         }
   
         return res.status(500).json({
            success: false,
            message: `Error : ${error}`,
          });
      }
   
   }


   const getAllCartProducts = async (req, res)=>{
      try {
   
         const products = await Cart.find({})
         const length = await Cart.find({})?.count()
         console.log(length)
         if(!products){
            return res.status(500).json({
               success: false,
               message: `Failed to fetch cart Prodcts`,
             });
         }
         if(products.length <= 0){
            return res.status(400).json({
            success: false,
            message: `Cart is empty`,
          });
         }
   
         return res.status(200).json({
            success: true,
            message: ` Cart Products fetch successfully`,
            products
          });
         
      } catch (error) {
         return res.status(500).json({
            success: false,
            message: `ERROR : ${error}`,
          });
      }
   }

   

const getAllProducts = async (req, res)=>{
   try {

      const products = await Product.find({})
      if(!products){
         return res.status(500).json({
            success: false,
            message: `Failed to fetch Prodcts`,
          });
      }
      if(products.length <= 0){
         return res.status(400).json({
         success: false,
         message: `Products is empty`,
       });
      }

      return res.status(200).json({
         success: true,
         message: `Products fetch successfully`,
         products
       });
      
   } catch (error) {
      return res.status(500).json({
         success: false,
         message: `ERROR : ${error}`,
       });
   }
}

const deleteProduct =async (req, res)=>{
   const {id} = req.body

   try {
      const product = await Product.findById(id)
      if(!product){
         return res.status(500).json({
            success: false,
            message: `product not found`,
          });
      }
      if(product.length < 0){
         return res.status(500).json({
            success: false,
            message: `product is empty`,
          });
      }
      
       const deleted = await Product.findByIdAndDelete(id)
       if(!deleted){
         return res.status(500).json({
            success: false,
            message: `product not deleted`,
         
          });
       }

        res.status(200).json({
         success: true,
         message: `product deleted successfully`,
       });
      
   } catch (error) {

      if(error.name == "DocumentNotFoundError"){
         return res.status(500).json({
            success: false,
            message: `this item is not found : ${error}`,
          });
      }

      return res.status(500).json({
         success: false,
         message: `Error : ${error}`,
       });
   }

}

const deleteCartProduct =async (req, res)=>{
   const {id} = req.body

   try {
      const product = await Cart.findById(id)
      if(!product){
         return res.status(500).json({
            success: false,
            message: `product not found`,
          });
      }
      if(product.length < 0){
         return res.status(500).json({
            success: false,
            message: `Cart is is empty`,
          });
      }
      
       const deleted = await Cart.deleteOne(product)
       if(!deleted){
         return res.status(500).json({
            success: false,
            message: `product not deleted`,
         
          });
       }

        res.status(200).json({
         success: true,
         status : 200,
         message: `product removed successfully`,
       });
      
   } catch (error) {

      if(error.name == "DocumentNotFoundError"){
         return res.status(500).json({
            success: false,
            message: `this item is not found : ${error}`,
          });
      }

      return res.status(500).json({
         success: false,
         message: `Error : ${error}`,
       });
   }

}

const updateProduct =async (req, res)=>{
      const {id} = req.params
      if(!id){
         return res.status(500).json({
            success: false,
            message: `id is required`,
          });
      }
      const {title,discountPercentage, description, price, stoke, rating, thumbnail,  category, images } = req.body
      if(!title || !description || !discountPercentage || !price || !thumbnail){
         return res.status(500).json({
            success: false,
            message: `All fields are required`,
          });
      }



         const product = await Product.findById(id)
         if(!product){
            return res.status(500).json({
               success: false,
               message: `product not found`,
             });
         }

         try {
            
            const updated = await Product.findByIdAndUpdate(
               id,
               {
                 title,
                 discountPercentage,
                 description,
                 price,
                 stoke,
                 rating,
                 thumbnail,
                 category,
                 images
               },
               { new: true } // This option returns the updated document
             );
             console.log(updated)

             if(!updated){
               return res.status(500).json({
                  success: false,
                  message: `product not updated`,
                });
            }

            return res.status(200).json({
               success: true,
               message: `product updated successfully`,
               updated
             });
         } catch (error) {
            console.log(error)
            return res.status(500).json({
               success: false,
               message: `ERROR : ${error}`,
             });
         }

         
      }
      //  catch (error) {

      //    if(error.name == "DocumentNotFoundError"){
      //       return res.status(500).json({
      //          success: false,
      //          message: `this item is not found : ${error}`,
      //        });
      //    }

      //    return res.status(500).json({
      //       success: false,
      //       message: `ERROR : ${error}`,
      //     });
      // }
// }





export {
   addProduct,
   getAllProducts,
   deleteProduct,
   updateProduct,
   addTOCart,
   getAllCartProducts,
   deleteCartProduct
}