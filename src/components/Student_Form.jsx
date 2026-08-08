import React, { useState } from "react";
import { Link } from "react-router-dom";
import StudentCard from "./StudentCard";
import Toggle from "./Nab/Toggle";

const StudentForm = () => {
  const [student, setStudent] = useState({
    std_name: "",
    std_cor: "",
    std_age: "",
  });

  const [latestStudent, setLatestStudent] = useState(null);

  function handleChange(e) {
    setStudent({  ...student,  [e.target.name]: e.target.value,  });
  }

  function formSubmit(e) {
    e.preventDefault();

    if (!student.std_name || !student.std_cor || !student.std_age) {
      alert("All fields are required");
      return;
    }

    const oldStudents = JSON.parse(localStorage.getItem("students")) || [];

    // ID
    const ID_number = oldStudents.length+1;
    const ID = `STD${String(ID_number).padStart(3,'0')}`

    // Date
    const dateAdded = new Date().toLocaleDateString()



    const new_data={ std_id:ID,date:dateAdded , ...student}
    const updatedStudents = [...oldStudents, new_data];

    localStorage.setItem("students", JSON.stringify(updatedStudents));

    // Update the recently added card
    setLatestStudent(new_data);

    setStudent({
      std_name: "",
      std_cor: "",
      std_age: "",
    });

    alert("Student Added Successfully");
  }

  function reset_fun(){
    setStudent({
      std_name: "",
      std_cor: "",
      std_age: "",
    });
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-5 md:p-0 ">
 
      <form  onSubmit={formSubmit} className="bg-gray-200 p-6 rounded-2xl flex flex-col gap-5 md:ml-20 ">

        {/* Name */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 border border-gray-400 rounded-lg hover:bg-white">
          <label className=" sm:w-24 font-semibold">Name</label>

          <input
            type="text"
            name="std_name"
            placeholder="John Cena"
            value={student.std_name}
            onChange={handleChange}
            className="flex-1 w-full px-4 py-2 border rounded-md "
          />
        </div>

        {/* Course */}
        <div className="flex items-center justify-between sm:flex-row gap-3 p-4 border border-gray-400 rounded-lg hover:bg-white">
          <label className="sm:w-24 font-semibold">Course</label>
          <div className="dropdown dropdown-end ">
             <div  id="courseBtn" tabIndex={0} role="button" className="btn w-48 md:w-90 md:ml-5">  {student.std_cor || "Select Course" }  ⬇️</div>
               <ul tabIndex="-1" className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                 <li> <button className="dark:text-black" type="button" onClick={()=>setStudent({ ...student, std_cor: "HTML" })}  >HTML</button></li>
                 <li> <button className="dark:text-black" type="button" onClick={()=>setStudent({ ...student, std_cor: "CSS" })}  >CSS</button></li>
                 <li> <button className="dark:text-black" type="button" onClick={()=>setStudent({ ...student, std_cor: "JavaScript" })}  >JavaScript</button></li>
                 <li> <button className="dark:text-black" type="button" onClick={()=>setStudent({ ...student, std_cor: "React" })}  >React</button></li>
                 <li> <button className="dark:text-black" type="button" onClick={()=>setStudent({ ...student, std_cor: "Node js" })  }>Node.js</button></li>
                 <li> <button className="dark:text-black" type="button" onClick={()=>setStudent({ ...student, std_cor: "MongoDB" })  }>MongoDB</button></li>
               </ul>
             </div>
        </div>

        {/* Age */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 border border-gray-400 rounded-lg hover:bg-white">
          <label className="sm:w-24 font-semibold">Age</label>

          <input
            type="number"
            name="std_age"
            placeholder="22"
            value={student.std_age}
            onChange={handleChange}
            className="flex-1 w-full px-4 py-2 border rounded-md"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white py-3 rounded-lg"
        >
          Add Student
        </button>

        <div className="text-center  flex justify-center items-center gap-5">
          <Link  to="/student-details"  className="underline text-blue-700 hover:text-blue-900">
            View All Students
          </Link>
          <button type="button" onClick={reset_fun} className="bg-blue-200 px-4 py-2 rounded hover:bg-blue-600 hover:text-white dark:bg-blue-500 dark:hover:bg-blue-800">
            Reset
          </button>
        </div>
      </form>

      <StudentCard L_Student={latestStudent} />
 
    </div>
  );
};

export default StudentForm;