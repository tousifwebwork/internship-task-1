import React, { useState } from "react";

const EditModel = ({ student, index, students, setStudents }) => {
  const [name, setName] = useState(student.std_name);
  const [course, setCourse] = useState(student.std_cor);
  const [age, setAge] = useState(student.std_age);

  function updateStudent() {
    const updatedStudent = [...students];

    updatedStudent[index] = {
      ...updatedStudent[index],
      std_name: name,
      std_cor: course,
      std_age: age,
    };

    setStudents(updatedStudent);

    localStorage.setItem(
      "students",
      JSON.stringify(updatedStudent)
    );

    document
      .getElementById(`my_modal_${index}`)
      .close();
  }

  return (
    <>
      {/* Edit Button */}
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition"
        onClick={() =>
          document
            .getElementById(`my_modal_${index}`)
            .showModal()
        }
      >
        Edit
      </button>

      {/* Modal */}
      <dialog
        id={`my_modal_${index}`}
        className="modal"
      >
        <div className="modal-box">

          <h3 className="font-bold text-lg mb-4">
            Edit Student
          </h3>

          {/* Name */}
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-2 mb-3 rounded"
            placeholder="Name"
          />

          {/* Course */}
          <input
            type="text"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            className="w-full border p-2 mb-3 rounded"
            placeholder="Course"
          />

          {/* Age */}
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full border p-2 mb-3 rounded"
            placeholder="Age"
          />

          {/* Buttons */}
          <div className="modal-action">

            <button
              onClick={updateStudent}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Update
            </button>

            <form method="dialog">
              <button className="bg-gray-500 text-white px-4 py-2 rounded">
                Cancel
              </button>
            </form>

          </div>

        </div>
      </dialog>
    </>
  );
};

export default EditModel;