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
<div className="flex justify-center mt-10 flex-col">
  <Link to='/' className='mb-3 bg-blue-400 w-fit px-4 py-2 rounded hover:bg-blue-800 hover:text-white'>Back to Home</Link>
  <div className="w-full max-w-5xl overflow-x-auto">
    <table className="w-full border border-gray-300 rounded-lg overflow-hidden shadow-lg">
      
      <thead className="bg-gray-200">
        <tr>
          <th className="border border-gray-300 px-5 py-4  ">
            Name
          </th>
          <th className="border border-gray-300 px-0 py-4  ">
            Department
          </th>
          <th className="border border-gray-300 px-0 py-4  ">
            Roll No.
          </th>
          <th className="border border-gray-300 px-0 py-4 text-center">
            Action
          </th>
        </tr>
      </thead>

      <tbody>
        {
        students.length === 0 ? 
        <tr className='fixed border-2  border-t-0 h-80 w-255 flex flex-col justify-center items-center'>
          <h1 className='text-4xl '>No Data Added</h1> 
          <p>Insert Some Data</p>
        </tr>
        
        :   
         
         students.map((student, index) => (
          <tr key={index} className="hover:bg-gray-100">
             
             <td className="border border-gray-300 px-6 py-4">{student.std_name} </td>

              <td className="border border-gray-300 px-6 py-4"> {student.std_cor}</td>

             <td className="border border-gray-300 px-6 py-4"> {student.std_age}</td>

             <td className="border border-gray-300 px-6 py-4 text-center"> <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md" onClick={()=>delete_fun(index)}>Delete  </button>
         
          </td>
    </tr>
  ))} 
        
      </tbody> 
       
    </table>
  </div>
</div>
  )
}

export default Student_Input