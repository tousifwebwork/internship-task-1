import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import StudentCard from './StudentCard'
const Student_Input = () => {

  const [student, setstudent] = useState({
   std_name: "",
   std_cor: "",
   std_age: ""
  })

  function handle_change(e){
    setstudent({...student,[e.target.name]:e.target.value})
  }

  function form_sub(e){
      e.preventDefault();
      if (!student.std_name || !student.std_cor || !student.std_age) {
      alert("All Fields are required");
      return;
      }
      const old_std = JSON.parse(localStorage.getItem("students")) || [];
      const update_std = [...old_std,student];
      localStorage.setItem("students",JSON.stringify(update_std))
      console.log(update_std)
      setstudent({
      std_name: "",
      std_cor: "",
      std_age: ""
      });
     alert('Added a Student')
  }


  return (
    <div className='grid grid-cols-2'>
      <form onSubmit={form_sub}  className='flex flex-col gap-7 bg-gray-200 px-7 py-5 rounded-2xl '>
          <div className='py-4 px-2 hover:bg-white border border-gray-500'> 
            <label className='p-5'>Name:</label>
            <input  name='std_name' className='p-1 focus:outline-none focus:ring-2 ring-blue-400  focus:rounded-l px-4 py-1' type="text" placeholder='John Cena'  onChange={handle_change} value={student.std_name} /> 
          </div>
          <div className='py-4 px-2 hover:bg-white border border-gray-500'> 
            <label className='p-5'>Course:</label>
            <input  name='std_cor' className='p-1 focus:outline-none focus:ring-2 ring-blue-400  focus:rounded-l px-4 py-1' type="text" placeholder='Computer' onChange={handle_change}  value={student.std_cor}  />
          </div>
          <div className='py-4 px-2 hover:bg-white border border-gray-500'> 
            <label className='p-5'>Age:</label>
            <input name='std_age' className='p-1 focus:outline-none focus:ring-2 ring-blue-400  focus:rounded-l px-4 py-1' type="number" placeholder='32' onChange={handle_change}  value={student.std_age}   />
          </div>
          <div className='py-4 px-2flex justify-center'>
            <button type='submit' className='bg-blue-400 hover:bg-blue-800 hover:text-white px-35 py-3 rounded-xl'>Add Student</button>
          </div>
          <div className=' px-2 flex justify-center'>
            <Link className='underline' to="/student-details">View All Students?</Link>
          </div>
      </form>
      <div>
        <StudentCard />
      </div>
    </div>
  )
}

export default Student_Input