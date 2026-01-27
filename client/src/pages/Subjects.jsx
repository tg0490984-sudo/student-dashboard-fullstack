import { useState, useEffect } from "react";

function Subjects() {
  // Load subjects from localStorage (or default BCA subjects)
  const [subjects, setSubjects] = useState([]);


  const [newSubject, setNewSubject] = useState("");

  // Persist subjects to localStorage
  useEffect(() => {
  fetch("https://student-dashboard-backend-y91d.onrender.com/api/subjects")
    .then((res) => res.json())
    .then((data) => setSubjects(data))
    .catch((err) => console.error(err));
}, []);


  // Add a new subject
  const handleAddSubject = () => {
    if (newSubject.trim() === "") return;

    fetch("https://student-dashboard-backend-y91d.onrender.com/api/subjects", {
      method: "POST",
      headers: {
       "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subject: newSubject,
     }),
    })
      .then((res) => res.json())
      .then((data) => {
        setSubjects(data.subjects);
        setNewSubject("");
      })
      .catch((err) => console.error(err));
  };


  // Delete a subject
  const handleDeleteSubject = (indexToDelete) => {
  fetch(`https://student-dashboard-backend-y91d.onrender.com/api/subjects/${indexToDelete}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((data) => {
      setSubjects(data.subjects);
    })
    .catch((err) => console.error(err));
  };


  return (
    <div>
      <h1 className="text-2xl font-semibold text-white mb-6">
        Subjects
      </h1>

      {/* Add Subject */}
      <div className="flex gap-3 mb-6">
        <input
          type="text"
          value={newSubject}
          onChange={(e) => setNewSubject(e.target.value)}
          placeholder="Add new subject"
          className="flex-1 px-4 py-2 rounded-md bg-gray-800 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          onClick={handleAddSubject}
          className="px-5 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 transition"
        >
          Add
        </button>
      </div>

      {/* Subject List / Empty State */}
      {subjects.length === 0 ? (
        <p className="text-gray-400">
          No subjects added yet.
        </p>
      ) : (
        <div className="space-y-3">
          {subjects.map((subject, index) => (
            <div
              key={index}
              className="bg-gray-800 px-4 py-3 rounded-md flex justify-between items-center text-white"
            >
              <span>{subject}</span>

              <button
                onClick={() => handleDeleteSubject(index)}
                className="text-red-400 hover:text-red-500 transition text-sm"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Subjects;
