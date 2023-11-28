

import React, { useState } from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, LabelList } from 'recharts';
import { BsCollectionPlayFill, BsTrash } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { FcSalesPerformance } from "react-icons/fc";
import { GiMoneyStack } from "react-icons/gi";
import { IoIosAddCircle } from "react-icons/io"
import MainLayout from '../Layouts/MainLayout';
import { Tooltip as Tool, Button, useSelect } from "@material-tailwind/react";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {BiSolidEditAlt} from "react-icons/bi"
import {RiDeleteBin6Fill} from "react-icons/ri"
import { deleteProduct } from '../store/AdminProducts';
import { fetchAllProduct } from '../store/Products';
import toast from 'react-hot-toast';


function AdminDashboard() {
      
  const products = useSelector((state)=>state?.product?.product)
  const dispatch = useDispatch()
   const navigate = useNavigate()
   const [text, setText] = useState("")



  const deleteProd = async (id)=> {
    // toast.alert("are yoy sure to dleted the")
  
    window.alert("are you sure you want to delete this product ") 
    const res = await dispatch(deleteProduct(id)) 
    if(res){
       dispatch(fetchAllProduct())
    }
    // console.log(res)
  }
   
  const filterData = products.filter((item)=>{
    // console.log(item)
    return item.title.toLowerCase().includes(text);

   })

  const editProduct = async (id)=>{
          // navigate("update-product", id)
          navigate(`update-product/${id}`);
          // {state :{ _id : id } , replace:true})
  }

  const bar = [
    { name: 'Category A', value: 300 },
    { name: 'Category B', value: 500 },
    { name: 'Category C', value: 200 },
    { name: 'Category D', value: 700 },
  ];
  const data = [
    { name: 'Category A', value: 400 },
    { name: 'Category B', value: 300 },
    { name: 'Category C', value: 200 },
    { name: 'Category D', value: 100 },
  ];

  // Define custom colors for the pie chart
  const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (

    <div className='bg-gray-300 text-center min-h-screen relative   '>
      <MainLayout className="absolute left-0 top-0" />




      <div>

        <h1 className='text-2xl p-4'>Admin Dashboard</h1>
      </div>
      <div className='absolute top-0 right-0 bg-white rounded-full p-1  flex-col flex justify-center items-center'>
        {/* <p>Add Products</p> */}
        <Link to="/add-product">
          <Tool content="Add Product">
            <Button className='p-2 bg-none rounded-full'>
              <IoIosAddCircle className='text-4xl' />
            </Button>
          </Tool>
        </Link>

      </div>
      <div className='grid grid-cols-2'>

        <div className=''>

          <PieChart width={500} height={500} className='flex justify-center items-center'>
            <Pie className=''
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index]} />
              ))}
            </Pie>
            <Tooltip />

            <Legend />
          </PieChart >
          <div className='flex justify-center items-center gap-3 w-[80%] text-2xl m-3'>
            <p className=' text-4xl text-blue-gray-700'> <FaUsers /></p>
            9487
          </div>
        </div>
        <div>
          <BarChart width={500} height={500} data={bar} className='flex justify-center items-center'>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8">
              <LabelList dataKey="value" position="top" />
            </Bar>
          </BarChart>
          <div className='flex justify-center items-center  w-[80%] gap-3  text-2xl m-3'>
            <p className='  text-4xl  text-green-700'><GiMoneyStack /> </p>
            87742948
          </div>



        </div>
      </div>
        <div className='bg-[#a5b1c2]  p-10 pt-20 '>


          {/* **************   */}



<div className="overflow-x-auto ">

<div className=' mb-8'>
            <input type="text" name="text" value={text} onChange={(e)=> setText(e.target.value)} className='w-[30rem] px-3 py-1 rounded' placeholder="Search here..." />
   </div>
  <table className="table  bg-white text-center">
    <thead className=''>
      <tr>
        <th>sr.No.</th>
        <th>Image</th> 
        <th>Title</th> 
        <th>price</th> 
        <th>Action</th> 
      
      </tr>
    </thead> 
    <tbody className='text-center' >

    {

      filterData.length > 0 ? 
        filterData.map((itm, i)=>(
          <tr  className='border-2 text-center  '>
          <tr className=' bg-white text-center flex justify-center items-center border-none'>{i + 1}</tr>
      <td className='border-2 w-[100px] h-[100px]'> <img src={itm.thumbnail} alt="" /></td>
      <td className='border-2'>{itm.title}</td>
      <td className='border-2'>{itm.price}</td>
      <td className='border-2 flex justify-around border-none'> <span className='text-2xl' onClick={()=>editProduct(itm._id)}><BiSolidEditAlt/></span>  <span  className='text-xl' onClick={()=> deleteProd(itm._id)}><RiDeleteBin6Fill/></span></td>
    </tr>
        ))
      : 

                   products.map((ele, idx)=>(
                  
                    <tr key={ele._id} className='border-2 text-center  '>
                        <tr className=' bg-white text-center flex justify-center items-center border-none'>{idx + 1}</tr>
                    <td className='border-2 w-[100px] h-[100px]'> <img src={ele.thumbnail} alt="" /></td>
                    <td className='border-2'>{ele.title}</td>
                    <td className='border-2'>{ele.price}</td>
                    <td className='border-2 flex justify-around border-none'> <span className='text-2xl' onClick={()=>editProduct(ele._id)}><BiSolidEditAlt/></span>  <span  className='text-xl' onClick={()=> deleteProd(ele._id)}><RiDeleteBin6Fill/></span></td>
                  </tr>
                   ))           
}
     
     </tbody>
   

  </table>
</div>

          {/* **************   */}
          
          



        </div>
    </div>

  );
}

export default AdminDashboard
