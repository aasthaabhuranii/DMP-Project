import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  User, Mail, Phone, Lock, Eye, EyeOff,
  Globe, BookOpen, MapPin, CheckCircle,
  ChevronRight, ChevronLeft, ArrowLeft,
  GraduationCap, Stethoscope, Sparkles
} from "lucide-react";

function Register() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "student",
    country: "",
    course: "",
    targetCountry: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const validateStep1 = () => {
    if (!form.firstName || !form.lastName || !form.email || !form.phone || !form.password || !form.confirmPassword) {
      setError("Please fill in all fields.");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    if (form.phone.length < 10) {
      setError("Please enter a valid phone number.");
      return false;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return false;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep1()) {
      setStep(2);
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.country || !form.course || !form.targetCountry) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL || "http://localhost:3000"}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName:     form.firstName,
          lastName:      form.lastName,
          email:         form.email,
          phone:         form.phone,
          password:      form.password,
          country:       form.country,
          course:        form.course,
          targetCountry: form.targetCountry,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Registration failed. Please try again.");
        return;
      }
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setStep(3);
    } catch (err) {
      setError("Unable to connect to server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const countries = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda",
    "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain",
    "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan",
    "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria",
    "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde",
    "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros",
    "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark",
    "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador",
    "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji",
    "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece",
    "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras",
    "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel",
    "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait",
    "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya",
    "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia",
    "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius",
    "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco",
    "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand",
    "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway",
    "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay",
    "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia",
    "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines",
    "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal",
    "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia",
    "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan",
    "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria",
    "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga",
    "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda",
    "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay",
    "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen",
    "Zambia", "Zimbabwe", "Other"
  ];

  const courses = [
    "MBBS (Bachelor of Medicine, Bachelor of Surgery)",
    "BDS (Bachelor of Dental Surgery)",
    "B.Pharm (Bachelor of Pharmacy)",
    "B.Sc Nursing",
    "BAMS (Ayurvedic Medicine)",
    "MD (Doctor of Medicine)",
    "MDS (Master of Dental Surgery)",
    "M.Sc Clinical Research",
    "MPH (Master of Public Health)",
    "PGDM Healthcare Management",
    "PG Diploma in Clinical Research",
    "PG Diploma in Hospital Administration",
    "Other"
  ];

  const targetCountries = ["USA", "UK", "Canada", "Australia", "Germany", "New Zealand"];

  const progressSteps = [
    { n: 1, label: "Account Details",   icon: <User          size={14} /> },
    { n: 2, label: "Study Preferences", icon: <GraduationCap size={14} /> },
    { n: 3, label: "All Done!",         icon: <CheckCircle   size={14} /> },
  ];

  return (
    <div style={styles.page}>
      <div style={styles.orb1} />
      <div style={styles.orb2} />

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={() => navigate("/")}
        style={styles.backBtn}
        whileHover={{ x: -4 }}
      >
        <ArrowLeft size={14} style={{ marginRight: 6 }} /> Home
      </motion.button>

      <div style={styles.layout}>
        {/* LEFT */}
        <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} style={styles.leftPanel}>
          <div style={styles.logoArea}>
            <div style={styles.logoIconWrap}>🦷</div>
            <div>
              <div style={styles.logoText}>MediDent</div>
              <div style={styles.logoSub}>Global Pathways</div>
            </div>
          </div>

          <h1 style={styles.leftTitle}>
            <Sparkles size={22} color="#00d4aa" style={{ marginRight: 8, verticalAlign: "middle" }} />
            Join 500+ students studying medicine abroad
          </h1>
          <p style={styles.leftSub}>Create your free account and take the first step towards your medical career abroad.</p>

          <div style={styles.perksList}>
            {[
              { icon: <Stethoscope size={15} color="#00d4aa" />, text: "Personalised counselling from Day 1" },
              { icon: <Globe       size={15} color="#00d4aa" />, text: "Admissions in 25+ partner universities" },
              { icon: <BookOpen    size={15} color="#00d4aa" />, text: "Full documentation & visa support" },
              { icon: <CheckCircle size={15} color="#00d4aa" />, text: "98% visa success rate" },
            ].map((p, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.1 }} style={styles.perkItem}>
                {p.icon}
                <span style={{ color: "#888", fontSize: "0.88rem" }}>{p.text}</span>
              </motion.div>
            ))}
          </div>

          <div style={styles.progressSteps}>
            {progressSteps.map((s) => (
              <div key={s.n} style={styles.progressItem}>
                <motion.div
                  animate={{ background: step >= s.n ? "#00d4aa" : "#ffffff10", color: step >= s.n ? "#080c12" : "#555" }}
                  style={styles.progressCircle}
                >
                  {step > s.n ? <CheckCircle size={14} /> : s.icon}
                </motion.div>
                <div style={{ ...styles.progressLabel, color: step >= s.n ? "#00d4aa" : "#444" }}>{s.label}</div>
                {s.n < 3 && <div style={{ ...styles.progressLine, background: step > s.n ? "#00d4aa" : "#ffffff10" }} />}
              </div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT — FORM */}
        <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} style={styles.formCard}>
          <AnimatePresence mode="wait">

            {/* STEP 1 */}
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
                <h2 style={styles.formTitle}>Create your account</h2>
                <p style={styles.formSub}>Step 1 of 2 — Basic Information</p>

                <div style={styles.studentBadge}>
                  <GraduationCap size={16} color="#00d4aa" />
                  <span style={{ color: "#00d4aa", fontSize: "0.85rem", fontWeight: 700 }}>Student Registration</span>
                </div>

                <div style={styles.form}>
                  <div style={styles.nameRow}>
                    <Field label="First Name" icon={<User size={15} />} name="firstName" placeholder="First name" value={form.firstName} onChange={handleChange} />
                    <Field label="Last Name"  icon={<User size={15} />} name="lastName"  placeholder="Last name"  value={form.lastName}  onChange={handleChange} />
                  </div>
                  <Field label="Email Address" icon={<Mail  size={15} />} name="email" type="email" placeholder="you@example.com"   value={form.email} onChange={handleChange} />
                  <Field label="Phone Number"  icon={<Phone size={15} />} name="phone" type="tel"   placeholder="+91 98765 43210"    value={form.phone} onChange={handleChange} />

                  <div style={styles.fieldGroup}>
                    <label style={styles.label}>Password</label>
                    <div style={styles.inputWrap}>
                      <span style={styles.inputIcon}><Lock size={15} /></span>
                      <input name="password" type={showPass ? "text" : "password"} placeholder="Min. 6 characters" value={form.password} onChange={handleChange} style={styles.input} />
                      <button type="button" onClick={() => setShowPass(!showPass)} style={styles.eyeBtn}>
                        {showPass ? <EyeOff size={16} color="#555" /> : <Eye size={16} color="#555" />}
                      </button>
                    </div>
                    {form.password && <PasswordStrength password={form.password} />}
                  </div>

                  <Field label="Confirm Password" icon={<Lock size={15} />} name="confirmPassword" type="password" placeholder="Re-enter password" value={form.confirmPassword} onChange={handleChange} />

                  {error && <ErrorBox message={error} />}

                  <motion.button whileHover={{ scale: 1.02, boxShadow: "0 0 30px #00d4aa55" }} whileTap={{ scale: 0.97 }} onClick={handleNext} style={styles.submitBtn}>
                    Continue <ChevronRight size={16} style={{ marginLeft: 4 }} />
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
                <h2 style={styles.formTitle}>Study Preferences</h2>
                <p style={styles.formSub}>Step 2 of 2 — Tell us about your goals</p>

                <form onSubmit={handleSubmit} style={styles.form}>
                  <div style={styles.fieldGroup}>
                    <label style={styles.label}>Your Country</label>
                    <div style={styles.inputWrap}>
                      <span style={styles.inputIcon}><Globe size={15} /></span>
                      <select name="country" value={form.country} onChange={handleChange} style={styles.select}>
                        <option value="">Select your country</option>
                        {countries.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>

                  <div style={styles.fieldGroup}>
                    <label style={styles.label}>Course of Interest</label>
                    <div style={styles.inputWrap}>
                      <span style={styles.inputIcon}><Stethoscope size={15} /></span>
                      <select name="course" value={form.course} onChange={handleChange} style={styles.select}>
                        <option value="">Select course</option>
                        {courses.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>

                  <div style={styles.fieldGroup}>
                    <label style={styles.label}>Preferred Study Destination</label>
                    <div style={styles.inputWrap}>
                      <span style={styles.inputIcon}><MapPin size={15} /></span>
                      <select name="targetCountry" value={form.targetCountry} onChange={handleChange} style={styles.select}>
                        <option value="">Select destination</option>
                        {targetCountries.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>

                  {error && <ErrorBox message={error} />}

                  <div style={{ display: "flex", gap: "12px" }}>
                    <motion.button type="button" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} onClick={() => setStep(1)} style={styles.backFormBtn}>
                      <ChevronLeft size={16} /> Back
                    </motion.button>
                    <motion.button type="submit" disabled={loading} whileHover={{ scale: loading ? 1 : 1.02, boxShadow: "0 0 30px #00d4aa55" }} whileTap={{ scale: 0.97 }} style={{ ...styles.submitBtn, flex: 1, opacity: loading ? 0.7 : 1 }}>
                      {loading ? "⏳ Creating account..." : <>Create Account <Sparkles size={15} style={{ marginLeft: 6 }} /></>}
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* STEP 3 — SUCCESS */}
            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={styles.successScreen}>
                <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: 2, duration: 0.5 }} style={styles.successIcon}>🎉</motion.div>
                <h2 style={styles.successTitle}>You're in!</h2>
                <p style={styles.successSub}>
                  Welcome to MediDent Global Pathways, <strong>{form.firstName}</strong>!<br />
                  Your account has been created. A counsellor will be assigned to you shortly.
                </p>
                <div style={styles.successTicks}>
                  {["Account created", "Profile saved", "Counsellor being assigned"].map((t, i) => (
                    <div key={i} style={styles.successTick}>
                      <CheckCircle size={15} color="#00d4aa" />
                      <span style={{ color: "#888", fontSize: "0.85rem" }}>{t}</span>
                    </div>
                  ))}
                </div>
                <motion.button whileHover={{ scale: 1.05, boxShadow: "0 0 30px #00d4aa55" }} onClick={() => navigate("/dashboard")} style={styles.submitBtn}>
                  Go to Dashboard <ChevronRight size={16} style={{ marginLeft: 4 }} />
                </motion.button>
              </motion.div>
            )}

          </AnimatePresence>

          {step < 3 && (
            <p style={styles.switchText}>
              Already have an account?{" "}
              <span onClick={() => navigate("/login")} style={styles.switchLink}>Sign in</span>
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}

function Field({ label, icon, name, type = "text", placeholder, value, onChange }) {
  return (
    <div style={styles.fieldGroup}>
      <label style={styles.label}>{label}</label>
      <div style={styles.inputWrap}>
        <span style={styles.inputIcon}>{icon}</span>
        <input name={name} type={type} placeholder={placeholder} value={value} onChange={onChange} style={styles.input} />
      </div>
    </div>
  );
}

function PasswordStrength({ password }) {
  const strength = password.length < 6 ? 1 : password.length < 10 ? 2 : 3;
  const labels   = ["", "Weak", "Good", "Strong"];
  const colors   = ["", "#ff4444", "#ffaa00", "#00d4aa"];
  return (
    <div style={{ display: "flex", gap: "6px", alignItems: "center", marginTop: "6px" }}>
      {[1, 2, 3].map((i) => (
        <div key={i} style={{ height: "3px", flex: 1, borderRadius: "2px", background: i <= strength ? colors[strength] : "#ffffff10", transition: "background 0.3s" }} />
      ))}
      <span style={{ fontSize: "0.75rem", color: colors[strength], marginLeft: "6px" }}>{labels[strength]}</span>
    </div>
  );
}

function ErrorBox({ message }) {
  return (
    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} style={styles.errorBox}>
      ⚠️ {message}
    </motion.div>
  );
}

const styles = {
  page: { background: "#080c12", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Sora', 'Segoe UI', sans-serif", color: "#fff", position: "relative", overflow: "hidden", padding: "20px" },
  orb1: { position: "fixed", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, #00d4aa15, transparent 70%)", top: "-150px", right: "-100px", filter: "blur(60px)", pointerEvents: "none" },
  orb2: { position: "fixed", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, #0066ff15, transparent 70%)", bottom: "-100px", left: "-100px", filter: "blur(60px)", pointerEvents: "none" },
  backBtn: { position: "fixed", top: "24px", left: "24px", background: "transparent", border: "1px solid #ffffff15", color: "#888", padding: "10px 18px", borderRadius: "8px", cursor: "pointer", fontSize: "0.85rem", zIndex: 10, display: "flex", alignItems: "center" },
  layout: { display: "flex", gap: "60px", alignItems: "flex-start", maxWidth: "1100px", width: "100%", zIndex: 1, paddingTop: "20px" },
  leftPanel: { flex: 1, minWidth: "280px", paddingTop: "20px" },
  logoArea: { display: "flex", alignItems: "center", gap: "14px", marginBottom: "32px" },
  logoIconWrap: { width: "44px", height: "44px", background: "linear-gradient(135deg, #00d4aa, #00b894)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px" },
  logoText: { fontSize: "1.5rem", fontWeight: 800, color: "#00d4aa", lineHeight: 1.1 },
  logoSub: { color: "#555", fontSize: "0.9rem" },
  leftTitle: { fontSize: "1.7rem", fontWeight: 800, lineHeight: 1.25, marginBottom: "14px", letterSpacing: "-0.5px", display: "flex", alignItems: "flex-start", gap: 4 },
  leftSub: { color: "#555", lineHeight: 1.7, marginBottom: "24px", fontSize: "0.9rem" },
  perksList: { display: "flex", flexDirection: "column", gap: "10px", marginBottom: "36px" },
  perkItem: { display: "flex", alignItems: "center", gap: "10px" },
  progressSteps: { display: "flex", flexDirection: "column", gap: "0" },
  progressItem: { display: "flex", alignItems: "center", gap: "14px", position: "relative", paddingBottom: "28px" },
  progressCircle: { width: "36px", height: "36px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "0.85rem", flexShrink: 0, transition: "all 0.3s" },
  progressLabel: { fontSize: "0.9rem", fontWeight: 600, transition: "color 0.3s" },
  progressLine: { position: "absolute", left: "17px", top: "36px", width: "2px", height: "28px", borderRadius: "2px", transition: "background 0.3s" },
  formCard: { background: "#0d1520", border: "1px solid #ffffff0f", borderRadius: "20px", padding: "40px 36px", width: "460px", flexShrink: 0 },
  formTitle: { fontSize: "1.7rem", fontWeight: 800, margin: "0 0 6px", letterSpacing: "-0.5px" },
  formSub: { color: "#555", marginBottom: "20px", fontSize: "0.88rem" },
  studentBadge: { display: "inline-flex", alignItems: "center", gap: "8px", background: "#00d4aa12", border: "1px solid #00d4aa33", borderRadius: "100px", padding: "6px 16px", marginBottom: "20px" },
  nameRow: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" },
  form: { display: "flex", flexDirection: "column", gap: "16px" },
  fieldGroup: { display: "flex", flexDirection: "column", gap: "7px" },
  label: { fontSize: "0.82rem", color: "#777", fontWeight: 600 },
  inputWrap: { display: "flex", alignItems: "center", background: "#ffffff07", border: "1px solid #ffffff10", borderRadius: "10px", padding: "0 14px" },
  inputIcon: { display: "flex", alignItems: "center", color: "#555", marginRight: "10px", flexShrink: 0 },
  input: { flex: 1, background: "transparent", border: "none", outline: "none", color: "#fff", padding: "13px 0", fontSize: "0.92rem" },
  select: { flex: 1, background: "#0d1520", border: "none", outline: "none", color: "#fff", padding: "13px 0", fontSize: "0.92rem", cursor: "pointer" },
  eyeBtn: { background: "transparent", border: "none", cursor: "pointer", display: "flex", alignItems: "center" },
  errorBox: { background: "#ff334415", border: "1px solid #ff334440", borderRadius: "8px", padding: "11px 14px", color: "#ff6677", fontSize: "0.83rem" },
  submitBtn: { background: "#00d4aa", border: "none", color: "#080c12", padding: "14px", borderRadius: "10px", fontWeight: 800, cursor: "pointer", fontSize: "0.97rem", width: "100%", transition: "all 0.2s", display: "flex", alignItems: "center", justifyContent: "center" },
  backFormBtn: { background: "#ffffff08", border: "1px solid #ffffff10", color: "#888", padding: "14px 20px", borderRadius: "10px", fontWeight: 600, cursor: "pointer", fontSize: "0.97rem", flexShrink: 0, display: "flex", alignItems: "center", gap: 4 },
  switchText: { textAlign: "center", color: "#444", fontSize: "0.85rem", marginTop: "20px" },
  switchLink: { color: "#00d4aa", cursor: "pointer", fontWeight: 600 },
  successScreen: { textAlign: "center", padding: "20px 0" },
  successIcon: { fontSize: "5rem", marginBottom: "20px" },
  successTitle: { fontSize: "2rem", fontWeight: 800, marginBottom: "14px" },
  successSub: { color: "#666", lineHeight: 1.7, marginBottom: "20px", fontSize: "0.95rem" },
  successTicks: { display: "flex", flexDirection: "column", gap: "10px", marginBottom: "28px", alignItems: "center" },
  successTick: { display: "flex", alignItems: "center", gap: "8px" },
};

export default Register;