import { useEffect, useState } from "react";

function Assignments() {
  const [assignments, setAssignments] = useState([]);
  const [newAssignment, setNewAssignment] = useState("");
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  // Fetch assignments
  const fetchAssignments = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/assignments`);
      const data = await res.json();
      setAssignments(data);
    } catch (error) {
      console.error("Failed to fetch assignments:", error);
    }
  };

  // Add assignment
  const handleAddAssignment = async () => {
    if (!newAssignment.trim()) return;

    try {
      const res = await fetch(`${API_BASE}/api/assignments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: newAssignment }),
      });

      const data = await res.json();
      setAssignments(data.assignments);
      setNewAssignment("");
    } catch (error) {
      console.error("Failed to add assignment:", error);
    }
  };

  // Toggle assignment status
  const toggleStatus = async (index) => {
    try {
      const res = await fetch(
        `${API_BASE}/api/assignments/${index}`,
        { method: "PUT" }
      );

      const data = await res.json();
      setAssignments(data.assignments);
    } catch (error) {
      console.error("Failed to toggle status:", error);
    }
  };

  // Delete assignment
  const handleDeleteAssignment = async (index) => {
    try {
      const res = await fetch(
        `${API_BASE}/api/assignments/${index}`,
        { method: "DELETE" }
      );

      const data = await res.json();
      setAssignments(data.assignments);
    } catch (error) {
      console.error("Failed to delete assignment:", error);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-white mb-6">
        Assignments
      </h1>

      {/* Add Assignment */}
      <div className="flex gap-3 mb-6">
        <input
          type="text"
          value={newAssignment}
          onChange={(e) => setNewAssignment(e.target.value)}
          placeholder="Add new assignment"
          className="flex-1 px-4 py-2 rounded-md bg-gray-800 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={handleAddAssignment}
          className="px-5 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 transition"
        >
          Add
        </button>
      </div>

      {/* Assignment List */}
      {assignments.length === 0 ? (
        <p className="text-gray-400">No assignments added yet.</p>
      ) : (
        <div className="space-y-3">
          {assignments.map((assignment, index) => (
            <div
              key={index}
              className="bg-gray-800 px-4 py-3 rounded-md flex justify-between items-center"
            >
              <span
                className={
                  assignment.completed
                    ? "text-gray-400 line-through"
                    : "text-white"
                }
              >
                {assignment.title}
              </span>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => toggleStatus(index)}
                  className="text-sm text-indigo-400 hover:text-indigo-500 transition"
                >
                  {assignment.completed
                    ? "Mark Pending"
                    : "Mark Complete"}
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
