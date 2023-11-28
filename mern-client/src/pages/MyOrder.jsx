import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MyOrders } from '../store/Cart'

 async function MyOrder() {

  // const u_id = useSelector((state) => state?.auth?.data?._id) 

  const u_id = "6538b22e78af23eb853bcd38"
 const dispatch  = useDispatch()
  // const res  = await dispatch (MyOrders(u_id))
  const [arr, setArr] = useState()
  console.log(u_id)  
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       // Dispatch the action and wait for the Promise to resolve
  //       const actionResult = await dispatch(MyOrders(u_id));
  
  //       // Check if the action result is a Promise and wait for it to resolve
  //       if (actionResult instanceof Promise) {
  //         await actionResult;
  //       }
  //       console.log(actionResult)
  
  //       // Now you can safely handle the data or update the state
  //     } catch (error) {
  //       // Handle errors
  //       console.error('Error fetching orders:', error);
  //     }
  //   };
  
  //   fetchData();
  // }, [dispatch, u_id]);
  async function fetchData() {
    try {
        // const res = await axios.get('/posts'); 
       const actionResult = await dispatch(MyOrders(u_id));
      //  setArr(actionResult?.data)
       console.log(actionResult)
      //  console.log(arr)


        // setPosts(res.data);
    } catch (err) {
        console.log(err);
    }
}

//   useEffect( () => { 
   
//     fetchData();
// }, []);
  return (
    <div>
        <div className='bg-gray-200 flex p-14 min-h-screen justify-center items-center'>
           <h1>My ORDERS</h1>
           <div>
               <button onClick={fetchData}>order</button>
           </div>
        </div>
        <div>
         
        </div>
    </div>
  )
}

export default MyOrder
