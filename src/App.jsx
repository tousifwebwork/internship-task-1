import React, { useEffect, useState } from 'react';
import StudentForm from './components/Student_Form';
import StudentList from './components/StudentList';
import { Route, Routes } from 'react-router-dom';
import Toggle from './components/Nab/Toggle';

const App = () => {

  const [tog, settog] = useState(JSON.parse(localStorage.getItem("toggle_theme")) || "light");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", tog === "dark");
    localStorage.setItem("toggle_theme", JSON.stringify(tog));
  }, [tog]);


  return (
    <div  className={ tog === "dark"? "bg-gray-800 text-white min-h-screen": "bg-white text-black min-h-screen" }>
       <Toggle toggle={tog} settoggle={settog} />

      <div className="min-h-screen bg-white text-black dark:bg-gray-800 dark:text-white">

        <Routes>
          <Route path="/" element={<StudentForm />} />
          <Route path="/student-details" element={<StudentList />} />
        </Routes>

      </div>
    </div>
  );
};

export default App;