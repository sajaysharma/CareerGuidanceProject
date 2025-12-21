import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { User, Mail, Shield, Clock, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [history, setHistory] = useState([]); // State for history
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
    } else {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      fetchHistory(parsedUser.id); // Fetch history when user loads
    }
  }, [navigate]);

  const fetchHistory = async (userId) => {
    try {
      const res = await fetch(`http://127.0.0.1:5000/history/${userId}`);
      const data = await res.json();
      setHistory(data);
    } catch (error) {
      console.error("Failed to fetch history", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">My Profile</h1>

        {user && (
          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Left Column: User Details */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-fit">
              <div className="h-32 bg-gradient-to from-indigo-500 to-purple-500"></div>
              <div className="px-8 pb-8">
                <div className="relative -mt-12 mb-6">
                  <div className="w-24 h-24 bg-white rounded-full p-2 shadow-lg inline-block">
                    <div className="w-full h-full bg-indigo-100 rounded-full flex items-center justify-center text-3xl font-bold text-indigo-600">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="p-2 bg-white rounded-lg text-indigo-600 shadow-sm"><User size={20} /></div>
                    <div>
                      <p className="text-sm text-gray-500">Full Name</p>
                      <p className="font-semibold text-gray-800">{user.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="p-2 bg-white rounded-lg text-indigo-600 shadow-sm"><Mail size={20} /></div>
                    <div>
                      <p className="text-sm text-gray-500">Email Address</p>
                      <p className="font-semibold text-gray-800">{user.email}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: History Timeline */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Clock className="text-indigo-600" /> Recent Activity
              </h2>

              {history.length === 0 ? (
                <p className="text-gray-500 text-center py-10">No career predictions yet. Go to Dashboard!</p>
              ) : (
                <div className="space-y-4">
                  {history.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                      <div className="p-3 bg-white rounded-full text-indigo-600 font-bold shadow-sm">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 uppercase font-semibold">Predicted Role</p>
                        <p className="font-bold text-gray-800 text-lg">{item.role}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500 flex items-center justify-end gap-1">
                          <Calendar size={12} /> Date
                        </p>
                        <p className="text-sm font-medium text-indigo-600">{item.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        )}
      </main>
    </div>
  );
};

export default Profile;