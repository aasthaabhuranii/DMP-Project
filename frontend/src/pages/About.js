import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Eye, Users, Zap, Trophy,
  Stethoscope, FileCheck, ShieldCheck,
  GraduationCap, Globe, Award,
  Sparkles, ArrowLeft, ChevronRight,
  MapPin, Clock, Star
} from "lucide-react";

function About() {
  const navigate = useNavigate();

  const team = [
    { name: "Dr. Priya Sharma",  role: "Head Counsellor",       icon: <Stethoscope size={36} color="#00d4aa" />, exp: "12 years experience" },
    { name: "Rahul Mehta",       role: "Visa Specialist",        icon: <ShieldCheck  size={36} color="#4da6ff" />, exp: "8 years experience" },
    { name: "Anita Patel",       role: "Documentation Expert",   icon: <FileCheck    size={36} color="#a855f7" />, exp: "10 years experience" },
  ];

  const values = [
    { icon: <Eye     size={28} color="#00d4aa" />, title: "Transparency", desc: "We keep you informed at every step with no hidden fees or surprises." },
    { icon: <Users   size={28} color="#4da6ff" />, title: "Trust",        desc: "500+ students have trusted us to guide their international journey." },
    { icon: <Zap     size={28} color="#f4c430" />, title: "Speed",        desc: "Fast processing and quick responses so you never miss a deadline." },
    { icon: <Trophy  size={28} color="#f97316" />, title: "Excellence",   desc: "98% visa success rate — we don't stop until you get your acceptance." },
  ];

  const stats = [
    { n: "500+", l: "Students Placed",        icon: <GraduationCap size={18} color="#00d4aa" /> },
    { n: "98%",  l: "Visa Success Rate",       icon: <ShieldCheck   size={18} color="#00d4aa" /> },
    { n: "25+",  l: "Partner Universities",    icon: <Globe         size={18} color="#00d4aa" /> },
    { n: "10+",  l: "Years of Experience",     icon: <Clock         size={18} color="#00d4aa" /> },
  ];

  return (
    <div style={styles.page}>
      <div style={styles.orb1} />
      <div style={styles.orb2} />

      {/* NAV */}
      <nav style={styles.nav}>
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          style={styles.logo}
          onClick={() => navigate("/")}
        >
          <div style={styles.logoIconWrap}>🦷</div>
          MediDent
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          style={styles.navLinks}
        >
          <span onClick={() => navigate("/")} style={styles.navLink}>Home</span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate("/login")}
            style={styles.navBtn}
          >
            <ShieldCheck size={14} style={{ marginRight: 6 }} /> Login
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate("/register")}
            style={styles.navBtnOutline}
          >
            <GraduationCap size={14} style={{ marginRight: 6 }} /> Register
          </motion.button>
        </motion.div>
      </nav>

      {/* HERO */}
      <section style={styles.hero}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={styles.heroTag}
        >
          <Stethoscope size={14} style={{ marginRight: 6 }} /> About Us
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={styles.heroTitle}
        >
          We Turn Medical Dreams<br />
          <span style={styles.accent}>Into Reality</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          style={styles.heroSub}
        >
          MediDent Global Pathways is dedicated to guiding aspiring medical and dental
          students toward their dream of studying abroad. Since 2014, we've helped
          500+ students from India secure admissions in top medical universities worldwide.
        </motion.p>
      </section>

      {/* VALUES */}
      <section style={styles.section}>
        <motion.div style={styles.eyebrow}>
          <Star size={13} color="#00d4aa" style={{ marginRight: 6 }} /> Why Choose Us
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={styles.sectionTitle}
        >
          What Sets Us Apart
        </motion.h2>
        <div style={styles.valuesGrid}>
          {values.map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6, boxShadow: "0 20px 40px #00d4aa15" }}
              style={styles.valueCard}
            >
              <div style={styles.valueIcon}>{v.icon}</div>
              <h3 style={styles.valueTitle}>{v.title}</h3>
              <p style={styles.valueDesc}>{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* STORY */}
      <section style={styles.storySection}>
        <div style={styles.storyGrid}>
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div style={styles.eyebrow}>
              <MapPin size={13} color="#00d4aa" style={{ marginRight: 6 }} /> Our Story
            </div>
            <h2 style={styles.sectionTitle}>Founded on a Mission</h2>
            <p style={styles.storyText}>
              Founded in 2014, MediDent Global Pathways started with a simple mission —
              to make studying medicine abroad accessible and stress-free for Indian students.
            </p>
            <p style={styles.storyText}>
              Our services include personalized career counselling, university selection,
              application documentation support, admission processing, and complete visa assistance.
              We also offer pre-departure guidance to ensure students feel confident before
              beginning their international journey.
            </p>
            <p style={styles.storyText}>
              With a commitment to transparency, reliability, and student success, we aim
              to transform ambition into achievement at every stage.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={styles.storyStats}
          >
            {stats.map((s, i) => (
              <div key={i} style={styles.storyStat}>
                <div style={styles.storyStatIcon}>{s.icon}</div>
                <div style={styles.storyStatNum}>{s.n}</div>
                <div style={styles.storyStatLabel}>{s.l}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* TEAM */}
      <section style={styles.section}>
        <div style={styles.eyebrow}>
          <Users size={13} color="#00d4aa" style={{ marginRight: 6 }} /> Our Team
        </div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={styles.sectionTitle}
        >
          Meet the Experts
        </motion.h2>
        <div style={styles.teamGrid}>
          {team.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -6 }}
              style={styles.teamCard}
            >
              <div style={styles.teamIcon}>{t.icon}</div>
              <h3 style={styles.teamName}>{t.name}</h3>
              <div style={styles.teamRole}>{t.role}</div>
              <div style={styles.teamExp}>
                <Clock size={12} style={{ marginRight: 4, verticalAlign: "middle" }} />{t.exp}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ACHIEVEMENTS */}
      <section style={{ ...styles.section, background: "#0a0f18" }}>
        <div style={styles.eyebrow}>
          <Award size={13} color="#00d4aa" style={{ marginRight: 6 }} /> Track Record
        </div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={styles.sectionTitle}
        >
          Our Numbers Speak
        </motion.h2>
        <div style={styles.achieveGrid}>
          {[
            { icon: <GraduationCap size={22} color="#00d4aa" />, label: "MBBS students placed globally", value: "500+" },
            { icon: <Globe        size={22} color="#4da6ff" />,  label: "Partner universities worldwide", value: "25+" },
            { icon: <ShieldCheck  size={22} color="#f4c430" />,  label: "Visa success rate", value: "98%" },
            { icon: <Trophy       size={22} color="#f97316" />,  label: "Years of trusted service", value: "10+" },
          ].map((a, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              style={styles.achieveCard}
            >
              <div style={styles.achieveIconWrap}>{a.icon}</div>
              <div style={styles.achieveValue}>{a.value}</div>
              <div style={styles.achieveLabel}>{a.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={styles.ctaSection}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={styles.ctaBox}
        >
          <Sparkles size={36} color="#00d4aa" style={{ marginBottom: 16 }} />
          <h2 style={styles.ctaTitle}>Ready to Start Your Journey?</h2>
          <p style={styles.ctaSub}>Join hundreds of students who trusted MediDent to make their dream a reality.</p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <motion.button
              whileHover={{ scale: 1.07, boxShadow: "0 0 40px #00d4aa99" }}
              whileTap={{ scale: 0.96 }}
              onClick={() => navigate("/register")}
              style={styles.btnPrimary}
            >
              <GraduationCap size={16} style={{ marginRight: 8 }} /> Register Now
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => navigate("/")}
              style={styles.btnSecondary}
            >
              <ArrowLeft size={16} style={{ marginRight: 6 }} /> Back to Home
            </motion.button>
          </div>
        </motion.div>
      </section>

      <footer style={styles.footer}>
        <div style={styles.footerLogo}>🦷 MediDent Global Pathways</div>
        <p style={{ color: "#555", marginTop: "8px", fontSize: "0.85rem" }}>© 2025 MediDent Global Pathways. All rights reserved.</p>
      </footer>
    </div>
  );
}

const styles = {
  page: { background: "#080c12", minHeight: "100vh", fontFamily: "'Sora', 'Segoe UI', sans-serif", color: "#fff", overflowX: "hidden" },
  orb1: { position: "fixed", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, #00d4aa15, transparent 70%)", top: "-150px", left: "-100px", filter: "blur(60px)", pointerEvents: "none" },
  orb2: { position: "fixed", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, #0066ff15, transparent 70%)", bottom: "-100px", right: "-100px", filter: "blur(60px)", pointerEvents: "none" },

  nav: { position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 60px", background: "rgba(8,12,18,0.85)", backdropFilter: "blur(12px)", borderBottom: "1px solid #ffffff0f" },
  logo: { fontSize: "1.4rem", fontWeight: 800, display: "flex", alignItems: "center", gap: "10px", color: "#00d4aa", cursor: "pointer" },
  logoIconWrap: { width: 34, height: 34, background: "linear-gradient(135deg,#00d4aa,#00b894)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17 },
  navLinks: { display: "flex", alignItems: "center", gap: "24px" },
  navLink: { color: "#aaa", fontSize: "0.95rem", cursor: "pointer" },
  navBtn: { background: "#00d4aa", border: "none", color: "#080c12", padding: "10px 22px", borderRadius: "8px", fontWeight: 700, cursor: "pointer", fontSize: "0.9rem", display: "flex", alignItems: "center" },
  navBtnOutline: { background: "transparent", border: "1px solid #00d4aa", color: "#00d4aa", padding: "10px 22px", borderRadius: "8px", fontWeight: 700, cursor: "pointer", fontSize: "0.9rem", display: "flex", alignItems: "center" },

  hero: { padding: "160px 60px 80px", textAlign: "center", maxWidth: "800px", margin: "0 auto" },
  heroTag: { background: "#00d4aa15", border: "1px solid #00d4aa44", color: "#00d4aa", padding: "8px 20px", borderRadius: "100px", fontSize: "0.85rem", display: "inline-flex", alignItems: "center", marginBottom: "24px" },
  heroTitle: { fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 900, lineHeight: 1.1, margin: "0 0 24px", letterSpacing: "-2px" },
  accent: { color: "#00d4aa" },
  heroSub: { color: "#666", fontSize: "1.05rem", lineHeight: 1.8, maxWidth: "680px", margin: "0 auto" },

  eyebrow: { display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.72rem", letterSpacing: "3px", color: "#00d4aa", textTransform: "uppercase", marginBottom: "12px" },
  section: { padding: "80px 60px", textAlign: "center" },
  sectionTitle: { fontSize: "2.2rem", fontWeight: 800, marginBottom: "40px", letterSpacing: "-1px" },

  valuesGrid: { display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap" },
  valueCard: { background: "#0d1520", border: "1px solid #ffffff0f", borderRadius: "16px", padding: "36px 28px", width: "220px", textAlign: "center", transition: "all 0.3s" },
  valueIcon: { display: "flex", justifyContent: "center", marginBottom: "16px" },
  valueTitle: { fontSize: "1.1rem", fontWeight: 700, marginBottom: "10px" },
  valueDesc: { color: "#555", fontSize: "0.85rem", lineHeight: 1.6 },

  storySection: { padding: "80px 80px", background: "#0a0f18" },
  storyGrid: { display: "flex", gap: "80px", alignItems: "center", maxWidth: "1100px", margin: "0 auto", flexWrap: "wrap" },
  storyText: { color: "#666", lineHeight: 1.8, marginBottom: "16px", fontSize: "0.95rem" },
  storyStats: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", flexShrink: 0 },
  storyStat: { background: "#0d1520", border: "1px solid #ffffff0f", borderRadius: "12px", padding: "24px", textAlign: "center" },
  storyStatIcon: { display: "flex", justifyContent: "center", marginBottom: 8 },
  storyStatNum: { fontSize: "2rem", fontWeight: 900, color: "#00d4aa" },
  storyStatLabel: { color: "#555", fontSize: "0.8rem", marginTop: "4px" },

  teamGrid: { display: "flex", gap: "24px", justifyContent: "center", flexWrap: "wrap" },
  teamCard: { background: "#0d1520", border: "1px solid #ffffff0f", borderRadius: "16px", padding: "40px 32px", width: "220px", textAlign: "center", transition: "all 0.3s" },
  teamIcon: { display: "flex", justifyContent: "center", marginBottom: "16px" },
  teamName: { fontSize: "1rem", fontWeight: 700, marginBottom: "6px" },
  teamRole: { color: "#00d4aa", fontSize: "0.85rem", fontWeight: 600, marginBottom: "8px" },
  teamExp: { color: "#444", fontSize: "0.8rem", display: "flex", alignItems: "center", justifyContent: "center" },

  achieveGrid: { display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap", marginTop: 16 },
  achieveCard: { background: "#0d1520", border: "1px solid #ffffff0f", borderRadius: "16px", padding: "32px 24px", width: "200px", textAlign: "center" },
  achieveIconWrap: { display: "flex", justifyContent: "center", marginBottom: 12, width: 48, height: 48, borderRadius: "50%", background: "#00d4aa12", alignItems: "center", margin: "0 auto 12px" },
  achieveValue: { fontSize: "2.2rem", fontWeight: 900, color: "#00d4aa", marginBottom: 6 },
  achieveLabel: { color: "#555", fontSize: "0.8rem", lineHeight: 1.5 },

  ctaSection: { padding: "80px 60px", textAlign: "center" },
  ctaBox: { background: "linear-gradient(135deg, #00d4aa0f, #0066ff0f)", border: "1px solid #00d4aa22", borderRadius: "24px", padding: "60px 40px", maxWidth: "700px", margin: "0 auto" },
  ctaTitle: { fontSize: "2rem", fontWeight: 800, marginBottom: "14px", letterSpacing: "-1px" },
  ctaSub: { color: "#666", marginBottom: "32px", fontSize: "1rem" },
  btnPrimary: { background: "#00d4aa", border: "none", color: "#080c12", padding: "14px 32px", borderRadius: "10px", fontWeight: 800, cursor: "pointer", fontSize: "1rem", display: "flex", alignItems: "center" },
  btnSecondary: { background: "transparent", border: "1px solid #333", color: "#aaa", padding: "14px 32px", borderRadius: "10px", fontWeight: 600, cursor: "pointer", fontSize: "1rem", display: "flex", alignItems: "center" },

  footer: { borderTop: "1px solid #ffffff0a", padding: "36px 60px", textAlign: "center" },
  footerLogo: { fontSize: "1.2rem", fontWeight: 800, color: "#00d4aa" },
};

export default About;