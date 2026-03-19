import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import {
  Map, FolderOpen, FileText, DollarSign, HelpCircle,
  Plane, Users, ShieldCheck, Trophy,
  Rocket, ChevronDown, ChevronUp,
  Building, Building2, CreditCard, BarChart2,
  GraduationCap, BookOpen, Globe, Clock
} from "lucide-react";

/* ── Google Font ── */
const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=DM+Sans:wght@300;400;500;600&display=swap";
if (!document.head.querySelector("link[href*='Playfair']")) {
  document.head.appendChild(fontLink);
}

const C = {
  bg: "#04080f", bg2: "#081018", card: "#0a1628",
  border: "#ffffff0a", border2: "#ffffff16",
  teal: "#00d4aa", tealDim: "#00d4aa18", tealBorder: "#00d4aa33",
  gold: "#f4c430", goldDim: "#f4c43015",
  red: "#ff4d6d", blue: "#4da6ff",
  text: "#e8e2d8", muted: "#8a8a9a", dim: "#3a3a4a",
};

const s = {
  page: { background: C.bg, minHeight: "100vh", fontFamily: "'DM Sans', sans-serif", color: C.text, overflowX: "hidden" },
  hero: { position: "relative", padding: "120px 60px 90px", textAlign: "center", overflow: "hidden", background: `radial-gradient(ellipse 80% 60% at 50% -10%, #00d4aa14 0%, transparent 70%)`, borderBottom: `1px solid ${C.border2}` },
  heroBg: { position: "absolute", inset: 0, backgroundImage: `radial-gradient(circle at 20% 50%, #00d4aa08 0%, transparent 40%), radial-gradient(circle at 80% 20%, #4da6ff06 0%, transparent 40%)`, pointerEvents: "none" },
  heroEye: { display: "inline-flex", alignItems: "center", gap: "8px", background: C.tealDim, border: `1px solid ${C.tealBorder}`, borderRadius: "30px", padding: "6px 18px", fontSize: "0.75rem", letterSpacing: "2px", color: C.teal, textTransform: "uppercase", marginBottom: "30px" },
  heroTitle: { fontFamily: "'Playfair Display', serif", fontSize: "clamp(3rem, 6vw, 5.5rem)", fontWeight: 900, lineHeight: 1.08, marginBottom: "24px", letterSpacing: "-2px", color: "#f0ece4" },
  heroAccent: { color: C.teal, fontStyle: "italic" },
  heroSub: { fontSize: "1.1rem", color: C.muted, maxWidth: "580px", margin: "0 auto 50px", lineHeight: 1.75, fontWeight: 300 },
  heroStats: { display: "flex", justifyContent: "center", gap: "60px", flexWrap: "wrap" },
  heroStat: { textAlign: "center" },
  heroStatNum: { fontFamily: "'Playfair Display', serif", fontSize: "2.4rem", fontWeight: 700, color: C.teal, display: "block", lineHeight: 1 },
  heroStatIcon: { display: "flex", justifyContent: "center", marginBottom: 6 },
  heroStatLabel: { fontSize: "0.72rem", color: C.muted, letterSpacing: "1.5px", textTransform: "uppercase", marginTop: "6px" },

  wrap: { maxWidth: "1280px", margin: "0 auto", padding: "80px 40px" },
  sLabel: { fontSize: "0.72rem", letterSpacing: "3px", color: C.teal, textTransform: "uppercase", marginBottom: "12px" },
  sTitle: { fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 700, color: "#f0ece4", marginBottom: "16px", letterSpacing: "-0.5px" },
  sSub: { color: C.muted, fontSize: "1rem", lineHeight: 1.7, maxWidth: "600px", marginBottom: "60px" },
  divider: { height: "1px", background: `linear-gradient(90deg, transparent, ${C.border2} 30%, ${C.border2} 70%, transparent)`, margin: "0 40px" },

  timeline: { position: "relative", display: "flex", flexDirection: "column", gap: "0" },
  timelineLine: { position: "absolute", left: "39px", top: "60px", bottom: "60px", width: "2px", background: `linear-gradient(to bottom, ${C.teal}66, ${C.teal}11)` },
  stepRow: { display: "flex", gap: "32px", alignItems: "flex-start", padding: "36px 0", borderBottom: `1px solid ${C.border}` },
  stepNum: { width: "80px", height: "80px", borderRadius: "50%", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Playfair Display', serif", fontSize: "1.6rem", fontWeight: 900, position: "relative", zIndex: 1 },
  stepContent: { flex: 1, paddingTop: "8px" },
  stepTitleRow: { display: "flex", alignItems: "center", gap: 10, marginBottom: 8 },
  stepTitle: { fontSize: "1.2rem", fontWeight: 700, color: "#f0ece4" },
  stepDesc: { color: C.muted, fontSize: "0.92rem", lineHeight: 1.75, marginBottom: "16px" },
  stepTags: { display: "flex", flexWrap: "wrap", gap: "8px" },
  stepTag: { padding: "4px 14px", borderRadius: "20px", fontSize: "0.75rem", border: `1px solid ${C.border2}`, color: "#aaa", background: "#ffffff05" },

  docGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px" },
  docCard: { background: C.card, border: `1px solid ${C.border}`, borderRadius: "16px", padding: "26px", transition: "all 0.3s" },
  docIconWrap: { width: 44, height: 44, borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "14px" },
  docName: { fontSize: "1rem", fontWeight: 600, color: "#f0ece4", marginBottom: "6px" },
  docNote: { color: C.muted, fontSize: "0.82rem", lineHeight: 1.65 },
  docBadge: { display: "inline-block", marginTop: "12px", padding: "3px 10px", borderRadius: "20px", fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.5px" },

  examGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "24px" },
  examCard: { background: C.card, border: `1px solid ${C.border}`, borderRadius: "20px", overflow: "hidden", transition: "transform 0.3s, border-color 0.3s" },
  examHeader: { padding: "24px 26px 18px", borderBottom: `1px solid ${C.border}` },
  examName: { fontSize: "1.3rem", fontWeight: 700, color: "#f0ece4", marginBottom: "4px" },
  examFull: { color: C.muted, fontSize: "0.82rem" },
  examBody: { padding: "20px 26px 26px" },
  examRow: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${C.border}`, fontSize: "0.85rem" },
  examKey: { color: C.muted },
  examVal: { color: "#f0ece4", fontWeight: 500 },
  examCountries: { display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "16px" },
  examCountryTag: { padding: "3px 10px", borderRadius: "6px", fontSize: "0.72rem", background: "#ffffff06", border: `1px solid ${C.border2}`, color: "#aaa" },

  costGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "18px" },
  costCard: { background: C.card, border: `1px solid ${C.border}`, borderRadius: "16px", padding: "24px", textAlign: "center" },
  costFlag: { fontSize: "2rem", marginBottom: "10px", display: "block" },
  costCountry: { fontSize: "0.95rem", fontWeight: 700, color: "#f0ece4", marginBottom: "4px" },
  costRange: { fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", color: C.teal, fontWeight: 700, marginBottom: "4px" },
  costPer: { color: C.muted, fontSize: "0.75rem" },
  costLiving: { marginTop: "12px", padding: "8px", background: "#ffffff05", borderRadius: "8px", fontSize: "0.75rem", color: "#888" },

  faqItem: { border: `1px solid ${C.border}`, borderRadius: "14px", overflow: "hidden", marginBottom: "12px", background: C.card },
  faqQ: { padding: "20px 24px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.95rem", fontWeight: 600, color: "#f0ece4" },
  faqA: { padding: "0 24px 20px", color: C.muted, fontSize: "0.88rem", lineHeight: 1.75 },

  cta: { margin: "0 40px 80px", background: `linear-gradient(135deg, #00d4aa14, #4da6ff0e)`, border: `1px solid ${C.tealBorder}`, borderRadius: "28px", padding: "70px 60px", textAlign: "center" },
  ctaTitle: { fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, color: "#f0ece4", marginBottom: "16px", letterSpacing: "-1px" },
  ctaSub: { color: C.muted, fontSize: "1.05rem", marginBottom: "40px", lineHeight: 1.7 },
  ctaBtns: { display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" },
  btnPrimary: { background: C.teal, color: "#04080f", border: "none", padding: "16px 36px", borderRadius: "50px", fontSize: "0.9rem", fontWeight: 700, cursor: "pointer", letterSpacing: "0.5px", fontFamily: "'DM Sans', sans-serif", transition: "opacity 0.2s, transform 0.2s", display: "flex", alignItems: "center", gap: 8 },

  tabRow: { display: "flex", gap: "0", background: C.bg2, borderRadius: "14px", border: `1px solid ${C.border2}`, padding: "6px", marginBottom: "40px", flexWrap: "wrap" },
  tabBtn: { flex: "1 1 auto", padding: "12px 20px", background: "transparent", border: "none", borderRadius: "10px", cursor: "pointer", fontSize: "0.82rem", fontWeight: 500, color: C.muted, letterSpacing: "0.5px", transition: "all 0.2s", fontFamily: "'DM Sans', sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: 7 },
  tabBtnActive: { background: C.card, color: C.teal, fontWeight: 700, boxShadow: "0 2px 12px #00000030" },
};

// ── DATA ──────────────────────────────────────────────────────────────────────

const steps = [
  { n: "01", color: C.teal, bg: `${C.teal}18`, icon: <GraduationCap size={20} />, title: "Free Counselling Session", desc: "Book a one-on-one session with our expert counsellors. We assess your academic profile, budget, preferred country, and career goals.", tags: ["Career Assessment", "University Shortlisting", "Budget Planning", "Free of Cost"] },
  { n: "02", color: C.blue, bg: "#4da6ff18",    icon: <FileText       size={20} />, title: "Document Collection & Verification", desc: "Our team guides you through collecting, certifying, and apostilling all required documents.", tags: ["Apostille", "Notarization", "Translation", "MCI/NMC Compliance"] },
  { n: "03", color: C.gold, bg: C.goldDim,       icon: <Building2      size={20} />, title: "University Application & Admission Letter", desc: "We apply to your shortlisted universities on your behalf and secure your official Admission/Invitation Letter within 2–4 weeks.", tags: ["Application Filing", "Follow-up", "Admission Letter", "Seat Confirmation"] },
  { n: "04", color: "#a855f7", bg: "#a855f718",  icon: <ShieldCheck    size={20} />, title: "Visa Application & Embassy Preparation", desc: "We prepare your complete visa file — financial statements, SOP, sponsorship letters — and coach you for the student visa interview.", tags: ["Visa File Prep", "SOP Writing", "Mock Interview", "Embassy Submission"] },
  { n: "05", color: "#f97316", bg: "#f9731618",  icon: <Plane          size={20} />, title: "Pre-Departure Orientation", desc: "Attend our detailed pre-departure session covering accommodation, cultural adaptation, currency, food, safety, and local laws.", tags: ["Accommodation", "Cultural Training", "Safety Briefing", "Local Guide"] },
  { n: "06", color: "#10b981", bg: "#10b98118",  icon: <Globe          size={20} />, title: "Arrival Support & University Registration", desc: "Our on-ground team meets you at the airport, assists with university registration, and ensures a smooth first week.", tags: ["Airport Pickup", "Registration", "Bank Account", "SIM Card", "Hostel Setup"] },
];

const documents = [
  { icon: <FileText   size={22} color="#00d4aa" />, name: "10th & 12th Marksheets",         note: "Original + 3 attested copies. Science subjects required.",                 req: "Mandatory",        rc: "#00d4aa", rb: "#00d4aa15" },
  { icon: <BookOpen   size={22} color="#4da6ff" />, name: "NEET Score Card",                 note: "Mandatory for Indian students per NMC regulations.",                       req: "India Students",   rc: "#4da6ff", rb: "#4da6ff15" },
  { icon: <Globe      size={22} color="#a855f7" />, name: "Passport",                        note: "Valid for at least 18 months beyond your intended stay.",                   req: "Mandatory",        rc: "#a855f7", rb: "#a855f715" },
  { icon: <FileText   size={22} color="#f4c430" />, name: "Birth Certificate",               note: "Attested copy required. Apostille if studying in select countries.",       req: "Mandatory",        rc: "#f4c430", rb: "#f4c43015" },
  { icon: <ShieldCheck size={22} color="#f97316" />,name: "Medical Fitness Certificate",     note: "From a registered MBBS doctor. Some countries require specific tests.",     req: "Mandatory",        rc: "#f97316", rb: "#f9731615" },
  { icon: <FileText   size={22} color="#10b981" />, name: "SOP (Statement of Purpose)",     note: "Personal essay stating your goals and reasons for choosing the university.", req: "Mandatory",        rc: "#10b981", rb: "#10b98115" },
  { icon: <Users      size={22} color="#ef4444" />, name: "Sponsorship / Bank Statement",   note: "Minimum balance varies: 5,000 to 15,000 USD depending on country.",             req: "Mandatory",        rc: "#ef4444", rb: "#ef444415" },
  { icon: <Globe      size={22} color="#06b6d4" />, name: "Police Clearance Certificate",   note: "Required by Russia, China, Philippines, and most Eastern European countries.",req: "If Applicable",  rc: "#06b6d4", rb: "#06b6d415" },
  { icon: <BookOpen   size={22} color="#8b5cf6" />, name: "IELTS / TOEFL Certificate",      note: "Required for Georgia, Philippines, Bangladesh. Band 5.5+ typically.",      req: "Country Specific", rc: "#8b5cf6", rb: "#8b5cf615" },
  { icon: <FileText   size={22} color="#ec4899" />, name: "Migration Certificate",          note: "Required when leaving an Indian university mid-course (transfer cases).",  req: "If Applicable",    rc: "#ec4899", rb: "#ec489915" },
  { icon: <FileText   size={22} color="#f59e0b" />, name: "Gap Year Certificate / Affidavit",note: "Notarized affidavit if there's a gap between 12th and admission.",        req: "If Applicable",    rc: "#f59e0b", rb: "#f59e0b15" },
  { icon: <Globe      size={22} color="#14b8a6" />, name: "Visa Application Form",          note: "Completed and signed. Country-specific forms provided by MediDent.",      req: "Mandatory",        rc: "#14b8a6", rb: "#14b8a615" },
];

const exams = [
  { name: "NEET-UG", full: "National Eligibility cum Entrance Test (Undergraduate)", color: "#ef4444", bg: "#ef444418", who: "Indian Students (MBBS/BDS abroad)", score: "Qualify (no cutoff for abroad)", frequency: "Once a year (May)", validity: "3 Years", importance: "Mandatory by NMC India for all Indian students pursuing MBBS/BDS abroad.", countries: ["Russia", "Kazakhstan", "Georgia", "Philippines", "China", "Kyrgyzstan", "Bangladesh"] },
  { name: "IELTS", full: "International English Language Testing System", color: "#3b82f6", bg: "#3b82f618", who: "All students (English proficiency)", score: "Band 5.5 – 6.5", frequency: "Multiple times yearly", validity: "2 Years", importance: "Required by universities in Georgia, Philippines, and Bangladesh.", countries: ["Georgia", "Philippines", "Bangladesh", "Ukraine"] },
  { name: "TOEFL", full: "Test of English as a Foreign Language", color: "#10b981", bg: "#10b98118", who: "English-medium university applicants", score: "iBT 60 – 80+", frequency: "Year-round", validity: "2 Years", importance: "Alternative to IELTS. Accepted by most international universities.", countries: ["Philippines", "Georgia", "Bangladesh"] },
  { name: "USMLE", full: "United States Medical Licensing Examination", color: "#f59e0b", bg: C.goldDim, who: "MBBS graduates seeking USA practice", score: "Pass (220+ competitive)", frequency: "Year-round (computer-based)", validity: "Lifetime", importance: "Required to practice medicine in the USA after your MBBS.", countries: ["Philippines (USMLE friendly)", "Russia", "China"] },
  { name: "FMGE / NExT", full: "Foreign Medical Graduates Examination (Now NExT)", color: "#a855f7", bg: "#a855f718", who: "Foreign MBBS graduates returning to India", score: "150/300 (50%)", frequency: "Twice a year", validity: "Lifetime on pass", importance: "Mandatory licensing exam to practice medicine in India after completing MBBS abroad.", countries: ["Russia", "Kazakhstan", "Georgia", "Philippines", "China", "Kyrgyzstan"] },
  { name: "PLAB", full: "Professional and Linguistic Assessment Board", color: "#06b6d4", bg: "#06b6d418", who: "MBBS graduates seeking UK practice", score: "Pass both parts", frequency: "Multiple times yearly", validity: "Lifetime on pass", importance: "Required to practice as a doctor in the UK.", countries: ["Georgia", "Russia", "Ukraine", "Kazakhstan"] },
];

const costs = [
  { flag: "🇺🇸", country: "USA",         fees: "20,000 to 60,000 USD/yr",  living: "800 to 1,200 USD/mo",  total: "30 to 70 Lakhs INR/yr",  currency: "USD",  unis: "Johns Hopkins, UCSF",             color: "#3b82f6" },
  { flag: "🇬🇧", country: "UK",          fees: "15,000 to 40,000 GBP/yr",  living: "900 to 1,400 GBP/mo",  total: "20 to 55 Lakhs INR/yr",  currency: "GBP",  unis: "Edinburgh, King's College London", color: "#ef4444" },
  { flag: "🇨🇦", country: "Canada",      fees: "18,000 to 45,000 CAD/yr",  living: "800 to 1,200 CAD/mo",  total: "25 to 60 Lakhs INR/yr",  currency: "CAD",  unis: "University of Toronto, McGill",    color: "#f59e0b" },
  { flag: "🇦🇺", country: "Australia",   fees: "15,000 to 38,000 AUD/yr",  living: "900 to 1,300 AUD/mo",  total: "20 to 55 Lakhs INR/yr",  currency: "AUD",  unis: "Melbourne, University of Sydney",  color: "#10b981" },
  { flag: "🇩🇪", country: "Germany",     fees: "2,000 to 10,000 EUR/yr",   living: "700 to 1,100 EUR/mo",  total: "10 to 20 Lakhs INR/yr",  currency: "EUR",  unis: "Heidelberg, Charité Berlin",       color: "#6366f1" },
  { flag: "🇳🇿", country: "New Zealand", fees: "12,000 to 30,000 NZD/yr",  living: "700 to 1,000 NZD/mo",  total: "15 to 40 Lakhs INR/yr",  currency: "NZD",  unis: "Auckland, Otago",                  color: "#00d4aa" },
];

const faqs = [
  { q: "Is NEET mandatory for studying MBBS abroad?", a: "Yes, for Indian students it is mandatory as per NMC regulations. You must qualify NEET-UG to pursue MBBS/BDS abroad and to be eligible for the FMGE/NExT licensing exam after graduation. There is no minimum marks requirement — just qualifying is enough." },
  { q: "How long does the entire admission process take?", a: "Typically 6–12 weeks from document submission to receiving your Admission Letter. Countries like Germany and Canada may take longer due to visa processing. We recommend starting at least 4–6 months before your intended intake (September/January)." },
  { q: "Will my foreign MBBS degree be valid in India?", a: "Yes, if you: (1) qualify NEET-UG before admission, (2) graduate from a WHO/MCI-listed university, and (3) clear the NExT/FMGE licensing exam after returning to India. All MediDent partner universities are WHO recognized." },
  { q: "What is the medium of instruction abroad?", a: "All our partner universities — in the USA, UK, Canada, Australia, Germany, and New Zealand — offer full English-medium programs. German universities provide language support for clinical rotations. No local language is required for classroom studies." },
  { q: "Is it safe to study abroad as an Indian student?", a: "All our partner countries are among the safest for Indian students, with well-established Indian student communities. The UK, Australia, and New Zealand consistently rank among the safest countries for international students. We provide pre-departure safety briefings and 24/7 support." },
  { q: "What about accommodation?", a: "All partner universities offer on-campus dormitories or university-managed housing. We also assist with off-campus apartment arrangements. Costs range from 700 to 1,400 USD per month depending on the country. Our team recommends vetted options before you depart." },
  { q: "Can I transfer to an Indian college after a few years abroad?", a: "Direct transfer to Indian MBBS is not officially permitted under NMC rules. However, in special cases NMC has issued special transfer guidelines. Our counsellors will guide you through any such extraordinary circumstances." },
  { q: "What are MediDent's service charges?", a: "Our counselling, documentation guidance, and application support are offered at a transparent, nominal fee which is communicated upfront with no hidden charges. Contact us for a free counselling session before any commitment is made." },
];

// ── COMPONENT ─────────────────────────────────────────────────────────────────

export default function Journey() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("steps");
  const [openFaq, setOpenFaq] = useState(null);
  const [docFilter, setDocFilter] = useState("All");

  const sections = [
    { id: "steps",     label: "Process",        icon: <Map         size={15} /> },
    { id: "documents", label: "Documents",       icon: <FolderOpen  size={15} /> },
    { id: "exams",     label: "Entrance Exams",  icon: <BookOpen    size={15} /> },
    { id: "costs",     label: "Cost Guide",      icon: <DollarSign  size={15} /> },
    { id: "faq",       label: "FAQs",            icon: <HelpCircle  size={15} /> },
  ];

  const heroStats = [
    { icon: <Users       size={16} color={C.teal} />, n: "500+", l: "Students Guided" },
    { icon: <ShieldCheck size={16} color={C.teal} />, n: "98%",  l: "Visa Success Rate" },
    { icon: <Globe       size={16} color={C.teal} />, n: "6",    l: "Countries" },
    { icon: <Trophy      size={16} color={C.teal} />, n: "15+",  l: "Years Experience" },
  ];

  const docCategories = ["All", "Mandatory", "If Applicable", "India Students", "Country Specific"];
  const filteredDocs = docFilter === "All" ? documents : documents.filter(d => d.req === docFilter);

  const financeCards = [
    { icon: <Building     size={22} color="#00d4aa" />, title: "Education Loans",    desc: "Nationalized banks (SBI, Bank of Baroda) offer education loans up to 1.5 Crore INR for abroad MBBS. We assist with the complete loan documentation process." },
    { icon: <GraduationCap size={22} color="#4da6ff" />,title: "Scholarships",       desc: "USA, UK, Canada, Australia, Germany, and New Zealand all offer merit-based scholarships. MediDent identifies and applies for every eligible scholarship on your behalf." },
    { icon: <CreditCard   size={22} color="#a855f7" />, title: "Forex & Transfers",  desc: "We guide you on the most cost-effective methods to transfer tuition fees internationally — including wire transfer and forex cards per RBI guidelines." },
    { icon: <BarChart2    size={22} color="#f4c430" />, title: "Annual Fee Increase", desc: "Most universities have a fixed annual fee increase of 3–8%. Our team provides a 6-year total cost projection for your chosen university." },
  ];

  return (
    <div style={s.page}>
      <Navbar />

      {/* HERO */}
      <div style={{ ...s.hero, paddingTop: "110px" }}>
        <div style={s.heroBg} />
        <div style={s.heroEye}>
          <Plane size={13} /> Your Path to Studying Abroad
        </div>
        <h1 style={s.heroTitle}>
          Start Your <span style={s.heroAccent}>Journey</span><br />to Medicine Abroad
        </h1>
        <p style={s.heroSub}>
          Everything you need to know — from required documents and entrance exams
          to visa support and arrival. We handle every step so you can focus on your future.
        </p>
        <div style={s.heroStats}>
          {heroStats.map((st, i) => (
            <div key={i} style={s.heroStat}>
              <div style={s.heroStatIcon}>{st.icon}</div>
              <span style={s.heroStatNum}>{st.n}</span>
              <div style={s.heroStatLabel}>{st.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION TABS */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "50px 40px 0" }}>
        <div style={s.tabRow}>
          {sections.map(sec => (
            <button
              key={sec.id}
              style={{ ...s.tabBtn, ...(activeSection === sec.id ? s.tabBtnActive : {}) }}
              onClick={() => setActiveSection(sec.id)}
            >
              {sec.icon} {sec.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── STEPS ── */}
      {activeSection === "steps" && (
        <div style={s.wrap}>
          <p style={s.sLabel}>How It Works</p>
          <h2 style={s.sTitle}>6 Steps from Dream to Destination</h2>
          <p style={s.sSub}>Our end-to-end process is designed to eliminate confusion and ensure a smooth journey.</p>
          <div style={s.timeline}>
            <div style={s.timelineLine} />
            {steps.map((step, i) => (
              <div key={i} style={{ ...s.stepRow, borderBottom: i === steps.length - 1 ? "none" : `1px solid ${C.border}` }}>
                <div style={{ ...s.stepNum, background: step.bg, color: step.color, border: `2px solid ${step.color}44` }}>
                  {step.n}
                </div>
                <div style={s.stepContent}>
                  <div style={s.stepTitleRow}>
                    <span style={{ color: step.color }}>{step.icon}</span>
                    <div style={s.stepTitle}>{step.title}</div>
                  </div>
                  <div style={s.stepDesc}>{step.desc}</div>
                  <div style={s.stepTags}>
                    {step.tags.map((t, j) => (
                      <span key={j} style={{ ...s.stepTag, borderColor: `${step.color}33`, color: step.color }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── DOCUMENTS ── */}
      {activeSection === "documents" && (
        <div style={s.wrap}>
          <p style={s.sLabel}>Document Checklist</p>
          <h2 style={s.sTitle}>Every Document You'll Need</h2>
          <p style={s.sSub}>Missing or incorrect documents are the #1 reason for application delays. Use this complete checklist.</p>
          <div style={s.tabRow}>
            {docCategories.map(cat => (
              <button
                key={cat}
                style={{ ...s.tabBtn, ...(docFilter === cat ? s.tabBtnActive : {}) }}
                onClick={() => setDocFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          <div style={s.docGrid}>
            {filteredDocs.map((doc, i) => (
              <div
                key={i}
                style={{ ...s.docCard, borderColor: `${doc.rc}22` }}
                onMouseEnter={e => e.currentTarget.style.borderColor = `${doc.rc}55`}
                onMouseLeave={e => e.currentTarget.style.borderColor = `${doc.rc}22`}
              >
                <div style={{ ...s.docIconWrap, background: doc.rb }}>{doc.icon}</div>
                <div style={s.docName}>{doc.name}</div>
                <div style={s.docNote}>{doc.note}</div>
                <span style={{ ...s.docBadge, background: doc.rb, color: doc.rc, border: `1px solid ${doc.rc}44` }}>
                  {doc.req}
                </span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "40px", padding: "24px 28px", background: C.goldDim, border: `1px solid ${C.gold}33`, borderRadius: "16px", fontSize: "0.88rem", color: "#ccc", lineHeight: 1.75 }}>
            <strong style={{ color: C.gold }}>💡 Pro Tip:</strong> All documents must be attested and apostilled by the Ministry of External Affairs (MEA) for use abroad. Our team handles the entire apostille process for you.
          </div>
        </div>
      )}

      {/* ── EXAMS ── */}
      {activeSection === "exams" && (
        <div style={s.wrap}>
          <p style={s.sLabel}>Entrance & Licensing Exams</p>
          <h2 style={s.sTitle}>Exams You Need to Know About</h2>
          <p style={s.sSub}>From qualifying for admission to licensing as a doctor — here's every exam that matters.</p>
          <div style={s.examGrid}>
            {exams.map((exam, i) => (
              <div
                key={i}
                style={{ ...s.examCard, borderColor: `${exam.color}22` }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.borderColor = `${exam.color}55`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)";    e.currentTarget.style.borderColor = `${exam.color}22`; }}
              >
                <div style={{ ...s.examHeader, background: exam.bg, borderBottom: `1px solid ${exam.color}22` }}>
                  <div style={{ ...s.examName, color: exam.color }}>{exam.name}</div>
                  <div style={s.examFull}>{exam.full}</div>
                </div>
                <div style={s.examBody}>
                  {[["Who Needs It", exam.who], ["Required Score", exam.score], ["Frequency", exam.frequency], ["Validity", exam.validity]].map(([k, v], j) => (
                    <div key={j} style={{ ...s.examRow, borderBottom: j === 3 ? "none" : `1px solid ${C.border}` }}>
                      <span style={s.examKey}>{k}</span>
                      <span style={s.examVal}>{v}</span>
                    </div>
                  ))}
                  <div style={{ marginTop: "16px", color: C.muted, fontSize: "0.82rem", lineHeight: 1.7, marginBottom: "16px" }}>{exam.importance}</div>
                  <div style={s.examCountries}>
                    {exam.countries.map((c, j) => <span key={j} style={s.examCountryTag}>{c}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── COSTS ── */}
      {activeSection === "costs" && (
        <div style={s.wrap}>
          <p style={s.sLabel}>Financial Planning</p>
          <h2 style={s.sTitle}>Estimated Cost by Country</h2>
          <p style={s.sSub}>Plan your finances with confidence. Fees shown in each country's local currency. Indian Rupee estimates are approximate based on current exchange rates.</p>
          <div style={s.costGrid}>
            {costs.map((c, i) => (
              <div
                key={i}
                style={{ ...s.costCard, borderColor: `${c.color}33`, transition: "all 0.25s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = `${c.color}66`; e.currentTarget.style.transform = "translateY(-4px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = `${c.color}33`; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                {/* Header: flag + country + currency badge */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: "2rem", lineHeight: 1 }}>{c.flag}</span>
                    <div>
                      <div style={{ ...s.costCountry, marginBottom: 0 }}>{c.country}</div>
                      <div style={{ fontSize: "0.7rem", color: "#555", marginTop: 2 }}>{c.unis}</div>
                    </div>
                  </div>
                  <div style={{ background: `${c.color}18`, border: `1px solid ${c.color}33`, color: c.color, padding: "3px 10px", borderRadius: 20, fontSize: "0.7rem", fontWeight: 800, letterSpacing: "0.5px" }}>
                    {c.currency}
                  </div>
                </div>

                {/* Tuition fee */}
                <div style={{ background: `${c.color}10`, border: `1px solid ${c.color}22`, borderRadius: 10, padding: "12px 14px", marginBottom: 10 }}>
                  <div style={{ fontSize: "0.65rem", color: "#555", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 5 }}>Annual Tuition</div>
                  <div style={{ ...s.costRange, color: c.color, marginBottom: 0, fontSize: "1.1rem" }}>{c.fees}</div>
                </div>

                {/* Living cost */}
                <div style={{ background: "#ffffff05", border: "1px solid #ffffff08", borderRadius: 8, padding: "9px 12px", marginBottom: 8 }}>
                  <div style={{ fontSize: "0.65rem", color: "#555", letterSpacing: "1px", textTransform: "uppercase", marginBottom: 4 }}>Monthly Living Cost</div>
                  <div style={{ color: "#aaa", fontSize: "0.82rem", fontWeight: 600 }}>{c.living}</div>
                </div>

                {/* INR estimate */}
                <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 0 0" }}>
                  <span style={{ fontSize: "0.68rem", color: "#444" }}>Indian Rupee Estimate:</span>
                  <span style={{ fontSize: "0.78rem", color: c.color, fontWeight: 700 }}>{c.total}</span>
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px", marginTop: "50px" }}>
            {financeCards.map((item, i) => (
              <div key={i} style={{ ...s.docCard, borderColor: C.border }}>
                <div style={{ ...s.docIconWrap, background: "#ffffff08" }}>{item.icon}</div>
                <div style={s.docName}>{item.title}</div>
                <div style={s.docNote}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── FAQ ── */}
      {activeSection === "faq" && (
        <div style={s.wrap}>
          <p style={s.sLabel}>Common Questions</p>
          <h2 style={s.sTitle}>Frequently Asked Questions</h2>
          <p style={s.sSub}>Answers to the questions we hear most. Don't see yours? Reach out to us directly.</p>
          {faqs.map((faq, i) => (
            <div key={i} style={s.faqItem}>
              <div style={s.faqQ} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <span>{faq.q}</span>
                {openFaq === i
                  ? <ChevronUp size={18} color={C.teal} />
                  : <ChevronDown size={18} color={C.teal} />
                }
              </div>
              {openFaq === i && <div style={s.faqA}>{faq.a}</div>}
            </div>
          ))}
        </div>
      )}

      <div style={s.divider} />

      {/* CTA */}
      <div style={s.cta}>
        <Rocket size={44} color={C.teal} style={{ marginBottom: 20 }} />
        <h2 style={s.ctaTitle}>Ready to Begin Your Journey?</h2>
        <p style={s.ctaSub}>
          Book a free counselling session today. Our experts will guide you<br />
          from your very first question to your first day at university abroad.
        </p>
        <div style={s.ctaBtns}>
          <button
            style={s.btnPrimary}
            onClick={() => navigate("/register")}
            onMouseEnter={e => { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            <GraduationCap size={16} /> Book Free Counselling
          </button>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid #ffffff08", padding: "32px 60px", textAlign: "center", background: "#040810" }}>
        <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "#00d4aa", marginBottom: "8px" }}>🦷 MediDent Global Pathways</div>
        <p style={{ color: "#333", fontSize: "0.78rem", margin: 0 }}>© 2025 MediDent Global Pathways. All rights reserved.</p>
      </footer>
    </div>
  );
}