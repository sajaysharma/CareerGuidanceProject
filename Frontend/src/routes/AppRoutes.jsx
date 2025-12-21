import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import Login from "../pages/Login.jsx";
import Profile from "../pages/Profile.jsx";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/login" element={<Login />} />
    <Route path="/profile" element={<Profile />} />
  </Routes>
);

export default AppRoutes;
