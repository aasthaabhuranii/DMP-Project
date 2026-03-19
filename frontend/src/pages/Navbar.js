import { useNavigate, useLocation } from "react-router-dom";
import { Home, Info, BookOpen, Map, LogIn, UserPlus } from "lucide-react";

const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href = "https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap";
if (!document.head.querySelector("link[href*='DM+Sans']")) {
  document.head.appendChild(fontLink);
}

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const links = [
    { label: "Home",     path: "/",        icon: <Home size={14} /> },
    { label: "About",    path: "/about",   icon: <Info size={14} /> },
    { label: "Programs", path: "/programs",icon: <BookOpen size={14} /> },
    { label: "Journey",  path: "/journey", icon: <Map size={14} /> },
  ];

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <nav style={styles.nav}>
      {/* LOGO */}
      <div style={styles.logo} onClick={() => navigate("/")}>
        <div style={styles.logoIcon}>🦷</div>
        <span style={styles.logoText}>MediDent</span>
      </div>

      {/* NAV LINKS */}
      <div style={styles.links}>
        {links.map((link) => (
          <span
            key={link.path}
            onClick={() => navigate(link.path)}
            style={{
              ...styles.link,
              color: isActive(link.path) ? "#00d4aa" : "#9a9aaa",
              borderBottom: isActive(link.path) ? "2px solid #00d4aa" : "2px solid transparent",
            }}
            onMouseEnter={e => { if (!isActive(link.path)) e.currentTarget.style.color = "#e8e2d8"; }}
            onMouseLeave={e => { if (!isActive(link.path)) e.currentTarget.style.color = "#9a9aaa"; }}
          >
            <span style={styles.linkInner}>
              {link.icon}
              {link.label}
            </span>
          </span>
        ))}
      </div>

      {/* AUTH BUTTONS */}
      <div style={styles.actions}>
        <button
          style={styles.loginBtn}
          onClick={() => navigate("/login")}
          onMouseEnter={e => { e.currentTarget.style.background = "#00d4aa"; e.currentTarget.style.color = "#04080f"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#00d4aa"; }}
        >
          <LogIn size={14} style={{ marginRight: 6 }} /> Login
        </button>
        <button
          style={styles.registerBtn}
          onClick={() => navigate("/register")}
          onMouseEnter={e => { e.currentTarget.style.background = "#00b894"; e.currentTarget.style.transform = "translateY(-1px)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "#00d4aa"; e.currentTarget.style.transform = "translateY(0)"; }}
        >
          <UserPlus size={14} style={{ marginRight: 6 }} /> Register
        </button>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    position: "fixed",
    top: 0, left: 0, right: 0,
    zIndex: 999,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 60px",
    height: "70px",
    background: "rgba(4,8,15,0.94)",
    backdropFilter: "blur(18px)",
    borderBottom: "1px solid #ffffff0d",
    fontFamily: "'DM Sans', sans-serif",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    cursor: "pointer",
    userSelect: "none",
  },
  logoIcon: {
    width: "36px", height: "36px",
    background: "linear-gradient(135deg, #00d4aa, #00b894)",
    borderRadius: "9px",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: "18px",
  },
  logoText: {
    fontSize: "1.25rem",
    fontWeight: 800,
    color: "#00d4aa",
    letterSpacing: "-0.3px",
  },
  links: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },
  link: {
    padding: "6px 14px",
    fontSize: "0.88rem",
    fontWeight: 500,
    cursor: "pointer",
    transition: "color 0.2s",
    paddingBottom: "4px",
    letterSpacing: "0.2px",
    userSelect: "none",
  },
  linkInner: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  actions: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  loginBtn: {
    background: "transparent",
    border: "1.5px solid #00d4aa",
    color: "#00d4aa",
    padding: "9px 20px",
    borderRadius: "8px",
    fontSize: "0.88rem",
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
    transition: "all 0.2s",
    display: "flex",
    alignItems: "center",
  },
  registerBtn: {
    background: "#00d4aa",
    border: "none",
    color: "#04080f",
    padding: "9px 20px",
    borderRadius: "8px",
    fontSize: "0.88rem",
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
    transition: "all 0.2s",
    display: "flex",
    alignItems: "center",
  },
};