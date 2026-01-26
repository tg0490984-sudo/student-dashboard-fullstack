import { useState } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Subjects from "./pages/Subjects";
import Assignments from "./pages/Assignments";
import Attendance from "./pages/Attendance";
import {
  LayoutDashboard,
  BookOpen,
  ClipboardList,
  CalendarCheck,
} from "lucide-react";

function App() {
  const [active, setActive] = useState("Dashboard");

  return (
    <div className="min-h-screen flex bg-gray-900 text-gray-100">
      
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 p-6 hidden md:block">
        <h2 className="text-2xl font-bold text-white mb-8">
          Dashboard
        </h2>

        <ul className="space-y-2 text-gray-300">
  {[
  { name: "Dashboard", path: "/", icon: LayoutDashboard },
  { name: "Subjects", path: "/subjects", icon: BookOpen },
  { name: "Assignments", path: "/assignments", icon: ClipboardList },
  { name: "Attendance", path: "/attendance", icon: CalendarCheck },
].map((item) => (
    <NavLink
      key={item.name}
      to={item.path}
      end={item.path === "/"}
      className={({ isActive }) =>
        `block px-3 py-2 rounded-md cursor-pointer transition-all duration-200 ease-in-out

        ${
          isActive
            ? "bg-gray-700 text-white"
            : "hover:text-white"
        }`
      }
    >
      <div className="flex items-center gap-3">
        <item.icon size={18} />
        <span>{item.name}</span>
      </div>

    </NavLink>
  ))}
</ul>


      </aside>

      {/* Main Area */}
      <main className="flex-1">
        
        {/* Top Navbar */}
        <div className="bg-gray-800 shadow px-6 py-4">
          <h1 className="text-xl font-semibold text-white">
            Student Dashboard
          </h1>
        </div>

        {/* Content */}
        <div className="p-6">
  <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route path="/subjects" element={<Subjects />} />
    <Route path="/assignments" element={<Assignments />} />
    <Route path="/attendance" element={<Attendance />} />
  </Routes>
</div>

      </main>

    </div>
  );
}

export default App;
