import { useState, useEffect } from "react";

function Assignments() {
  const [assignments, setAssignments] = useState([]);


  const [newAssignment, setNewAssignment] = useState("");

  const toggleStatus = (indexToToggle) => {
    fetch(`https://student-dashboard-backend-y91d.onrender.comcd client/api/assignments/${indexToToggle}`, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then((data) => {
       setAssignments(data.assignments);
      })
      .catch((err) => console.error(err));
  };


  const handleAddAssignment = () => {
    if (newAssignment.trim() === "") return;

   fetch("https://student-dashboard-backend-y91d.onrender.com/api/assignments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
     },
     body: JSON.stringify({
       title: newAssignment,
     }),
   })
      .then((res) => res.json())
      .then((data) => {
        setAssignments(data.assignments);
        setNewAssignment("");
      })
      .catch((err) => console.error(err));
  };

  
  const handleDeleteAssignment = (indexToDelete) => {
    fetch(`https://student-dashboard-backend-y91d.onrender.com/api/assignments/${indexToDelete}`, {
     method: "DELETE",
    })
     .then((res) => res.json())
     .then((data) => {
       setAssignments(data.assignments);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    localStorage.setItem(
     "assignments",
     JSON.stringify(assignments)
    );
  }, [assignments]);

  useEffect(() => {
    fetch("https://student-dashboard-backend-y91d.onrender.com/api/assignments")
      .then((res) => res.json())
      .then((data) => setAssignments(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-white mb-6">
        Assignments
      </h1>
      {/* Add Assignment */}
      <div className="flex gap-3 mb-6">
        <input type="text"
        value={newAssignment}
        onChange={(e) => setNewAssignment(e.target.value)}
        placeholder="Add new assignment"
        className="flex-1 px-4 py-2 rounded-md bg-gray-800 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-indigo-500"/>
        <button onClick={handleAddAssignment}
        className="px-5 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 transition">
          Add
        </button>
      </div>

      {/* Assignment List / Empty State */}
        {assignments.length === 0 ? (
          <p className="text-gray-400">
            No assignments added yet.
          </p>
        ) : (
          <div className="space-y-3">
           {assignments.map((assignment, index) => (
              <div
               key={index}
               className="bg-gray-800 px-4 py-3 rounded-md flex justify-between items-center">
                <span className={assignment.completed? "text-gray-400 line-through": "text-white"}>
                  {assignment.title}
                </span>

                <div className="flex items-center gap-4">
                  <button
                    onClick={() => toggleStatus(index)}
                    className="text-sm text-indigo-400 hover:text-indigo-500 transition">
                    {assignment.completed ? "Mark Pending" : "Mark Complete"}
                  </button>
                  <button
                    onClick={() => handleDeleteAssignment(index)}
                    className="text-sm text-red-400 hover:text-red-500 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
)}

    </div>
  );
}

export default Assignments;
