import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Mail, Lock, Eye, EyeOff, ArrowLeft,
  GraduationCap, Shield, Stethoscope, ChevronRight,
  CheckCircle
} from "lucide-react";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "", role: "student" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
          role: form.role,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Invalid credentials. Please try again.");
        return;
      }

      // Save token and user info to localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Redirect based on role
      const role = data.user?.role;
      if (role === "student")         navigate("/dashboard");
      else if (role === "counsellor") navigate("/counsellor-dashboard");
      else if (role === "admin")      navigate("/admin-dashboard");
      else navigate("/dashboard");

    } catch (err) {
      setError("Unable to connect to server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const roles = [
    { value: "student",    label: "Student",    icon: <GraduationCap size={15} /> },
    { value: "counsellor", label: "Counsellor", icon: <Stethoscope   size={15} /> },
    { value: "admin",      label: "Admin",      icon: <Shield        size={15} /> },
  ];

  const features = [
    { icon: <CheckCircle size={14} color="#00d4aa" />, text: "Students — track applications & documents" },
    { icon: <CheckCircle size={14} color="#00d4aa" />, text: "Counsellors — manage assigned students" },
    { icon: <CheckCircle size={14} color="#00d4aa" />, text: "Admins — full dashboard & user control" },
    { icon: <CheckCircle size={14} color="#00d4aa" />, text: "Secure role-based access for all users" },
  ];

  return (
    <div style={styles.page}>
      <div style={styles.orb1} />
      <div style={styles.orb2} />

      {/* Back button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate("/")}
        style={styles.backBtn}
        whileHover={{ x: -4 }}
      >
        <ArrowLeft size={14} style={{ marginRight: 6 }} /> Back to Home
      </motion.button>

      <div style={styles.layout}>
        {/* LEFT PANEL */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          style={styles.leftPanel}
        >
          <div style={styles.logoArea}>
            <div style={styles.logoIconWrap}>🦷</div>
            <div>
              <h2 style={styles.logoText}>MediDent</h2>
              <span style={styles.logoSub}>Global Pathways</span>
            </div>
          </div>
          <h1 style={styles.leftTitle}>Your dream of studying medicine abroad starts here.</h1>
          <p style={styles.leftSub}>Log in to track your application, chat with counsellors, and monitor your visa status.</p>

          <div style={styles.featureList}>
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                style={styles.featureItem}
              >
                {f.icon}
                <span>{f.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT PANEL — FORM */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          style={styles.formCard}
        >
          <h2 style={styles.formTitle}>Welcome back 👋</h2>
          <p style={styles.formSub}>Sign in to your account</p>

          {/* Role selector */}
          <div style={styles.roleRow}>
            {roles.map((r) => (
              <motion.button
                key={r.value}
                whileTap={{ scale: 0.95 }}
                onClick={() => setForm({ ...form, role: r.value })}
                style={{
                  ...styles.roleBtn,
                  ...(form.role === r.value ? styles.roleBtnActive : {}),
                }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  {r.icon} {r.label}
                </span>
              </motion.button>
            ))}
          </div>

          <form onSubmit={handleSubmit} style={styles.form}>
            {/* Email */}
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Email Address</label>
              <div style={styles.inputWrap}>
                <Mail size={15} color="#555" style={{ marginRight: 10, flexShrink: 0 }} />
                <input
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  style={styles.input}
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password */}
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Password</label>
              <div style={styles.inputWrap}>
                <Lock size={15} color="#555" style={{ marginRight: 10, flexShrink: 0 }} />
                <input
                  name="password"
                  type={showPass ? "text" : "password"}
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  style={styles.input}
                  autoComplete="current-password"
                />
                <button type="button" onClick={() => setShowPass(!showPass)} style={styles.eyeBtn}>
                  {showPass ? <EyeOff size={16} color="#555" /> : <Eye size={16} color="#555" />}
                </button>
              </div>
            </div>

            <div style={styles.forgotRow}>
              <motion.span
                onClick={() => navigate("/forgot-password")}
                style={styles.forgotLink}
                whileHover={{ color: "#00ffcc" }}
              >
                Forgot password?
              </motion.span>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                style={styles.errorBox}
              >
                ⚠️ {error}
              </motion.div>
            )}

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02, boxShadow: "0 0 30px #00d4aa55" }}
              whileTap={{ scale: 0.97 }}
              style={{ ...styles.submitBtn, opacity: loading ? 0.7 : 1 }}
            >
              {loading ? (
                <span style={{ display: "flex", alignItems: "center", gap: 8 }}>⏳ Signing in...</span>
              ) : (
                <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                  Sign In <ChevronRight size={16} />
                </span>
              )}
            </motion.button>
          </form>

          <p style={styles.switchText}>
            Don't have an account?{" "}
            <span onClick={() => navigate("/register")} style={styles.switchLink}>
              Register here
            </span>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

const styles = {
  page: { background: "#080c12", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Sora', 'Segoe UI', sans-serif", color: "#fff", position: "relative", overflow: "hidden", padding: "20px" },
  orb1: { position: "fixed", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, #00d4aa18, transparent 70%)", top: "-100px", left: "-100px", filter: "blur(60px)", pointerEvents: "none" },
  orb2: { position: "fixed", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, #0066ff15, transparent 70%)", bottom: "-100px", right: "-100px", filter: "blur(60px)", pointerEvents: "none" },

  backBtn: { position: "fixed", top: "24px", left: "24px", background: "transparent", border: "1px solid #ffffff15", color: "#888", padding: "10px 18px", borderRadius: "8px", cursor: "pointer", fontSize: "0.85rem", zIndex: 10, display: "flex", alignItems: "center" },

  layout: { display: "flex", gap: "60px", alignItems: "center", maxWidth: "1100px", width: "100%", zIndex: 1 },

  leftPanel: { flex: 1, minWidth: "300px" },
  logoArea: { display: "flex", alignItems: "center", gap: "14px", marginBottom: "36px" },
  logoIconWrap: { width: 44, height: 44, background: "linear-gradient(135deg,#00d4aa,#00b894)", borderRadius: 11, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 },
  logoText: { fontSize: "1.4rem", fontWeight: 800, lineHeight: 1.2, margin: 0, color: "#00d4aa" },
  logoSub: { color: "#555", fontSize: "1rem", fontWeight: 400 },
  leftTitle: { fontSize: "2rem", fontWeight: 800, lineHeight: 1.2, marginBottom: "16px", letterSpacing: "-0.5px" },
  leftSub: { color: "#666", lineHeight: 1.7, marginBottom: "32px", fontSize: "0.95rem" },
  featureList: { display: "flex", flexDirection: "column", gap: "12px" },
  featureItem: { color: "#888", fontSize: "0.9rem", display: "flex", alignItems: "center", gap: "10px" },

  formCard: { background: "#0d1520", border: "1px solid #ffffff0f", borderRadius: "20px", padding: "44px 40px", width: "420px", flexShrink: 0 },
  formTitle: { fontSize: "1.8rem", fontWeight: 800, margin: "0 0 6px", letterSpacing: "-0.5px" },
  formSub: { color: "#555", marginBottom: "28px", fontSize: "0.9rem" },

  roleRow: { display: "flex", gap: "8px", marginBottom: "28px" },
  roleBtn: { flex: 1, background: "#ffffff07", border: "1px solid #ffffff0f", color: "#666", padding: "10px 8px", borderRadius: "8px", cursor: "pointer", fontSize: "0.82rem", transition: "all 0.2s", fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center" },
  roleBtnActive: { background: "#00d4aa18", border: "1px solid #00d4aa55", color: "#00d4aa", fontWeight: 700 },

  form: { display: "flex", flexDirection: "column", gap: "20px" },
  fieldGroup: { display: "flex", flexDirection: "column", gap: "8px" },
  label: { fontSize: "0.85rem", color: "#888", fontWeight: 600 },
  inputWrap: { display: "flex", alignItems: "center", background: "#ffffff07", border: "1px solid #ffffff10", borderRadius: "10px", padding: "0 14px", transition: "border-color 0.2s" },
  input: { flex: 1, background: "transparent", border: "none", outline: "none", color: "#fff", padding: "14px 0", fontSize: "0.95rem" },
  eyeBtn: { background: "transparent", border: "none", cursor: "pointer", display: "flex", alignItems: "center" },

  forgotRow: { display: "flex", justifyContent: "flex-end", marginTop: "-8px" },
  forgotLink: { color: "#00d4aa", fontSize: "0.85rem", cursor: "pointer", transition: "color 0.2s" },

  errorBox: { background: "#ff334422", border: "1px solid #ff334444", borderRadius: "8px", padding: "12px 16px", color: "#ff6677", fontSize: "0.85rem" },

  submitBtn: { background: "#00d4aa", border: "none", color: "#080c12", padding: "15px", borderRadius: "10px", fontWeight: 800, cursor: "pointer", fontSize: "1rem", width: "100%", transition: "all 0.2s" },

  switchText: { textAlign: "center", color: "#555", fontSize: "0.88rem", marginTop: "20px" },
  switchLink: { color: "#00d4aa", cursor: "pointer", fontWeight: 600 },
};

export default Login;