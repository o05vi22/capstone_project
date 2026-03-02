import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./ProtectedRoute";

import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Login from "./pages/Login";
import SkillsSetup from "./pages/SkillsSetup";
import Dashboard from "./pages/Dashboard";
import Assessment from "./pages/Assessment";
export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* Public */}
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
<Route
  path="/assessment"
  element={
    <ProtectedRoute>
      <Assessment />
    </ProtectedRoute>
  }
/>
        {/* Protected */}
        <Route
          path="/skills"
          element={
            <ProtectedRoute>
              <SkillsSetup />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}