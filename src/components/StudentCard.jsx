import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Student_Input = () => {

    
  const [students, setstudents] = useState([])

  useEffect(()=>{
    const data  = JSON.parse(localStorage.getItem("students")) || [];
    setstudents(data);  
  },[])

  function delete_fun(index){
  let con = confirm('Do u wan to delete')
  if(!con) return 
  const updatedStudents = students.filter((_, i) => i !== index);
  setstudents(updatedStudents);
  localStorage.setItem("students",JSON.stringify(updatedStudents));
  }


  return (
      <div className="flex justify-center items-center flex-col  h-full relative">
         <p className='absolute top-20 text-3xl'>Recenly added</p>
        {students.length > 0 && (
         <>
               <p className='text-2xl'>Name:    {students[students.length-1].std_name}</p>
               <p className='text-2xl'>Course: {students[students.length-1].std_cor}</p>
               <p className='text-2xl'>Age:  {students[students.length-1].std_age}</p>
         </>
        )}
      </div>
  )
}

export default Student_Input