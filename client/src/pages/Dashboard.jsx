import { useEffect, useState } from "react";

function Dashboard() {
  const [subjectsCount, setSubjectsCount] = useState(0);
  const [assignmentsCount, setAssignmentsCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [attendance, setAttendance] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);


  useEffect(() => {
    // Fetch subjects
    fetch("http://localhost:5000/api/subjects")
     .then(res => res.json())
      .then(data => setSubjectsCount(data.length));

    // Fetch assignments
    fetch("http://localhost:5000/api/assignments")
      .then(res => res.json())
      .then(data => {
        setAssignmentsCount(data.length);

        const completed = data.filter(a => a.completed).length;
        setCompletedCount(completed);

        const pending = data.length - completed;
        setPendingCount(pending);
      });


    // Fetch attendance
    fetch("http://localhost:5000/api/attendance")
      .then(res => res.json())
      .then(data => setAttendance(data.present));
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
  {/* Total Subjects */}
  <div className="bg-gray-800 p-5 rounded-lg min-h-[110px] hover:bg-gray-700 transition">
    <p className="text-gray-400 text-sm">Total Subjects</p>
    <h2 className="text-3xl font-semibold text-white">
      {subjectsCount}
    </h2>
  </div>

  {/* Total Assignments */}
  <div className="bg-gray-800 p-5 rounded-lg min-h-[110px] hover:bg-gray-700 transition">
    <p className="text-gray-400 text-sm">Total Assignments</p>
    <h2 className="text-3xl font-semibold text-white">
      {assignmentsCount}
    </h2>
  </div>

  {/* Completed Assignments */}
  <div className="bg-gray-800 p-5 rounded-lg min-h-[110px] hover:bg-gray-700 transition">
    <p className="text-gray-400 text-sm">Completed</p>
    <h2 className="text-3xl font-semibold text-green-400">
      {completedCount}
    </h2>
  </div>

  {/* Pending Assignments */}
  <div className="bg-gray-800 p-5 rounded-lg min-h-[110px] hover:bg-gray-700 transition">
    <p className="text-gray-400 text-sm">Pending</p>
    <h2 className="text-3xl font-semibold text-yellow-400">
      {pendingCount}
    </h2>
  </div>

  {/* Attendance */}
  <div className="bg-gray-800 p-5 rounded-lg min-h-[110px] hover:bg-gray-700 transition">
    <p className="text-gray-400 text-sm">Attendance</p>
    <h2
      className={
        attendance
          ? "text-2xl font-semibold text-green-400"
          : "text-2xl font-semibold text-red-400"
      }
    >
      {attendance ? "Present" : "Absent"}
    </h2>
  </div>
</div>

  );
}

export default Dashboard;
