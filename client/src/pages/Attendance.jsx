import { useState, useEffect } from "react";

function Attendance() {
  const [present, setPresent] = useState(false);

useEffect(() => {
  fetch("http://localhost:5000/api/attendance")
    .then((res) => res.json())
    .then((data) => setPresent(data.present))
    .catch((err) => console.error(err));
}, []);
 
  return (
  <div>
    <h1 className="text-2xl font-semibold text-white mb-6">
      Attendance
    </h1>

    <div className="bg-gray-800 rounded-lg p-6 max-w-sm">
      <p className="text-gray-400 mb-2">
        Today’s Status
      </p>

      <p
        className={
          present
            ? "text-green-400 text-2xl font-semibold mb-1"
            : "text-red-400 text-2xl font-semibold mb-1"
        }
      >
        {present ? "Present" : "Absent"}
      </p>

      <p className="text-gray-500 text-sm mb-4">
        Click the button below to update your attendance.
      </p>

      <button
        onClick={() => {
          fetch("http://localhost:5000/api/attendance", {
            method: "PUT",
          })
            .then((res) => res.json())
            .then((data) =>
              setPresent(data.attendance.present)
            )
            .catch((err) => console.error(err));
        }}
        className="w-full px-5 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 transition"
      >
        Mark {present ? "Absent" : "Present"}
      </button>
    </div>
  </div>
);


}

export default Attendance;
