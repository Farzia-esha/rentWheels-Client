import { NavLink, Outlet, useNavigate } from "react-router";
import { LayoutDashboard, User, Users, LogOut, Menu } from "lucide-react";
import { useAuth } from "../Provider/AuthProvider";
import { useState } from "react";

const DashboardLayout = () => {
  const { user, isAdmin, logoutUser } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await logoutUser();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-purple-700">

      {/* Sidebar */}
      <aside className={`fixed md:relative z-20  bg-purple-700 text-white w-64 h-full transition-transform transform ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      }`}>
        <div className="flex justify-between items-center md:hidden mb-6">
          <h2 className="text-2xl font-bold">Dashboard</h2>
          <button onClick={() => setSidebarOpen(false)}>
            ✕
          </button>
        </div>

        <h2 className="text-2xl font-bold mb-6 hidden md:block">Dashboard</h2>

        <NavLink to="/dashboard" end className="block p-2 rounded hover:bg-purple-600 mb-1">
          <LayoutDashboard className="inline mr-2" /> Overview
        </NavLink>

        <NavLink to="/dashboard/profile" className="block p-2 rounded hover:bg-purple-600 mb-1">
          <User className="inline mr-2" /> Profile
        </NavLink>

        {isAdmin && (
          <NavLink to="/dashboard/users" className="block p-2 rounded hover:bg-purple-600 mb-1">
            <Users className="inline mr-2" /> Manage Users
          </NavLink>
        )}
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-h-screen md:ml-20">
        {/* Top Navbar */}
        <header className="bg-white p-4 shadow flex justify-between items-center md:justify-end">
          <div className="flex items-center md:hidden">
            <button onClick={() => setSidebarOpen(true)} className="mr-4">
              <Menu />
            </button>
          </div>

          <p className="font-bold hidden md:block mr-auto">Welcome, {user?.displayName}</p>
          <NavLink to="/" className="mr-4 md:block">Home</NavLink>

          <button onClick={handleLogout} className="bg-purple-700 text-white px-4 py-2 rounded flex items-center">
            <LogOut size={16} className="inline mr-1" /> Logout
          </button>
        </header>

        <main className="p-4 md:p-6 bg-gray-100 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

// import { NavLink, Outlet, useNavigate } from "react-router";
// import { LayoutDashboard, User, Users, LogOut } from "lucide-react";
// import { useAuth } from "../Provider/AuthProvider";

// const DashboardLayout = () => {
//   const { user, isAdmin, logoutUser } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     await logoutUser();
//     navigate("/login");
//   };

//   return (
//     <div className="flex min-h-screen">
//       {/* Sidebar */}
//       <aside className="w-64 bg-purple-700 text-white p-6">
//         <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

//         <NavLink to="/dashboard" end className="block p-2 rounded hover:bg-purple-600">
//           <LayoutDashboard className="inline mr-2" /> Overview
//         </NavLink>

//         <NavLink to="/dashboard/profile" className="block p-2 rounded hover:bg-purple-600">
//           <User className="inline mr-2" /> Profile
//         </NavLink>

//         {isAdmin && (
//           <NavLink to="/dashboard/users" className="block p-2 rounded hover:bg-purple-600">
//             <Users className="inline mr-2" /> Manage Users
//           </NavLink>
//         )}
//       </aside>

//       {/* Main */}
//       <div className="flex-1 bg-gray-100">
//         {/* Top Navbar */}
//         <header className="bg-white p-4 shadow flex justify-between items-center">
//           <p className="font-bold">Welcome, {user?.displayName}</p>
//           <NavLink to="/">Home</NavLink>
//           <button onClick={handleLogout} className="bg-purple-700 text-white px-4 py-2 rounded">
//             <LogOut size={16} className="inline mr-1" /> Logout
//           </button>
//         </header>

//         <main className="p-6">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;