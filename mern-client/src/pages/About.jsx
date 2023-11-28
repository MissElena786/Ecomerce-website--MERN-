import React from 'react'
import MainLayout from '../Layouts/MainLayout'

function About() {
   return (
      <div>

   
      <MainLayout/>

     
      <div className='p-10  min-h-screen bg-gray-200 text-ellipsis'>
         <main className='main md:w-[70%] bg-gray-800 relative pb-[5rem]'>
            <h1 className='text-xl'>We are provinding online shopping of everythig shu</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
               Rem praesentium ipsum ab ipsa cum vel earum? Eos atque cumque animi eveniet quidem
               mollitia dolore vel, voluptate officia reiciendis sit ea.
               Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum,
               repudiandae perferendis! Accusantium dolor dolore numquam commodi fuga vitae pariatur
               soluta obcaecati ducimus hic eaque facilis sunt, repudiandae quos harum optio.</p>
            <button className="btn bg-white text-black flex rounded absolute bottom-5 right-7 p-2 m-2">
               Contact Us
               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 " fill="none" viewBox="0 0 24 24" stroke="currentColor"><path className='hover:bg-red-500' strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
            </button>    
        </main>
      </div>
      </div>
   ) 
}

export default About
