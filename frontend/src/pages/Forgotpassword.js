import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Mail, Lock, Eye, EyeOff, ArrowLeft,
  ShieldCheck, KeyRound, CheckCircle,
  RefreshCw, ChevronRight
} from "lucide-react";

function ForgotPassword() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1=email, 2=otp, 3=newpass, 4=success
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  // Step 1: Send OTP
  const handleSendOtp = async () => {
    if (!email) { setError("Please enter your email address."); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError("Please enter a valid email address."); return; }
    setLoading(true);
    setError("");
    try {
      // TODO: await API.post("/auth/forgot-password", { email });
      await new Promise((r) => setTimeout(r, 1400));
      setStep(2);
      startResendTimer();
    } catch {
      setError("Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async () => {
    const code = otp.join("");
    if (code.length < 6) { setError("Please enter the complete 6-digit code."); return; }
    setLoading(true);
    setError("");
    try {
      // TODO: await API.post("/auth/verify-otp", { email, otp: code });
      await new Promise((r) => setTimeout(r, 1200));
      setStep(3);
    } catch {
      setError("Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Reset Password
  const handleResetPass = async () => {
    if (!newPass || !confirmPass) { setError("Please fill in both fields."); return; }
    if (newPass.length < 6) { setError("Password must be at least 6 characters."); return; }
    if (newPass !== confirmPass) { setError("Passwords do not match."); return; }
    setLoading(true);
    setError("");
    try {
      // TODO: await API.post("/auth/reset-password", { email, otp: otp.join(""), newPassword: newPass });
      await new Promise((r) => setTimeout(r, 1300));
      setStep(4);
    } catch {
      setError("Failed to reset password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // OTP input handler
  const handleOtpChange = (val, idx) => {
    if (!/^\d?$/.test(val)) return;
    const updated = [...otp];
    updated[idx] = val;
    setOtp(updated);
    setError("");
    if (val && idx < 5) {
      document.getElementById(`otp-${idx + 1}`)?.focus();
    }
  };

  const handleOtpKeyDown = (e, idx) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      document.getElementById(`otp-${idx - 1}`)?.focus();
    }
  };

  const startResendTimer = () => {
    setResendTimer(30);
    const interval = setInterval(() => {
      setResendTimer((t) => {
        if (t <= 1) { clearInterval(interval); return 0; }
        return t - 1;
      });
    }, 1000);
  };

  const handleResend = async () => {
    if (resendTimer > 0) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setOtp(["", "", "", "", "", ""]);
    startResendTimer();
  };

  const stepTitles = [
    { icon: <Mail size={28} color="#00d4aa" />, title: "Forgot Password?", sub: "Enter your registered email and we'll send you a 6-digit OTP to reset your password." },
    { icon: <ShieldCheck size={28} color="#00d4aa" />, title: "Verify OTP", sub: `We've sent a 6-digit code to ${email}. Check your inbox.` },
    { icon: <KeyRound size={28} color="#00d4aa" />, title: "Set New Password", sub: "Choose a strong new password for your account." },
  ];

  return (
    <div style={styles.page}>
      <div style={styles.orb1} />
      <div style={styles.orb2} />

      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={() => step > 1 && step < 4 ? setStep(step - 1) : navigate("/login")}
        style={styles.backBtn}
        whileHover={{ x: -4 }}
      >
        <ArrowLeft size={14} style={{ marginRight: 6 }} />
        {step > 1 && step < 4 ? "Back" : "Back to Login"}
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        style={styles.card}
      >
        {/* Logo */}
        <div style={styles.logoRow}>
          <div style={styles.logoIcon}>🦷</div>
          <span style={styles.logoText}>MediDent</span>
        </div>

        {/* Step Progress Dots */}
        {step < 4 && (
          <div style={styles.dotRow}>
            {[1, 2, 3].map((d) => (
              <motion.div
                key={d}
                animate={{ background: step >= d ? "#00d4aa" : "#ffffff15", width: step === d ? 24 : 8 }}
                style={styles.dot}
              />
            ))}
          </div>
        )}

        <AnimatePresence mode="wait">

          {/* ── STEP 1: EMAIL ── */}
          {step === 1 && (
            <motion.div
              key="s1"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
            >
              <div style={styles.stepIcon}>{stepTitles[0].icon}</div>
              <h1 style={styles.title}>{stepTitles[0].title}</h1>
              <p style={styles.sub}>{stepTitles[0].sub}</p>

              <div style={styles.fieldGroup}>
                <label style={styles.label}>Email Address</label>
                <div style={styles.inputWrap}>
                  <Mail size={15} color="#555" style={{ marginRight: 10, flexShrink: 0 }} />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(""); }}
                    style={styles.input}
                    onKeyDown={(e) => e.key === "Enter" && handleSendOtp()}
                    autoFocus
                  />
                </div>
              </div>

              {error && <ErrorBox message={error} />}

              <motion.button
                whileHover={{ scale: loading ? 1 : 1.02, boxShadow: "0 0 30px #00d4aa55" }}
                whileTap={{ scale: 0.97 }}
                onClick={handleSendOtp}
                disabled={loading}
                style={{ ...styles.btn, opacity: loading ? 0.7 : 1 }}
              >
                {loading ? (
                  <><RefreshCw size={15} style={{ marginRight: 8, animation: "spin 1s linear infinite" }} /> Sending OTP...</>
                ) : (
                  <>Send OTP <ChevronRight size={16} style={{ marginLeft: 6 }} /></>
                )}
              </motion.button>

              <p style={styles.hint}>
                Remembered it?{" "}
                <span onClick={() => navigate("/login")} style={styles.link}>Sign in instead</span>
              </p>
            </motion.div>
          )}

          {/* ── STEP 2: OTP ── */}
          {step === 2 && (
            <motion.div
              key="s2"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
            >
              <div style={styles.stepIcon}>{stepTitles[1].icon}</div>
              <h1 style={styles.title}>{stepTitles[1].title}</h1>
              <p style={styles.sub}>{stepTitles[1].sub}</p>

              {/* OTP Boxes */}
              <div style={styles.otpRow}>
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`otp-${idx}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(e.target.value, idx)}
                    onKeyDown={(e) => handleOtpKeyDown(e, idx)}
                    style={{
                      ...styles.otpBox,
                      borderColor: digit ? "#00d4aa" : "#ffffff15",
                      color: digit ? "#00d4aa" : "#fff",
                    }}
                    autoFocus={idx === 0}
                  />
                ))}
              </div>

              {error && <ErrorBox message={error} />}

              <motion.button
                whileHover={{ scale: loading ? 1 : 1.02, boxShadow: "0 0 30px #00d4aa55" }}
                whileTap={{ scale: 0.97 }}
                onClick={handleVerifyOtp}
                disabled={loading}
                style={{ ...styles.btn, opacity: loading ? 0.7 : 1 }}
              >
                {loading ? (
                  <><RefreshCw size={15} style={{ marginRight: 8 }} /> Verifying...</>
                ) : (
                  <>Verify OTP <ChevronRight size={16} style={{ marginLeft: 6 }} /></>
                )}
              </motion.button>

              <div style={styles.resendRow}>
                <span style={styles.hintText}>Didn't receive it?</span>
                <button
                  onClick={handleResend}
                  disabled={resendTimer > 0}
                  style={{
                    ...styles.resendBtn,
                    color: resendTimer > 0 ? "#444" : "#00d4aa",
                    cursor: resendTimer > 0 ? "default" : "pointer",
                  }}
                >
                  {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend OTP"}
                </button>
              </div>

              <p style={styles.hint}>
                Wrong email?{" "}
                <span onClick={() => setStep(1)} style={styles.link}>Change email</span>
              </p>
            </motion.div>
          )}

          {/* ── STEP 3: NEW PASSWORD ── */}
          {step === 3 && (
            <motion.div
              key="s3"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
            >
              <div style={styles.stepIcon}>{stepTitles[2].icon}</div>
              <h1 style={styles.title}>{stepTitles[2].title}</h1>
              <p style={styles.sub}>{stepTitles[2].sub}</p>

              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div style={styles.fieldGroup}>
                  <label style={styles.label}>New Password</label>
                  <div style={styles.inputWrap}>
                    <Lock size={15} color="#555" style={{ marginRight: 10, flexShrink: 0 }} />
                    <input
                      type={showPass ? "text" : "password"}
                      placeholder="Min. 6 characters"
                      value={newPass}
                      onChange={(e) => { setNewPass(e.target.value); setError(""); }}
                      style={styles.input}
                    />
                    <button type="button" onClick={() => setShowPass(!showPass)} style={styles.eyeBtn}>
                      {showPass ? <EyeOff size={15} color="#555" /> : <Eye size={15} color="#555" />}
                    </button>
                  </div>
                  {newPass && <PasswordStrength password={newPass} />}
                </div>

                <div style={styles.fieldGroup}>
                  <label style={styles.label}>Confirm New Password</label>
                  <div style={styles.inputWrap}>
                    <Lock size={15} color="#555" style={{ marginRight: 10, flexShrink: 0 }} />
                    <input
                      type={showConfirm ? "text" : "password"}
                      placeholder="Re-enter new password"
                      value={confirmPass}
                      onChange={(e) => { setConfirmPass(e.target.value); setError(""); }}
                      style={styles.input}
                    />
                    <button type="button" onClick={() => setShowConfirm(!showConfirm)} style={styles.eyeBtn}>
                      {showConfirm ? <EyeOff size={15} color="#555" /> : <Eye size={15} color="#555" />}
                    </button>
                  </div>
                  {confirmPass && newPass && (
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
                      {newPass === confirmPass
                        ? <><CheckCircle size={13} color="#00d4aa" /><span style={{ fontSize: "0.75rem", color: "#00d4aa" }}>Passwords match</span></>
                        : <span style={{ fontSize: "0.75rem", color: "#ff4444" }}>✗ Passwords don't match</span>
                      }
                    </div>
                  )}
                </div>
              </div>

              {error && <ErrorBox message={error} />}

              <motion.button
                whileHover={{ scale: loading ? 1 : 1.02, boxShadow: "0 0 30px #00d4aa55" }}
                whileTap={{ scale: 0.97 }}
                onClick={handleResetPass}
                disabled={loading}
                style={{ ...styles.btn, marginTop: 20, opacity: loading ? 0.7 : 1 }}
              >
                {loading ? (
                  <><RefreshCw size={15} style={{ marginRight: 8 }} /> Resetting...</>
                ) : (
                  <>Reset Password <ChevronRight size={16} style={{ marginLeft: 6 }} /></>
                )}
              </motion.button>
            </motion.div>
          )}

          {/* ── STEP 4: SUCCESS ── */}
          {step === 4 && (
            <motion.div
              key="s4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ textAlign: "center" }}
            >
              <motion.div
                animate={{ scale: [1, 1.25, 1] }}
                transition={{ repeat: 2, duration: 0.5 }}
                style={styles.successRing}
              >
                <CheckCircle size={44} color="#00d4aa" />
              </motion.div>
              <h1 style={{ ...styles.title, marginTop: 24 }}>Password Reset!</h1>
              <p style={{ ...styles.sub, marginBottom: 28 }}>
                Your password has been updated successfully.<br />
                You can now sign in with your new password.
              </p>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px #00d4aa55" }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate("/login")}
                style={styles.btn}
              >
                Go to Login <ChevronRight size={16} style={{ marginLeft: 6 }} />
              </motion.button>
            </motion.div>
          )}

        </AnimatePresence>
      </motion.div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

function ErrorBox({ message }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ background: "#ff334415", border: "1px solid #ff334440", borderRadius: "8px", padding: "11px 14px", color: "#ff6677", fontSize: "0.83rem", marginTop: 12 }}
    >
      ⚠️ {message}
    </motion.div>
  );
}

function PasswordStrength({ password }) {
  const strength = password.length < 6 ? 1 : password.length < 10 ? 2 : 3;
  const labels = ["", "Weak", "Good", "Strong"];
  const colors = ["", "#ff4444", "#ffaa00", "#00d4aa"];
  return (
    <div style={{ display: "flex", gap: "6px", alignItems: "center", marginTop: 6 }}>
      {[1, 2, 3].map((i) => (
        <div key={i} style={{ height: "3px", flex: 1, borderRadius: "2px", background: i <= strength ? colors[strength] : "#ffffff10", transition: "background 0.3s" }} />
      ))}
      <span style={{ fontSize: "0.75rem", color: colors[strength], marginLeft: 6 }}>{labels[strength]}</span>
    </div>
  );
}

const styles = {
  page: { background: "#080c12", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Sora', 'Segoe UI', sans-serif", color: "#fff", position: "relative", overflow: "hidden", padding: "20px" },
  orb1: { position: "fixed", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, #00d4aa15, transparent 70%)", top: "-150px", left: "-100px", filter: "blur(60px)", pointerEvents: "none" },
  orb2: { position: "fixed", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, #0066ff15, transparent 70%)", bottom: "-100px", right: "-100px", filter: "blur(60px)", pointerEvents: "none" },

  backBtn: { position: "fixed", top: "24px", left: "24px", background: "transparent", border: "1px solid #ffffff15", color: "#888", padding: "10px 18px", borderRadius: "8px", cursor: "pointer", fontSize: "0.85rem", zIndex: 10, display: "flex", alignItems: "center" },

  card: { background: "#0d1520", border: "1px solid #ffffff0f", borderRadius: "24px", padding: "44px 44px", width: "100%", maxWidth: "460px", zIndex: 1 },

  logoRow: { display: "flex", alignItems: "center", gap: 10, marginBottom: 24 },
  logoIcon: { width: 36, height: 36, background: "linear-gradient(135deg,#00d4aa,#00b894)", borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 },
  logoText: { fontSize: "1.2rem", fontWeight: 800, color: "#00d4aa" },

  dotRow: { display: "flex", gap: 6, marginBottom: 28 },
  dot: { height: 8, borderRadius: 4, background: "#ffffff15", transition: "all 0.4s" },

  stepIcon: { marginBottom: 16, display: "flex" },
  title: { fontSize: "1.75rem", fontWeight: 800, margin: "0 0 10px", letterSpacing: "-0.5px" },
  sub: { color: "#555", lineHeight: 1.7, marginBottom: 24, fontSize: "0.9rem" },

  fieldGroup: { display: "flex", flexDirection: "column", gap: 7, marginBottom: 0 },
  label: { fontSize: "0.82rem", color: "#777", fontWeight: 600 },
  inputWrap: { display: "flex", alignItems: "center", background: "#ffffff07", border: "1px solid #ffffff10", borderRadius: "10px", padding: "0 14px" },
  input: { flex: 1, background: "transparent", border: "none", outline: "none", color: "#fff", padding: "13px 0", fontSize: "0.92rem" },
  eyeBtn: { background: "transparent", border: "none", cursor: "pointer", display: "flex", alignItems: "center" },

  otpRow: { display: "flex", gap: 10, justifyContent: "center", marginBottom: 20 },
  otpBox: { width: 50, height: 56, border: "1.5px solid #ffffff15", borderRadius: 10, background: "#ffffff07", textAlign: "center", fontSize: "1.4rem", fontWeight: 700, outline: "none", transition: "border-color 0.2s, color 0.2s" },

  btn: { background: "#00d4aa", border: "none", color: "#080c12", padding: "14px", borderRadius: "10px", fontWeight: 800, cursor: "pointer", fontSize: "0.97rem", width: "100%", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s", marginTop: 16 },

  resendRow: { display: "flex", justifyContent: "center", alignItems: "center", gap: 8, marginTop: 12 },
  hintText: { color: "#555", fontSize: "0.85rem" },
  resendBtn: { background: "transparent", border: "none", fontWeight: 700, fontSize: "0.85rem", fontFamily: "inherit", transition: "color 0.2s" },

  hint: { textAlign: "center", color: "#555", fontSize: "0.85rem", marginTop: 16 },
  link: { color: "#00d4aa", cursor: "pointer", fontWeight: 600 },

  successRing: { width: 90, height: 90, borderRadius: "50%", background: "#00d4aa15", border: "2px solid #00d4aa33", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto" },
};

export default ForgotPassword;