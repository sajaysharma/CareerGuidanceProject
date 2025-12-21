import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, UserPlus, Mail, Lock, User } from 'lucide-react';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Signup
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? '/login' : '/register';
    
    try {
      const res = await fetch(`http://127.0.0.1:5000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (res.ok) {
        if (isLogin) {
          // Save user to localStorage (Simple "Session")
          localStorage.setItem('user', JSON.stringify(data.user));
          navigate('/dashboard');
        } else {
          alert("Registration Successful! Please Login.");
          setIsLogin(true);
        }
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex w-full max-w-4xl h-600px">
        
        {/* Left Side - Image & Vibe */}
        <div className="hidden md:flex w-1/2 bg-indigo-600 p-12 flex-col justify-between text-white relative">
          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-4">Start Your Journey</h2>
            <p className="text-indigo-200">Join thousands of students discovering their perfect career path with AI.</p>
          </div>
          {/* Abstract circles for design */}
          <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-12 flex flex-col justify-center">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">{isLogin ? "Welcome Back" : "Create Account"}</h2>
            <p className="text-gray-500 mt-2">Enter your details below</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Name Field (Only for Signup) */}
            {!isLogin && (
              <div className="relative">
                <User className="absolute left-3 top-3.5 text-gray-400" size={20} />
                <input type="text" name="name" placeholder="Full Name" onChange={handleChange} className="w-full pl-10 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
              </div>
            )}

            <div className="relative">
              <Mail className="absolute left-3 top-3.5 text-gray-400" size={20} />
              <input type="email" name="email" placeholder="Email Address" onChange={handleChange} className="w-full pl-10 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-3.5 text-gray-400" size={20} />
              <input type="password" name="password" placeholder="Password" onChange={handleChange} className="w-full pl-10 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
            </div>

            <button type="submit" className="w-full py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition flex justify-center items-center gap-2">
              {isLogin ? <><LogIn size={20} /> Login</> : <><UserPlus size={20} /> Sign Up</>}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button onClick={() => setIsLogin(!isLogin)} className="text-indigo-600 font-bold hover:underline">
                {isLogin ? "Sign Up" : "Login"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;