import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, FileText, CreditCard, CalendarCheck,
  Upload, CheckCircle, Clock, XCircle, AlertCircle,
  Building2, GraduationCap, Globe, MapPin, ChevronRight,
  LogOut, User, Bell, Search, Download, Eye,
  Plus, Stethoscope, Phone, Mail, Shield,
  TrendingUp, Wallet, Receipt, RefreshCw,
  Calendar, Video, MessageSquare, Star, ChevronDown
} from "lucide-react";

/* ─── MOCK DATA (replace with real API calls) ─────────────────────────────── */
const mockUser = {
  firstName: "Arjun",
  lastName: "Mehta",
  email: "arjun.mehta@example.com",
  phone: "+91 98765 43210",
  course: "MBBS",
  targetCountry: "Russia",
  counsellor: "Dr. Priya Sharma",
  status: "Active",
  joinedDate: "Jan 2025",
};

const mockApplications = [
  {
    applicationId: "APP-2025-001",
    university: "Kazan Federal University",
    country: "Russia 🇷🇺",
    course: "MBBS",
    status: "Accepted",
    appliedAt: "15 Jan 2025",
    intake: "Sep 2025",
    tuitionFee: "$4,200/yr",
  },
  {
    applicationId: "APP-2025-002",
    university: "Peoples' Friendship University",
    country: "Russia 🇷🇺",
    course: "MBBS",
    status: "Under Review",
    appliedAt: "20 Jan 2025",
    intake: "Sep 2025",
    tuitionFee: "$4,800/yr",
  },
  {
    applicationId: "APP-2025-003",
    university: "Tbilisi State Medical University",
    country: "Georgia 🇬🇪",
    course: "MBBS",
    status: "Rejected",
    appliedAt: "10 Jan 2025",
    intake: "Sep 2025",
    tuitionFee: "$5,500/yr",
  },
];

const mockDocuments = [
  { documentId: "DOC-001", type: "Passport",                   fileURL: "#", verificationStatus: "Approved",  uploadedAt: "10 Jan 2025", size: "1.2 MB" },
  { documentId: "DOC-002", type: "10th Marksheet",             fileURL: "#", verificationStatus: "Approved",  uploadedAt: "10 Jan 2025", size: "890 KB" },
  { documentId: "DOC-003", type: "12th Marksheet",             fileURL: "#", verificationStatus: "Approved",  uploadedAt: "10 Jan 2025", size: "920 KB" },
  { documentId: "DOC-004", type: "NEET Score Card",            fileURL: "#", verificationStatus: "Approved",  uploadedAt: "11 Jan 2025", size: "450 KB" },
  { documentId: "DOC-005", type: "Birth Certificate",          fileURL: "#", verificationStatus: "Pending",   uploadedAt: "12 Jan 2025", size: "600 KB" },
  { documentId: "DOC-006", type: "Medical Fitness Certificate",fileURL: "#", verificationStatus: "Pending",   uploadedAt: "14 Jan 2025", size: "780 KB" },
  { documentId: "DOC-007", type: "Bank Statement",             fileURL: "#", verificationStatus: "Pending",   uploadedAt: "15 Jan 2025", size: "1.1 MB" },
  { documentId: "DOC-008", type: "SOP (Statement of Purpose)", fileURL: "#", verificationStatus: "Rejected",  uploadedAt: "16 Jan 2025", size: "340 KB" },
];

const requiredDocs = [
  "Passport", "10th Marksheet", "12th Marksheet", "NEET Score Card",
  "Birth Certificate", "Medical Fitness Certificate", "Bank Statement",
  "SOP (Statement of Purpose)", "Police Clearance Certificate", "Visa Application Form",
];

const mockPayments = [
  { paymentId: "PAY-001", amount: 15000,  method: "Net Banking", status: "Success", paidAt: "15 Jan 2025", description: "Application Processing Fee",  currency: "INR" },
  { paymentId: "PAY-002", amount: 25000,  method: "UPI",         status: "Success", paidAt: "28 Jan 2025", description: "Documentation Service Fee",   currency: "INR" },
  { paymentId: "PAY-003", amount: 50000,  method: "Card",        status: "Success", paidAt: "05 Feb 2025", description: "Visa Filing Assistance Fee",   currency: "INR" },
  { paymentId: "PAY-004", amount: 420000, method: "Wire Transfer",status: "Success", paidAt: "10 Feb 2025", description: "University Tuition — Year 1", currency: "INR" },
  { paymentId: "PAY-005", amount: 35000,  method: "UPI",         status: "Failed",  paidAt: "12 Feb 2025", description: "Pre-Departure Orientation",   currency: "INR" },
  { paymentId: "PAY-006", amount: 35000,  method: "Net Banking", status: "Pending", paidAt: "—",           description: "Pre-Departure Orientation",   currency: "INR" },
];

const mockAppointments = [
  {
    appointmentId: "APT-001",
    counsellorId:  "CNS-001",
    counsellorName: "Dr. Priya Sharma",
    counsellorRole: "Head Counsellor",
    scheduledDate: "22 Mar 2025",
    scheduledTime: "11:00 AM",
    sessionStatus: "Completed",
    mode: "Video Call",
    notes: "Discussed university shortlist and visa requirements.",
  },
  {
    appointmentId: "APT-002",
    counsellorId:  "CNS-002",
    counsellorName: "Rahul Mehta",
    counsellorRole: "Visa Specialist",
    scheduledDate: "28 Mar 2025",
    scheduledTime: "3:00 PM",
    sessionStatus: "Accepted",
    mode: "Video Call",
    notes: "Visa document review session.",
  },
  {
    appointmentId: "APT-003",
    counsellorId:  "CNS-001",
    counsellorName: "Dr. Priya Sharma",
    counsellorRole: "Head Counsellor",
    scheduledDate: "05 Apr 2025",
    scheduledTime: "10:00 AM",
    sessionStatus: "Pending",
    mode: "Phone Call",
    notes: "Pre-departure orientation check.",
  },
];

/* ─── STATUS CONFIG ────────────────────────────────────────────────────────── */
const appStatusConfig = {
  Accepted:      { color: "#00d4aa", bg: "#00d4aa15", border: "#00d4aa33", icon: <CheckCircle size={13} /> },
  "Under Review":{ color: "#f4c430", bg: "#f4c43015", border: "#f4c43033", icon: <Clock       size={13} /> },
  Rejected:      { color: "#ef4444", bg: "#ef444415", border: "#ef444433", icon: <XCircle     size={13} /> },
};

const docStatusConfig = {
  Approved: { color: "#00d4aa", bg: "#00d4aa15", border: "#00d4aa33", icon: <CheckCircle  size={13} /> },
  Pending:  { color: "#f4c430", bg: "#f4c43015", border: "#f4c43033", icon: <Clock        size={13} /> },
  Rejected: { color: "#ef4444", bg: "#ef444415", border: "#ef444433", icon: <XCircle      size={13} /> },
};

const payStatusConfig = {
  Success: { color: "#00d4aa", bg: "#00d4aa15", border: "#00d4aa33", icon: <CheckCircle  size={13} /> },
  Pending: { color: "#f4c430", bg: "#f4c43015", border: "#f4c43033", icon: <Clock        size={13} /> },
  Failed:  { color: "#ef4444", bg: "#ef444415", border: "#ef444433", icon: <XCircle      size={13} /> },
};

const aptStatusConfig = {
  Completed: { color: "#00d4aa", bg: "#00d4aa15", border: "#00d4aa33", icon: <CheckCircle  size={13} /> },
  Accepted:  { color: "#4da6ff", bg: "#4da6ff15", border: "#4da6ff33", icon: <CalendarCheck size={13} /> },
  Pending:   { color: "#f4c430", bg: "#f4c43015", border: "#f4c43033", icon: <Clock         size={13} /> },
  Rejected:  { color: "#ef4444", bg: "#ef444415", border: "#ef444433", icon: <XCircle       size={13} /> },
};

/* ─── HELPERS ──────────────────────────────────────────────────────────────── */
function StatusBadge({ label, config }) {
  const c = config[label] || config["Pending"];
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 5, background: c.bg, border: `1px solid ${c.border}`, color: c.color, padding: "3px 10px", borderRadius: "20px", fontSize: "0.72rem", fontWeight: 700 }}>
      {c.icon} {label}
    </span>
  );
}

function StatCard({ icon, label, value, sub, color = "#00d4aa" }) {
  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: `0 16px 40px ${color}18` }}
      style={{ ...S.statCard, borderColor: `${color}22` }}
    >
      <div style={{ ...S.statIconWrap, background: `${color}15` }}>{icon}</div>
      <div style={S.statValue}>{value}</div>
      <div style={S.statLabel}>{label}</div>
      {sub && <div style={S.statSub}>{sub}</div>}
    </motion.div>
  );
}

/* ─── MAIN COMPONENT ───────────────────────────────────────────────────────── */
export default function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab]     = useState("overview");
  const [uploadHover, setUploadHover] = useState(null);
  const [bookOpen, setBookOpen]       = useState(false);
  const [bookForm, setBookForm]       = useState({ date: "", time: "", mode: "Video Call", notes: "" });
  const [bookSuccess, setBookSuccess] = useState(false);

  const tabs = [
    { id: "overview",     label: "Overview",     icon: <LayoutDashboard size={15} /> },
    { id: "application",  label: "Application",  icon: <Building2       size={15} /> },
    { id: "documents",    label: "Documents",    icon: <FileText        size={15} /> },
    { id: "payments",     label: "Payments",     icon: <CreditCard      size={15} /> },
    { id: "appointments", label: "Appointments", icon: <CalendarCheck   size={15} /> },
  ];

  /* ── doc upload mock ── */
  const handleUpload = (docType) => {
    alert(`Upload triggered for: ${docType}\n(Connect to your backend API here)`);
  };

  /* ── book appointment mock ── */
  const handleBook = (e) => {
    e.preventDefault();
    if (!bookForm.date || !bookForm.time) return;
    setTimeout(() => { setBookSuccess(true); setBookOpen(false); }, 800);
  };

  const totalPaid    = mockPayments.filter(p => p.status === "Success").reduce((a, p) => a + p.amount, 0);
  const docsApproved = mockDocuments.filter(d => d.verificationStatus === "Approved").length;
  const docsTotal    = requiredDocs.length;
  const acceptedApp  = mockApplications.find(a => a.status === "Accepted");

  return (
    <div style={S.page}>
      {/* ── BACKGROUND ORBS ── */}
      <div style={S.orb1} /><div style={S.orb2} />

      {/* ── SIDEBAR ── */}
      <aside style={S.sidebar}>
        {/* Logo */}
        <div style={S.sidebarLogo} onClick={() => navigate("/")}>
          <div style={S.sidebarLogoIcon}>🦷</div>
          <div>
            <div style={S.sidebarLogoText}>MediDent</div>
            <div style={S.sidebarLogoSub}>Student Portal</div>
          </div>
        </div>

        {/* Profile pill */}
        <div style={S.profilePill}>
          <div style={S.profileAvatar}>{mockUser.firstName[0]}{mockUser.lastName[0]}</div>
          <div>
            <div style={S.profileName}>{mockUser.firstName} {mockUser.lastName}</div>
            <div style={S.profileCourse}>{mockUser.course} · {mockUser.targetCountry}</div>
          </div>
        </div>

        {/* Nav tabs */}
        <nav style={S.sideNav}>
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              style={{
                ...S.sideNavBtn,
                ...(activeTab === t.id ? S.sideNavBtnActive : {}),
              }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
                {t.icon} {t.label}
              </span>
              {activeTab === t.id && <ChevronRight size={14} />}
            </button>
          ))}
        </nav>

        {/* Counsellor card */}
        <div style={S.counsellorCard}>
          <div style={S.counsellorLabel}>Your Counsellor</div>
          <div style={S.counsellorName}>
            <Stethoscope size={13} color="#00d4aa" style={{ marginRight: 6 }} />
            {mockUser.counsellor}
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
            <button style={S.contactBtn}><Phone size={13} /></button>
            <button style={S.contactBtn}><Mail  size={13} /></button>
            <button style={S.contactBtn}><MessageSquare size={13} /></button>
          </div>
        </div>

        {/* Logout */}
        <button style={S.logoutBtn} onClick={() => navigate("/login")}>
          <LogOut size={15} style={{ marginRight: 8 }} /> Sign Out
        </button>
      </aside>

      {/* ── MAIN CONTENT ── */}
      <main style={S.main}>
        {/* Top bar */}
        <div style={S.topBar}>
          <div>
            <div style={S.topBarTitle}>
              {tabs.find(t => t.id === activeTab)?.label}
            </div>
            <div style={S.topBarSub}>Welcome back, {mockUser.firstName} 👋</div>
          </div>
          <div style={S.topBarRight}>
            <div style={S.searchBox}>
              <Search size={14} color="#555" />
              <input placeholder="Search..." style={S.searchInput} />
            </div>
            <button style={S.iconBtn}><Bell size={16} color="#555" /></button>
            <div style={S.topAvatar}>{mockUser.firstName[0]}{mockUser.lastName[0]}</div>
          </div>
        </div>

        <AnimatePresence mode="wait">

          {/* ════════════════ OVERVIEW ════════════════ */}
          {activeTab === "overview" && (
            <motion.div key="overview" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }}>

              {/* Journey progress banner */}
              <div style={S.journeyBanner}>
                <div style={S.journeyBannerLeft}>
                  <div style={S.journeyBannerTag}><GraduationCap size={13} style={{ marginRight: 6 }} /> Your Journey</div>
                  <div style={S.journeyBannerTitle}>
                    {acceptedApp ? `🎉 Admission Secured at ${acceptedApp.university}` : "Application in Progress..."}
                  </div>
                  <div style={S.journeyBannerSub}>
                    {acceptedApp ? `${acceptedApp.course} · ${acceptedApp.country} · Intake ${acceptedApp.intake}` : "Your applications are being reviewed"}
                  </div>
                </div>
                <div style={S.journeyProgress}>
                  {[
                    { label: "Registered",    done: true },
                    { label: "Docs Submitted",done: docsApproved >= 4 },
                    { label: "Applied",       done: mockApplications.length > 0 },
                    { label: "Admitted",      done: !!acceptedApp },
                    { label: "Visa Filed",    done: false },
                    { label: "Departed",      done: false },
                  ].map((step, i) => (
                    <div key={i} style={S.journeyStep}>
                      <div style={{ ...S.journeyDot, background: step.done ? "#00d4aa" : "#ffffff15", boxShadow: step.done ? "0 0 12px #00d4aa88" : "none" }}>
                        {step.done && <CheckCircle size={12} color="#080c12" />}
                      </div>
                      <div style={{ ...S.journeyStepLabel, color: step.done ? "#00d4aa" : "#444" }}>{step.label}</div>
                      {i < 5 && <div style={{ ...S.journeyLine, background: step.done ? "#00d4aa66" : "#ffffff0a" }} />}
                    </div>
                  ))}
                </div>
              </div>

              {/* Stat cards */}
              <div style={S.statsRow}>
                <StatCard icon={<Building2 size={20} color="#00d4aa" />}  label="Applications"  value={mockApplications.length}                  sub={`${mockApplications.filter(a=>a.status==="Accepted").length} Accepted`} color="#00d4aa" />
                <StatCard icon={<FileText  size={20} color="#4da6ff" />}   label="Documents"     value={`${docsApproved}/${docsTotal}`}            sub="Approved"                                                              color="#4da6ff" />
                <StatCard icon={<CreditCard size={20} color="#a855f7" />}  label="Total Paid"    value={`₹${(totalPaid/100000).toFixed(1)}L`}       sub="of service + tuition"                                                 color="#a855f7" />
                <StatCard icon={<CalendarCheck size={20} color="#f4c430"/>}label="Appointments"  value={mockAppointments.length}                   sub={`${mockAppointments.filter(a=>a.sessionStatus==="Accepted").length} Upcoming`} color="#f4c430" />
              </div>

              {/* Two column: recent activity + quick actions */}
              <div style={S.twoCol}>
                {/* Recent activity */}
                <div style={S.card}>
                  <div style={S.cardHeader}>
                    <div style={S.cardTitle}><TrendingUp size={16} color="#00d4aa" style={{ marginRight: 8 }} /> Recent Activity</div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                    {[
                      { icon: <CheckCircle size={14} color="#00d4aa" />, text: `Application to ${acceptedApp?.university} Accepted`, time: "2 days ago", color: "#00d4aa" },
                      { icon: <FileText    size={14} color="#4da6ff" />, text: "Bank Statement uploaded",                             time: "4 days ago", color: "#4da6ff" },
                      { icon: <CreditCard  size={14} color="#a855f7" />, text: "₹50,000 Visa Fee payment received",                   time: "5 days ago", color: "#a855f7" },
                      { icon: <CalendarCheck size={14} color="#f4c430" />, text: "Appointment with Dr. Priya confirmed",              time: "1 week ago", color: "#f4c430" },
                      { icon: <AlertCircle size={14} color="#ef4444" />, text: "SOP rejected — please re-upload",                    time: "1 week ago", color: "#ef4444" },
                    ].map((item, i) => (
                      <div key={i} style={{ ...S.activityRow, borderBottom: i < 4 ? "1px solid #ffffff07" : "none" }}>
                        <div style={{ ...S.activityIcon, background: `${item.color}15` }}>{item.icon}</div>
                        <div style={{ flex: 1 }}>
                          <div style={S.activityText}>{item.text}</div>
                          <div style={S.activityTime}>{item.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick actions */}
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div style={S.card}>
                    <div style={S.cardHeader}>
                      <div style={S.cardTitle}><Shield size={16} color="#00d4aa" style={{ marginRight: 8 }} /> Profile Info</div>
                    </div>
                    {[
                      { label: "Email",      val: mockUser.email,      icon: <Mail      size={13} color="#555" /> },
                      { label: "Phone",      val: mockUser.phone,      icon: <Phone     size={13} color="#555" /> },
                      { label: "Course",     val: mockUser.course,     icon: <BookOpen  size={13} color="#555" /> },
                      { label: "Destination",val: mockUser.targetCountry, icon: <Globe  size={13} color="#555" /> },
                      { label: "Member Since",val: mockUser.joinedDate,icon: <Clock     size={13} color="#555" /> },
                    ].map((r, i) => (
                      <div key={i} style={S.profileRow}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#555", fontSize: "0.8rem" }}>{r.icon} {r.label}</div>
                        <div style={{ color: "#ccc", fontSize: "0.82rem", fontWeight: 500 }}>{r.val}</div>
                      </div>
                    ))}
                  </div>

                  <div style={S.card}>
                    <div style={{ ...S.cardTitle, fontSize: "0.85rem", fontWeight: 700, color: "#ccc", marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
                      <AlertCircle size={15} color="#f4c430" /> Action Required
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      <div style={S.actionItem}>
                        <div style={{ ...S.actionDot, background: "#ef4444" }} />
                        <span style={{ color: "#ccc", fontSize: "0.82rem" }}>Re-upload your SOP document</span>
                      </div>
                      <div style={S.actionItem}>
                        <div style={{ ...S.actionDot, background: "#f4c430" }} />
                        <span style={{ color: "#ccc", fontSize: "0.82rem" }}>Police Clearance Certificate missing</span>
                      </div>
                      <div style={S.actionItem}>
                        <div style={{ ...S.actionDot, background: "#f4c430" }} />
                        <span style={{ color: "#ccc", fontSize: "0.82rem" }}>Visa Application Form not uploaded</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ════════════════ APPLICATION ════════════════ */}
          {activeTab === "application" && (
            <motion.div key="application" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }}>
              <div style={S.statsRow}>
                <StatCard icon={<Building2     size={20} color="#00d4aa" />} label="Total Applied"    value={mockApplications.length}                                              color="#00d4aa" />
                <StatCard icon={<CheckCircle   size={20} color="#10b981" />} label="Accepted"         value={mockApplications.filter(a=>a.status==="Accepted").length}             color="#10b981" />
                <StatCard icon={<Clock         size={20} color="#f4c430" />} label="Under Review"     value={mockApplications.filter(a=>a.status==="Under Review").length}         color="#f4c430" />
                <StatCard icon={<XCircle       size={20} color="#ef4444" />} label="Rejected"         value={mockApplications.filter(a=>a.status==="Rejected").length}             color="#ef4444" />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {mockApplications.map((app, i) => {
                  const cfg = appStatusConfig[app.status];
                  return (
                    <motion.div
                      key={app.applicationId}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }}
                      style={{ ...S.appCard, borderColor: `${cfg.color}33` }}
                    >
                      <div style={S.appCardLeft}>
                        <div style={{ ...S.appUniFlagWrap, background: `${cfg.color}15` }}>
                          <Building2 size={22} color={cfg.color} />
                        </div>
                        <div>
                          <div style={S.appUniName}>{app.university}</div>
                          <div style={S.appMeta}>
                            <Globe size={12} color="#555" style={{ marginRight: 4 }} />{app.country}
                            <span style={S.appMetaDot}>·</span>
                            <GraduationCap size={12} color="#555" style={{ marginRight: 4 }} />{app.course}
                            <span style={S.appMetaDot}>·</span>
                            <Calendar size={12} color="#555" style={{ marginRight: 4 }} />Intake {app.intake}
                          </div>
                          <div style={S.appId}>ID: {app.applicationId} &nbsp;·&nbsp; Applied {app.appliedAt}</div>
                        </div>
                      </div>
                      <div style={S.appCardRight}>
                        <div style={S.appFee}>{app.tuitionFee}</div>
                        <StatusBadge label={app.status} config={appStatusConfig} />
                        {app.status === "Accepted" && (
                          <motion.button
                            whileHover={{ scale: 1.04 }}
                            style={S.viewLetterBtn}
                          >
                            <Download size={12} style={{ marginRight: 5 }} /> Offer Letter
                          </motion.button>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <div style={S.infoBox}>
                <AlertCircle size={15} color="#4da6ff" style={{ marginRight: 10, flexShrink: 0 }} />
                <span style={{ color: "#888", fontSize: "0.83rem", lineHeight: 1.6 }}>
                  Applications are managed by your MediDent counsellor. To apply to additional universities, contact <strong style={{ color: "#ccc" }}>Dr. Priya Sharma</strong> via the Appointments section.
                </span>
              </div>
            </motion.div>
          )}

          {/* ════════════════ DOCUMENTS ════════════════ */}
          {activeTab === "documents" && (
            <motion.div key="documents" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }}>

              {/* Progress bar */}
              <div style={S.card}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                  <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "#ccc" }}>
                    <FileText size={15} color="#00d4aa" style={{ marginRight: 8, verticalAlign: "middle" }} />
                    Document Checklist Progress
                  </div>
                  <div style={{ color: "#00d4aa", fontWeight: 800, fontSize: "1rem" }}>{docsApproved}/{docsTotal}</div>
                </div>
                <div style={S.progressBg}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(docsApproved / docsTotal) * 100}%` }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    style={S.progressFill}
                  />
                </div>
                <div style={{ display: "flex", gap: 16, marginTop: 14, flexWrap: "wrap" }}>
                  {[
                    { label: "Approved", count: mockDocuments.filter(d=>d.verificationStatus==="Approved").length,  color: "#00d4aa" },
                    { label: "Pending",  count: mockDocuments.filter(d=>d.verificationStatus==="Pending").length,   color: "#f4c430" },
                    { label: "Rejected", count: mockDocuments.filter(d=>d.verificationStatus==="Rejected").length,  color: "#ef4444" },
                    { label: "Missing",  count: requiredDocs.filter(r=>!mockDocuments.find(d=>d.type===r)).length,  color: "#555" },
                  ].map((s, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.8rem" }}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: s.color }} />
                      <span style={{ color: "#666" }}>{s.label}:</span>
                      <span style={{ color: s.color, fontWeight: 700 }}>{s.count}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Uploaded documents */}
              <div style={S.card}>
                <div style={S.cardHeader}>
                  <div style={S.cardTitle}><Upload size={15} color="#00d4aa" style={{ marginRight: 8 }} /> Uploaded Documents</div>
                </div>
                <div style={S.docTable}>
                  <div style={S.docTableHead}>
                    <span>Document</span>
                    <span>Uploaded</span>
                    <span>Size</span>
                    <span>Status</span>
                    <span>Actions</span>
                  </div>
                  {mockDocuments.map((doc, i) => (
                    <motion.div
                      key={doc.documentId}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.05 }}
                      style={{ ...S.docTableRow, borderBottom: i < mockDocuments.length - 1 ? "1px solid #ffffff07" : "none" }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 34, height: 34, borderRadius: 8, background: "#ffffff08", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <FileText size={16} color="#00d4aa" />
                        </div>
                        <div>
                          <div style={{ color: "#ccc", fontSize: "0.85rem", fontWeight: 600 }}>{doc.type}</div>
                          <div style={{ color: "#444", fontSize: "0.72rem" }}>{doc.documentId}</div>
                        </div>
                      </div>
                      <span style={{ color: "#666", fontSize: "0.8rem" }}>{doc.uploadedAt}</span>
                      <span style={{ color: "#666", fontSize: "0.8rem" }}>{doc.size}</span>
                      <StatusBadge label={doc.verificationStatus} config={docStatusConfig} />
                      <div style={{ display: "flex", gap: 8 }}>
                        <button style={S.docActionBtn}><Eye      size={13} color="#555" /></button>
                        <button style={S.docActionBtn}><Download size={13} color="#555" /></button>
                        {doc.verificationStatus === "Rejected" && (
                          <button
                            style={{ ...S.docActionBtn, borderColor: "#ef444433", color: "#ef4444" }}
                            onClick={() => handleUpload(doc.type)}
                          >
                            <RefreshCw size={13} />
                          </button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Missing documents */}
              <div style={S.card}>
                <div style={S.cardHeader}>
                  <div style={S.cardTitle}><AlertCircle size={15} color="#f4c430" style={{ marginRight: 8 }} /> Missing Documents</div>
                  <span style={{ fontSize: "0.75rem", color: "#555" }}>Upload to complete your checklist</span>
                </div>
                <div style={S.missingGrid}>
                  {requiredDocs
                    .filter(r => !mockDocuments.find(d => d.type === r))
                    .map((doc, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ borderColor: "#00d4aa55", y: -2 }}
                        onHoverStart={() => setUploadHover(i)}
                        onHoverEnd={() => setUploadHover(null)}
                        style={{ ...S.missingCard, borderColor: uploadHover === i ? "#00d4aa55" : "#ffffff0a" }}
                      >
                        <div style={{ width: 40, height: 40, borderRadius: 10, background: "#ffffff06", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10 }}>
                          <FileText size={18} color="#555" />
                        </div>
                        <div style={{ color: "#ccc", fontSize: "0.82rem", fontWeight: 600, marginBottom: 12, lineHeight: 1.4, textAlign: "center" }}>{doc}</div>
                        <button style={S.uploadBtn} onClick={() => handleUpload(doc)}>
                          <Upload size={13} style={{ marginRight: 6 }} /> Upload
                        </button>
                      </motion.div>
                    ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* ════════════════ PAYMENTS ════════════════ */}
          {activeTab === "payments" && (
            <motion.div key="payments" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }}>
              <div style={S.statsRow}>
                <StatCard icon={<Wallet      size={20} color="#00d4aa" />} label="Total Paid"   value={`₹${(totalPaid/100000).toFixed(2)}L`}                                                                color="#00d4aa" />
                <StatCard icon={<CheckCircle size={20} color="#10b981" />} label="Successful"   value={mockPayments.filter(p=>p.status==="Success").length}                  sub="transactions"              color="#10b981" />
                <StatCard icon={<Clock       size={20} color="#f4c430" />} label="Pending"      value={mockPayments.filter(p=>p.status==="Pending").length}                  sub="awaiting confirmation"     color="#f4c430" />
                <StatCard icon={<XCircle     size={20} color="#ef4444" />} label="Failed"       value={mockPayments.filter(p=>p.status==="Failed").length}                   sub="retry required"            color="#ef4444" />
              </div>

              <div style={S.card}>
                <div style={S.cardHeader}>
                  <div style={S.cardTitle}><Receipt size={15} color="#00d4aa" style={{ marginRight: 8 }} /> Payment History</div>
                  <button style={S.exportBtn}><Download size={13} style={{ marginRight: 6 }} /> Export</button>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                  {mockPayments.map((pay, i) => {
                    const cfg = payStatusConfig[pay.status];
                    return (
                      <motion.div
                        key={pay.paymentId}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.06 }}
                        style={{ ...S.payRow, borderBottom: i < mockPayments.length - 1 ? "1px solid #ffffff07" : "none" }}
                      >
                        <div style={{ ...S.payIconWrap, background: `${cfg.color}15` }}>
                          <CreditCard size={18} color={cfg.color} />
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ color: "#ccc", fontSize: "0.88rem", fontWeight: 600 }}>{pay.description}</div>
                          <div style={{ color: "#555", fontSize: "0.75rem", marginTop: 3, display: "flex", alignItems: "center", gap: 8 }}>
                            <span>{pay.paymentId}</span>
                            <span>·</span>
                            <span>{pay.method}</span>
                            <span>·</span>
                            <span>{pay.paidAt}</span>
                          </div>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <div style={{ color: pay.status === "Failed" ? "#ef4444" : "#f0ece4", fontWeight: 800, fontSize: "0.95rem" }}>
                            {pay.status === "Failed" ? "—" : `₹${pay.amount.toLocaleString("en-IN")}`}
                          </div>
                          <div style={{ marginTop: 6 }}>
                            <StatusBadge label={pay.status} config={payStatusConfig} />
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              <div style={S.infoBox}>
                <AlertCircle size={15} color="#4da6ff" style={{ marginRight: 10, flexShrink: 0 }} />
                <span style={{ color: "#888", fontSize: "0.83rem", lineHeight: 1.6 }}>
                  For payment disputes or receipts, contact <strong style={{ color: "#ccc" }}>accounts@medident.in</strong>. All amounts in INR. Tuition payments are processed via RBI-approved forex channels.
                </span>
              </div>
            </motion.div>
          )}

          {/* ════════════════ APPOINTMENTS ════════════════ */}
          {activeTab === "appointments" && (
            <motion.div key="appointments" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }}>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                <div style={{ ...S.statsRow, flex: 1, display: "flex", gap: 16, flexWrap: "wrap" }}>
                  <StatCard icon={<CalendarCheck size={20} color="#00d4aa" />} label="Total Sessions"  value={mockAppointments.length}                                                   color="#00d4aa" />
                  <StatCard icon={<CheckCircle   size={20} color="#10b981" />} label="Completed"       value={mockAppointments.filter(a=>a.sessionStatus==="Completed").length}          color="#10b981" />
                  <StatCard icon={<Clock         size={20} color="#4da6ff" />} label="Upcoming"        value={mockAppointments.filter(a=>a.sessionStatus==="Accepted").length}           color="#4da6ff" />
                  <StatCard icon={<Plus          size={20} color="#a855f7" />} label="Book New"        value="+" sub="Schedule a session"                                                 color="#a855f7" />
                </div>
              </div>

              {/* Book appointment button */}
              {bookSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ ...S.infoBox, borderColor: "#00d4aa33", marginBottom: 20 }}
                >
                  <CheckCircle size={15} color="#00d4aa" style={{ marginRight: 10 }} />
                  <span style={{ color: "#00d4aa", fontSize: "0.85rem" }}>Appointment request sent! Your counsellor will confirm shortly.</span>
                </motion.div>
              )}

              <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 20 }}>
                <motion.button
                  whileHover={{ scale: 1.04, boxShadow: "0 0 24px #00d4aa55" }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setBookOpen(true)}
                  style={S.bookBtn}
                >
                  <Plus size={15} style={{ marginRight: 8 }} /> Book New Appointment
                </motion.button>
              </div>

              {/* Appointment cards */}
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {mockAppointments.map((apt, i) => {
                  const cfg = aptStatusConfig[apt.sessionStatus];
                  return (
                    <motion.div
                      key={apt.appointmentId}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }}
                      style={{ ...S.aptCard, borderColor: `${cfg.color}33` }}
                    >
                      <div style={{ ...S.aptLeft, background: `${cfg.color}10` }}>
                        <div style={{ ...S.aptAvatar, background: `${cfg.color}20`, border: `2px solid ${cfg.color}44` }}>
                          <Stethoscope size={22} color={cfg.color} />
                        </div>
                        <div>
                          <div style={S.aptCounsellorName}>{apt.counsellorName}</div>
                          <div style={S.aptCounsellorRole}>{apt.counsellorRole}</div>
                        </div>
                      </div>
                      <div style={S.aptRight}>
                        <div style={S.aptInfoRow}>
                          <div style={S.aptInfoItem}><Calendar size={13} color="#555" style={{ marginRight: 5 }} />{apt.scheduledDate}</div>
                          <div style={S.aptInfoItem}><Clock    size={13} color="#555" style={{ marginRight: 5 }} />{apt.scheduledTime}</div>
                          <div style={S.aptInfoItem}><Video    size={13} color="#555" style={{ marginRight: 5 }} />{apt.mode}</div>
                        </div>
                        {apt.notes && (
                          <div style={S.aptNotes}>
                            <MessageSquare size={12} color="#444" style={{ marginRight: 6, flexShrink: 0 }} />
                            {apt.notes}
                          </div>
                        )}
                        <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 10 }}>
                          <StatusBadge label={apt.sessionStatus} config={aptStatusConfig} />
                          <span style={{ color: "#444", fontSize: "0.72rem" }}>{apt.appointmentId}</span>
                          {apt.sessionStatus === "Accepted" && (
                            <motion.button whileHover={{ scale: 1.04 }} style={S.joinBtn}>
                              <Video size={12} style={{ marginRight: 5 }} /> Join
                            </motion.button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Book modal */}
              <AnimatePresence>
                {bookOpen && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={S.modalOverlay}
                    onClick={() => setBookOpen(false)}
                  >
                    <motion.div
                      initial={{ scale: 0.9, y: 40 }}
                      animate={{ scale: 1, y: 0 }}
                      exit={{ scale: 0.9, y: 40 }}
                      style={S.modal}
                      onClick={e => e.stopPropagation()}
                    >
                      <div style={S.modalHeader}>
                        <div style={S.modalTitle}><CalendarCheck size={18} color="#00d4aa" style={{ marginRight: 10 }} />Book an Appointment</div>
                        <button style={S.modalClose} onClick={() => setBookOpen(false)}>✕</button>
                      </div>
                      <form onSubmit={handleBook} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                        <div style={S.modalField}>
                          <label style={S.modalLabel}><Calendar size={13} style={{ marginRight: 6 }} />Preferred Date</label>
                          <input type="date" value={bookForm.date} onChange={e => setBookForm({ ...bookForm, date: e.target.value })} style={S.modalInput} required />
                        </div>
                        <div style={S.modalField}>
                          <label style={S.modalLabel}><Clock size={13} style={{ marginRight: 6 }} />Preferred Time</label>
                          <input type="time" value={bookForm.time} onChange={e => setBookForm({ ...bookForm, time: e.target.value })} style={S.modalInput} required />
                        </div>
                        <div style={S.modalField}>
                          <label style={S.modalLabel}><Video size={13} style={{ marginRight: 6 }} />Session Mode</label>
                          <select value={bookForm.mode} onChange={e => setBookForm({ ...bookForm, mode: e.target.value })} style={S.modalInput}>
                            <option>Video Call</option>
                            <option>Phone Call</option>
                            <option>In Person</option>
                          </select>
                        </div>
                        <div style={S.modalField}>
                          <label style={S.modalLabel}><MessageSquare size={13} style={{ marginRight: 6 }} />Notes (optional)</label>
                          <textarea
                            value={bookForm.notes}
                            onChange={e => setBookForm({ ...bookForm, notes: e.target.value })}
                            placeholder="What would you like to discuss?"
                            rows={3}
                            style={{ ...S.modalInput, resize: "vertical" }}
                          />
                        </div>
                        <div style={{ display: "flex", gap: 12 }}>
                          <button type="button" onClick={() => setBookOpen(false)} style={S.modalCancelBtn}>Cancel</button>
                          <motion.button type="submit" whileHover={{ scale: 1.03, boxShadow: "0 0 24px #00d4aa55" }} style={S.modalSubmitBtn}>
                            <CalendarCheck size={15} style={{ marginRight: 8 }} /> Confirm Booking
                          </motion.button>
                        </div>
                      </form>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

        </AnimatePresence>
      </main>
    </div>
  );
}

/* ─── Missing icon import helper ─────────────────────────────────────────── */
function BookOpen({ size, color, style }) {
  return <GraduationCap size={size} color={color} style={style} />;
}
function Clock2({ size, color, style }) {
  return <Clock size={size} color={color} style={style} />;
}

/* ─── STYLES ──────────────────────────────────────────────────────────────── */
const S = {
  page: { display: "flex", minHeight: "100vh", background: "#04080f", fontFamily: "'Sora','Segoe UI',sans-serif", color: "#e8e2d8", overflowX: "hidden" },
  orb1: { position: "fixed", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, #00d4aa0a, transparent 70%)", top: "-100px", left: "200px", filter: "blur(80px)", pointerEvents: "none", zIndex: 0 },
  orb2: { position: "fixed", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, #4da6ff08, transparent 70%)", bottom: "-80px", right: "-80px", filter: "blur(70px)", pointerEvents: "none", zIndex: 0 },

  /* Sidebar */
  sidebar: { width: 260, flexShrink: 0, background: "#060d1a", borderRight: "1px solid #ffffff0a", display: "flex", flexDirection: "column", padding: "24px 16px", position: "sticky", top: 0, height: "100vh", overflowY: "auto", zIndex: 10 },
  sidebarLogo: { display: "flex", alignItems: "center", gap: 10, cursor: "pointer", marginBottom: 28, padding: "0 8px" },
  sidebarLogoIcon: { width: 36, height: 36, background: "linear-gradient(135deg,#00d4aa,#00b894)", borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 },
  sidebarLogoText: { fontSize: "1.1rem", fontWeight: 800, color: "#00d4aa", lineHeight: 1 },
  sidebarLogoSub: { fontSize: "0.7rem", color: "#444", marginTop: 2 },

  profilePill: { display: "flex", alignItems: "center", gap: 10, background: "#ffffff06", border: "1px solid #ffffff0a", borderRadius: 12, padding: "12px 14px", marginBottom: 28 },
  profileAvatar: { width: 38, height: 38, borderRadius: "50%", background: "linear-gradient(135deg,#00d4aa,#4da6ff)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "0.85rem", color: "#04080f", flexShrink: 0 },
  profileName: { fontSize: "0.85rem", fontWeight: 700, color: "#ccc", lineHeight: 1 },
  profileCourse: { fontSize: "0.72rem", color: "#555", marginTop: 4 },

  sideNav: { display: "flex", flexDirection: "column", gap: 4, flex: 1 },
  sideNavBtn: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "11px 14px", borderRadius: 10, border: "none", background: "transparent", color: "#555", fontSize: "0.85rem", fontWeight: 500, cursor: "pointer", transition: "all 0.2s", fontFamily: "inherit", textAlign: "left" },
  sideNavBtnActive: { background: "#00d4aa15", color: "#00d4aa", fontWeight: 700, border: "1px solid #00d4aa22" },

  counsellorCard: { background: "#0a1628", border: "1px solid #ffffff0a", borderRadius: 12, padding: 14, marginTop: 24 },
  counsellorLabel: { fontSize: "0.68rem", color: "#444", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 6 },
  counsellorName: { color: "#ccc", fontSize: "0.82rem", fontWeight: 600, display: "flex", alignItems: "center" },
  contactBtn: { flex: 1, background: "#ffffff07", border: "1px solid #ffffff0a", borderRadius: 8, padding: "8px 0", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#555", transition: "all 0.2s" },
  logoutBtn: { display: "flex", alignItems: "center", margin: "16px 0 0", padding: "10px 14px", background: "transparent", border: "1px solid #ffffff0a", borderRadius: 10, color: "#444", fontSize: "0.82rem", cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s" },

  /* Main */
  main: { flex: 1, padding: "0 32px 40px", overflowY: "auto", zIndex: 1 },

  topBar: { position: "sticky", top: 0, zIndex: 50, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 0 18px", background: "rgba(4,8,15,0.92)", backdropFilter: "blur(12px)", marginBottom: 28, borderBottom: "1px solid #ffffff07" },
  topBarTitle: { fontSize: "1.4rem", fontWeight: 800, color: "#f0ece4", letterSpacing: "-0.5px" },
  topBarSub: { fontSize: "0.78rem", color: "#555", marginTop: 3 },
  topBarRight: { display: "flex", alignItems: "center", gap: 12 },
  searchBox: { display: "flex", alignItems: "center", gap: 8, background: "#ffffff06", border: "1px solid #ffffff0a", borderRadius: 8, padding: "8px 14px" },
  searchInput: { background: "transparent", border: "none", outline: "none", color: "#ccc", fontSize: "0.82rem", width: 140 },
  iconBtn: { width: 36, height: 36, background: "#ffffff06", border: "1px solid #ffffff0a", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" },
  topAvatar: { width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#00d4aa,#4da6ff)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "0.78rem", color: "#04080f" },

  /* Journey banner */
  journeyBanner: { background: "linear-gradient(135deg, #00d4aa0f, #4da6ff0a)", border: "1px solid #00d4aa22", borderRadius: 18, padding: "28px 32px", marginBottom: 28, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 24, flexWrap: "wrap" },
  journeyBannerLeft: { flex: 1 },
  journeyBannerTag: { display: "inline-flex", alignItems: "center", background: "#00d4aa15", border: "1px solid #00d4aa33", color: "#00d4aa", padding: "4px 12px", borderRadius: 20, fontSize: "0.72rem", marginBottom: 10 },
  journeyBannerTitle: { fontSize: "1.2rem", fontWeight: 800, color: "#f0ece4", letterSpacing: "-0.3px", marginBottom: 6 },
  journeyBannerSub: { color: "#666", fontSize: "0.82rem" },
  journeyProgress: { display: "flex", alignItems: "center", gap: 0 },
  journeyStep: { display: "flex", flexDirection: "column", alignItems: "center", position: "relative" },
  journeyDot: { width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1, transition: "all 0.3s" },
  journeyLine: { position: "absolute", top: 14, left: "100%", width: 28, height: 2, zIndex: 0 },
  journeyStepLabel: { fontSize: "0.62rem", marginTop: 6, textAlign: "center", fontWeight: 600, letterSpacing: "0.3px", width: 56 },

  /* Stats */
  statsRow: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 16, marginBottom: 28 },
  statCard: { background: "#0a1628", border: "1px solid #ffffff0a", borderRadius: 14, padding: "20px 18px", transition: "all 0.25s" },
  statIconWrap: { width: 40, height: 40, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 },
  statValue: { fontSize: "1.7rem", fontWeight: 900, color: "#f0ece4", lineHeight: 1, marginBottom: 4 },
  statLabel: { color: "#555", fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" },
  statSub: { color: "#444", fontSize: "0.7rem", marginTop: 4 },

  /* Cards */
  card: { background: "#0a1628", border: "1px solid #ffffff0a", borderRadius: 16, padding: "22px 24px", marginBottom: 20 },
  cardHeader: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 },
  cardTitle: { display: "flex", alignItems: "center", fontSize: "0.9rem", fontWeight: 700, color: "#ccc" },
  twoCol: { display: "grid", gridTemplateColumns: "1fr 380px", gap: 20 },

  /* Activity */
  activityRow: { display: "flex", alignItems: "center", gap: 12, padding: "12px 0" },
  activityIcon: { width: 32, height: 32, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  activityText: { color: "#ccc", fontSize: "0.82rem", fontWeight: 500 },
  activityTime: { color: "#444", fontSize: "0.72rem", marginTop: 2 },

  /* Profile rows */
  profileRow: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid #ffffff06" },
  actionItem: { display: "flex", alignItems: "center", gap: 10 },
  actionDot: { width: 8, height: 8, borderRadius: "50%", flexShrink: 0 },

  /* Applications */
  appCard: { background: "#0a1628", border: "1px solid", borderRadius: 16, padding: "22px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 20, flexWrap: "wrap" },
  appCardLeft: { display: "flex", alignItems: "center", gap: 16 },
  appUniFlagWrap: { width: 50, height: 50, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  appUniName: { fontSize: "1rem", fontWeight: 700, color: "#f0ece4", marginBottom: 6 },
  appMeta: { display: "flex", alignItems: "center", gap: 4, fontSize: "0.78rem", color: "#666", flexWrap: "wrap" },
  appMetaDot: { color: "#333", margin: "0 2px" },
  appId: { color: "#444", fontSize: "0.7rem", marginTop: 4 },
  appCardRight: { display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 },
  appFee: { fontSize: "0.9rem", fontWeight: 700, color: "#00d4aa" },
  viewLetterBtn: { background: "#00d4aa15", border: "1px solid #00d4aa33", color: "#00d4aa", padding: "6px 14px", borderRadius: 8, fontSize: "0.75rem", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", fontFamily: "inherit" },
  infoBox: { background: "#4da6ff0a", border: "1px solid #4da6ff22", borderRadius: 12, padding: "14px 18px", display: "flex", alignItems: "flex-start" },

  /* Documents */
  progressBg: { height: 8, background: "#ffffff08", borderRadius: 10, overflow: "hidden" },
  progressFill: { height: "100%", background: "linear-gradient(90deg, #00d4aa, #4da6ff)", borderRadius: 10 },
  docTable: { width: "100%", overflowX: "auto" },
  docTableHead: { display: "grid", gridTemplateColumns: "2fr 120px 80px 130px 100px", gap: 12, padding: "0 0 10px", borderBottom: "1px solid #ffffff0a", fontSize: "0.7rem", color: "#444", letterSpacing: "1px", textTransform: "uppercase" },
  docTableRow: { display: "grid", gridTemplateColumns: "2fr 120px 80px 130px 100px", gap: 12, padding: "12px 0", alignItems: "center" },
  docActionBtn: { width: 30, height: 30, background: "#ffffff06", border: "1px solid #ffffff0a", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" },
  missingGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 14 },
  missingCard: { background: "#060d1a", border: "1px solid", borderRadius: 12, padding: "18px 14px", display: "flex", flexDirection: "column", alignItems: "center", transition: "all 0.2s" },
  uploadBtn: { background: "#00d4aa15", border: "1px solid #00d4aa33", color: "#00d4aa", padding: "7px 14px", borderRadius: 8, fontSize: "0.75rem", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", fontFamily: "inherit" },

  /* Payments */
  payRow: { display: "flex", alignItems: "center", gap: 16, padding: "16px 0" },
  payIconWrap: { width: 44, height: 44, borderRadius: 11, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  exportBtn: { background: "#ffffff06", border: "1px solid #ffffff0a", color: "#666", padding: "6px 14px", borderRadius: 8, fontSize: "0.75rem", cursor: "pointer", display: "flex", alignItems: "center", fontFamily: "inherit" },

  /* Appointments */
  bookBtn: { background: "#00d4aa", border: "none", color: "#04080f", padding: "11px 22px", borderRadius: 10, fontWeight: 800, fontSize: "0.88rem", cursor: "pointer", display: "flex", alignItems: "center", fontFamily: "inherit" },
  aptCard: { background: "#0a1628", border: "1px solid", borderRadius: 16, overflow: "hidden", display: "flex", flexWrap: "wrap" },
  aptLeft: { display: "flex", alignItems: "center", gap: 16, padding: "20px 24px", minWidth: 260 },
  aptAvatar: { width: 52, height: 52, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  aptCounsellorName: { fontSize: "0.95rem", fontWeight: 700, color: "#f0ece4" },
  aptCounsellorRole: { color: "#00d4aa", fontSize: "0.75rem", marginTop: 3 },
  aptRight: { flex: 1, padding: "20px 24px", borderLeft: "1px solid #ffffff07" },
  aptInfoRow: { display: "flex", gap: 20, flexWrap: "wrap", marginBottom: 10 },
  aptInfoItem: { display: "flex", alignItems: "center", color: "#777", fontSize: "0.8rem" },
  aptNotes: { display: "flex", alignItems: "flex-start", color: "#555", fontSize: "0.78rem", background: "#ffffff04", padding: "8px 12px", borderRadius: 8, lineHeight: 1.5 },
  joinBtn: { background: "#4da6ff15", border: "1px solid #4da6ff33", color: "#4da6ff", padding: "5px 14px", borderRadius: 8, fontSize: "0.75rem", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", fontFamily: "inherit" },

  /* Modal */
  modalOverlay: { position: "fixed", inset: 0, background: "rgba(4,8,15,0.85)", backdropFilter: "blur(8px)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 },
  modal: { background: "#0a1628", border: "1px solid #00d4aa33", borderRadius: 20, padding: "32px 36px", width: "100%", maxWidth: 480, zIndex: 201 },
  modalHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 },
  modalTitle: { display: "flex", alignItems: "center", fontSize: "1.1rem", fontWeight: 800, color: "#f0ece4" },
  modalClose: { background: "#ffffff08", border: "none", color: "#666", width: 30, height: 30, borderRadius: "50%", cursor: "pointer", fontSize: "0.85rem", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "inherit" },
  modalField: { display: "flex", flexDirection: "column", gap: 7 },
  modalLabel: { fontSize: "0.8rem", color: "#777", fontWeight: 600, display: "flex", alignItems: "center" },
  modalInput: { background: "#060d1a", border: "1px solid #ffffff10", borderRadius: 10, padding: "11px 14px", color: "#ccc", fontSize: "0.88rem", outline: "none", fontFamily: "inherit" },
  modalCancelBtn: { flex: 1, background: "#ffffff07", border: "1px solid #ffffff10", color: "#666", padding: 13, borderRadius: 10, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" },
  modalSubmitBtn: { flex: 2, background: "#00d4aa", border: "none", color: "#04080f", padding: 13, borderRadius: 10, fontWeight: 800, cursor: "pointer", fontSize: "0.9rem", fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center" },
};