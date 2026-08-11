import React, { useState } from "react";
import { Link } from "react-router-dom";
import StudentCard from "../components/StudentCard";
import Toggle from "../components/Nab/Toggle";
import toast from "react-hot-toast";

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
      toast.error("All Fields are Required")
      return;
    }

    const oldStudents = JSON.parse(localStorage.getItem("students")) || [];

    const dublicate = oldStudents.some((s)=>{
    return(
    s.std_name === student.std_name &&
    s.std_cor === student.std_cor &&
    s.std_age === student.std_age
   )})
    if (dublicate) {
     toast.error("User Already exist")
     return;
    }

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

    toast.success('Successfully Added!');

    setTimeout(() => {
    toast.custom((t) => (
  <div   className={`${  t.visible ? 'animate-custom-enter' : 'animate-custom-leave'} max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}>
    <div className="flex-1 w-0 p-4">
      <div className="flex items-start">
        <div className="flex-shrink-0 pt-0.5">
          <img
            className="h-10 w-10 rounded-full"
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=6GHAjsWpt9&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
            alt=""
          />
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm font-medium text-gray-900">
            Name: {student.std_name}
          </p>
          <p className="mt-1 text-sm text-gray-500">
            Course: {student.std_cor}
          </p>
        </div>
      </div>
    </div>
    <div className="flex border-l border-gray-200">
      <button
        onClick={() => toast.dismiss(t.id)}
        className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Close
      </button>
    </div>
  </div>
    ),
    {
      duration: 3000,
    }
  );
    },2000)
    


  }

 function reset_fun() {
  toast.custom(
    (t) => (
      <div
        className={`${
          t.visible
            ? "animate-custom-enter"
            : "animate-custom-leave"
        } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
      >
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900">
                Are You Sure to Restart?
              </p>
            </div>
          </div>
        </div>

        <div className="flex border-l border-gray-200">

          {/* YES */}
          <button
            onClick={() => {
              setStudent({
                std_name: "",
                std_cor: "",
                std_age: "",
              });

              toast.remove(t.id);
            }}
            className="border border-transparent p-4 text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            Yes
          </button>

          {/* NO */}
          <button
             onClick={()=>toast.remove(t.id)}
            className="bg-blue-300 cursor-pointer border border-transparent p-4 text-sm font-medium text-red-600 hover:text-red-500"
          >
            No
          </button>

        </div>
      </div>
    ),
    {
      duration: Infinity,
    }
  );
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