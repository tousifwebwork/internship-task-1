import React, { useEffect, useState } from "react";

const StudentCard = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("students")) || [];
    setStudents(data);
  }, []);

  const latestStudent = students[students.length - 1];

  return (
    <div className="flex justify-center items-center h-full mt-8 lg:mt-0">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 border">
        <h2 className="text-2xl font-bold text-center mb-6">
          Recently Added
        </h2>

        {students.length > 0 ? (
          <div className="space-y-4 text-lg">
            <div className="flex flex-col sm:flex-row sm:justify-between">
              <span className="font-semibold">Name:</span>
              <span>{latestStudent.std_name}</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-between">
              <span className="font-semibold">Course:</span>
              <span>{latestStudent.std_cor}</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-between">
              <span className="font-semibold">Age:</span>
              <span>{latestStudent.std_age}</span>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500 py-8">
            No student added yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentCard;