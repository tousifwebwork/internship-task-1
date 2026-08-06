import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const [editStudent, setEditStudent] = useState({
    std_name: "",
    std_cor: "",
    std_age: "",
  });

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

  function editFun(index) {
    setEditIndex(index);
    setEditStudent({ ...students[index] });
  }

  function updateFun(index) {
    const updatedStudents = [...students];

    updatedStudents[index] = editStudent;

    setStudents(updatedStudents);
    localStorage.setItem("students", JSON.stringify(updatedStudents));

    setEditIndex(null);
  }

  return (
    <div className="mt-8 px-4">
      <Link  to="/" className="inline-block mb-5 bg-blue-500 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition">
        ← Back to Home
      </Link>

      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="min-w-full border border-gray-300 bg-white">
          <thead className="bg-gray-200">
            <tr>
              <th className="border px-3 py-3 md:px-6">Name</th>
              <th className="border px-3 py-3 md:px-6">Course</th>
              <th className="border px-3 py-3 md:px-6">Age</th>
              <th className="hidden sm:table-cell border px-3 py-3 md:px-6">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-12 text-gray-500 text-lg"  >
                  No Data Added
                </td>
              </tr>
            ) : (
              students.map((student, index) => (
                <React.Fragment key={index}>
                  {/* Student Row */}
                  <tr className="hover:bg-gray-100">  
                    {/* Name */}
                    <td className="border px-3 py-3 md:px-6">
                      {editIndex === index ? (
                        <input
                          type="text"
                          value={editStudent.std_name}
                          onChange={(e) =>setEditStudent({  ...editStudent,  std_name: e.target.value,})}
                          className="w-full border rounded-md px-2 py-1"
                        />
                      ) : (
                        student.std_name
                      )}
                    </td>

                    {/* Course */}
                    <td className="border px-3 py-3 md:px-6">
                      {editIndex === index ? (
                        <input
                          type="text"
                          value={editStudent.std_cor}
                          onChange={(e) =>
                            setEditStudent({
                              ...editStudent,
                              std_cor: e.target.value,
                            })
                          }
                          className="w-full border rounded-md px-2 py-1"
                        />
                      ) : (
                        student.std_cor
                      )}
                    </td>

                    {/* Age */}
                    <td className="border px-3 py-3 md:px-6">
                      {editIndex === index ? (
                        <input
                          type="number"
                          value={editStudent.std_age}
                          onChange={(e) =>
                            setEditStudent({
                              ...editStudent,
                              std_age: e.target.value,
                            })
                          }
                          className="w-full border rounded-md px-2 py-1"
                        />
                      ) : (
                        student.std_age
                      )}
                    </td>

                    {/* Desktop Action */}
                    <td className="hidden sm:table-cell border px-3 py-3 md:px-6">
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => deleteFun(index)}
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
                        >
                          Delete
                        </button>

                        <button
                          onClick={() =>
                            editIndex === index
                              ? updateFun(index)
                              : editFun(index)
                          }
                          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition"
                        >
                          {editIndex === index ? "Update" : "Edit"}
                        </button>
                      </div>
                    </td>
                  </tr>

                  {/* Mobile Buttons */}
                  <tr className="sm:hidden">
                    <td colSpan="3" className="border px-3 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => deleteFun(index)}
                          className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-md"
                        >
                          Delete
                        </button>

                        <button
                          onClick={() =>
                            editIndex === index
                              ? updateFun(index)
                              : editFun(index)
                          }
                          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md"
                        >
                          {editIndex === index ? "Update" : "Edit"}
                        </button>
                      </div>
                    </td>
                  </tr>
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentList;