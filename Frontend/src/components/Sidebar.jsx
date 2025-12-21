import React from 'react';
import { LayoutDashboard, User, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 1. Clear user data from storage
    localStorage.removeItem('user');
    // 2. Redirect to Home/Login
    navigate('/login');
  };

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-100 flex flex-col hidden md:flex">
      {/* Logo */}
      <div className="p-6">
        <h2 className="text-2xl font-bold text-indigo-600 flex items-center gap-2">
          CareerAI
        </h2>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-4 space-y-2">
        <Link to="/dashboard" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl font-medium transition-all">
          <LayoutDashboard size={20} /> Dashboard
        </Link>
        <Link to="/profile" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl font-medium transition-all">
          <User size={20} /> My Profile
        </Link>
      </nav>

      {/* Footer / Logout */}
      <div className="p-4 border-t border-gray-100">
        <button 
          onClick={handleLogout} 
          className="flex items-center gap-3 w-full px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl font-medium transition-all"
        >
          <LogOut size={20} /> Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;