import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import {
  GraduationCap, FileText, Building2, Plane, Stethoscope,
  Map, ClipboardList, ShieldCheck, Home as HomeIcon, Phone,
  Users, Trophy, ArrowRight, ChevronRight, Rocket, Star,
  MessageSquare, Globe, BadgeCheck
} from "lucide-react";

const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=DM+Sans:wght@300;400;500;600;700&display=swap";
if (!document.head.querySelector("link[href*='Playfair']")) {
  document.head.appendChild(fontLink);
}

function Home() {
  const navigate = useNavigate();

  const steps = [
    { icon: <GraduationCap size={30} color="#00d4aa" />, bg: "#00d4aa18", title: "Free Counselling",    desc: "Personalised session to assess your profile, budget & dream country" },
    { icon: <FileText      size={30} color="#4da6ff" />, bg: "#4da6ff18", title: "Documentation",       desc: "Complete assistance with every certificate, apostille & translation" },
    { icon: <Building2     size={30} color="#f4c430" />, bg: "#f4c43018", title: "University Apply",    desc: "Shortlist, apply & secure your official Admission Letter" },
    { icon: <Plane         size={30} color="#a855f7" />, bg: "#a855f718", title: "Visa & Travel",       desc: "End-to-end visa filing, SOP writing & pre-departure orientation" },
    { icon: <Stethoscope   size={30} color="#f97316" />, bg: "#f9731618", title: "Graduation Abroad",   desc: "Support all the way to your degree, internship & beyond" },
  ];

  const countries = [
    { flag: "🇺🇸", name: "USA",         tag: "Top Ranked",      color: "#3b82f6" },
    { flag: "🇬🇧", name: "UK",          tag: "EU Standard",     color: "#ef4444" },
    { flag: "🇨🇦", name: "Canada",      tag: "English Medium",  color: "#f59e0b" },
    { flag: "🇦🇺", name: "Australia",   tag: "Top Pick",        color: "#10b981" },
    { flag: "🇩🇪", name: "Germany",     tag: "Affordable",      color: "#6366f1" },
    { flag: "🇳🇿", name: "New Zealand", tag: "Budget Friendly", color: "#00d4aa" },
  ];

  const stats = [
    { icon: <Users       size={20} color="#00d4aa" />, number: "500+", label: "Students Placed" },
    { icon: <Globe       size={20} color="#00d4aa" />, number: "6",    label: "Countries" },
    { icon: <ShieldCheck size={20} color="#00d4aa" />, number: "98%",  label: "Visa Success Rate" },
    { icon: <Trophy      size={20} color="#00d4aa" />, number: "15+",  label: "Years Experience" },
  ];

  const services = [
    { icon: <Map           size={24} color="#00d4aa" />, title: "University Selection",  desc: "We match you with the right university based on your NEET score, budget, and preferred country." },
    { icon: <ClipboardList size={24} color="#4da6ff" />, title: "Admission Processing",  desc: "We handle the entire application — form filling, document submission, and follow-up with admission offices." },
    { icon: <ShieldCheck   size={24} color="#a855f7" />, title: "Visa Assistance",       desc: "98% visa success rate. We prepare your complete visa file and coach you for embassy interviews." },
    { icon: <HomeIcon      size={24} color="#f4c430" />, title: "Accommodation Support", desc: "We arrange hostel or apartment options near your university before you even land." },
    { icon: <GraduationCap size={24} color="#f97316" />, title: "NExT / FMGE Coaching", desc: "Post-graduation support — we guide returning students through India's medical licensing exams." },
    { icon: <Phone         size={24} color="#10b981" />, title: "24/7 Student Support",  desc: "Local representatives in every country, on-call for emergencies, guidance, and everyday help." },
  ];

  const testimonials = [
    { name: "Priya S.", country: "USA 🇺🇸",       text: "MediDent guided me every step. Got into a top US medical school — my dream come true. Best decision!", color: "#00d4aa" },
    { name: "Arjun M.", country: "Canada 🇨🇦",     text: "From document help to airport pickup — truly end-to-end. Highly recommend to every aspiring doctor.", color: "#3b82f6" },
    { name: "Sneha P.", country: "Australia 🇦🇺",  text: "Australia was the perfect choice for me. MediDent found me the right university at the right budget.", color: "#a855f7" },
  ];

  return (
    <div style={styles.page}>
      <Navbar />

      {/* HERO */}
      <section style={styles.hero}>
        <div style={styles.orb1} /><div style={styles.orb2} /><div style={styles.orb3} />

        <div style={styles.globeWrap}>
          <motion.div
            style={styles.globeEmoji}
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          >
            🌍
          </motion.div>
          <motion.div
            style={styles.planeOrbit}
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
          >
            <div style={styles.planeEmoji}>✈️</div>
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
            From <strong style={{ color: "#f0ece4" }}>Passion</strong> to{" "}
            <strong style={{ color: "#f0ece4" }}>Acceptance</strong> — we guide medical & dental students
            every step of the way to study abroad in 6 countries worldwide.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}
            style={styles.heroBtns}
          >
            <motion.button
              whileHover={{ scale: 1.07, boxShadow: "0 0 35px #00d4aa77" }}
              whileTap={{ scale: 0.96 }}
              onClick={() => navigate("/register")}
              style={styles.btnPrimary}
            >
              <Rocket size={15} style={{ marginRight: 8 }} /> Start Your Journey
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}
              onClick={() => navigate("/programs")}
              style={styles.btnSecondary}
            >
              Explore Programs <ChevronRight size={15} style={{ marginLeft: 4 }} />
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
            style={styles.trustRow}
          >
            {[
              { icon: <BadgeCheck size={12} color="#00d4aa" />, text: "NMC Recognized" },
              { icon: <BadgeCheck size={12} color="#00d4aa" />, text: "WHO Listed" },
              { icon: <BadgeCheck size={12} color="#00d4aa" />, text: "NEET Compliant" },
            ].map((t, i) => (
              <span key={i} style={styles.trustBadge}>
                {t.icon} <span style={{ marginLeft: 5 }}>{t.text}</span>
              </span>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* STATS */}
      <section style={styles.statsSection}>
        {stats.map((st, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            style={styles.statCard}
          >
            <div style={styles.statIconWrap}>{st.icon}</div>
            <div style={styles.statNumber}>{st.number}</div>
            <div style={styles.statLabel}>{st.label}</div>
          </motion.div>
        ))}
      </section>

      {/* COUNTRIES */}
      <section id="countries" style={styles.section}>
        <p style={styles.eyebrow}>Where We Send Students</p>
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={styles.sectionTitle}>
          <Globe size={28} color="#00d4aa" style={{ marginRight: 10, verticalAlign: "middle" }} />
          6 Countries. Endless Possibilities
        </motion.h2>
        <p style={styles.sectionSub}>Affordable fees · WHO-recognized universities · English-medium programs</p>
        <div style={styles.countriesGrid}>
          {countries.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }} transition={{ delay: i * 0.07 }}
              whileHover={{ y: -6, boxShadow: `0 20px 40px ${c.color}22` }}
              onClick={() => navigate("/programs")}
              style={{ ...styles.countryCard, borderColor: `${c.color}22`, cursor: "pointer" }}
            >
              <span style={{ fontSize: "2.6rem", lineHeight: 1 }}>{c.flag}</span>
              <span style={styles.countryName}>{c.name}</span>
              <span style={{ ...styles.countryTag, background: `${c.color}18`, color: c.color, border: `1px solid ${c.color}33` }}>
                {c.tag}
              </span>
            </motion.div>
          ))}
        </div>
        <motion.button
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
          onClick={() => navigate("/programs")}
          style={{ ...styles.btnPrimary, marginTop: "40px" }}
        >
          View All Universities & Courses <ArrowRight size={16} style={{ marginLeft: 8 }} />
        </motion.button>
      </section>

      {/* JOURNEY STEPS */}
      <section id="journey" style={{ ...styles.section, background: "#080d16" }}>
        <p style={styles.eyebrow}>End-to-End Support</p>
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={styles.sectionTitle}>
          <Map size={26} color="#00d4aa" style={{ marginRight: 10, verticalAlign: "middle" }} />
          Your Complete Journey
        </motion.h2>
        <p style={styles.sectionSub}>From first consultation to graduation abroad — we handle every step</p>
        <div style={styles.stepsRow}>
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.12 }}
              whileHover={{ y: -8, boxShadow: "0 20px 50px #00d4aa22", borderColor: "#00d4aa44" }}
              style={styles.stepCard}
            >
              <div style={{ ...styles.stepIconWrap, background: step.bg }}>
                {step.icon}
              </div>
              <div style={styles.stepNum}>0{i + 1}</div>
              <h3 style={styles.stepTitle}>{step.title}</h3>
              <p style={styles.stepDesc}>{step.desc}</p>
              {i < steps.length - 1 && <div style={styles.stepArrow}><ChevronRight size={18} color="#00d4aa44" /></div>}
            </motion.div>
          ))}
        </div>
        <motion.button
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
          onClick={() => navigate("/journey")}
          style={{ ...styles.btnSecondary, marginTop: "50px", borderColor: "#00d4aa44", color: "#00d4aa" }}
        >
          See Full Process + Documents + Exams <ArrowRight size={15} style={{ marginLeft: 8 }} />
        </motion.button>
      </section>

      {/* SERVICES */}
      <section style={styles.section}>
        <p style={styles.eyebrow}>What We Do</p>
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={styles.sectionTitle}>
          Our Services
        </motion.h2>
        <p style={styles.sectionSub}>Everything a student needs to successfully study medicine abroad</p>
        <div style={styles.servicesGrid}>
          {services.map((sv, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              whileHover={{ y: -5, borderColor: "#00d4aa44" }}
              style={styles.serviceCard}
            >
              <div style={styles.serviceIconWrap}>{sv.icon}</div>
              <h3 style={styles.serviceTitle}>{sv.title}</h3>
              <p style={styles.serviceDesc}>{sv.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ ...styles.section, background: "#080d16" }}>
        <p style={styles.eyebrow}>Student Stories</p>
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={styles.sectionTitle}>
          <MessageSquare size={26} color="#00d4aa" style={{ marginRight: 10, verticalAlign: "middle" }} />
          What Our Students Say
        </motion.h2>
        <div style={styles.testimonialsGrid}>
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.12 }}
              style={{ ...styles.testimonialCard, borderColor: `${t.color}22` }}
            >
              <div style={{ display: "flex", gap: 2, marginBottom: 12 }}>
                {[...Array(5)].map((_, si) => <Star key={si} size={13} color={t.color} fill={t.color} />)}
              </div>
              <p style={styles.testimonialText}>"{t.text}"</p>
              <div style={styles.testimonialAuthor}>
                <div style={{ ...styles.authorAvatar, background: `${t.color}20`, color: t.color, border: `2px solid ${t.color}40` }}>
                  {t.name[0]}
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: "#f0ece4", fontSize: "0.95rem" }}>{t.name}</div>
                  <div style={{ color: t.color, fontSize: "0.78rem" }}>{t.country}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.button
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
          onClick={() => navigate("/programs")}
          style={{ ...styles.btnSecondary, marginTop: "40px" }}
        >
          Read More Student Stories <ArrowRight size={15} style={{ marginLeft: 8 }} />
        </motion.button>
      </section>

      {/* CTA */}
      <section style={styles.ctaSection}>
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={styles.ctaBox}
        >
          <Rocket size={40} color="#00d4aa" style={{ marginBottom: 20 }} />
          <h2 style={styles.ctaTitle}>Ready to Begin Your Medical Journey?</h2>
          <p style={styles.ctaSub}>
            Join 500+ students who trusted MediDent to make their dream a reality.<br />
            Free counselling — no commitment, no hidden charges.
          </p>
          <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
            <motion.button
              whileHover={{ scale: 1.07, boxShadow: "0 0 40px #00d4aa99" }} whileTap={{ scale: 0.96 }}
              onClick={() => navigate("/register")} style={styles.btnPrimary}
            >
              <GraduationCap size={16} style={{ marginRight: 8 }} /> Register Now — It's Free
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}
              onClick={() => navigate("/journey")} style={styles.btnSecondary}
            >
              Learn About the Process <ChevronRight size={15} style={{ marginLeft: 4 }} />
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <div style={styles.footerLogo}>🦷 MediDent Global Pathways</div>
        <p style={{ color: "#333", fontSize: "0.78rem", margin: 0 }}>© 2025 MediDent Global Pathways. All rights reserved.</p>
      </footer>
    </div>
  );
}

const styles = {
  page: { background: "#060c15", minHeight: "100vh", fontFamily: "'DM Sans', 'Segoe UI', sans-serif", color: "#e8e2d8", overflowX: "hidden" },
  hero: { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", gap: "80px", padding: "130px 60px 70px", position: "relative", overflow: "hidden" },
  orb1: { position: "absolute", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, #00d4aa12, transparent 70%)", top: "-10%", left: "-5%", filter: "blur(80px)", pointerEvents: "none" },
  orb2: { position: "absolute", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, #0066ff0f, transparent 70%)", bottom: "5%", right: "5%", filter: "blur(70px)", pointerEvents: "none" },
  orb3: { position: "absolute", width: "300px", height: "300px", borderRadius: "50%", background: "radial-gradient(circle, #a855f70a, transparent 70%)", top: "50%", right: "20%", filter: "blur(60px)", pointerEvents: "none" },
  globeWrap: { position: "relative", width: "280px", height: "280px", flexShrink: 0 },
  globeEmoji: { position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", fontSize: "8rem", lineHeight: 1 },
  planeOrbit: { position: "absolute", top: "50%", left: "50%", width: "240px", height: "240px", marginTop: "-120px", marginLeft: "-120px", borderRadius: "50%" },
  planeEmoji: { position: "absolute", top: "-16px", left: "50%", transform: "translateX(-50%)", fontSize: "1.8rem" },
  heroText: { maxWidth: "560px" },
  heroTag: { background: "#00d4aa12", border: "1px solid #00d4aa33", color: "#00d4aa", padding: "8px 18px", borderRadius: "100px", fontSize: "0.82rem", display: "inline-flex", alignItems: "center", marginBottom: "22px" },
  heroTitle: { fontFamily: "'Playfair Display', serif", fontSize: "clamp(3rem, 5vw, 4.5rem)", fontWeight: 900, lineHeight: 1.08, margin: "0 0 22px", letterSpacing: "-2px", color: "#f0ece4" },
  heroAccent: { color: "#00d4aa", fontStyle: "italic" },
  heroSub: { color: "#777", fontSize: "1.05rem", lineHeight: 1.8, marginBottom: "36px", fontWeight: 300 },
  heroBtns: { display: "flex", gap: "14px", flexWrap: "wrap", marginBottom: "28px" },
  trustRow: { display: "flex", flexWrap: "wrap", gap: "10px" },
  trustBadge: { fontSize: "0.72rem", color: "#555", background: "#ffffff06", border: "1px solid #ffffff0f", padding: "5px 12px", borderRadius: "20px", display: "inline-flex", alignItems: "center" },
  btnPrimary: { background: "#00d4aa", border: "none", color: "#060c15", padding: "14px 30px", borderRadius: "10px", fontWeight: 800, cursor: "pointer", fontSize: "0.95rem", fontFamily: "'DM Sans', sans-serif", display: "flex", alignItems: "center" },
  btnSecondary: { background: "transparent", border: "1px solid #2a2a3a", color: "#888", padding: "14px 30px", borderRadius: "10px", fontWeight: 600, cursor: "pointer", fontSize: "0.95rem", fontFamily: "'DM Sans', sans-serif", display: "flex", alignItems: "center" },

  statsSection: { display: "flex", justifyContent: "center", gap: "16px", padding: "40px 60px", flexWrap: "wrap", borderTop: "1px solid #ffffff08", borderBottom: "1px solid #ffffff08", background: "#080d16" },
  statCard: { textAlign: "center", padding: "24px 40px", background: "#0d1520", borderRadius: "14px", border: "1px solid #ffffff0d" },
  statIconWrap: { display: "flex", justifyContent: "center", marginBottom: 8 },
  statNumber: { fontFamily: "'Playfair Display', serif", fontSize: "2.4rem", fontWeight: 700, color: "#00d4aa" },
  statLabel: { color: "#555", fontSize: "0.82rem", marginTop: "4px" },

  eyebrow: { fontSize: "0.72rem", letterSpacing: "3px", color: "#00d4aa", textTransform: "uppercase", marginBottom: "12px" },
  section: { padding: "90px 60px", textAlign: "center" },
  sectionTitle: { fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 700, marginBottom: "14px", letterSpacing: "-0.5px", color: "#f0ece4" },
  sectionSub: { color: "#555", fontSize: "0.95rem", marginBottom: "50px" },

  countriesGrid: { display: "flex", flexWrap: "wrap", gap: "14px", justifyContent: "center", marginBottom: "20px" },
  countryCard: { background: "#0d1520", border: "1px solid #ffffff0d", borderRadius: "14px", padding: "20px 26px", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", transition: "all 0.25s" },
  countryName: { fontSize: "0.95rem", fontWeight: 700, color: "#ddd" },
  countryTag: { fontSize: "0.7rem", padding: "4px 10px", borderRadius: "20px" },

  stepsRow: { display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap", position: "relative" },
  stepCard: { background: "#0d1520", border: "1px solid #ffffff0d", borderRadius: "16px", padding: "30px 18px", width: "170px", textAlign: "center", cursor: "default", transition: "all 0.3s", position: "relative" },
  stepIconWrap: { width: 60, height: 60, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" },
  stepNum: { fontSize: "0.7rem", color: "#00d4aa", fontWeight: 700, letterSpacing: "2px", marginBottom: "10px" },
  stepTitle: { fontSize: "0.92rem", fontWeight: 700, margin: "0 0 8px", color: "#f0ece4" },
  stepDesc: { fontSize: "0.76rem", color: "#555", lineHeight: 1.55, margin: 0 },
  stepArrow: { position: "absolute", right: "-14px", top: "50%", transform: "translateY(-50%)", zIndex: 2 },

  servicesGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px", textAlign: "left" },
  serviceCard: { background: "#0d1520", border: "1px solid #ffffff0d", borderRadius: "16px", padding: "28px", transition: "all 0.3s" },
  serviceIconWrap: { width: 46, height: 46, borderRadius: "12px", background: "#ffffff07", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "14px" },
  serviceTitle: { fontSize: "1rem", fontWeight: 700, color: "#f0ece4", marginBottom: "8px" },
  serviceDesc: { color: "#666", fontSize: "0.85rem", lineHeight: 1.65, margin: 0 },

  testimonialsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px", textAlign: "left" },
  testimonialCard: { background: "#0d1520", border: "1px solid #ffffff0d", borderRadius: "16px", padding: "28px" },
  testimonialText: { color: "#999", fontSize: "0.9rem", lineHeight: 1.75, fontStyle: "italic", marginBottom: "22px" },
  testimonialAuthor: { display: "flex", alignItems: "center", gap: "12px" },
  authorAvatar: { width: "40px", height: "40px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "1rem", flexShrink: 0 },

  ctaSection: { padding: "90px 60px", textAlign: "center" },
  ctaBox: { background: "linear-gradient(135deg, #00d4aa0f, #0066ff0d)", border: "1px solid #00d4aa22", borderRadius: "28px", padding: "70px 40px", maxWidth: "700px", margin: "0 auto" },
  ctaTitle: { fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 700, marginBottom: "16px", letterSpacing: "-0.5px", color: "#f0ece4" },
  ctaSub: { color: "#666", marginBottom: "36px", fontSize: "1rem", lineHeight: 1.7 },

  footer: { borderTop: "1px solid #ffffff08", padding: "50px 60px", textAlign: "center", background: "#040810" },
  footerLogo: { fontSize: "1.2rem", fontWeight: 800, color: "#00d4aa", marginBottom: "16px" },
};

export default Home;