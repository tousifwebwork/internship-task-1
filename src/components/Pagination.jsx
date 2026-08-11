import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
const Pagination = () => {
   const [students, setstudents] = useState('');
    const [index, setIndex] = useState(0);
   useEffect(()=>{
     function get_student(){
        const std = JSON.parse(localStorage.getItem("students")) || [];
        setstudents(std); 
     }
     get_student()
    },[])

  return (
    <div className=" h-screen w-full flex justify-center items-center flex-col relative">
     <div className='absolute top-0 flex gap-3'>
        <div className='flex flex-row gap-5'>
        <Link to="/" className="text-center bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm md:text-base">←{" "}
          <span className="text-white hidden sm:inline">Back to Home</span>
          <span className="text-white sm:hidden">Back</span>
        </Link>
        <Link to="/student-details" className="text-center bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm md:text-base">←{" "}
          <span className="text-white hidden sm:inline">View Students</span>
          <span className="text-white sm:hidden">View Students</span>
        </Link>
        </div> 
    </div>
     <div className="bg-gray-100  p-6 rounded-lg shadow-md absolute top-13">
    
    <h1 className="text-3xl text-center mb-5">
      Pagination
    </h1>

    <div className='w-[900px] min-h-[240px]  border p-2 mt-5'>
        {
            students.length === 0 ? (
            <>
            <h1>No Students Available</h1>
            </>
            )
            :
            (
            <>
            <div className='grid grid-cols-3 gap-x-3'>
                
            {
            students.slice(index, index + 3).map((s,index)=>{
                return ( 
                <div key={s.std_id} className='border p-5 flex flex-col gap-y-3' >
                <h1>ID : {s.std_id}</h1>
                <h2>Name : {s.std_name}</h2>
                <h2>Age : {s.std_age}</h2>
                <h1>Course : {s.std_cor}</h1>
                <h1>Date of Admmision : {s.date}</h1>
              </div>
               );
            })
            }
            </div>
            </>
            ) 
        }
    </div>

    
    <div className="join grid grid-cols-2">
     <button className="join-item btn btn-outline"  onClick={() => setIndex(index - 3)} disabled={index === 0}>Previous page</button>
     <button className="join-item btn btn-outline"  onClick={() => setIndex(index + 3)}  disabled={index + 3 >= students.length}>Next</button>
    </div>

     </div>
    </div>
  )
}

export default Pagination