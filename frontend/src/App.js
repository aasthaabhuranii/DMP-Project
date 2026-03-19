import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home                from "./pages/Home";
import About               from "./pages/About";
import Programs            from "./pages/Programs";
import Journey             from "./pages/Journey";
import Login               from "./pages/Login";
import Register            from "./pages/Register";
import ForgotPassword      from "./pages/Forgotpassword";
import Dashboard           from "./pages/Dashboard";
import Services            from "./pages/Services";
import AdminPanel          from "./pages/AdminPanel";
import CounsellorDashboard from "./pages/CounsellorDashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ── Public pages ── */}
        <Route path="/"                element={<Home />} />
        <Route path="/about"           element={<About />} />
        <Route path="/programs"        element={<Programs />} />
        <Route path="/journey"         element={<Journey />} />
        <Route path="/services"        element={<Services />} />

        {/* ── Auth ── */}
        <Route path="/login"           element={<Login />} />
        <Route path="/register"        element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* ── Protected ── */}
        <Route path="/dashboard"            element={<Dashboard />} />
        <Route path="/admin-dashboard"      element={<AdminPanel />} />
        <Route path="/counsellor-dashboard" element={<CounsellorDashboard />} />

        {/* ── 404 fallback ── */}
        <Route path="*" element={<Home />} />

      </Routes>
    </BrowserRouter>
  );
}