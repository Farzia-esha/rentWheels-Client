import { NavLink, Outlet, useNavigate } from "react-router";
import { LayoutDashboard, User, Users, LogOut } from "lucide-react";
import { useAuth } from "../Provider/AuthProvider";

const DashboardLayout = () => {
  const { user, isAdmin, logoutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-purple-700 text-white p-6">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

        <NavLink to="/dashboard" end className="block p-2 rounded hover:bg-purple-600">
          <LayoutDashboard className="inline mr-2" /> Overview
        </NavLink>

        <NavLink to="/dashboard/profile" className="block p-2 rounded hover:bg-purple-600">
          <User className="inline mr-2" /> Profile
        </NavLink>

        {isAdmin && (
          <NavLink to="/dashboard/users" className="block p-2 rounded hover:bg-purple-600">
            <Users className="inline mr-2" /> Manage Users
          </NavLink>
        )}
      </aside>

      {/* Main */}
      <div className="flex-1 bg-gray-100">
        {/* Top Navbar */}
        <header className="bg-white p-4 shadow flex justify-between items-center">
          <p className="font-bold">Welcome, {user?.displayName}</p>
          <NavLink to="/">Home</NavLink>
          <button onClick={handleLogout} className="bg-purple-700 text-white px-4 py-2 rounded">
            <LogOut size={16} className="inline mr-1" /> Logout
          </button>
        </header>

        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
