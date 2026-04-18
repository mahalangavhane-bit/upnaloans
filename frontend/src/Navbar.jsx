// Navbar.jsx
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { label: "Home",           to: "home"               },
  { label: "EMI Calculator", to: "emi" },
  { label: "Contact",        to: "contact"        },
  { label: "Support & Help", to: "support"        },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <nav style={{
      background: '#46208d',
      position: "sticky",
      top: 0,
      zIndex: 1000,
      boxShadow: "0 2px 16px rgba(0,0,0,0.12)"
    }}>
      {/* Top bar */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 40px",
        height: 80,
        maxWidth: "100%",
      }}>
        {/* Logo */}
        <Link to="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
          <img
            src="/logo.png"
            alt="Upna Loan"
            style={{ height: 100, objectFit: "contain" }}
          />
        </Link>

        {/* Center nav links */}
        <ul style={{
          display: "flex", gap: 32, listStyle: "none", margin: 0, padding: 0
        }} className="nav-main-links">
          {navLinks.map(link => {
            const isActive = pathname === link.to;
            return (
              <li key={link.label}>
              <span onClick={() => {
                const section = document.getElementById(link.to);
                if (section) {
                  section.scrollIntoView({behavior:"smooth"});
                }
              }}
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: "white",
                cursor: "pointer",
                textDecoration: "none",
                fontFamily: "'Sora', sans-serif"
              }}
              >
                {link.label}
                </span>
                </li>
            );
          })}
        </ul>

        {/* CTA button */}
        <div className="nav-cta">
          <span onClick={() =>{
            document.getElementById("contact")?.scrollIntoView({ behavior: "smooth"});

          }}>
            <button style={{
              background: "linear-gradient(135deg, #f97316, #eab308)",
              color: "white",
              border: "none",
              borderRadius: 8,
              padding: "10px 22px",
              fontSize: 13.5,
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: "'Sora', sans-serif",
              letterSpacing: ".3px",
              boxShadow: "0 4px 14px rgba(249,115,22,0.35)",
              transition: "transform .15s, box-shadow .15s"
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(249,115,22,0.45)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 4px 14px rgba(249,115,22,0.35)"; }}
            >Apply Now →</button>
         </span>
        </div>

        {/* Hamburger */}
        <button
          className="hamburger-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: "none", background: "none", border: "none", cursor: "pointer",
            flexDirection: "column", gap: 5, padding: 4
          }}
        >
          {[0, 1, 2].map(i => (
            <span key={i} style={{ width: 24, height: 2, background: "white", display: "block", borderRadius: 2 }} />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          padding: "16px 32px 20px",
          borderTop: "1px solid #f3f4f6",
          display: "flex", flexDirection: "column", gap: 16
        }}>
          {navLinks.map(link => (
            <span key={link.label}
            onClick={() => {
              const section = document.getElementById(link.to);
              if (section) {
                section.scrollIntoView({behavior : "smooth"});
              } 
              setMenuOpen(false);
            }}
            style={{
              fontSize: 15,
              fontWeight: 600,
              color: "white",
              cursor: "pointer",
              fontFamily: "'Sora', sans-serif"
            }}
            >
              {link.label}
            </span>
          ))}
        </div>
      )}

      {/* Marquee ticker */}
      <div style={{
        background: "linear-gradient(90deg, #1a0a00 0%, #2d1200 50%, #1a0a00 100%)",
        color: "rgba(255,255,255,0.8)",
        fontSize: 12.5,
        padding: "7px 0",
        overflow: "hidden",
        whiteSpace: "nowrap"
      }}>
        <span style={{ display: "inline-block", animation: "ticker 28s linear infinite" }}>
          🏠 We've got you covered in{" "}<strong style={{ color: "#facc15" }}>Mumbai</strong>{" "}— Verified Properties • Home Loans • Interiors • Legal Support &nbsp;&nbsp;&nbsp;&nbsp;
          🏠 We've got you covered in{" "}<strong style={{ color: "#facc15" }}>Mumbai</strong>{" "}— Verified Properties • Home Loans • Interiors • Legal Support &nbsp;&nbsp;&nbsp;&nbsp;
          🏠 We've got you covered in{" "}<strong style={{ color: "#facc15" }}>Mumbai</strong>{" "}— Verified Properties • Home Loans • Interiors • Legal Support &nbsp;&nbsp;&nbsp;&nbsp;
        </span>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&display=swap');
        @keyframes ticker { from { transform: translateX(0) } to { transform: translateX(-33.33%) } }
        @media (max-width: 900px) {
          .nav-main-links { display: flex !important; }
          .nav-cta { display: flex !important; }
          .hamburger-btn { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
