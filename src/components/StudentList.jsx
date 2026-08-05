import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const StudentList = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("students")) || [];
    setStudents(data);
  }, []);

  function deleteFun(index) {
    const con = window.confirm("Do you want to delete this student?");
    if (!con) return;

    const updatedStudents = students.filter((_, i) => i !== index);
    setStudents(updatedStudents);
    localStorage.setItem("students", JSON.stringify(updatedStudents));
  }

  return (
    <div className="mt-8 px-4">
      <Link
        to="/"
        className="inline-block mb-5 bg-blue-500 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
      >
        ← Back to Home
      </Link>

      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="min-w-full border border-gray-300 bg-white">
          <thead className="bg-gray-200">
            <tr>
              <th className="border px-6 py-3">Name</th>
              <th className="border px-6 py-3">Course</th>
              <th className="border px-6 py-3">Age</th>
              <th className="border px-6 py-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {students.length === 0 ? (
              <tr>
                <td
                  colSpan="4"
                  className="text-center py-12 text-gray-500 text-lg"
                >
                  No Data Added
                </td>
              </tr>
            ) : (
              students.map((student, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="border px-6 py-4">{student.std_name}</td>
                  <td className="border px-6 py-4">{student.std_cor}</td>
                  <td className="border px-6 py-4">{student.std_age}</td>
                  <td className="border px-6 py-4 text-center">
                    <button
                      onClick={() => deleteFun(index)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentList;