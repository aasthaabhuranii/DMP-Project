import { motion, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import {
  GraduationCap, FileText, Building2, Plane, Stethoscope,
  Map, ShieldCheck, Globe, Users, Trophy,
  Rocket, ChevronRight, LogIn, UserPlus
} from "lucide-react";

function Services() {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -80]);

  const steps = [
    { icon: <GraduationCap size={32} color="#00d4aa" />, bg: "#00d4aa18", title: "Counselling",       desc: "Expert guidance tailored to your academic profile and goals" },
    { icon: <FileText      size={32} color="#4da6ff" />, bg: "#4da6ff18", title: "Documentation",     desc: "Complete assistance with every form and paperwork needed" },
    { icon: <Building2     size={32} color="#f4c430" />, bg: "#f4c43018", title: "University Apply",  desc: "Curated university shortlist and application support" },
    { icon: <Plane         size={32} color="#a855f7" />, bg: "#a855f718", title: "Visa & Travel",     desc: "End-to-end visa filing and pre-departure orientation" },
    { icon: <Stethoscope   size={32} color="#f97316" />, bg: "#f9731618", title: "Graduation Abroad", desc: "Support all the way to your degree and beyond" },
  ];

  const countries = [
    { flag: "🇷🇺", name: "Russia" },
    { flag: "🇨🇳", name: "China" },
    { flag: "🇵🇭", name: "Philippines" },
    { flag: "🇺🇿", name: "Uzbekistan" },
    { flag: "🇬🇪", name: "Georgia" },
    { flag: "🇰🇿", name: "Kazakhstan" },
    { flag: "🇧🇾", name: "Belarus" },
    { flag: "🇩🇪", name: "Germany" },
  ];

  const stats = [
    { icon: <Users       size={20} color="#00d4aa" />, number: "500+", label: "Students Placed" },
    { icon: <Globe       size={20} color="#00d4aa" />, number: "25+",  label: "Countries" },
    { icon: <ShieldCheck size={20} color="#00d4aa" />, number: "98%",  label: "Visa Success" },
    { icon: <Trophy      size={20} color="#00d4aa" />, number: "10+",  label: "Years Experience" },
  ];

  return (
    <div ref={containerRef} style={styles.page}>
      {/* NAV */}
      <nav style={styles.nav}>
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          style={styles.logo}
          onClick={() => navigate("/")}
        >
          <div style={styles.logoIconWrap}>🦷</div>
          <span>MediDent</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          style={styles.navLinks}
        >
          <a href="#journey" style={styles.navLink}>
            <Map size={13} style={{ marginRight: 5 }} /> Journey
          </a>
          <a href="#countries" style={styles.navLink}>
            <Globe size={13} style={{ marginRight: 5 }} /> Countries
          </a>
          <motion.button
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/login")} style={styles.navBtn}
          >
            <LogIn size={14} style={{ marginRight: 6 }} /> Login
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/register")} style={styles.navBtnOutline}
          >
            <UserPlus size={14} style={{ marginRight: 6 }} /> Register
          </motion.button>
        </motion.div>
      </nav>

      {/* HERO */}
      <motion.section style={{ ...styles.hero, opacity: heroOpacity, y: heroY }}>
        <div style={styles.orb1} />
        <div style={styles.orb2} />
        <div style={styles.orb3} />

        <div style={styles.globeWrap}>
          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 20, ease: "linear" }} style={styles.globe}>🌍</motion.div>
          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 5, ease: "linear" }} style={styles.orbitRing}>
            <div style={styles.plane}>✈️</div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.2 }}
          style={styles.heroText}
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            style={styles.heroTag}
          >
            <Stethoscope size={13} style={{ marginRight: 6 }} /> Medical & Dental Abroad Consultancy
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8 }}
            style={styles.heroTitle}
          >
            MediDent<br />
            <span style={styles.heroAccent}>Global Pathways</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
            style={styles.heroSub}
          >
            From <strong>Passion</strong> to <strong>Acceptance</strong> — we guide medical & dental students
            every step of the way to study abroad.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}
            style={styles.heroBtns}
          >
            <motion.button
              whileHover={{ scale: 1.07, boxShadow: "0 0 30px #00d4aa88" }} whileTap={{ scale: 0.96 }}
              onClick={() => navigate("/register")} style={styles.btnPrimary}
            >
              <Rocket size={15} style={{ marginRight: 8 }} /> Start Your Journey
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.96 }}
              onClick={() => navigate("/about")} style={styles.btnSecondary}
            >
              Learn More <ChevronRight size={15} style={{ marginLeft: 4 }} />
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* STATS */}
      <section style={styles.statsSection}>
        {stats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            style={styles.statCard}
          >
            <div style={styles.statIconWrap}>{s.icon}</div>
            <div style={styles.statNumber}>{s.number}</div>
            <div style={styles.statLabel}>{s.label}</div>
          </motion.div>
        ))}
      </section>

      {/* JOURNEY STEPS */}
      <section id="journey" style={styles.section}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={styles.sectionTitle}
        >
          <Map size={26} color="#00d4aa" style={{ marginRight: 10, verticalAlign: "middle" }} />
          Your Complete Journey
        </motion.h2>
        <p style={styles.sectionSub}>End-to-end support from first consultation to graduation abroad</p>
        <div style={styles.stepsRow}>
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.15 }}
              whileHover={{ y: -8, boxShadow: "0 20px 50px #00d4aa22" }}
              style={styles.stepCard}
            >
              <div style={{ ...styles.stepIconWrap, background: step.bg }}>{step.icon}</div>
              <div style={styles.stepNum}>0{i + 1}</div>
              <h3 style={styles.stepTitle}>{step.title}</h3>
              <p style={styles.stepDesc}>{step.desc}</p>
              {i < steps.length - 1 && (
                <div style={styles.stepArrow}><ChevronRight size={18} color="#00d4aa44" /></div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* COUNTRIES */}
      <section id="countries" style={styles.countriesSection}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={styles.sectionTitle}
        >
          <Globe size={24} color="#00d4aa" style={{ marginRight: 10, verticalAlign: "middle" }} />
          Study Destinations
        </motion.h2>
        <div style={styles.countriesGrid}>
          {countries.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              whileHover={{ scale: 1.08, backgroundColor: "#00d4aa22" }}
              style={styles.countryCard}
            >
              <span style={{ fontSize: "2.5rem" }}>{c.flag}</span>
              <span style={styles.countryName}>{c.name}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={styles.ctaSection}>
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={styles.ctaBox}
        >
          <Rocket size={40} color="#00d4aa" style={{ marginBottom: 20 }} />
          <h2 style={styles.ctaTitle}>Ready to Begin Your Medical Journey?</h2>
          <p style={styles.ctaSub}>Join 500+ students who trusted MediDent to make their dream a reality.</p>
          <motion.button
            whileHover={{ scale: 1.07, boxShadow: "0 0 40px #00d4aa99" }} whileTap={{ scale: 0.96 }}
            onClick={() => navigate("/register")} style={styles.btnPrimary}
          >
            <GraduationCap size={16} style={{ marginRight: 8 }} /> Register Now — It's Free
          </motion.button>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <div style={styles.footerLogo}>🦷 MediDent Global Pathways</div>
        <p style={{ color: "#666", margin: "8px 0 0" }}>Helping medical & dental students study abroad since 2014</p>
        <p style={{ color: "#444", fontSize: "0.8rem", marginTop: "12px" }}>© 2024 MediDent Global Pathways. All rights reserved.</p>
      </footer>
    </div>
  );
}

const styles = {
  page: { background: "#080c12", minHeight: "100vh", fontFamily: "'Sora', 'Segoe UI', sans-serif", color: "#fff", overflowX: "hidden" },
  nav: { position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 60px", background: "rgba(8,12,18,0.85)", backdropFilter: "blur(12px)", borderBottom: "1px solid #ffffff0f" },
  logo: { fontSize: "1.4rem", fontWeight: 800, display: "flex", alignItems: "center", gap: "10px", color: "#00d4aa", cursor: "pointer" },
  logoIconWrap: { width: 34, height: 34, background: "linear-gradient(135deg,#00d4aa,#00b894)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17 },
  navLinks: { display: "flex", alignItems: "center", gap: "28px" },
  navLink: { color: "#aaa", textDecoration: "none", fontSize: "0.95rem", transition: "color 0.2s", display: "flex", alignItems: "center" },
  navBtn: { background: "#00d4aa", border: "none", color: "#080c12", padding: "10px 22px", borderRadius: "8px", fontWeight: 700, cursor: "pointer", fontSize: "0.9rem", display: "flex", alignItems: "center" },
  navBtnOutline: { background: "transparent", border: "1px solid #00d4aa", color: "#00d4aa", padding: "10px 22px", borderRadius: "8px", fontWeight: 700, cursor: "pointer", fontSize: "0.9rem", display: "flex", alignItems: "center" },

  hero: { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", gap: "80px", padding: "120px 60px 60px", position: "relative", overflow: "hidden" },
  orb1: { position: "absolute", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, #00d4aa22, transparent 70%)", top: "10%", left: "5%", filter: "blur(40px)" },
  orb2: { position: "absolute", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, #0066ff22, transparent 70%)", bottom: "10%", right: "10%", filter: "blur(50px)" },
  orb3: { position: "absolute", width: "300px", height: "300px", borderRadius: "50%", background: "radial-gradient(circle, #ff006622, transparent 70%)", top: "50%", left: "50%", filter: "blur(60px)" },
  globeWrap: { position: "relative", width: "220px", height: "220px", flexShrink: 0 },
  globe: { fontSize: "8rem", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)" },
  orbitRing: { position: "absolute", top: 0, left: 0, width: "100%", height: "100%", borderRadius: "50%", border: "2px dashed #00d4aa44" },
  plane: { position: "absolute", top: "-14px", left: "50%", fontSize: "1.6rem" },
  heroText: { maxWidth: "580px" },
  heroTag: { background: "#00d4aa15", border: "1px solid #00d4aa44", color: "#00d4aa", padding: "8px 16px", borderRadius: "100px", fontSize: "0.85rem", display: "inline-flex", alignItems: "center", marginBottom: "20px" },
  heroTitle: { fontSize: "clamp(2.8rem, 5vw, 4.5rem)", fontWeight: 900, lineHeight: 1.05, margin: "0 0 20px", letterSpacing: "-2px" },
  heroAccent: { color: "#00d4aa" },
  heroSub: { color: "#888", fontSize: "1.1rem", lineHeight: 1.7, marginBottom: "36px" },
  heroBtns: { display: "flex", gap: "16px", flexWrap: "wrap" },
  btnPrimary: { background: "#00d4aa", border: "none", color: "#080c12", padding: "15px 32px", borderRadius: "10px", fontWeight: 800, cursor: "pointer", fontSize: "1rem", transition: "all 0.2s", display: "flex", alignItems: "center" },
  btnSecondary: { background: "transparent", border: "1px solid #333", color: "#aaa", padding: "15px 32px", borderRadius: "10px", fontWeight: 600, cursor: "pointer", fontSize: "1rem", display: "flex", alignItems: "center" },

  statsSection: { display: "flex", justifyContent: "center", gap: "20px", padding: "40px 60px", flexWrap: "wrap", borderTop: "1px solid #ffffff0a", borderBottom: "1px solid #ffffff0a" },
  statCard: { textAlign: "center", padding: "24px 40px", background: "#ffffff07", borderRadius: "12px", border: "1px solid #ffffff0f" },
  statIconWrap: { display: "flex", justifyContent: "center", marginBottom: 8 },
  statNumber: { fontSize: "2.5rem", fontWeight: 900, color: "#00d4aa" },
  statLabel: { color: "#666", fontSize: "0.9rem", marginTop: "4px" },

  section: { padding: "90px 60px", textAlign: "center" },
  sectionTitle: { fontSize: "2.4rem", fontWeight: 800, marginBottom: "12px", letterSpacing: "-1px" },
  sectionSub: { color: "#666", fontSize: "1rem", marginBottom: "50px" },

  stepsRow: { display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap", position: "relative" },
  stepCard: { background: "#0d1520", border: "1px solid #ffffff0f", borderRadius: "16px", padding: "32px 20px", width: "180px", textAlign: "center", cursor: "default", transition: "all 0.3s", position: "relative" },
  stepIconWrap: { width: 64, height: 64, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" },
  stepNum: { fontSize: "0.75rem", color: "#00d4aa", fontWeight: 700, letterSpacing: "2px", marginBottom: "10px" },
  stepTitle: { fontSize: "1rem", fontWeight: 700, margin: "0 0 8px" },
  stepDesc: { fontSize: "0.8rem", color: "#666", lineHeight: 1.5, margin: 0 },
  stepArrow: { position: "absolute", right: "-18px", top: "50%", transform: "translateY(-50%)", zIndex: 2 },

  countriesSection: { padding: "90px 60px", textAlign: "center", background: "#0a0f18" },
  countriesGrid: { display: "flex", flexWrap: "wrap", gap: "16px", justifyContent: "center", marginTop: "40px" },
  countryCard: { background: "#0d1520", border: "1px solid #ffffff0f", borderRadius: "12px", padding: "20px 28px", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", cursor: "pointer", transition: "all 0.2s" },
  countryName: { fontSize: "0.9rem", fontWeight: 600, color: "#ccc" },

  ctaSection: { padding: "90px 60px", textAlign: "center" },
  ctaBox: { background: "linear-gradient(135deg, #00d4aa0f, #0066ff0f)", border: "1px solid #00d4aa22", borderRadius: "24px", padding: "70px 40px", maxWidth: "700px", margin: "0 auto" },
  ctaTitle: { fontSize: "2.2rem", fontWeight: 800, marginBottom: "16px", letterSpacing: "-1px" },
  ctaSub: { color: "#777", marginBottom: "36px", fontSize: "1.05rem" },

  footer: { borderTop: "1px solid #ffffff0a", padding: "40px 60px", textAlign: "center" },
  footerLogo: { fontSize: "1.2rem", fontWeight: 800, color: "#00d4aa" },
};

export default Services;