import React, { useState } from "react";
import { Link } from "react-router-dom";
import StudentCard from "./StudentCard";

const StudentForm = () => {
  const [student, setStudent] = useState({
    std_name: "",
    std_cor: "",
    std_age: "",
  });

  const [latestStudent, setLatestStudent] = useState(null);

  function handleChange(e) {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  }

  function formSubmit(e) {
    e.preventDefault();

    if (!student.std_name || !student.std_cor || !student.std_age) {
      alert("All fields are required");
      return;
    }

    const oldStudents =
      JSON.parse(localStorage.getItem("students")) || [];

    const updatedStudents = [...oldStudents, student];

    localStorage.setItem("students", JSON.stringify(updatedStudents));

    // Update the recently added card
    setLatestStudent(student);

    setStudent({
      std_name: "",
      std_cor: "",
      std_age: "",
    });

    alert("Student Added Successfully");
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <form
        onSubmit={formSubmit}
        className="bg-gray-200 p-6 rounded-2xl flex flex-col gap-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 border border-gray-400 rounded-lg hover:bg-white">
          <label className="sm:w-24 font-semibold">Name</label>

          <input
            type="text"
            name="std_name"
            placeholder="John Cena"
            value={student.std_name}
            onChange={handleChange}
            className="flex-1 w-full px-4 py-2 border rounded-md"
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 border border-gray-400 rounded-lg hover:bg-white">
          <label className="sm:w-24 font-semibold">Course</label>

          <input
            type="text"
            name="std_cor"
            placeholder="Computer"
            value={student.std_cor}
            onChange={handleChange}
            className="flex-1 w-full px-4 py-2 border rounded-md"
          />
        </div>

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

        <div className="text-center">
          <Link
            to="/student-details"
            className="underline text-blue-700 hover:text-blue-900"
          >
            View All Students
          </Link>
        </div>
      </form>

      <StudentCard L_Student={latestStudent} />
    </div>
  );
};

export default StudentForm;