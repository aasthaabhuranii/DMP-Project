import { useState } from "react";
import {
  LayoutDashboard, Users, Calendar, University, BookOpen,
  FileText, CreditCard, UserCheck, LogOut, Bell, Search,
  Plus, Edit2, Trash2, Check, X, ChevronDown, TrendingUp,
  UserPlus, ClipboardList, Shield
} from "lucide-react";

// ── Dummy Data ────────────────────────────────────────────────────────────────
const STATS = [
  { label: "Total Students",     value: "1,284", change: "+12%", icon: <Users size={20} />,         color: "#00d4aa" },
  { label: "Counsellors",        value: "38",    change: "+3%",  icon: <UserCheck size={20} />,     color: "#7c6cf5" },
  { label: "Appointments Today", value: "24",    change: "+8%",  icon: <Calendar size={20} />,      color: "#f59e0b" },
  { label: "Revenue (₹)",        value: "4.2L",  change: "+21%", icon: <TrendingUp size={20} />,    color: "#ec4899" },
];

const USERS = [
  { id: 1, name: "Aarav Shah",      email: "aarav@gmail.com",     role: "student",    status: "active",   joined: "12 Jan 2025" },
  { id: 2, name: "Priya Mehta",     email: "priya@gmail.com",     role: "counsellor", status: "active",   joined: "08 Feb 2025" },
  { id: 3, name: "Rohan Verma",     email: "rohan@gmail.com",     role: "student",    status: "inactive", joined: "22 Mar 2025" },
  { id: 4, name: "Sneha Patel",     email: "sneha@gmail.com",     role: "student",    status: "active",   joined: "01 Apr 2025" },
  { id: 5, name: "Kiran Joshi",     email: "kiran@gmail.com",     role: "counsellor", status: "active",   joined: "15 Apr 2025" },
];

const APPOINTMENTS = [
  { id: 1, student: "Aarav Shah",   counsellor: "Priya Mehta",  date: "18 Mar 2026", time: "10:00 AM", status: "pending" },
  { id: 2, student: "Sneha Patel",  counsellor: "Kiran Joshi",  date: "19 Mar 2026", time: "2:00 PM",  status: "accepted" },
  { id: 3, student: "Rohan Verma",  counsellor: "Priya Mehta",  date: "20 Mar 2026", time: "11:00 AM", status: "completed" },
  { id: 4, student: "Dev Nair",     counsellor: "Kiran Joshi",  date: "21 Mar 2026", time: "3:30 PM",  status: "rejected" },
];

const UNIVERSITIES = [
  { id: 1, name: "Charles University",       country: "Czech Republic", ranking: 251, status: "active" },
  { id: 2, name: "University of Tartu",      country: "Estonia",        ranking: 401, status: "active" },
  { id: 3, name: "Semmelweis University",    country: "Hungary",        ranking: 601, status: "active" },
  { id: 4, name: "Medical University Sofia", country: "Bulgaria",       ranking: 801, status: "removed" },
];

const COURSES = [
  { id: 1, name: "MBBS",    university: "Charles University",    duration: "6 years", fee: 850000,  intake: "September" },
  { id: 2, name: "BDS",     university: "University of Tartu",   duration: "5 years", fee: 620000,  intake: "October" },
  { id: 3, name: "MD",      university: "Semmelweis University", duration: "6 years", fee: 1200000, intake: "September" },
];

const APPLICATIONS = [
  { id: 1, student: "Aarav Shah",  course: "MBBS", university: "Charles University",    status: "applied",   date: "10 Mar 2026" },
  { id: 2, student: "Sneha Patel", course: "BDS",  university: "University of Tartu",   status: "accepted",  date: "08 Mar 2026" },
  { id: 3, student: "Rohan Verma", course: "MD",   university: "Semmelweis University", status: "rejected",  date: "05 Mar 2026" },
];

const DOCUMENTS = [
  { id: 1, student: "Aarav Shah",  type: "Passport",   status: "pending",  uploaded: "12 Mar 2026" },
  { id: 2, student: "Aarav Shah",  type: "SOP",        status: "approved", uploaded: "12 Mar 2026" },
  { id: 3, student: "Sneha Patel", type: "Marksheet",  status: "pending",  uploaded: "10 Mar 2026" },
  { id: 4, student: "Rohan Verma", type: "Passport",   status: "rejected", uploaded: "09 Mar 2026" },
];

const PAYMENTS = [
  { id: 1, student: "Aarav Shah",  amount: 25000,  method: "UPI",         status: "success", date: "15 Mar 2026" },
  { id: 2, student: "Sneha Patel", amount: 50000,  method: "Card",        status: "success", date: "14 Mar 2026" },
  { id: 3, student: "Rohan Verma", amount: 15000,  method: "Net Banking", status: "failed",  date: "13 Mar 2026" },
];

const STUDENTS_LIST   = ["Aarav Shah", "Sneha Patel", "Rohan Verma", "Dev Nair"];
const COUNSELLORS_LIST = ["Priya Mehta", "Kiran Joshi"];

// ── Helpers ───────────────────────────────────────────────────────────────────
const StatusBadge = ({ status }) => {
  const map = {
    active:    { bg: "#00d4aa18", color: "#00d4aa", text: "Active" },
    inactive:  { bg: "#ff334422", color: "#ff6677", text: "Inactive" },
    pending:   { bg: "#f59e0b22", color: "#f59e0b", text: "Pending" },
    accepted:  { bg: "#00d4aa18", color: "#00d4aa", text: "Accepted" },
    completed: { bg: "#7c6cf522", color: "#7c6cf5", text: "Completed" },
    rejected:  { bg: "#ff334422", color: "#ff6677", text: "Rejected" },
    applied:   { bg: "#3b82f622", color: "#60a5fa", text: "Applied" },
    approved:  { bg: "#00d4aa18", color: "#00d4aa", text: "Approved" },
    success:   { bg: "#00d4aa18", color: "#00d4aa", text: "Success" },
    failed:    { bg: "#ff334422", color: "#ff6677", text: "Failed" },
    removed:   { bg: "#ff334422", color: "#ff6677", text: "Removed" },
  };
  const s = map[status] || map.pending;
  return (
    <span style={{ background: s.bg, color: s.color, padding: "3px 10px", borderRadius: 20, fontSize: "0.78rem", fontWeight: 700 }}>
      {s.text}
    </span>
  );
};

const RoleBadge = ({ role }) => {
  const map = {
    student:    { bg: "#3b82f622", color: "#60a5fa" },
    counsellor: { bg: "#7c6cf522", color: "#a78bfa" },
    admin:      { bg: "#00d4aa18", color: "#00d4aa" },
  };
  const s = map[role] || map.student;
  return (
    <span style={{ background: s.bg, color: s.color, padding: "3px 10px", borderRadius: 20, fontSize: "0.78rem", fontWeight: 700 }}>
      {role.charAt(0).toUpperCase() + role.slice(1)}
    </span>
  );
};

const ActionBtn = ({ icon, color = "#555", onClick, title }) => (
  <button title={title} onClick={onClick} style={{ background: "transparent", border: "none", cursor: "pointer", color, display: "flex", alignItems: "center", padding: "4px", borderRadius: 4, transition: "opacity 0.2s" }}
    onMouseEnter={e => e.currentTarget.style.opacity = "0.7"}
    onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
    {icon}
  </button>
);

// ── Section Components ────────────────────────────────────────────────────────

function Dashboard() {
  return (
    <div>
      <h2 style={s.sectionTitle}>Dashboard Overview</h2>
      <div style={s.statsGrid}>
        {STATS.map((st, i) => (
          <div key={i} style={s.statCard}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <p style={{ color: "#666", fontSize: "0.82rem", margin: "0 0 8px", fontWeight: 600 }}>{st.label}</p>
                <h3 style={{ fontSize: "2rem", fontWeight: 800, margin: 0, color: "#fff" }}>{st.value}</h3>
              </div>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: st.color + "22", display: "flex", alignItems: "center", justifyContent: "center", color: st.color }}>
                {st.icon}
              </div>
            </div>
            <p style={{ margin: "12px 0 0", fontSize: "0.82rem", color: "#00d4aa" }}>{st.change} this month</p>
          </div>
        ))}
      </div>

      <div style={s.recentBlock}>
        <h3 style={s.subTitle}>Recent Appointments</h3>
        <table style={s.table}>
          <thead><tr>{["Student","Counsellor","Date","Status"].map(h => <th key={h} style={s.th}>{h}</th>)}</tr></thead>
          <tbody>
            {APPOINTMENTS.slice(0,3).map(a => (
              <tr key={a.id} style={s.tr}>
                <td style={s.td}>{a.student}</td>
                <td style={s.td}>{a.counsellor}</td>
                <td style={s.td}>{a.date}</td>
                <td style={s.td}><StatusBadge status={a.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function UserManagement() {
  const [users, setUsers] = useState(USERS);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = users.filter(u =>
    (filter === "all" || u.role === filter) &&
    (u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()))
  );

  const toggleStatus = (id) => setUsers(prev => prev.map(u => u.id === id ? { ...u, status: u.status === "active" ? "inactive" : "active" } : u));

  return (
    <div>
      <div style={s.sectionHeader}>
        <h2 style={s.sectionTitle}>User Management</h2>
        <button style={s.addBtn}><Plus size={14} style={{ marginRight: 6 }} /> Add User</button>
      </div>
      <div style={s.filterRow}>
        <div style={s.searchWrap}>
          <Search size={14} color="#555" style={{ marginRight: 8 }} />
          <input placeholder="Search users..." value={search} onChange={e => setSearch(e.target.value)} style={s.searchInput} />
        </div>
        <div style={s.filterBtns}>
          {["all","student","counsellor","admin"].map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{ ...s.filterBtn, ...(filter === f ? s.filterBtnActive : {}) }}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>
      <table style={s.table}>
        <thead><tr>{["Name","Email","Role","Status","Joined","Actions"].map(h => <th key={h} style={s.th}>{h}</th>)}</tr></thead>
        <tbody>
          {filtered.map(u => (
            <tr key={u.id} style={s.tr}>
              <td style={s.td}><div style={{ fontWeight: 600, color: "#fff" }}>{u.name}</div></td>
              <td style={s.td}><span style={{ color: "#666" }}>{u.email}</span></td>
              <td style={s.td}><RoleBadge role={u.role} /></td>
              <td style={s.td}><StatusBadge status={u.status} /></td>
              <td style={s.td}><span style={{ color: "#555" }}>{u.joined}</span></td>
              <td style={s.td}>
                <div style={{ display: "flex", gap: 4 }}>
                  <ActionBtn icon={<Edit2 size={15} />} color="#7c6cf5" title="Edit" />
                  <ActionBtn icon={u.status === "active" ? <X size={15} /> : <Check size={15} />}
                    color={u.status === "active" ? "#ff6677" : "#00d4aa"} title="Toggle status"
                    onClick={() => toggleStatus(u.id)} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Appointments() {
  const [apts, setApts] = useState(APPOINTMENTS);

  const update = (id, status) => setApts(prev => prev.map(a => a.id === id ? { ...a, status } : a));

  return (
    <div>
      <h2 style={s.sectionTitle}>Appointments</h2>
      <table style={s.table}>
        <thead><tr>{["Student","Counsellor","Date","Time","Status","Actions"].map(h => <th key={h} style={s.th}>{h}</th>)}</tr></thead>
        <tbody>
          {apts.map(a => (
            <tr key={a.id} style={s.tr}>
              <td style={s.td}><span style={{ color: "#fff", fontWeight: 600 }}>{a.student}</span></td>
              <td style={s.td}>{a.counsellor}</td>
              <td style={s.td}>{a.date}</td>
              <td style={s.td}>{a.time}</td>
              <td style={s.td}><StatusBadge status={a.status} /></td>
              <td style={s.td}>
                {a.status === "pending" && (
                  <div style={{ display: "flex", gap: 6 }}>
                    <button onClick={() => update(a.id, "accepted")} style={s.acceptBtn}><Check size={13} /> Accept</button>
                    <button onClick={() => update(a.id, "rejected")} style={s.rejectBtn}><X size={13} /> Reject</button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Universities() {
  const [unis, setUnis] = useState(UNIVERSITIES);
  const toggle = (id) => setUnis(prev => prev.map(u => u.id === id ? { ...u, status: u.status === "active" ? "removed" : "active" } : u));

  return (
    <div>
      <div style={s.sectionHeader}>
        <h2 style={s.sectionTitle}>Universities</h2>
        <button style={s.addBtn}><Plus size={14} style={{ marginRight: 6 }} /> Add University</button>
      </div>
      <table style={s.table}>
        <thead><tr>{["Name","Country","Ranking","Status","Actions"].map(h => <th key={h} style={s.th}>{h}</th>)}</tr></thead>
        <tbody>
          {unis.map(u => (
            <tr key={u.id} style={s.tr}>
              <td style={s.td}><span style={{ color: "#fff", fontWeight: 600 }}>{u.name}</span></td>
              <td style={s.td}>{u.country}</td>
              <td style={s.td}>#{u.ranking}</td>
              <td style={s.td}><StatusBadge status={u.status} /></td>
              <td style={s.td}>
                <div style={{ display: "flex", gap: 4 }}>
                  <ActionBtn icon={<Edit2 size={15} />} color="#7c6cf5" title="Edit" />
                  <ActionBtn icon={u.status === "active" ? <Trash2 size={15} /> : <Check size={15} />}
                    color={u.status === "active" ? "#ff6677" : "#00d4aa"} onClick={() => toggle(u.id)} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Courses() {
  return (
    <div>
      <div style={s.sectionHeader}>
        <h2 style={s.sectionTitle}>Courses</h2>
        <button style={s.addBtn}><Plus size={14} style={{ marginRight: 6 }} /> Add Course</button>
      </div>
      <table style={s.table}>
        <thead><tr>{["Course","University","Duration","Fee (₹)","Intake"].map(h => <th key={h} style={s.th}>{h}</th>)}</tr></thead>
        <tbody>
          {COURSES.map(c => (
            <tr key={c.id} style={s.tr}>
              <td style={s.td}><span style={{ color: "#fff", fontWeight: 700 }}>{c.name}</span></td>
              <td style={s.td}>{c.university}</td>
              <td style={s.td}>{c.duration}</td>
              <td style={s.td}>{c.fee.toLocaleString("en-IN")}</td>
              <td style={s.td}>{c.intake}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Applications() {
  const [apps, setApps] = useState(APPLICATIONS);
  const update = (id, status) => setApps(prev => prev.map(a => a.id === id ? { ...a, status } : a));

  return (
    <div>
      <h2 style={s.sectionTitle}>Applications</h2>
      <table style={s.table}>
        <thead><tr>{["Student","Course","University","Applied On","Status","Actions"].map(h => <th key={h} style={s.th}>{h}</th>)}</tr></thead>
        <tbody>
          {apps.map(a => (
            <tr key={a.id} style={s.tr}>
              <td style={s.td}><span style={{ color: "#fff", fontWeight: 600 }}>{a.student}</span></td>
              <td style={s.td}>{a.course}</td>
              <td style={s.td}>{a.university}</td>
              <td style={s.td}>{a.date}</td>
              <td style={s.td}><StatusBadge status={a.status} /></td>
              <td style={s.td}>
                {a.status === "applied" && (
                  <div style={{ display: "flex", gap: 6 }}>
                    <button onClick={() => update(a.id, "accepted")} style={s.acceptBtn}><Check size={13} /> Accept</button>
                    <button onClick={() => update(a.id, "rejected")} style={s.rejectBtn}><X size={13} /> Reject</button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Documents() {
  const [docs, setDocs] = useState(DOCUMENTS);
  const update = (id, status) => setDocs(prev => prev.map(d => d.id === id ? { ...d, status } : d));

  return (
    <div>
      <h2 style={s.sectionTitle}>Documents</h2>
      <table style={s.table}>
        <thead><tr>{["Student","Document Type","Uploaded","Status","Actions"].map(h => <th key={h} style={s.th}>{h}</th>)}</tr></thead>
        <tbody>
          {docs.map(d => (
            <tr key={d.id} style={s.tr}>
              <td style={s.td}><span style={{ color: "#fff", fontWeight: 600 }}>{d.student}</span></td>
              <td style={s.td}>{d.type}</td>
              <td style={s.td}>{d.uploaded}</td>
              <td style={s.td}><StatusBadge status={d.status} /></td>
              <td style={s.td}>
                {d.status === "pending" && (
                  <div style={{ display: "flex", gap: 6 }}>
                    <button onClick={() => update(d.id, "approved")} style={s.acceptBtn}><Check size={13} /> Approve</button>
                    <button onClick={() => update(d.id, "rejected")} style={s.rejectBtn}><X size={13} /> Reject</button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Payments() {
  return (
    <div>
      <h2 style={s.sectionTitle}>Payments</h2>
      <table style={s.table}>
        <thead><tr>{["Student","Amount (₹)","Method","Date","Status"].map(h => <th key={h} style={s.th}>{h}</th>)}</tr></thead>
        <tbody>
          {PAYMENTS.map(p => (
            <tr key={p.id} style={s.tr}>
              <td style={s.td}><span style={{ color: "#fff", fontWeight: 600 }}>{p.student}</span></td>
              <td style={s.td}>₹{p.amount.toLocaleString("en-IN")}</td>
              <td style={s.td}>{p.method}</td>
              <td style={s.td}>{p.date}</td>
              <td style={s.td}><StatusBadge status={p.status} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function AssignCounsellor() {
  const [selected, setSelected] = useState({ student: "", counsellor: "" });
  const [assignments, setAssignments] = useState([
    { student: "Aarav Shah",  counsellor: "Priya Mehta" },
    { student: "Sneha Patel", counsellor: "Kiran Joshi" },
  ]);

  const assign = () => {
    if (!selected.student || !selected.counsellor) return;
    setAssignments(prev => {
      const exists = prev.findIndex(a => a.student === selected.student);
      if (exists >= 0) return prev.map((a, i) => i === exists ? { ...a, counsellor: selected.counsellor } : a);
      return [...prev, { ...selected }];
    });
    setSelected({ student: "", counsellor: "" });
  };

  return (
    <div>
      <h2 style={s.sectionTitle}>Assign Counsellor</h2>
      <div style={s.assignCard}>
        <h3 style={{ color: "#fff", margin: "0 0 20px", fontSize: "1rem", fontWeight: 700 }}>New Assignment</h3>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 200 }}>
            <label style={s.label}>Select Student</label>
            <div style={s.selectWrap}>
              <select value={selected.student} onChange={e => setSelected({ ...selected, student: e.target.value })} style={s.select}>
                <option value="">-- Choose Student --</option>
                {STUDENTS_LIST.map(st => <option key={st} value={st}>{st}</option>)}
              </select>
              <ChevronDown size={14} color="#555" style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
            </div>
          </div>
          <div style={{ flex: 1, minWidth: 200 }}>
            <label style={s.label}>Select Counsellor</label>
            <div style={s.selectWrap}>
              <select value={selected.counsellor} onChange={e => setSelected({ ...selected, counsellor: e.target.value })} style={s.select}>
                <option value="">-- Choose Counsellor --</option>
                {COUNSELLORS_LIST.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <ChevronDown size={14} color="#555" style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "flex-end" }}>
            <button onClick={assign} style={s.addBtn}><UserPlus size={14} style={{ marginRight: 6 }} /> Assign</button>
          </div>
        </div>
      </div>

      <h3 style={{ ...s.subTitle, marginTop: 32 }}>Current Assignments</h3>
      <table style={s.table}>
        <thead><tr>{["Student","Assigned Counsellor","Action"].map(h => <th key={h} style={s.th}>{h}</th>)}</tr></thead>
        <tbody>
          {assignments.map((a, i) => (
            <tr key={i} style={s.tr}>
              <td style={s.td}><span style={{ color: "#fff", fontWeight: 600 }}>{a.student}</span></td>
              <td style={s.td}><span style={{ color: "#7c6cf5", fontWeight: 600 }}>{a.counsellor}</span></td>
              <td style={s.td}>
                <ActionBtn icon={<Trash2 size={15} />} color="#ff6677"
                  onClick={() => setAssignments(prev => prev.filter((_, idx) => idx !== i))} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── Nav Config ────────────────────────────────────────────────────────────────
const NAV = [
  { key: "dashboard",    label: "Dashboard",         icon: <LayoutDashboard size={17} />, component: <Dashboard /> },
  { key: "users",        label: "Users",              icon: <Users size={17} />,           component: <UserManagement /> },
  { key: "appointments", label: "Appointments",       icon: <Calendar size={17} />,        component: <Appointments /> },
  { key: "universities", label: "Universities",       icon: <University size={17} />,      component: <Universities /> },
  { key: "courses",      label: "Courses",            icon: <BookOpen size={17} />,        component: <Courses /> },
  { key: "applications", label: "Applications",       icon: <ClipboardList size={17} />,   component: <Applications /> },
  { key: "documents",    label: "Documents",          icon: <FileText size={17} />,        component: <Documents /> },
  { key: "payments",     label: "Payments",           icon: <CreditCard size={17} />,      component: <Payments /> },
  { key: "assign",       label: "Assign Counsellor",  icon: <UserCheck size={17} />,       component: <AssignCounsellor /> },
];

// ── Main Admin Panel ──────────────────────────────────────────────────────────
export default function AdminPanel() {
  const [active, setActive] = useState("dashboard");

  const current = NAV.find(n => n.key === active);

  return (
    <div style={s.page}>
      {/* Sidebar */}
      <aside style={s.sidebar}>
        <div style={s.logoArea}>
          <div style={s.logoIcon}>🦷</div>
          <div>
            <div style={s.logoText}>MediDent</div>
            <div style={s.logoSub}>Admin Panel</div>
          </div>
        </div>

        <nav style={s.nav}>
          {NAV.map(n => (
            <button
              key={n.key}
              onClick={() => setActive(n.key)}
              style={{ ...s.navItem, ...(active === n.key ? s.navItemActive : {}) }}
            >
              <span style={{ color: active === n.key ? "#00d4aa" : "#444" }}>{n.icon}</span>
              {n.label}
            </button>
          ))}
        </nav>

        <button style={s.logoutBtn}>
          <LogOut size={16} style={{ marginRight: 8 }} /> Logout
        </button>
      </aside>

      {/* Main */}
      <main style={s.main}>
        {/* Topbar */}
        <div style={s.topbar}>
          <div>
            <h1 style={s.pageTitle}>{current.label}</h1>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <button style={s.iconBtn}><Bell size={18} /></button>
            <div style={s.avatar}>
              <Shield size={15} color="#00d4aa" />
              <span style={{ color: "#00d4aa", fontWeight: 700, fontSize: "0.85rem" }}>Admin</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={s.content}>
          {current.component}
        </div>
      </main>
    </div>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────
const s = {
  page:         { display: "flex", minHeight: "100vh", background: "#080c12", fontFamily: "'Sora','Segoe UI',sans-serif", color: "#888" },

  sidebar:      { width: 240, background: "#0a0f1a", borderRight: "1px solid #ffffff08", display: "flex", flexDirection: "column", padding: "24px 0", flexShrink: 0, position: "sticky", top: 0, height: "100vh", overflowY: "auto" },
  logoArea:     { display: "flex", alignItems: "center", gap: 12, padding: "0 20px 28px", borderBottom: "1px solid #ffffff08", marginBottom: 12 },
  logoIcon:     { width: 38, height: 38, background: "linear-gradient(135deg,#00d4aa,#00b894)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 },
  logoText:     { fontSize: "1rem", fontWeight: 800, color: "#00d4aa", lineHeight: 1.2 },
  logoSub:      { fontSize: "0.72rem", color: "#333", fontWeight: 500 },

  nav:          { flex: 1, display: "flex", flexDirection: "column", padding: "8px 10px", gap: 2 },
  navItem:      { display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", borderRadius: 8, background: "transparent", border: "none", color: "#444", cursor: "pointer", fontSize: "0.86rem", fontWeight: 500, textAlign: "left", transition: "all 0.15s", fontFamily: "inherit", width: "100%" },
  navItemActive: { background: "#00d4aa12", color: "#ccc", borderLeft: "2px solid #00d4aa" },

  logoutBtn:    { display: "flex", alignItems: "center", margin: "0 10px", padding: "10px 12px", borderRadius: 8, background: "transparent", border: "none", color: "#333", cursor: "pointer", fontSize: "0.86rem", fontFamily: "inherit", transition: "color 0.2s" },

  main:         { flex: 1, display: "flex", flexDirection: "column", overflow: "auto" },
  topbar:       { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 32px", borderBottom: "1px solid #ffffff08", background: "#0a0f1a", position: "sticky", top: 0, zIndex: 10 },
  pageTitle:    { fontSize: "1.3rem", fontWeight: 800, color: "#fff", margin: 0 },
  iconBtn:      { background: "#ffffff08", border: "1px solid #ffffff0f", color: "#555", width: 36, height: 36, borderRadius: 8, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" },
  avatar:       { display: "flex", alignItems: "center", gap: 8, background: "#00d4aa12", border: "1px solid #00d4aa33", padding: "6px 14px", borderRadius: 8 },

  content:      { padding: "28px 32px", flex: 1 },

  sectionTitle: { fontSize: "1.15rem", fontWeight: 800, color: "#fff", margin: "0 0 20px" },
  subTitle:     { fontSize: "0.95rem", fontWeight: 700, color: "#ccc", margin: "0 0 14px" },
  sectionHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },

  statsGrid:    { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16, marginBottom: 32 },
  statCard:     { background: "#0d1520", border: "1px solid #ffffff0a", borderRadius: 12, padding: "20px" },

  recentBlock:  { background: "#0d1520", border: "1px solid #ffffff0a", borderRadius: 12, padding: 20 },

  table:        { width: "100%", borderCollapse: "collapse", background: "#0d1520", borderRadius: 12, overflow: "hidden" },
  th:           { textAlign: "left", padding: "12px 16px", fontSize: "0.78rem", color: "#444", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", borderBottom: "1px solid #ffffff08" },
  tr:           { borderBottom: "1px solid #ffffff05" },
  td:           { padding: "13px 16px", fontSize: "0.88rem", color: "#666" },

  filterRow:    { display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap", alignItems: "center" },
  searchWrap:   { display: "flex", alignItems: "center", background: "#0d1520", border: "1px solid #ffffff0f", borderRadius: 8, padding: "0 14px", flex: 1, minWidth: 200 },
  searchInput:  { background: "transparent", border: "none", outline: "none", color: "#fff", padding: "10px 0", fontSize: "0.88rem", width: "100%" },
  filterBtns:   { display: "flex", gap: 6 },
  filterBtn:    { background: "#0d1520", border: "1px solid #ffffff0f", color: "#555", padding: "8px 14px", borderRadius: 8, cursor: "pointer", fontSize: "0.82rem", fontFamily: "inherit" },
  filterBtnActive: { background: "#00d4aa18", border: "1px solid #00d4aa44", color: "#00d4aa", fontWeight: 700 },

  addBtn:       { display: "flex", alignItems: "center", background: "#00d4aa", border: "none", color: "#080c12", padding: "10px 18px", borderRadius: 8, fontWeight: 700, cursor: "pointer", fontSize: "0.86rem", fontFamily: "inherit" },
  acceptBtn:    { display: "flex", alignItems: "center", gap: 4, background: "#00d4aa18", border: "1px solid #00d4aa44", color: "#00d4aa", padding: "5px 10px", borderRadius: 6, cursor: "pointer", fontSize: "0.8rem", fontFamily: "inherit", fontWeight: 700 },
  rejectBtn:    { display: "flex", alignItems: "center", gap: 4, background: "#ff334418", border: "1px solid #ff334444", color: "#ff6677", padding: "5px 10px", borderRadius: 6, cursor: "pointer", fontSize: "0.8rem", fontFamily: "inherit", fontWeight: 700 },

  assignCard:   { background: "#0d1520", border: "1px solid #ffffff0a", borderRadius: 12, padding: 24, marginBottom: 8 },
  label:        { display: "block", color: "#555", fontSize: "0.82rem", fontWeight: 600, marginBottom: 8 },
  selectWrap:   { position: "relative" },
  select:       { width: "100%", background: "#080c12", border: "1px solid #ffffff0f", color: "#ccc", padding: "10px 36px 10px 14px", borderRadius: 8, fontSize: "0.88rem", outline: "none", appearance: "none", fontFamily: "inherit", cursor: "pointer" },
};