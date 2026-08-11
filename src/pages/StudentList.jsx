import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SortStudents from "../components/SortStudents";
import TotalStudent from "../components/TotalStudent";
import EditModel from "../components/EditModel";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("students")) || [];
    setStudents(data);
  }, []);

  // Search students
  function searchFun() {
    return students.filter((student) =>
      student.std_name.toLowerCase().includes(search.toLowerCase())
    );
  }

  // Delete student
  function deleteFun(index) {
    const con = window.confirm("Do you want to delete this student?");

    if (!con) return;

    const updatedStudents = students.filter((_, i) => i !== index);

    setStudents(updatedStudents);
    localStorage.setItem("students", JSON.stringify(updatedStudents));
  }

  // Toggle status
  function toggle_status(index) {
    const updatedStudents = [...students];

    updatedStudents[index].status =
      updatedStudents[index].status === "Active"
        ? "Inactive"
        : "Active";

    setStudents(updatedStudents);
    localStorage.setItem("students", JSON.stringify(updatedStudents));
  }

  return (
    <div className=" p-10">
      {/* Top Section */}
      <div className="mt-0 mb-1 grid grid-cols-2 gap-4 md:grid-cols-[180px_1fr]">
        
        {/* PAgination Button */}
        <Link
          to="/pagination"
          className="text-center bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm md:text-base"
        >
          ←{" "}
          <span className="text-white hidden sm:inline">Pagination</span>
          <span className="text-white sm:hidden">Pagination</span>
        </Link>

        {/* Back Button */}
        <Link
          to="/"
          className="text-center bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm md:text-base"
        >
          ←{" "}
          <span className="text-white hidden sm:inline">Back to Home</span>
          <span className="text-white sm:hidden">Back</span>
        </Link>

        {/* Sort + Total */}
        <div className="flex flex-col gap-2">
          <SortStudents
            students={students}
            setStudents={setStudents}
          />

          <TotalStudent count={searchFun().length} />
        </div>

        {/* Search */}
        <div className="col-span-2 md:col-span-1 md:row-span-2 md:row-start-1 md:col-start-2 flex flex-col sm:flex-row sm:items-center gap-3">
          <label className="font-medium whitespace-nowrap dark:text-white">
            Search by Name
          </label>

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Name"
            className="dark:text-white w-full border border-gray-600 rounded-lg px-4 py-2 focus:ring-1 focus:outline-none focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Student Table */}
      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="dark:text-black min-w-[700px] w-full border border-gray-300 bg-white">
          
          <thead className="bg-gray-200">
            <tr>
              <th className="w-32 border px-3 py-3">
                Name
              </th>

              <th className="w-32 border px-3 py-3">
                Course
              </th>

              <th className="w-32 border px-3 py-3">
                Age
              </th>

              <th className="w-32 border px-3 py-3">
                Status
              </th>

              <th className="w-32 border px-3 py-3">
                Date
              </th>

              <th className="w-32 border px-3 py-3">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {students.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-12 text-gray-500 text-lg"
                >
                  No Data Added
                </td>
              </tr>
            ) : searchFun().length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-12 text-gray-500 text-lg"
                >
                  No Student Found
                </td>
              </tr>
            ) : (
              searchFun().map((student) => { 
                const originalIndex = students.findIndex((item) => item === student);

                return (
                  <React.Fragment key={originalIndex}>
                    <tr className="hover:bg-gray-100">

                      {/* Name */}
                      <td className="border px-3 py-3 md:px-6">
                        {student.std_name}
                      </td>

                      {/* Course */}
                      <td className="border px-3 py-3 md:px-6">
                        {student.std_cor}
                      </td>

                      {/* Age */}
                      <td className="border px-3 py-3 md:px-6">
                        {student.std_age}
                      </td>

                      {/* Status */}
                      <td className="border px-3 py-3 md:px-6 text-center">
                        <fieldset
                          className={
                            student.status === "Active"
                              ? "border bg-green-200 rounded-box p-2 md:w-10"
                              : "border bg-red-200 rounded-box p-2 md:w-10"
                          }
                        >
                          <label className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              className="toggle toggle-sm"
                              checked={student.status === "Active"}
                              onChange={() =>
                                toggle_status(originalIndex)
                              }
                            />

                            <span className="text-sm">
                              {student.status || "Inactive"}
                            </span>
                          </label>
                        </fieldset>
                      </td>

                      {/* Date */}
                      <td className="border px-3 py-3 md:px-6 text-center">
                        <p>{student.date || "N/A"}</p>
                      </td>

                      {/* Actions */}
                      <td className="border px-3 py-3 md:px-6">
                        <div className="flex gap-2 justify-center">

                          {/* Delete */}
                          <button  onClick={() =>   deleteFun(originalIndex) }
                             className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition" >
                            Delete
                          </button>

                          {/* Edit */}
                          <EditModel  student={student} index={originalIndex} students={students} setStudents={setStudents} />
                        </div>
                      </td>

                    </tr>
                  </React.Fragment>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentList;