import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import {
  BookOpen, Building2, GraduationCap, MessageSquare, Stethoscope,
  Users, Globe, Trophy, Star, MapPin, Hospital,
  Clock, DollarSign, RefreshCw, ClipboardList,
  ChevronRight, Sparkles, Award, Lightbulb,
  FlaskConical
} from "lucide-react";

// ─── STYLES ───────────────────────────────────────────────────────────────────
const styles = {
  page: { background: "#060d1a", minHeight: "100vh", fontFamily: "'Georgia', serif", color: "#e8e0d0", overflowX: "hidden" },
  navTabs: { position: "sticky", top: "70px", zIndex: 100, background: "rgba(6,13,26,0.97)", borderBottom: "1px solid #00d4aa33", display: "flex", justifyContent: "center", gap: "0px", padding: "0", flexWrap: "wrap" },
  tab: { padding: "18px 24px", cursor: "pointer", fontSize: "0.82rem", letterSpacing: "1px", textTransform: "uppercase", color: "#666", border: "none", background: "transparent", borderBottom: "3px solid transparent", transition: "all 0.3s", fontFamily: "'Georgia', serif", display: "flex", alignItems: "center", gap: 7 },
  tabActive: { color: "#00d4aa", borderBottom: "3px solid #00d4aa" },

  hero: { padding: "160px 60px 60px", textAlign: "center", background: "radial-gradient(ellipse at 50% 0%, #00d4aa18 0%, transparent 70%)", borderBottom: "1px solid #ffffff08" },
  heroEyebrow: { fontSize: "0.75rem", letterSpacing: "4px", color: "#00d4aa", textTransform: "uppercase", marginBottom: "20px" },
  heroTitle: { fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: "400", lineHeight: "1.15", marginBottom: "20px", color: "#f0ece4", letterSpacing: "-1px" },
  heroSub: { color: "#888", fontSize: "1.05rem", maxWidth: "600px", margin: "0 auto", lineHeight: "1.7" },

  statsBar: { display: "flex", justifyContent: "center", gap: "48px", padding: "32px 60px", background: "#0a1220", borderBottom: "1px solid #ffffff08", flexWrap: "wrap" },
  statNum: { fontFamily: "'Georgia', serif", fontSize: "2rem", fontWeight: 700, color: "#00d4aa", display: "block" },
  statLabel: { color: "#555", fontSize: "0.75rem", letterSpacing: "1px", textTransform: "uppercase", marginTop: "4px" },
  statItem: { textAlign: "center" },
  statIconWrap: { display: "flex", justifyContent: "center", marginBottom: 6 },

  section: { padding: "80px 40px", maxWidth: "1300px", margin: "0 auto" },
  sectionTitle: { fontSize: "2rem", fontWeight: "400", color: "#f0ece4", marginBottom: "8px", letterSpacing: "-0.5px" },
  sectionSub: { color: "#00d4aa", fontSize: "0.78rem", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "50px" },

  courseGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "24px" },
  courseCard: { background: "#0d1b2a", border: "1px solid #ffffff0d", borderRadius: "16px", padding: "32px", transition: "all 0.3s", cursor: "default" },
  courseLevel: { display: "inline-block", padding: "4px 12px", borderRadius: "20px", fontSize: "0.7rem", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "16px", fontWeight: "600" },
  courseName: { fontSize: "1.2rem", fontWeight: "600", color: "#f0ece4", marginBottom: "10px", lineHeight: "1.4" },
  courseDuration: { color: "#666", fontSize: "0.85rem", marginBottom: "14px", display: "flex", alignItems: "center", gap: 6 },
  courseDesc: { color: "#888", fontSize: "0.88rem", lineHeight: "1.65", marginBottom: "20px" },
  courseTags: { display: "flex", flexWrap: "wrap", gap: "8px" },
  courseTag: { background: "#ffffff08", border: "1px solid #ffffff0f", padding: "4px 12px", borderRadius: "20px", fontSize: "0.72rem", color: "#aaa" },

  filterRow: { display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "40px" },
  filterBtn: { padding: "8px 20px", borderRadius: "30px", border: "1px solid #ffffff15", background: "transparent", color: "#888", fontSize: "0.82rem", cursor: "pointer", transition: "all 0.2s", fontFamily: "'Georgia', serif", letterSpacing: "0.5px" },
  filterBtnActive: { background: "#00d4aa", border: "1px solid #00d4aa", color: "#060d1a", fontWeight: "600" },

  uniGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))", gap: "28px" },
  uniCard: { background: "#0d1b2a", border: "1px solid #ffffff0d", borderRadius: "20px", overflow: "hidden", transition: "transform 0.3s, border-color 0.3s" },
  uniHeader: { padding: "28px 28px 20px", borderBottom: "1px solid #ffffff08", display: "flex", alignItems: "flex-start", gap: "16px" },
  uniEmoji: { fontSize: "2.5rem", lineHeight: 1 },
  uniInfo: { flex: 1 },
  uniName: { fontSize: "1.05rem", fontWeight: "700", color: "#f0ece4", marginBottom: "4px", lineHeight: "1.3" },
  uniCountry: { color: "#00d4aa", fontSize: "0.78rem", letterSpacing: "1px", textTransform: "uppercase" },
  uniRank: { background: "#00d4aa18", border: "1px solid #00d4aa33", color: "#00d4aa", padding: "4px 10px", borderRadius: "8px", fontSize: "0.72rem", fontWeight: "700", whiteSpace: "nowrap" },
  uniBody: { padding: "20px 28px 28px" },
  uniCoursesTitle: { fontSize: "0.72rem", letterSpacing: "2px", color: "#555", textTransform: "uppercase", marginBottom: "10px" },
  uniCourseList: { display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "20px" },
  uniCourseTag: { background: "#ffffff06", border: "1px solid #ffffff0f", padding: "5px 12px", borderRadius: "6px", fontSize: "0.75rem", color: "#aaa" },
  internshipBox: { background: "linear-gradient(135deg, #00d4aa0d, #0066ff0d)", border: "1px solid #00d4aa22", borderRadius: "12px", padding: "16px", marginBottom: "16px" },
  internshipTitle: { fontSize: "0.72rem", letterSpacing: "2px", color: "#00d4aa", textTransform: "uppercase", marginBottom: "8px", display: "flex", alignItems: "center", gap: 6 },
  internshipText: { fontSize: "0.85rem", color: "#ccc", lineHeight: "1.6" },
  uniStats: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px", marginTop: "16px" },
  uniStat: { textAlign: "center", background: "#ffffff05", borderRadius: "10px", padding: "12px 8px" },
  uniStatNum: { fontSize: "1.3rem", fontWeight: "700", color: "#00d4aa", display: "block" },
  uniStatLabel: { fontSize: "0.68rem", color: "#555", letterSpacing: "0.5px" },

  testimonialGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "24px" },
  testimonialCard: { background: "#0d1b2a", border: "1px solid #ffffff0d", borderRadius: "18px", padding: "30px", position: "relative", overflow: "hidden" },
  quoteIcon: { fontSize: "4rem", color: "#ffffff08", fontFamily: "Georgia", lineHeight: 1, marginBottom: "8px" },
  stars: { display: "flex", gap: 3, marginBottom: "14px" },
  testimonialText: { color: "#999", fontSize: "0.9rem", lineHeight: "1.75", fontStyle: "italic", marginBottom: "22px" },
  testimonialAuthor: { display: "flex", alignItems: "center", gap: "14px" },
  authorAvatar: { width: "44px", height: "44px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700", fontSize: "1rem", flexShrink: 0 },
  authorName: { fontWeight: "700", color: "#f0ece4", fontSize: "0.95rem" },
  authorUni: { color: "#00d4aa", fontSize: "0.78rem", marginTop: "2px" },
  authorCountry: { color: "#555", fontSize: "0.72rem", marginTop: "2px" },

  placementGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "20px" },
  placementCard: { background: "#0d1b2a", border: "1px solid #ffffff0d", borderRadius: "16px", padding: "24px", display: "flex", gap: "16px", transition: "border-color 0.3s" },
  placementAvatar: { width: "52px", height: "52px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  placementName: { fontWeight: "700", color: "#f0ece4", fontSize: "1rem", marginBottom: "2px" },
  placementRole: { color: "#00d4aa", fontSize: "0.82rem", marginBottom: "8px" },
  placementHospital: { color: "#888", fontSize: "0.8rem", marginBottom: "4px", display: "flex", alignItems: "center", gap: 5 },
  placementCountry: { color: "#666", fontSize: "0.78rem", marginBottom: "10px", display: "flex", alignItems: "center", gap: 5 },
  placementBadge: { fontSize: "0.7rem", padding: "3px 10px", borderRadius: "6px", fontWeight: "600" },

  footer: { borderTop: "1px solid #ffffff06", padding: "48px 60px", textAlign: "center", background: "#040810" },
};

// ─── DATA ─────────────────────────────────────────────────────────────────────
const courses = [
  { level: "Bachelor's", color: "#00d4aa", bg: "#00d4aa15", name: "MBBS (Bachelor of Medicine, Bachelor of Surgery)", duration: "5 – 6 Years", desc: "The most sought-after undergraduate medical degree. Study general medicine, surgery, and clinical practice at WHO-recognized universities.", tags: ["Medicine", "Surgery", "Clinical Practice"] },
  { level: "Bachelor's", color: "#00d4aa", bg: "#00d4aa15", name: "BDS (Bachelor of Dental Surgery)", duration: "5 Years", desc: "Comprehensive undergraduate dental program covering oral medicine, prosthodontics, orthodontics, and oral surgery.", tags: ["Dentistry", "Oral Surgery", "Orthodontics"] },
  { level: "Bachelor's", color: "#3b82f6", bg: "#3b82f615", name: "B.Pharm (Bachelor of Pharmacy)", duration: "4 Years", desc: "Study pharmaceutical sciences, drug formulation, pharmacology, and healthcare delivery systems.", tags: ["Pharmacy", "Pharmacology", "Drug Science"] },
  { level: "Bachelor's", color: "#3b82f6", bg: "#3b82f615", name: "B.Sc Nursing", duration: "4 Years", desc: "Professional nursing program with clinical placements, patient care, medical procedures, and community health.", tags: ["Nursing", "Patient Care", "Healthcare"] },
  { level: "Master's", color: "#a855f7", bg: "#a855f715", name: "MD (Doctor of Medicine)", duration: "2 – 3 Years", desc: "Postgraduate specialization in Internal Medicine, Pediatrics, Radiology, Oncology, and Cardiology.", tags: ["Specialization", "Research", "Clinical Expertise"] },
  { level: "Master's", color: "#a855f7", bg: "#a855f715", name: "MDS (Master of Dental Surgery)", duration: "3 Years", desc: "Advanced dental specialization including Oral & Maxillofacial Surgery, Periodontics, and Endodontics.", tags: ["Dental Specialization", "Surgery", "Research"] },
  { level: "Master's", color: "#a855f7", bg: "#a855f715", name: "M.Sc Clinical Research", duration: "2 Years", desc: "Focused on drug development, clinical trials, biostatistics, and research methodology in healthcare.", tags: ["Clinical Trials", "Research", "Biostatistics"] },
  { level: "PGDM", color: "#f59e0b", bg: "#f59e0b15", name: "PGDM Healthcare Management", duration: "2 Years", desc: "Blends medical knowledge with business management — ideal for hospital administration and health policy roles.", tags: ["Management", "Hospital Admin", "Health Policy"] },
  { level: "PGDM", color: "#f59e0b", bg: "#f59e0b15", name: "PG Diploma in Clinical Research", duration: "1 Year", desc: "Fast-track postgraduate diploma for healthcare professionals entering clinical trials and pharmaceutical research.", tags: ["Clinical Research", "Pharma", "Diploma"] },
  { level: "PGDM", color: "#f59e0b", bg: "#f59e0b15", name: "PG Diploma in Hospital Administration", duration: "1 Year", desc: "Equips graduates to manage hospital operations, healthcare quality, finance, and patient services.", tags: ["Administration", "Operations", "Quality"] },
  { level: "Master's", color: "#a855f7", bg: "#a855f715", name: "MPH (Master of Public Health)", duration: "2 Years", desc: "Covers epidemiology, global health policy, community medicine, and disease prevention at a population level.", tags: ["Public Health", "Epidemiology", "Global Health"] },
  { level: "Bachelor's", color: "#3b82f6", bg: "#3b82f615", name: "BAMS (Ayurvedic Medicine)", duration: "5.5 Years", desc: "Ancient Indian system of medicine recognized internationally, with modern integration of traditional healing practices.", tags: ["Ayurveda", "Traditional Medicine", "Holistic"] },
];

const universities = [
  { country: "USA", flag: "🇺🇸", name: "Johns Hopkins University — School of Medicine", rank: "#1 USA", courses: ["MD", "MPH", "M.Sc Clinical Research"], internship: "6-month clinical clerkship at Johns Hopkins Hospital — rotations in Internal Medicine, Surgery, Pediatrics, Psychiatry and Neurology. One of the world's most respected clinical training environments.", seats: 120, years: "2012", placed: 97 },
  { country: "USA", flag: "🇺🇸", name: "University of California, San Francisco (UCSF)", rank: "Top 5 USA", courses: ["MBBS", "MD", "MPH", "M.Sc Clinical Research"], internship: "6-month hospital rotation at UCSF Medical Center covering Cardiology, Oncology, Neurosurgery and Emergency Medicine.", seats: 100, years: "2010", placed: 95 },
  { country: "UK", flag: "🇬🇧", name: "University of Edinburgh — Medical School", rank: "Top 5 UK", courses: ["MBBS", "BDS", "MD", "MPH"], internship: "6-month Foundation Year rotations at NHS Edinburgh Royal Infirmary — Surgery, General Medicine, Obstetrics and Psychiatry under NHS consultant supervision.", seats: 90, years: "2009", placed: 96 },
  { country: "UK", flag: "🇬🇧", name: "King's College London — GKT School of Medical Education", rank: "Russell Group", courses: ["MBBS", "BDS", "MDS", "M.Sc Clinical Research"], internship: "6-month clinical placement across King's College Hospital NHS Trust covering Trauma, Cardiology, ENT and Dental Surgery.", seats: 80, years: "2011", placed: 94 },
  { country: "Canada", flag: "🇨🇦", name: "University of Toronto — Temerty Faculty of Medicine", rank: "#1 Canada", courses: ["MD", "MPH", "PGDM Healthcare", "M.Sc Clinical Research"], internship: "6-month residency-prep rotation at Toronto General Hospital — rotations in Transplant Surgery, Internal Medicine, Cardiology and Family Medicine.", seats: 110, years: "2008", placed: 95 },
  { country: "Canada", flag: "🇨🇦", name: "McGill University — Faculty of Medicine and Health Sciences", rank: "Top 3 Canada", courses: ["MBBS", "MD", "BDS", "MPH"], internship: "6-month clinical clerkship at McGill University Health Centre — bilingual environment, rotations in Surgery, Pediatrics and Psychiatry.", seats: 90, years: "2010", placed: 93 },
  { country: "Australia", flag: "🇦🇺", name: "University of Melbourne — Melbourne Medical School", rank: "#1 Australia", courses: ["MBBS", "MD", "BDS", "MPH"], internship: "6-month clinical placement at Royal Melbourne Hospital — rotations in Emergency Medicine, General Surgery, Paediatrics and Mental Health.", seats: 130, years: "2007", placed: 96 },
  { country: "Australia", flag: "🇦🇺", name: "University of Sydney — Faculty of Medicine and Health", rank: "Group of Eight", courses: ["MBBS", "BDS", "MDS", "MPH", "PGDM"], internship: "6-month internship at Royal Prince Alfred Hospital. Rotations across General Medicine, O&G, Neurology and Oncology.", seats: 100, years: "2009", placed: 94 },
  { country: "Germany", flag: "🇩🇪", name: "Heidelberg University — Medical Faculty", rank: "#1 Germany", courses: ["MBBS", "MD", "M.Sc Clinical Research", "MPH"], internship: "6-month Famulatur at Heidelberg University Hospital — rotations in Oncology, Internal Medicine and Radiology.", seats: 80, years: "2013", placed: 91 },
  { country: "Germany", flag: "🇩🇪", name: "Charité – Universitätsmedizin Berlin", rank: "Top 3 Germany", courses: ["MBBS", "BDS", "MD", "MDS", "MPH"], internship: "6-month clinical internship at Charité Hospital (Europe's largest university hospital) — rotations across 100+ clinical departments.", seats: 100, years: "2011", placed: 93 },
  { country: "New Zealand", flag: "🇳🇿", name: "University of Auckland — Faculty of Medical and Health Sciences", rank: "#1 New Zealand", courses: ["MBBS", "BDS", "MD", "MPH"], internship: "6-month clinical placement at Auckland City Hospital — rotations in General Medicine, Surgery, Paediatrics and Women's Health.", seats: 70, years: "2014", placed: 90 },
  { country: "New Zealand", flag: "🇳🇿", name: "University of Otago — Dunedin School of Medicine", rank: "MCNZ Accredited", courses: ["MBBS", "BDS", "M.Sc Clinical Research", "B.Sc Nursing"], internship: "6-month internship at Dunedin Hospital with rotations in Emergency, Orthopaedics and Psychiatry.", seats: 60, years: "2015", placed: 88 },
];

const testimonials = [
  { name: "Priya Sharma", country: "USA", uni: "UCSF Medical Center", text: "MediDent guided me through every step — from choosing UCSF to completing my clinical rotation. The 6-month clerkship was life-changing.", initials: "PS", color: "#3b82f6", year: "MD 2023" },
  { name: "Arjun Mehta", country: "UK", uni: "King's College London", text: "The team helped me secure admission and assisted with my tier-4 visa. My rotation at King's College Hospital gave me incredible NHS exposure.", initials: "AM", color: "#a855f7", year: "MBBS 2022" },
  { name: "Sneha Patel", country: "Australia", uni: "University of Melbourne", text: "Australia has world-class medical education. My 6-month hospital placement covered everything from OB-GYN to emergency trauma at Royal Melbourne.", initials: "SP", color: "#00d4aa", year: "BDS 2023" },
  { name: "Rahul Verma", country: "Canada", uni: "University of Toronto", text: "Studying in Canada was amazing. MediDent arranged everything seamlessly. My internship at Toronto General gave me 800+ hours of clinical work.", initials: "RV", color: "#f59e0b", year: "MD 2022" },
  { name: "Ananya Krishnan", country: "Germany", uni: "Charité Berlin", text: "Charité's facilities are world-class. My 6-month rotation at Europe's largest university hospital was unmatched. MediDent counselors were 24/7.", initials: "AK", color: "#6366f1", year: "MD 2023" },
  { name: "Mohammed Raza", country: "New Zealand", uni: "University of Auckland", text: "Beautiful country, quality education, and safe environment. Clinical training at Auckland City Hospital was extensive. MediDent handled every document.", initials: "MR", color: "#10b981", year: "MBBS 2022" },
];

const placements = [
  { name: "Dr. Rohan Kapoor",   role: "General Surgeon",     hospital: "Apollo Hospitals",               country: "India",       degree: "MD — Johns Hopkins, USA",             color: "#3b82f6", bg: "#3b82f620", type: "Doctor" },
  { name: "Dr. Ayesha Khan",    role: "Dental Surgeon",      hospital: "Guy's & St Thomas' NHS",         country: "UK",          degree: "BDS — King's College London, UK",     color: "#00d4aa", bg: "#00d4aa20", type: "Dentist" },
  { name: "Dr. Suresh Babu",    role: "Cardiologist",        hospital: "Cleveland Clinic Abu Dhabi",     country: "UAE",         degree: "MD — University of Toronto, Canada",  color: "#f59e0b", bg: "#f59e0b20", type: "Doctor" },
  { name: "Dr. Preethi Iyer",   role: "Pediatrician",        hospital: "Fortis Healthcare",              country: "India",       degree: "MD — McGill University, Canada",      color: "#a855f7", bg: "#a855f720", type: "Doctor" },
  { name: "Dr. Sameer Joshi",   role: "Orthodontist",        hospital: "Royal Melbourne Hospital",       country: "Australia",   degree: "BDS + MDS — Univ. Melbourne, AU",    color: "#10b981", bg: "#10b98120", type: "Dentist" },
  { name: "Dr. Fatima Malik",   role: "Gynecologist",        hospital: "NHS Edinburgh Royal Infirmary",  country: "UK",          degree: "MBBS — University of Edinburgh, UK",  color: "#ef4444", bg: "#ef444420", type: "Doctor" },
  { name: "Dr. Aryan Desai",    role: "Neurosurgeon",        hospital: "Auckland City Hospital",         country: "New Zealand", degree: "MD — University of Auckland, NZ",     color: "#06b6d4", bg: "#06b6d420", type: "Doctor" },
  { name: "Dr. Meera Thomas",   role: "General Dentist",     hospital: "Charité Dental Clinic",          country: "Germany",     degree: "BDS — Charité Berlin, Germany",       color: "#f97316", bg: "#f9731620", type: "Dentist" },
  { name: "Dr. Karan Malhotra", role: "Emergency Physician", hospital: "Mediclinic City Hospital",       country: "UAE",         degree: "MBBS — UCSF, USA",                    color: "#8b5cf6", bg: "#8b5cf620", type: "Doctor" },
  { name: "Dr. Nisha Reddy",    role: "Dermatologist",       hospital: "Narayana Health",                country: "India",       degree: "MD — Heidelberg University, Germany", color: "#ec4899", bg: "#ec489920", type: "Doctor" },
  { name: "Dr. Omar Shaikh",    role: "Oral Surgeon",        hospital: "Sydney Dental Hospital",         country: "Australia",   degree: "BDS + MDS — Univ. Sydney, AU",       color: "#14b8a6", bg: "#14b8a620", type: "Dentist" },
  { name: "Dr. Pooja Agarwal",  role: "Psychiatrist",        hospital: "NIMHANS",                        country: "India",       degree: "MD — University of Otago, NZ",        color: "#84cc16", bg: "#84cc1620", type: "Doctor" },
];

const allCountries = ["All", "USA", "UK", "Canada", "Australia", "Germany", "New Zealand"];

const scholarships = [
  { university: "Johns Hopkins University", country: "USA", flag: "🇺🇸", color: "#3b82f6", bg: "#3b82f615", scholarships: [{ name: "Bloomberg Distinguished Scholarships", amount: "Full Tuition + $30,000/yr stipend", type: "Merit-Based", eligibility: "Outstanding academic record, leadership, research experience. GPA 3.9+", deadline: "December 1", renewable: true, coverage: "Tuition, living allowance, research fund" }, { name: "International Student Fellowship", amount: "Up to $25,000/yr", type: "Need + Merit", eligibility: "International students with demonstrated financial need and strong academic record", deadline: "January 15", renewable: true, coverage: "Partial tuition" }] },
  { university: "University of Edinburgh", country: "UK", flag: "🇬🇧", color: "#ef4444", bg: "#ef444415", scholarships: [{ name: "Edinburgh Global Research Scholarship", amount: "Full Tuition Waiver", type: "Merit-Based", eligibility: "Outstanding academic merit (First Class equivalent). Open to international students.", deadline: "March 31", renewable: true, coverage: "Full tuition fees" }, { name: "CRRS Scholarship", amount: "£5,000/yr", type: "Merit-Based", eligibility: "Students from select developing countries, strong academic background", deadline: "February 28", renewable: false, coverage: "Partial fees" }] },
  { university: "University of Toronto", country: "Canada", flag: "🇨🇦", color: "#f59e0b", bg: "#f59e0b15", scholarships: [{ name: "Lester B. Pearson International Scholarship", amount: "Full Tuition + living expenses", type: "Merit-Based", eligibility: "Outstanding international students with academic excellence + leadership.", deadline: "November (school nomination)", renewable: true, coverage: "Full tuition, books, incidentals, living expenses" }, { name: "University of Toronto Scholar Award", amount: "CAD $7,500/yr", type: "Merit-Based", eligibility: "International students with 90%+ average.", deadline: "Automatic on application", renewable: true, coverage: "Partial tuition" }] },
  { university: "University of Melbourne", country: "Australia", flag: "🇦🇺", color: "#10b981", bg: "#10b98115", scholarships: [{ name: "Melbourne International Undergraduate Scholarship", amount: "AUD $10,000 – $26,000/yr", type: "Merit-Based", eligibility: "International students with exceptional academic results equivalent to top 3% of their country", deadline: "October 31", renewable: true, coverage: "Partial to significant tuition reduction" }, { name: "Graduate Research Scholarships", amount: "Full tuition + AUD $32,000 stipend", type: "Research-Based", eligibility: "Students pursuing research degrees with strong research proposal", deadline: "October 31 / April 30", renewable: true, coverage: "Full tuition + living allowance + health cover" }] },
  { university: "Heidelberg University", country: "Germany", flag: "🇩🇪", color: "#6366f1", bg: "#6366f115", scholarships: [{ name: "DAAD Scholarship", amount: "€850/mo + tuition", type: "Merit-Based", eligibility: "Strong academic record + research proposal. Applied through DAAD portal.", deadline: "October 15", renewable: true, coverage: "Monthly stipend, tuition, travel allowance, health insurance" }] },
  { university: "University of Auckland", country: "New Zealand", flag: "🇳🇿", color: "#00d4aa", bg: "#00d4aa15", scholarships: [{ name: "University of Auckland International Student Excellence Scholarship", amount: "NZD $10,000/yr", type: "Merit-Based", eligibility: "International students with outstanding academic achievement.", deadline: "With application", renewable: true, coverage: "Partial tuition" }, { name: "Otago Doctoral Scholarship", amount: "Full fees + NZD $27,000 stipend", type: "Research-Based", eligibility: "PhD applicants with first class honors. Strong research proposal required.", deadline: "November 1", renewable: true, coverage: "Full tuition, living stipend, thesis allowance" }] },
];

// ─── COMPONENT ────────────────────────────────────────────────────────────────

export default function Programs() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab]                 = useState("courses");
  const [countryFilter, setCountryFilter]         = useState("All");
  const [testimonialCountry, setTestimonialCountry] = useState("All");
  const [placementFilter, setPlacementFilter]     = useState("All");

  const tabs = [
    { id: "courses",      label: "Courses",      icon: <BookOpen      size={15} /> },
    { id: "universities", label: "Universities", icon: <Building2     size={15} /> },
    { id: "scholarships", label: "Scholarships", icon: <GraduationCap size={15} /> },
    { id: "testimonials", label: "Testimonials", icon: <MessageSquare size={15} /> },
    { id: "placements",   label: "Placements",   icon: <Stethoscope   size={15} /> },
  ];

  const statsData = [
    { icon: <Users       size={18} color="#00d4aa" />, num: "500+", label: "Students Placed" },
    { icon: <Globe       size={18} color="#00d4aa" />, num: "6",    label: "Countries" },
    { icon: <Building2   size={18} color="#00d4aa" />, num: "12+",  label: "Universities" },
    { icon: <Trophy      size={18} color="#00d4aa" />, num: "95%",  label: "Success Rate" },
  ];

  const filteredUnis         = countryFilter === "All"      ? universities  : universities.filter(u => u.country === countryFilter);
  const filteredTestimonials = testimonialCountry === "All" ? testimonials  : testimonials.filter(t => t.country === testimonialCountry);
  const filteredPlacements   = placementFilter === "All"    ? placements    : placements.filter(p => p.type === placementFilter);

  return (
    <div style={styles.page}>
      <Navbar />

      {/* TAB BAR */}
      <div style={{ ...styles.navTabs, top: "70px" }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            style={{ ...styles.tab, ...(activeTab === tab.id ? styles.tabActive : {}) }}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* HERO */}
      <div style={{ ...styles.hero, paddingTop: "140px" }}>
        <p style={styles.heroEyebrow}>MediDent Global Pathways</p>
        <h1 style={styles.heroTitle}>Your Complete Guide to<br />Medical Education Abroad</h1>
        <p style={styles.heroSub}>Explore courses, top universities across 6 countries, real student stories, and where our graduates are working today.</p>
      </div>

      {/* STATS BAR */}
      <div style={styles.statsBar}>
        {statsData.map((s, i) => (
          <div key={i} style={styles.statItem}>
            <div style={styles.statIconWrap}>{s.icon}</div>
            <span style={styles.statNum}>{s.num}</span>
            <div style={styles.statLabel}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── COURSES TAB ── */}
      {activeTab === "courses" && (
        <div style={styles.section}>
          <p style={styles.sectionSub}>What We Offer</p>
          <h2 style={styles.sectionTitle}>Bachelor's · Master's · PGDM Programs</h2>
          <div style={styles.courseGrid}>
            {courses.map((course, i) => (
              <div
                key={i}
                style={{ ...styles.courseCard, borderColor: `${course.color}22` }}
                onMouseEnter={e => e.currentTarget.style.borderColor = `${course.color}55`}
                onMouseLeave={e => e.currentTarget.style.borderColor = `${course.color}22`}
              >
                <span style={{ ...styles.courseLevel, background: course.bg, color: course.color, border: `1px solid ${course.color}33` }}>
                  {course.level}
                </span>
                <div style={styles.courseName}>{course.name}</div>
                <div style={styles.courseDuration}>
                  <Clock size={13} color="#555" /> {course.duration}
                </div>
                <div style={styles.courseDesc}>{course.desc}</div>
                <div style={styles.courseTags}>
                  {course.tags.map((t, j) => <span key={j} style={styles.courseTag}>{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── UNIVERSITIES TAB ── */}
      {activeTab === "universities" && (
        <div style={styles.section}>
          <p style={styles.sectionSub}>Partner Institutions</p>
          <h2 style={styles.sectionTitle}>Universities Across 6 Countries</h2>
          <div style={styles.filterRow}>
            {allCountries.map(c => (
              <button key={c} style={{ ...styles.filterBtn, ...(countryFilter === c ? styles.filterBtnActive : {}) }} onClick={() => setCountryFilter(c)}>{c}</button>
            ))}
          </div>
          <div style={styles.uniGrid}>
            {filteredUnis.map((uni, i) => (
              <div
                key={i} style={styles.uniCard}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.borderColor = "#00d4aa33"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)";    e.currentTarget.style.borderColor = "#ffffff0d"; }}
              >
                <div style={styles.uniHeader}>
                  <div style={styles.uniEmoji}>{uni.flag}</div>
                  <div style={styles.uniInfo}>
                    <div style={styles.uniName}>{uni.name}</div>
                    <div style={styles.uniCountry}>{uni.country}</div>
                  </div>
                  <div style={styles.uniRank}>{uni.rank}</div>
                </div>
                <div style={styles.uniBody}>
                  <div style={styles.uniCoursesTitle}>Available Courses</div>
                  <div style={styles.uniCourseList}>
                    {uni.courses.map((c, j) => <span key={j} style={styles.uniCourseTag}>{c}</span>)}
                  </div>
                  <div style={styles.internshipBox}>
                    <div style={styles.internshipTitle}>
                      <Building2 size={12} color="#00d4aa" /> 6-Month Internship Program
                    </div>
                    <div style={styles.internshipText}>{uni.internship}</div>
                  </div>
                  <div style={styles.uniStats}>
                    <div style={styles.uniStat}><span style={styles.uniStatNum}>{uni.seats}</span><span style={styles.uniStatLabel}>Seats</span></div>
                    <div style={styles.uniStat}><span style={styles.uniStatNum}>Since '{uni.years.slice(2)}</span><span style={styles.uniStatLabel}>Partner Since</span></div>
                    <div style={styles.uniStat}><span style={styles.uniStatNum}>{uni.placed}%</span><span style={styles.uniStatLabel}>Placed</span></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── TESTIMONIALS TAB ── */}
      {activeTab === "testimonials" && (
        <div style={styles.section}>
          <p style={styles.sectionSub}>Student Stories</p>
          <h2 style={styles.sectionTitle}>Voices From Every Country</h2>
          <div style={styles.filterRow}>
            {allCountries.map(c => (
              <button key={c} style={{ ...styles.filterBtn, ...(testimonialCountry === c ? styles.filterBtnActive : {}) }} onClick={() => setTestimonialCountry(c)}>{c}</button>
            ))}
          </div>
          <div style={styles.testimonialGrid}>
            {filteredTestimonials.map((t, i) => (
              <div key={i} style={{ ...styles.testimonialCard, borderColor: `${t.color}22` }}>
                <div style={styles.quoteIcon}>"</div>
                <div style={styles.stars}>
                  {[...Array(5)].map((_, si) => <Star key={si} size={13} color={t.color} fill={t.color} />)}
                </div>
                <div style={styles.testimonialText}>"{t.text}"</div>
                <div style={styles.testimonialAuthor}>
                  <div style={{ ...styles.authorAvatar, background: `${t.color}20`, color: t.color, border: `2px solid ${t.color}40` }}>{t.initials}</div>
                  <div>
                    <div style={styles.authorName}>{t.name}</div>
                    <div style={styles.authorUni}>{t.uni}</div>
                    <div style={styles.authorCountry}>{t.year} · {t.country}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── PLACEMENTS TAB ── */}
      {activeTab === "placements" && (
        <div style={styles.section}>
          <p style={styles.sectionSub}>Alumni Working Worldwide</p>
          <h2 style={styles.sectionTitle}>Our Graduates — Doctors & Dentists Around the World</h2>
          <div style={styles.filterRow}>
            {["All", "Doctor", "Dentist"].map(f => (
              <button key={f} style={{ ...styles.filterBtn, ...(placementFilter === f ? styles.filterBtnActive : {}) }} onClick={() => setPlacementFilter(f)}>
                {f === "All" ? "All Placements" : f === "Doctor" ? <><Stethoscope size={13} style={{ marginRight: 5 }} />Doctors</> : <><Award size={13} style={{ marginRight: 5 }} />Dentists</>}
              </button>
            ))}
          </div>
          <div style={styles.placementGrid}>
            {filteredPlacements.map((p, i) => (
              <div key={i} style={{ ...styles.placementCard, borderColor: `${p.color}22` }}
                onMouseEnter={e => e.currentTarget.style.borderColor = `${p.color}55`}
                onMouseLeave={e => e.currentTarget.style.borderColor = `${p.color}22`}
              >
                <div style={{ ...styles.placementAvatar, background: p.bg, border: `2px solid ${p.color}40` }}>
                  {p.type === "Doctor"
                    ? <Stethoscope size={22} color={p.color} />
                    : <FlaskConical size={22} color={p.color} />
                  }
                </div>
                <div>
                  <div style={styles.placementName}>{p.name}</div>
                  <div style={styles.placementRole}>{p.role}</div>
                  <div style={styles.placementHospital}>
                    <Building2 size={12} color="#555" /> {p.hospital}
                  </div>
                  <div style={styles.placementCountry}>
                    <MapPin size={12} color="#555" /> {p.country}
                  </div>
                  <span style={{ ...styles.placementBadge, background: `${p.color}15`, color: p.color, border: `1px solid ${p.color}30` }}>
                    {p.degree}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── SCHOLARSHIPS TAB ── */}
      {activeTab === "scholarships" && (
        <div style={styles.section}>
          <p style={styles.sectionSub}>Financial Aid by University</p>
          <h2 style={styles.sectionTitle}>Scholarships at Every Partner University</h2>

          <div style={styles.filterRow}>
            {allCountries.map(c => (
              <button key={c} style={{ ...styles.filterBtn, ...(countryFilter === c ? styles.filterBtnActive : {}) }} onClick={() => setCountryFilter(c)}>{c}</button>
            ))}
          </div>

          {/* Summary banner */}
          <div style={{ background: "linear-gradient(135deg, #00d4aa12, #6366f112)", border: "1px solid #00d4aa33", borderRadius: "16px", padding: "22px 28px", marginBottom: "40px", display: "flex", flexWrap: "wrap", gap: "32px", alignItems: "center" }}>
            {[
              { icon: <Award size={18} color="#00d4aa" />, n: "30+",   l: "Scholarships Available" },
              { icon: <GraduationCap size={18} color="#00d4aa" />, n: "100%", l: "Tuition Covered (select)" },
              { icon: <Globe size={18} color="#00d4aa" />, n: "€ $ £", l: "Multiple Currencies" },
              { icon: <Sparkles size={18} color="#00d4aa" />, n: "Free", l: "Application Guidance" },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: "center", minWidth: "100px" }}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 6 }}>{s.icon}</div>
                <div style={{ fontFamily: "'Georgia', serif", fontSize: "1.8rem", fontWeight: 700, color: "#00d4aa", lineHeight: 1 }}>{s.n}</div>
                <div style={{ fontSize: "0.72rem", color: "#666", letterSpacing: "1px", textTransform: "uppercase", marginTop: "5px" }}>{s.l}</div>
              </div>
            ))}
            <div style={{ flex: 1, minWidth: "200px", color: "#888", fontSize: "0.85rem", lineHeight: 1.7 }}>
              MediDent counsellors identify and apply for every eligible scholarship on your behalf — at no extra charge.
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
            {(countryFilter === "All" ? scholarships : scholarships.filter(s => s.country === countryFilter)).map((uni, i) => (
              <div key={i} style={{ background: "#0d1b2a", border: `1px solid ${uni.color}22`, borderRadius: "20px", overflow: "hidden", transition: "border-color 0.3s" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = `${uni.color}55`}
                onMouseLeave={e => e.currentTarget.style.borderColor = `${uni.color}22`}
              >
                <div style={{ padding: "22px 28px", background: uni.bg, borderBottom: `1px solid ${uni.color}22`, display: "flex", alignItems: "center", gap: "14px" }}>
                  <span style={{ fontSize: "2rem" }}>{uni.flag}</span>
                  <div>
                    <div style={{ fontSize: "1.05rem", fontWeight: 700, color: "#f0ece4" }}>{uni.university}</div>
                    <div style={{ fontSize: "0.75rem", color: uni.color, letterSpacing: "1.5px", textTransform: "uppercase", marginTop: "2px" }}>
                      {uni.country} · {uni.scholarships.length} Scholarship{uni.scholarships.length > 1 ? "s" : ""} Available
                    </div>
                  </div>
                </div>

                <div style={{ padding: "20px 28px 28px", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "18px" }}>
                  {uni.scholarships.map((sch, j) => (
                    <div key={j} style={{ background: "#060d1a", border: "1px solid #ffffff0d", borderRadius: "14px", padding: "20px 22px", transition: "border-color 0.2s" }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = `${uni.color}44`}
                      onMouseLeave={e => e.currentTarget.style.borderColor = "#ffffff0d"}
                    >
                      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "10px", marginBottom: "12px" }}>
                        <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "#f0ece4", lineHeight: 1.35 }}>{sch.name}</div>
                        <span style={{ background: `${uni.color}18`, color: uni.color, border: `1px solid ${uni.color}33`, padding: "3px 10px", borderRadius: "20px", fontSize: "0.65rem", fontWeight: 600, whiteSpace: "nowrap", flexShrink: 0 }}>{sch.type}</span>
                      </div>
                      <div style={{ background: `${uni.color}12`, border: `1px solid ${uni.color}25`, borderRadius: "10px", padding: "12px 16px", marginBottom: "14px", display: "flex", alignItems: "center", gap: "10px" }}>
                        <DollarSign size={20} color={uni.color} />
                        <div>
                          <div style={{ fontSize: "1rem", fontWeight: 700, color: uni.color }}>{sch.amount}</div>
                          <div style={{ fontSize: "0.7rem", color: "#666", marginTop: "2px" }}>{sch.coverage}</div>
                        </div>
                      </div>
                      {[
                        { icon: <ClipboardList size={14} color="#555" />, label: "Eligibility", val: sch.eligibility },
                        { icon: <Clock        size={14} color="#555" />, label: "Deadline",    val: sch.deadline },
                        { icon: <RefreshCw    size={14} color="#555" />, label: "Renewable",   val: sch.renewable ? "Yes — annually reviewed" : "One-time award" },
                      ].map((row, k) => (
                        <div key={k} style={{ display: "flex", gap: "10px", padding: "8px 0", borderTop: "1px solid #ffffff07", fontSize: "0.8rem" }}>
                          <span style={{ flexShrink: 0 }}>{row.icon}</span>
                          <div>
                            <span style={{ color: "#555", marginRight: "6px" }}>{row.label}:</span>
                            <span style={{ color: "#bbb" }}>{row.val}</span>
                          </div>
                        </div>
                      ))}
                      <div style={{ marginTop: "14px", background: "#00d4aa0a", border: "1px solid #00d4aa22", borderRadius: "8px", padding: "8px 12px", fontSize: "0.74rem", color: "#00d4aa", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                        <Sparkles size={12} /> MediDent helps you apply — free of charge
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "48px", padding: "28px 32px", background: "#f4c43012", border: "1px solid #f4c43033", borderRadius: "16px", fontSize: "0.88rem", color: "#ccc", lineHeight: 1.8 }}>
            <strong style={{ color: "#f4c430", fontSize: "1rem", display: "flex", alignItems: "center", gap: 8 }}>
              <Lightbulb size={18} color="#f4c430" /> Scholarship Tips from MediDent:
            </strong>
            <ul style={{ marginTop: "12px", paddingLeft: "20px", color: "#999" }}>
              <li style={{ marginBottom: "8px" }}>Apply for scholarships <strong style={{ color: "#f0ece4" }}>6–12 months</strong> before your intended intake — most have early deadlines.</li>
              <li style={{ marginBottom: "8px" }}>Maintain a strong academic record — <strong style={{ color: "#f0ece4" }}>most merit scholarships require 85%+</strong> equivalent grades.</li>
              <li style={{ marginBottom: "8px" }}>DAAD (Germany) and Commonwealth (NZ, UK) scholarships are <strong style={{ color: "#f0ece4" }}>highly competitive but cover full expenses</strong>.</li>
              <li>Our counsellors prepare your scholarship SOP and help you identify <strong style={{ color: "#f0ece4" }}>every scholarship you're eligible for</strong> across all universities.</li>
            </ul>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <div style={styles.footer}>
        <div style={{ color: "#00d4aa", fontWeight: "700", fontSize: "1.1rem", marginBottom: "8px" }}>
          🦷 MediDent Global Pathways
        </div>
        <p style={{ color: "#333", fontSize: "0.78rem", margin: 0 }}>© 2025 MediDent Global Pathways. All rights reserved.</p>
      </div>
    </div>
  );
}