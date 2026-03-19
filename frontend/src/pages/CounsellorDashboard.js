import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Users, CalendarCheck, FileText,
  CheckCircle, Clock, XCircle, AlertCircle,
  LogOut, Bell, Search, Eye, Phone, Mail,
  Stethoscope, ChevronRight, Video, MessageSquare,
  Calendar, TrendingUp, UserCheck, Star,
  Download, RefreshCw, Shield, Globe
} from "lucide-react";

/* ─── MOCK DATA ────────────────────────────────────────────────────────────── */
const mockCounsellor = {
  firstName: "Priya",
  lastName: "Sharma",
  email: "priya.sharma@medident.in",
  phone: "+91 98765 00001",
  specialization: "MBBS Abroad · Visa Specialist",
  status: "Active",
};

const mockStudents = [
  { id: "STU-001", firstName: "Arjun",   lastName: "Mehta",  email: "arjun@gmail.com",  phone: "+91 98765 43210", course: "MBBS", targetCountry: "Russia",  status: "active",   joinedDate: "Jan 2025", docsApproved: 4, docsTotal: 10, appStatus: "Accepted" },
  { id: "STU-002", firstName: "Sneha",   lastName: "Patel",  email: "sneha@gmail.com",  phone: "+91 91234 56789", course: "BDS",  targetCountry: "Georgia", status: "active",   joinedDate: "Feb 2025", docsApproved: 7, docsTotal: 10, appStatus: "Under Review" },
  { id: "STU-003", firstName: "Rohan",   lastName: "Verma",  email: "rohan@gmail.com",  phone: "+91 99887 76655", course: "MBBS", targetCountry: "Ukraine", status: "inactive", joinedDate: "Mar 2025", docsApproved: 2, docsTotal: 10, appStatus: "Applied" },
  { id: "STU-004", firstName: "Ananya",  lastName: "Singh",  email: "ananya@gmail.com", phone: "+91 88776 54321", course: "MBBS", targetCountry: "Russia",  status: "active",   joinedDate: "Mar 2025", docsApproved: 9, docsTotal: 10, appStatus: "Accepted" },
];

const mockAppointments = [
  { id: "APT-001", studentName: "Arjun Mehta",   date: "22 Mar 2025", time: "11:00 AM", mode: "Video Call",  status: "completed", notes: "Discussed university shortlist." },
  { id: "APT-002", studentName: "Sneha Patel",   date: "28 Mar 2025", time: "3:00 PM",  mode: "Video Call",  status: "accepted",  notes: "Visa document review." },
  { id: "APT-003", studentName: "Rohan Verma",   date: "05 Apr 2025", time: "10:00 AM", mode: "Phone Call",  status: "pending",   notes: "Pre-departure orientation." },
  { id: "APT-004", studentName: "Ananya Singh",  date: "08 Apr 2025", time: "2:00 PM",  mode: "Video Call",  status: "pending",   notes: "Application status review." },
];

const mockDocuments = [
  { id: "DOC-001", student: "Arjun Mehta",  type: "Passport",    status: "pending",  uploaded: "10 Mar 2025" },
  { id: "DOC-002", student: "Sneha Patel",  type: "SOP",         status: "pending",  uploaded: "12 Mar 2025" },
  { id: "DOC-003", student: "Rohan Verma",  type: "Marksheet",   status: "approved", uploaded: "09 Mar 2025" },
  { id: "DOC-004", student: "Ananya Singh", type: "Bank Statement", status: "pending", uploaded: "14 Mar 2025" },
];

/* ─── STATUS CONFIG ─────────────────────────────────────────────────────────── */
const aptStatusConfig = {
  completed: { color: "#00d4aa", bg: "#00d4aa15", border: "#00d4aa33", label: "Completed" },
  accepted:  { color: "#4da6ff", bg: "#4da6ff15", border: "#4da6ff33", label: "Accepted" },
  pending:   { color: "#f4c430", bg: "#f4c43015", border: "#f4c43033", label: "Pending" },
  rejected:  { color: "#ef4444", bg: "#ef444415", border: "#ef444433", label: "Rejected" },
};

const docStatusConfig = {
  approved: { color: "#00d4aa", bg: "#00d4aa15", border: "#00d4aa33", label: "Approved" },
  pending:  { color: "#f4c430", bg: "#f4c43015", border: "#f4c43033", label: "Pending" },
  rejected: { color: "#ef4444", bg: "#ef444415", border: "#ef444433", label: "Rejected" },
};

/* ─── HELPERS ───────────────────────────────────────────────────────────────── */
function StatusBadge({ status, config }) {
  const c = config[status] || config["pending"];
  return (
    <span style={{ background: c.bg, border: `1px solid ${c.border}`, color: c.color, padding: "3px 10px", borderRadius: 20, fontSize: "0.72rem", fontWeight: 700, display: "inline-block" }}>
      {c.label}
    </span>
  );
}

function StatCard({ icon, label, value, sub, color = "#00d4aa" }) {
  return (
    <motion.div whileHover={{ y: -4, boxShadow: `0 16px 40px ${color}18` }}
      style={{ ...S.statCard, borderColor: `${color}22` }}>
      <div style={{ ...S.statIconWrap, background: `${color}15` }}>{icon}</div>
      <div style={S.statValue}>{value}</div>
      <div style={S.statLabel}>{label}</div>
      {sub && <div style={S.statSub}>{sub}</div>}
    </motion.div>
  );
}

/* ─── MAIN COMPONENT ─────────────────────────────────────────────────────────── */
export default function CounsellorDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [apts, setApts] = useState(mockAppointments);
  const [docs, setDocs] = useState(mockDocuments);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const tabs = [
    { id: "overview",     label: "Overview",     icon: <LayoutDashboard size={15} /> },
    { id: "students",     label: "My Students",  icon: <Users           size={15} /> },
    { id: "appointments", label: "Appointments", icon: <CalendarCheck   size={15} /> },
    { id: "documents",    label: "Documents",    icon: <FileText        size={15} /> },
  ];

  const updateApt = (id, status) => setApts(prev => prev.map(a => a.id === id ? { ...a, status } : a));
  const updateDoc = (id, status) => setDocs(prev => prev.map(d => d.id === id ? { ...d, status } : d));

  const pendingApts = apts.filter(a => a.status === "pending").length;
  const pendingDocs = docs.filter(d => d.status === "pending").length;
  const activeStudents = mockStudents.filter(s => s.status === "active").length;

  return (
    <div style={S.page}>
      <div style={S.orb1} /><div style={S.orb2} />

      {/* ── SIDEBAR ── */}
      <aside style={S.sidebar}>
        <div style={S.sidebarLogo} onClick={() => navigate("/")}>
          <div style={S.sidebarLogoIcon}>🦷</div>
          <div>
            <div style={S.sidebarLogoText}>MediDent</div>
            <div style={S.sidebarLogoSub}>Counsellor Portal</div>
          </div>
        </div>

        <div style={S.profilePill}>
          <div style={S.profileAvatar}>{mockCounsellor.firstName[0]}{mockCounsellor.lastName[0]}</div>
          <div>
            <div style={S.profileName}>{mockCounsellor.firstName} {mockCounsellor.lastName}</div>
            <div style={S.profileCourse}>{mockCounsellor.specialization}</div>
          </div>
        </div>

        <nav style={S.sideNav}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)}
              style={{ ...S.sideNavBtn, ...(activeTab === t.id ? S.sideNavBtnActive : {}) }}>
              <span style={{ display: "flex", alignItems: "center", gap: 10 }}>{t.icon} {t.label}</span>
              {activeTab === t.id && <ChevronRight size={14} />}
            </button>
          ))}
        </nav>

        {/* Alerts */}
        <div style={S.alertCard}>
          <div style={S.alertTitle}><AlertCircle size={13} color="#f4c430" style={{ marginRight: 6 }} /> Pending Actions</div>
          {pendingApts > 0 && <div style={S.alertItem}><div style={{ ...S.alertDot, background: "#f4c430" }} />{pendingApts} appointment{pendingApts > 1 ? "s" : ""} to review</div>}
          {pendingDocs > 0 && <div style={S.alertItem}><div style={{ ...S.alertDot, background: "#4da6ff" }} />{pendingDocs} document{pendingDocs > 1 ? "s" : ""} to verify</div>}
          {pendingApts === 0 && pendingDocs === 0 && <div style={{ color: "#00d4aa", fontSize: "0.78rem" }}>✅ All caught up!</div>}
        </div>

        <button style={S.logoutBtn} onClick={() => navigate("/login")}>
          <LogOut size={15} style={{ marginRight: 8 }} /> Sign Out
        </button>
      </aside>

      {/* ── MAIN ── */}
      <main style={S.main}>
        <div style={S.topBar}>
          <div>
            <div style={S.topBarTitle}>{tabs.find(t => t.id === activeTab)?.label}</div>
            <div style={S.topBarSub}>Welcome back, {mockCounsellor.firstName} 👋</div>
          </div>
          <div style={S.topBarRight}>
            <div style={S.searchBox}>
              <Search size={14} color="#555" />
              <input placeholder="Search..." style={S.searchInput} />
            </div>
            <button style={S.iconBtn}><Bell size={16} color="#555" /></button>
            <div style={S.topAvatar}>{mockCounsellor.firstName[0]}{mockCounsellor.lastName[0]}</div>
          </div>
        </div>

        <AnimatePresence mode="wait">

          {/* ════════ OVERVIEW ════════ */}
          {activeTab === "overview" && (
            <motion.div key="overview" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }}>

              <div style={S.statsRow}>
                <StatCard icon={<Users         size={20} color="#00d4aa" />} label="My Students"    value={mockStudents.length}  sub={`${activeStudents} active`}      color="#00d4aa" />
                <StatCard icon={<CalendarCheck size={20} color="#4da6ff" />} label="Appointments"   value={apts.length}          sub={`${pendingApts} pending`}         color="#4da6ff" />
                <StatCard icon={<FileText      size={20} color="#f4c430" />} label="Docs to Review" value={pendingDocs}          sub="awaiting verification"            color="#f4c430" />
                <StatCard icon={<CheckCircle   size={20} color="#a855f7" />} label="Completed"      value={apts.filter(a=>a.status==="completed").length} sub="sessions" color="#a855f7" />
              </div>

              {/* Two columns */}
              <div style={S.twoCol}>
                {/* Recent appointments */}
                <div style={S.card}>
                  <div style={S.cardHeader}>
                    <div style={S.cardTitle}><CalendarCheck size={15} color="#00d4aa" style={{ marginRight: 8 }} /> Recent Appointments</div>
                  </div>
                  {apts.slice(0, 4).map((a, i) => {
                    const cfg = aptStatusConfig[a.status];
                    return (
                      <div key={a.id} style={{ ...S.activityRow, borderBottom: i < 3 ? "1px solid #ffffff07" : "none" }}>
                        <div style={{ ...S.activityIcon, background: `${cfg.color}15` }}>
                          <CalendarCheck size={14} color={cfg.color} />
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={S.activityText}>{a.studentName}</div>
                          <div style={S.activityTime}>{a.date} · {a.time} · {a.mode}</div>
                        </div>
                        <StatusBadge status={a.status} config={aptStatusConfig} />
                      </div>
                    );
                  })}
                </div>

                {/* Right column */}
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {/* Profile */}
                  <div style={S.card}>
                    <div style={S.cardHeader}>
                      <div style={S.cardTitle}><Shield size={15} color="#00d4aa" style={{ marginRight: 8 }} /> My Profile</div>
                    </div>
                    {[
                      { label: "Email",          val: mockCounsellor.email,          icon: <Mail        size={13} color="#555" /> },
                      { label: "Phone",          val: mockCounsellor.phone,          icon: <Phone       size={13} color="#555" /> },
                      { label: "Specialization", val: mockCounsellor.specialization, icon: <Stethoscope size={13} color="#555" /> },
                      { label: "Status",         val: mockCounsellor.status,         icon: <CheckCircle size={13} color="#555" /> },
                    ].map((r, i) => (
                      <div key={i} style={S.profileRow}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#555", fontSize: "0.8rem" }}>{r.icon} {r.label}</div>
                        <div style={{ color: "#ccc", fontSize: "0.82rem", fontWeight: 500 }}>{r.val}</div>
                      </div>
                    ))}
                  </div>

                  {/* Pending docs */}
                  <div style={S.card}>
                    <div style={{ ...S.cardTitle, marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
                      <AlertCircle size={15} color="#f4c430" /> Documents Pending
                    </div>
                    {docs.filter(d => d.status === "pending").map((d, i) => (
                      <div key={i} style={S.actionItem}>
                        <div style={{ ...S.alertDot, background: "#f4c430" }} />
                        <span style={{ color: "#ccc", fontSize: "0.82rem" }}>{d.student} — {d.type}</span>
                      </div>
                    ))}
                    {docs.filter(d => d.status === "pending").length === 0 && (
                      <div style={{ color: "#00d4aa", fontSize: "0.78rem" }}>✅ No pending documents!</div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ════════ STUDENTS ════════ */}
          {activeTab === "students" && (
            <motion.div key="students" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }}>
              <div style={S.statsRow}>
                <StatCard icon={<Users      size={20} color="#00d4aa" />} label="Total Students"  value={mockStudents.length}                                          color="#00d4aa" />
                <StatCard icon={<UserCheck  size={20} color="#10b981" />} label="Active"          value={mockStudents.filter(s=>s.status==="active").length}           color="#10b981" />
                <StatCard icon={<CheckCircle size={20} color="#4da6ff" />} label="Admitted"       value={mockStudents.filter(s=>s.appStatus==="Accepted").length}      color="#4da6ff" />
                <StatCard icon={<Clock      size={20} color="#f4c430" />} label="In Progress"     value={mockStudents.filter(s=>s.appStatus!=="Accepted").length}      color="#f4c430" />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {mockStudents.map((st, i) => (
                  <motion.div key={st.id}
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                    style={S.studentCard}>
                    <div style={S.studentLeft}>
                      <div style={S.studentAvatar}>{st.firstName[0]}{st.lastName[0]}</div>
                      <div>
                        <div style={S.studentName}>{st.firstName} {st.lastName}</div>
                        <div style={S.studentMeta}>
                          <Mail size={12} color="#555" style={{ marginRight: 4 }} />{st.email}
                        </div>
                        <div style={S.studentMeta}>
                          <Globe size={12} color="#555" style={{ marginRight: 4 }} />{st.course} · {st.targetCountry}
                        </div>
                      </div>
                    </div>
                    <div style={S.studentRight}>
                      {/* Doc progress */}
                      <div style={{ minWidth: 140 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.72rem", color: "#555", marginBottom: 6 }}>
                          <span>Documents</span>
                          <span style={{ color: "#00d4aa" }}>{st.docsApproved}/{st.docsTotal}</span>
                        </div>
                        <div style={S.progressBg}>
                          <div style={{ ...S.progressFill, width: `${(st.docsApproved / st.docsTotal) * 100}%` }} />
                        </div>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
                        <span style={{ background: st.status === "active" ? "#00d4aa18" : "#ef444415", border: `1px solid ${st.status === "active" ? "#00d4aa33" : "#ef444433"}`, color: st.status === "active" ? "#00d4aa" : "#ef4444", padding: "3px 10px", borderRadius: 20, fontSize: "0.72rem", fontWeight: 700 }}>
                          {st.status === "active" ? "Active" : "Inactive"}
                        </span>
                        <span style={{ background: "#4da6ff15", border: "1px solid #4da6ff33", color: "#4da6ff", padding: "3px 10px", borderRadius: 20, fontSize: "0.72rem", fontWeight: 700 }}>
                          {st.appStatus}
                        </span>
                      </div>
                      <div style={{ display: "flex", gap: 8 }}>
                        <button style={S.docActionBtn} title="Call"><Phone size={14} color="#555" /></button>
                        <button style={S.docActionBtn} title="Email"><Mail size={14} color="#555" /></button>
                        <button style={{ ...S.docActionBtn, borderColor: "#00d4aa33", color: "#00d4aa" }} title="View"><Eye size={14} /></button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ════════ APPOINTMENTS ════════ */}
          {activeTab === "appointments" && (
            <motion.div key="appointments" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }}>
              <div style={S.statsRow}>
                <StatCard icon={<CalendarCheck size={20} color="#00d4aa" />} label="Total"     value={apts.length}                                          color="#00d4aa" />
                <StatCard icon={<Clock         size={20} color="#f4c430" />} label="Pending"   value={apts.filter(a=>a.status==="pending").length}          color="#f4c430" />
                <StatCard icon={<CheckCircle   size={20} color="#4da6ff" />} label="Accepted"  value={apts.filter(a=>a.status==="accepted").length}         color="#4da6ff" />
                <StatCard icon={<CheckCircle   size={20} color="#10b981" />} label="Completed" value={apts.filter(a=>a.status==="completed").length}        color="#10b981" />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {apts.map((apt, i) => {
                  const cfg = aptStatusConfig[apt.status];
                  return (
                    <motion.div key={apt.id}
                      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                      style={{ ...S.aptCard, borderColor: `${cfg.color}33` }}>
                      <div style={{ ...S.aptLeft, background: `${cfg.color}10` }}>
                        <div style={{ ...S.aptAvatar, background: `${cfg.color}20`, border: `2px solid ${cfg.color}44` }}>
                          <Users size={22} color={cfg.color} />
                        </div>
                        <div>
                          <div style={S.aptCounsellorName}>{apt.studentName}</div>
                          <div style={{ color: cfg.color, fontSize: "0.75rem", marginTop: 3 }}>Student</div>
                        </div>
                      </div>
                      <div style={S.aptRight}>
                        <div style={S.aptInfoRow}>
                          <div style={S.aptInfoItem}><Calendar size={13} color="#555" style={{ marginRight: 5 }} />{apt.date}</div>
                          <div style={S.aptInfoItem}><Clock    size={13} color="#555" style={{ marginRight: 5 }} />{apt.time}</div>
                          <div style={S.aptInfoItem}><Video    size={13} color="#555" style={{ marginRight: 5 }} />{apt.mode}</div>
                        </div>
                        {apt.notes && (
                          <div style={S.aptNotes}>
                            <MessageSquare size={12} color="#444" style={{ marginRight: 6, flexShrink: 0 }} />
                            {apt.notes}
                          </div>
                        )}
                        <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 10, flexWrap: "wrap" }}>
                          <StatusBadge status={apt.status} config={aptStatusConfig} />
                          <span style={{ color: "#444", fontSize: "0.72rem" }}>{apt.id}</span>
                          {apt.status === "pending" && (
                            <div style={{ display: "flex", gap: 8 }}>
                              <button onClick={() => updateApt(apt.id, "accepted")}
                                style={{ background: "#00d4aa18", border: "1px solid #00d4aa44", color: "#00d4aa", padding: "5px 12px", borderRadius: 6, cursor: "pointer", fontSize: "0.78rem", fontWeight: 700, fontFamily: "inherit", display: "flex", alignItems: "center", gap: 4 }}>
                                <CheckCircle size={12} /> Accept
                              </button>
                              <button onClick={() => updateApt(apt.id, "rejected")}
                                style={{ background: "#ef444415", border: "1px solid #ef444433", color: "#ef4444", padding: "5px 12px", borderRadius: 6, cursor: "pointer", fontSize: "0.78rem", fontWeight: 700, fontFamily: "inherit", display: "flex", alignItems: "center", gap: 4 }}>
                                <XCircle size={12} /> Reject
                              </button>
                            </div>
                          )}
                          {apt.status === "accepted" && (
                            <button style={{ background: "#4da6ff15", border: "1px solid #4da6ff33", color: "#4da6ff", padding: "5px 14px", borderRadius: 8, fontSize: "0.75rem", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", fontFamily: "inherit" }}>
                              <Video size={12} style={{ marginRight: 5 }} /> Join Call
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* ════════ DOCUMENTS ════════ */}
          {activeTab === "documents" && (
            <motion.div key="documents" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }}>
              <div style={S.statsRow}>
                <StatCard icon={<FileText    size={20} color="#00d4aa" />} label="Total Docs"  value={docs.length}                                      color="#00d4aa" />
                <StatCard icon={<Clock       size={20} color="#f4c430" />} label="Pending"     value={docs.filter(d=>d.status==="pending").length}      color="#f4c430" />
                <StatCard icon={<CheckCircle size={20} color="#10b981" />} label="Approved"    value={docs.filter(d=>d.status==="approved").length}     color="#10b981" />
                <StatCard icon={<XCircle     size={20} color="#ef4444" />} label="Rejected"    value={docs.filter(d=>d.status==="rejected").length}     color="#ef4444" />
              </div>

              <div style={S.card}>
                <div style={S.cardHeader}>
                  <div style={S.cardTitle}><FileText size={15} color="#00d4aa" style={{ marginRight: 8 }} /> Student Documents</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                  {docs.map((doc, i) => {
                    const cfg = docStatusConfig[doc.status];
                    return (
                      <motion.div key={doc.id}
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.06 }}
                        style={{ display: "flex", alignItems: "center", gap: 16, padding: "14px 0", borderBottom: i < docs.length - 1 ? "1px solid #ffffff07" : "none" }}>
                        <div style={{ width: 40, height: 40, borderRadius: 10, background: `${cfg.color}15`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <FileText size={18} color={cfg.color} />
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ color: "#ccc", fontSize: "0.88rem", fontWeight: 600 }}>{doc.type}</div>
                          <div style={{ color: "#555", fontSize: "0.75rem", marginTop: 2 }}>{doc.student} · {doc.id} · {doc.uploaded}</div>
                        </div>
                        <StatusBadge status={doc.status} config={docStatusConfig} />
                        <div style={{ display: "flex", gap: 8 }}>
                          <button style={S.docActionBtn}><Eye size={13} color="#555" /></button>
                          <button style={S.docActionBtn}><Download size={13} color="#555" /></button>
                          {doc.status === "pending" && (
                            <div style={{ display: "flex", gap: 6 }}>
                              <button onClick={() => updateDoc(doc.id, "approved")}
                                style={{ background: "#00d4aa18", border: "1px solid #00d4aa44", color: "#00d4aa", padding: "5px 10px", borderRadius: 6, cursor: "pointer", fontSize: "0.75rem", fontWeight: 700, fontFamily: "inherit" }}>
                                ✓ Approve
                              </button>
                              <button onClick={() => updateDoc(doc.id, "rejected")}
                                style={{ background: "#ef444415", border: "1px solid #ef444433", color: "#ef4444", padding: "5px 10px", borderRadius: 6, cursor: "pointer", fontSize: "0.75rem", fontWeight: 700, fontFamily: "inherit" }}>
                                ✕ Reject
                              </button>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>
    </div>
  );
}

/* ─── STYLES ─────────────────────────────────────────────────────────────────── */
const S = {
  page: { display: "flex", minHeight: "100vh", background: "#04080f", fontFamily: "'Sora','Segoe UI',sans-serif", color: "#e8e2d8", overflowX: "hidden" },
  orb1: { position: "fixed", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, #00d4aa0a, transparent 70%)", top: "-100px", left: "200px", filter: "blur(80px)", pointerEvents: "none", zIndex: 0 },
  orb2: { position: "fixed", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, #4da6ff08, transparent 70%)", bottom: "-80px", right: "-80px", filter: "blur(70px)", pointerEvents: "none", zIndex: 0 },

  sidebar: { width: 260, flexShrink: 0, background: "#060d1a", borderRight: "1px solid #ffffff0a", display: "flex", flexDirection: "column", padding: "24px 16px", position: "sticky", top: 0, height: "100vh", overflowY: "auto", zIndex: 10 },
  sidebarLogo: { display: "flex", alignItems: "center", gap: 10, cursor: "pointer", marginBottom: 28, padding: "0 8px" },
  sidebarLogoIcon: { width: 36, height: 36, background: "linear-gradient(135deg,#00d4aa,#00b894)", borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 },
  sidebarLogoText: { fontSize: "1.1rem", fontWeight: 800, color: "#00d4aa", lineHeight: 1 },
  sidebarLogoSub: { fontSize: "0.7rem", color: "#444", marginTop: 2 },
  profilePill: { display: "flex", alignItems: "center", gap: 10, background: "#ffffff06", border: "1px solid #ffffff0a", borderRadius: 12, padding: "12px 14px", marginBottom: 28 },
  profileAvatar: { width: 38, height: 38, borderRadius: "50%", background: "linear-gradient(135deg,#7c6cf5,#4da6ff)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "0.85rem", color: "#04080f", flexShrink: 0 },
  profileName: { fontSize: "0.85rem", fontWeight: 700, color: "#ccc", lineHeight: 1 },
  profileCourse: { fontSize: "0.68rem", color: "#555", marginTop: 4 },
  sideNav: { display: "flex", flexDirection: "column", gap: 4, flex: 1 },
  sideNavBtn: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "11px 14px", borderRadius: 10, border: "none", background: "transparent", color: "#555", fontSize: "0.85rem", fontWeight: 500, cursor: "pointer", transition: "all 0.2s", fontFamily: "inherit", textAlign: "left" },
  sideNavBtnActive: { background: "#00d4aa15", color: "#00d4aa", fontWeight: 700, border: "1px solid #00d4aa22" },
  alertCard: { background: "#0a1628", border: "1px solid #f4c43022", borderRadius: 12, padding: 14, marginTop: 24 },
  alertTitle: { fontSize: "0.72rem", color: "#f4c430", letterSpacing: "1px", textTransform: "uppercase", marginBottom: 10, display: "flex", alignItems: "center" },
  alertItem: { display: "flex", alignItems: "center", gap: 8, fontSize: "0.78rem", color: "#888", marginBottom: 6 },
  alertDot: { width: 7, height: 7, borderRadius: "50%", flexShrink: 0 },
  logoutBtn: { display: "flex", alignItems: "center", margin: "16px 0 0", padding: "10px 14px", background: "transparent", border: "1px solid #ffffff0a", borderRadius: 10, color: "#444", fontSize: "0.82rem", cursor: "pointer", fontFamily: "inherit" },

  main: { flex: 1, padding: "0 32px 40px", overflowY: "auto", zIndex: 1 },
  topBar: { position: "sticky", top: 0, zIndex: 50, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 0 18px", background: "rgba(4,8,15,0.92)", backdropFilter: "blur(12px)", marginBottom: 28, borderBottom: "1px solid #ffffff07" },
  topBarTitle: { fontSize: "1.4rem", fontWeight: 800, color: "#f0ece4", letterSpacing: "-0.5px" },
  topBarSub: { fontSize: "0.78rem", color: "#555", marginTop: 3 },
  topBarRight: { display: "flex", alignItems: "center", gap: 12 },
  searchBox: { display: "flex", alignItems: "center", gap: 8, background: "#ffffff06", border: "1px solid #ffffff0a", borderRadius: 8, padding: "8px 14px" },
  searchInput: { background: "transparent", border: "none", outline: "none", color: "#ccc", fontSize: "0.82rem", width: 140 },
  iconBtn: { width: 36, height: 36, background: "#ffffff06", border: "1px solid #ffffff0a", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" },
  topAvatar: { width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#7c6cf5,#4da6ff)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "0.78rem", color: "#04080f" },

  statsRow: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 16, marginBottom: 28 },
  statCard: { background: "#0a1628", border: "1px solid #ffffff0a", borderRadius: 14, padding: "20px 18px", transition: "all 0.25s" },
  statIconWrap: { width: 40, height: 40, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 },
  statValue: { fontSize: "1.7rem", fontWeight: 900, color: "#f0ece4", lineHeight: 1, marginBottom: 4 },
  statLabel: { color: "#555", fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" },
  statSub: { color: "#444", fontSize: "0.7rem", marginTop: 4 },

  card: { background: "#0a1628", border: "1px solid #ffffff0a", borderRadius: 16, padding: "22px 24px", marginBottom: 20 },
  cardHeader: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 },
  cardTitle: { display: "flex", alignItems: "center", fontSize: "0.9rem", fontWeight: 700, color: "#ccc" },
  twoCol: { display: "grid", gridTemplateColumns: "1fr 360px", gap: 20 },

  activityRow: { display: "flex", alignItems: "center", gap: 12, padding: "12px 0" },
  activityIcon: { width: 32, height: 32, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  activityText: { color: "#ccc", fontSize: "0.82rem", fontWeight: 500 },
  activityTime: { color: "#444", fontSize: "0.72rem", marginTop: 2 },

  profileRow: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid #ffffff06" },
  actionItem: { display: "flex", alignItems: "center", gap: 10, marginBottom: 8 },

  studentCard: { background: "#0a1628", border: "1px solid #ffffff0a", borderRadius: 16, padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 20, flexWrap: "wrap" },
  studentLeft: { display: "flex", alignItems: "center", gap: 16 },
  studentAvatar: { width: 48, height: 48, borderRadius: "50%", background: "linear-gradient(135deg,#00d4aa,#4da6ff)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "0.9rem", color: "#04080f", flexShrink: 0 },
  studentName: { fontSize: "0.95rem", fontWeight: 700, color: "#f0ece4", marginBottom: 4 },
  studentMeta: { display: "flex", alignItems: "center", color: "#555", fontSize: "0.78rem", marginTop: 2 },
  studentRight: { display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" },

  progressBg: { height: 6, background: "#ffffff08", borderRadius: 10, overflow: "hidden" },
  progressFill: { height: "100%", background: "linear-gradient(90deg, #00d4aa, #4da6ff)", borderRadius: 10, transition: "width 0.8s ease" },

  aptCard: { background: "#0a1628", border: "1px solid", borderRadius: 16, overflow: "hidden", display: "flex", flexWrap: "wrap" },
  aptLeft: { display: "flex", alignItems: "center", gap: 16, padding: "20px 24px", minWidth: 240 },
  aptAvatar: { width: 52, height: 52, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  aptCounsellorName: { fontSize: "0.95rem", fontWeight: 700, color: "#f0ece4" },
  aptRight: { flex: 1, padding: "20px 24px", borderLeft: "1px solid #ffffff07" },
  aptInfoRow: { display: "flex", gap: 20, flexWrap: "wrap", marginBottom: 10 },
  aptInfoItem: { display: "flex", alignItems: "center", color: "#777", fontSize: "0.8rem" },
  aptNotes: { display: "flex", alignItems: "flex-start", color: "#555", fontSize: "0.78rem", background: "#ffffff04", padding: "8px 12px", borderRadius: 8, lineHeight: 1.5 },

  docActionBtn: { width: 30, height: 30, background: "#ffffff06", border: "1px solid #ffffff0a", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" },
};