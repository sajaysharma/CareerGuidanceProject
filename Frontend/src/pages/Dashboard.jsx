import React, { useState, useEffect } from 'react'; // <--- Fixed Import
import Sidebar from '../components/Sidebar';
import { Brain, CheckCircle, BookOpen, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // 1. State for Inputs
  const [formData, setFormData] = useState({
    cgpa: '',
    logic: '',
    coding: '',
    speaking: '',
    creativity: ''
  });

  // 2. State for AI Result
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle Typing
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Submit (Talk to Python)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          user_id: user?.id  // <--- ADD THIS LINE
        }),
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Check if user is logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login'); // Redirect if not logged in
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [navigate]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar Component */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 p-8 overflow-y-auto">

        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Welcome Back, {user?.name}! 👋</h1>
            <p className="text-gray-500">Let's find your dream career path today.</p>
          </div>
          <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold">
            {user?.name?.charAt(0).toUpperCase() || 'S'}
          </div>
        </header>

        {/* --- IF NO RESULT: SHOW QUIZ --- */}
        {!result ? (
          <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-indigo-100 rounded-lg text-indigo-600">
                <Brain size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Skill Assessment</h2>
                <p className="text-sm text-gray-500">Rate your skills honestly (0-10) for the best result.</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Academic Score (CGPA)</label>
                <input type="number" step="0.1" name="cgpa" onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="e.g., 8.5" required />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Logical Reasoning (0-10)</label>
                <input type="number" name="logic" onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Coding Interest (0-10)</label>
                <input type="number" name="coding" onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Communication (0-10)</label>
                <input type="number" name="speaking" onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Creativity & Design (0-10)</label>
                <input type="number" name="creativity" onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
              </div>

              <div className="md:col-span-2 pt-4">
                <button type="submit" disabled={loading} className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-200 flex justify-center items-center gap-2">
                  {loading ? "Analyzing..." : "Predict My Future 🚀"}
                </button>
              </div>
            </form>
          </div>
        ) : (

          /* --- IF RESULT EXISTS: SHOW ROADMAP --- */
          <div className="space-y-6 animate-fade-in">
            {/* 1. The Big Result Card (Fixed Gradient) */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-indigo-100 font-medium mb-2">Based on your profile, you are a natural:</h3>
                <h1 className="text-4xl md:text-5xl font-extrabold mb-6">{result.prediction}</h1>
                <button onClick={() => setResult(null)} className="px-6 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg text-white text-sm font-semibold transition">
                  ← Retake Assessment
                </button>
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
            </div>

            {/* 2. Skills & Resources Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <CheckCircle className="text-green-500" size={20} /> Required Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {result.skills?.map((skill, index) => (
                    <span key={index} className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-medium border border-green-100">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <BookOpen className="text-blue-500" size={20} /> Recommended Courses
                </h3>
                <div className="space-y-3">
                  {result.resources?.map((res, index) => (
                    <a key={index} href={res.link} target="_blank" rel="noreferrer" className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-blue-50 transition-colors group">
                      <span className="text-gray-700 font-medium group-hover:text-blue-700">{res.name}</span>
                      <ChevronRight size={16} className="text-gray-400 group-hover:text-blue-500" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;