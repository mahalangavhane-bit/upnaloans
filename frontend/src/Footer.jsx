// Footer.jsx
import { useState, useEffect, useRef } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { FaYoutube, FaLinkedinIn, FaInstagram } from "react-icons/fa";

// ─── Paisabazaar-style bank card: logo LEFT | divider | name RIGHT ───────────
const banks = [
  { name: "SBI",               slug: "sbi",                color: "#0047ab" },
  { name: "HDFC Bank",         slug: "hdfs",          color: "#0052cc" },
  { name: "ICICI Bank",        slug: "icic",         color: "#ff6600" },
  { name: "Axis Bank",         slug: "axis",          color: "#8b1538" },
  { name: "PNB",               slug: "pnb",                color: "#0066b3" },
  { name: "Kotak Mahindra",    slug: "Kotak Mahindra",color: "#cc0000" },
  { name: "Bank of Baroda",    slug: "Baroda-bank",     color: "#ff6600" },
  { name: "Bank of India",     slug: "bankofindia",      color: "#0066b3" },
  { name: "Canara Bank",       slug: "canara",        color: "#0066b3" },
  { name: "Union Bank",        slug: "union-bank",         color: "#cc0000" },
  { name: "IDFC First Bank",   slug: "idfcfirst",    color: "#0066b3" },
  { name: "IndusInd Bank",     slug: "indusind",      color: "#0066b3" },
  { name: "Bandhan Bank",      slug: "bandhan",       color: "#cc0000" },
  { name: "Central Bank",      slug: "central",       color: "#0066b3" },
  { name: "Indian Bank",       slug: "Indian_Bank",        color: "#0066b3" },
  { name: "UCO Bank",          slug: "uco",           color: "#cc0000" },
  { name: "IDBI Bank",         slug: "idbi",          color: "#0066b3" },
  { name: "RBL Bank",          slug: "rbl",           color: "#cc0000" },
  { name: "Yes Bank",          slug: "yes",           color: "#0066b3" },
  { name: "Federal Bank",      slug: "federal",       color: "#cc0000" },
  { name: "South Indian Bank", slug: "south_indian",  color: "#0066b3" },
  { name: "Karur Vysya Bank",  slug: "karur vysya",        color: "#cc0000" },
  { name: "Deutsche Bank",     slug: "deutsche",      color: "#0066b3" },
  { name: "Standard Chartered",slug: "standardchartered", color: "#0066b3" },
  { name: "Citibank",          slug: "citibank",           color: "#cc0000" },
  { name: "HSBC",              slug: "hsbc",               color: "#cc0000" },
  { name: "Aditya Birla",      slug: "adityabirla",color: "#cc0000"},
  { name: "Bajaj Finance",     slug: "bajaj",      color: "#003399" },
  { name: "Tata Capital",      slug: "tatacapital",       color: "#003399" },
  { name: "Mahindra Finance",  slug: "mahindrafinance",   color: "#0066b3" },
  { name: "Fullerton India",   slug: "fullerton",          color: "#cc0000" },
  { name: "Muthoot Finance",   slug: "muthoot",    color: "#c8980a" },
  { name: "Manappuram",        slug: "manappuram",         color: "#cc0000" },
  { name: "Cholamandalam",     slug: "Cholamandalam",      color: "#0066b3" },
  { name: "Shriram Finance",   slug: "SHRIRAMFIN",    color: "#cc0000" },
  { name: "IIFL Finance",      slug: "IIFL",       color: "#0066b3" },
  { name: "Ujjivan SF Bank",   slug: "ujjivan1",color:"#cc0000"},
  { name: "AU Small Finance",  slug: "AU-Small",   color: "#0066b3" },
  { name: "HDB Financial",     slug: "hdb",      color: "#cc0000" },
  { name: "LIC Housing",       slug: "lichfl",            color: "#0066b3" },
  { name: "DHFL",              slug: "DHFL",               color: "#0066b3" },
  { name: "KreditBee",         slug: "KreditBee",          color: "#5b2d8e" },
  { name: "MoneyView",         slug: "moneyview",          color: "#00897b" },
  { name: "Lendingkart",       slug: "LendindKart",        color: "#cc0000" },
  { name: "Navi Finserv",      slug: "navi-finserv",               color: "#003399" },
  { name: "Piramal Finance",   slug: "Piramal",    color: "#003399" },
  { name: "Fibe",              slug: "fibe",               color: "#7c3aed" },
  { name: "InCred Finance",    slug: "InCred",             color: "#cc0000" },
  { name: "Stashfin",          slug: "stashfin",           color: "#003399" },
  { name: "Jana Bank",         slug: "Jana",          color: "#cc0000" },
  { name: "Five Star Finance", slug: "five_star",          color: "#cc0000" },
  { name: "SREI Finance",      slug: "SREI",               color: "#0066b3" },

];

const LOGO_BASE = "/bank-logos/";

// ─── Bank grid config (kept in sync with the CSS grid below) ────────────────
const CARD_HEIGHT = 68; // matches BankCard height
const GRID_GAP = 12; // matches grid gap
const VISIBLE_ROWS = 5;
const COLLAPSED_HEIGHT = VISIBLE_ROWS * CARD_HEIGHT + (VISIBLE_ROWS - 1) * GRID_GAP; // 388px

// SVG initials fallback
function InitialsBadge({ name, color }) {
  const initials = name.split(" ").slice(0, 2).map(w => w[0]).join("").toUpperCase();
  return (
    <svg width="38" height="26" viewBox="0 0 38 26" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="38" height="26" rx="4" fill={color} />
      <text x="19" y="18" textAnchor="middle" fill="#ffffff" style={{ fontSize: initials.length > 3 ? "8px" : "10px", fontWeight: 700 }}>
        {initials}
      </text>
    </svg>
  );
}

// Single bank card
// ─── CHANGED: logo container + image sizing made fully consistent ───────────
// - Fixed the invalid inline padding ("10 12px" -> "12px") so every card gets
//   identical, equal padding on all sides (was previously being ignored by
//   the browser, so padding differed silently between cards).
// - The logo <img> now fills that padded box (width/height: 100%) using
//   object-fit: contain, so small logos scale up to use the available space
//   and large logos shrink to fit — without ever stretching or cropping.
// - Card box itself (160x68) is untouched, so every logo container remains
//   identical in size regardless of the source image's native dimensions.
function BankCard({ bank }) {
  return (
    <div
      className="bank-logo-card"
      style={{
        background: "#fafafa",
        border: "1px solid #e5e7eb",
        borderRadius: "4px",
        height: "68px",
        width: "160px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "12px",
        cursor: "pointer",
        transition: "all 0.25s ease",
        boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        margin: "0 auto",
        boxSizing: "border-box",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,0,0,0.08)";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.05)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <img
        src={`${LOGO_BASE}${bank.slug}.png`}
        alt={bank.name}
        className="bank-logo-img"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          display: "block",
          margin: "0 auto",
        }}
        onError={e => {
          e.currentTarget.style.display = "none";
        }}
      />
    </div>
  );
}

export default function Footer() {
  const [expanded, setExpanded] = useState(false);
  const [fullHeight, setFullHeight] = useState(0);

  const bankSectionRef = useRef(null); // scroll target for "View Less"
  const gridRef = useRef(null); // measures actual content height

  // Measure the full grid height so the expand/collapse animation is smooth
  // and proportional, instead of jumping to an arbitrary large value.
  useEffect(() => {
    const measure = () => {
      if (gridRef.current) {
        setFullHeight(gridRef.current.scrollHeight);
      }
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const handleToggle = () => {
    if (expanded) {
      setExpanded(false);
      // Smoothly scroll back to the top of the bank partners section
      bankSectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      setExpanded(true);
    }
  };

  return (
    <footer style={{ backgroundColor: '#2d1063', color: "white" }}>
      {/* Top accent bar */}
      <div style={{ height: 4, background: "linear-gradient(90deg, #f97316, #eab308, #f97316)" }} />

      {/* BANK PARTNERS SECTION */}
      <div
        ref={bankSectionRef}
        className="page-container-h"
        style={{ padding: "60px 32px 40px", textAlign: "center", backgroundColor: "rgba(255,255,255,0.02)" }}
      >
        <h3 style={{ fontSize: 16, fontWeight: 700, color: "white", marginBottom: 30, textTransform: "uppercase", letterSpacing: "2px" }}>Our Lending Partners</h3>

        {/* Clipping wrapper — animates between the 5-row height and full content height */}
        <div
          style={{
            maxHeight: expanded ? `${fullHeight || 4000}px` : `${COLLAPSED_HEIGHT}px`,
            overflow: "hidden",
            transition: "max-height 0.6s ease-in-out",
            maxWidth: "1400px",
            margin: "0 auto",
          }}
        >
          {/* CHANGED: grid-template-columns moved into the .bank-grid CSS class
              below so it can respond to breakpoints (media queries can't be
              expressed via inline styles). Desktop defaults to 5 columns. */}
          <div ref={gridRef} className="bank-grid">
            {banks.map(bank => <BankCard key={bank.name} bank={bank} />)}
          </div>
        </div>

        {/* View More / View Less toggle */}
        <div style={{ marginTop: 28, display: "flex", justifyContent: "center" }}>
          <button
            onClick={handleToggle}
            style={{
              background: "transparent",
              border: "1.5px solid #f97316",
              color: "#f97316",
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "0.5px",
              textTransform: "uppercase",
              padding: "10px 28px",
              borderRadius: 999,
              cursor: "pointer",
              transition: "all 0.25s ease",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "#f97316";
              e.currentTarget.style.color = "#ffffff";
              e.currentTarget.style.boxShadow = "0 6px 16px rgba(249,115,22,0.3)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#f97316";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            {expanded ? "View Less" : "View More"}
          </button>
        </div>
      </div>

      {/* Main footer content */}
      <div className="page-container-h" style={{ padding: "40px 32px 40px", borderTop: "1px solid rgba(249,115,22,0.2)" }}>
        
        {/* Logo */}
        <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: 48, maxWidth:"1400px", margin: "0 auto 48px" }}>
          <img src="/logo.png" alt="Upna Loan" style={{ height: 100, objectFit: "contain" }} />
        </div>

        {/* 4 Column Grid */}
        <div className="footer-grid"
         style={{ display: "grid",
           gridTemplateColumns: "repeat(4,1fr)", 
           gap: "80px", 
           maxWidth: "1200px",
           margin: "0 auto 50px",
           alignItems:"flex-start",
           paddingTop: "10px" }}>
          
          {/* COMPANY */}
          <div>
            <h4 style={{ 
              fontSize: "13px", 
              fontWeight: "700", 
              color: "#ffffff", 
              marginBottom: "18px",
              letterSpacing:"1px",
              textTransform: "uppercase"
              }}>COMPANY</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {["Properties", "About", "For Buyers", "For Developers", "Testimonials"].map(item => (
                <li key={item} style={{ marginBottom: "12px" }}>
                  <a href="#" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: "13px", transition: "color 0.3s" }}
                    onMouseEnter={e => e.target.style.color = "#f97316"}
                    onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.7)"}>{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* EXPLORE */}
          <div>
            <h4 style={{ 
              fontSize: "13px", 
              fontWeight: "700", 
              color: "#ffffff", 
              marginBottom: "18px",
              letterSpacing:"1px",
              textTransform:"uppercase", }}>EXPLORE</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {["News", "Home Loans", "Home Interior", "Sitemap", "AI Smart Search"].map(item => (
                <li key={item} style={{ marginBottom: "12px" }}>
                  <a href="#" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: "13px", transition: "color 0.3s" }}
                    onMouseEnter={e => e.target.style.color = "#f97316"}
                    onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.7)"}>{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h4 style={{ 
              fontSize: "13px", 
              fontWeight: "700", 
              color: "#ffffff", 
              marginBottom: "18px",
              letterSpacing: "1px",
              textTransform: "uppercase", }}>CONTACT</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              <li style={{ 
                marginBottom: "14px", 
                display: "flex", 
                alignItems: "center", 
                gap: "10px" }}>
                <Phone size={14} style={{ color: "#f97316" }} />
                <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "13px" }}>+91 9999999999</span>
              </li>
              <li style={{ marginBottom: "14px", display: "flex", alignItems: "center", gap: "10px" }}>
                <Mail size={14} style={{ color: "#f97316" }} />
                <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "13px" }}>info@compareprojects.in</span>
              </li>
              <li style={{ marginBottom: "14px", display: "flex", alignItems: "center", gap: "10px" }}>
                <MapPin size={14} style={{ color: "#f97316" }} />
                <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "13px" }}>Mumbai, Maharashtra</span>
              </li>
            </ul>
          </div>

          {/* FOLLOW US */}
          <div>
            <h4 style={{ 
              fontSize: "13px", 
              fontWeight: "700", 
              color: "#ffffff", 
              marginBottom: "18px",
              letterSpacing: "1px",
              textTransform: "uppercase",}}>FOLLOW US</h4>
            <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
              <a 
                href="#" 
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "38px",
                  height: "38px",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.1)",
                  color: "white",
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = "#f97316";
                  e.currentTarget.style.transform = "translateY(-3px)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}>
                <FaYoutube size={18} />
              </a>
              <a 
                href="#" 
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "38px",
                  height: "38px",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.1)",
                  color: "white",
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = "#f97316";
                  e.currentTarget.style.transform = "translateY(-3px)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}>
                <FaLinkedinIn size={18} />
              </a>
              <a 
                href="#" 
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "38px",
                  height: "38px",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.1)",
                  color: "white",
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = "#f97316";
                  e.currentTarget.style.transform = "translateY(-3px)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}>
                <FaInstagram size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Links */}
        <div style={{ textAlign: "center", paddingTop: "30px", borderTop: "1px solid rgba(249,115,22,0.2)", marginTop: "20px" }}>
          <div style={{ display: "flex", justifyContent: "center", gap: "24px", flexWrap: "wrap", marginBottom: "20px" }}>
            {["Privacy Policy", "Terms of Use", "Disclaimer", "Cookie Policy"].map(link => (
              <a key={link} href="#" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: "12px", transition: "color 0.3s" }}
                onMouseEnter={e => e.target.style.color = "#f97316"}
                onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.6)"}>{link}</a>
            ))}
          </div>
          <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)" }}>
            © 2026 Compare Projects Pvt. Ltd. All rights reserved.
          </div>
        </div>
      </div>

      {/* Responsive Styles */}
      <style>{`
        /* ADDED: bank logo grid — 5 cols desktop / 3 cols tablet / 2 cols mobile.
           Card size, spacing (gap), colors, shadows and hover effects are
           untouched; only the column count changes per breakpoint. */
        .bank-grid {
          display: grid;
          grid-template-columns: repeat(6, 180px);
          justify-content: center;
          gap: 12px;
          max-width: 1400px;
          margin: 0 auto;
        }

        /* Tablet: 768px – 1199px */
        @media (max-width: 1199px) {
          .bank-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        /* Mobile: below 768px */
        @media (max-width: 767px) {
          .bank-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 30px !important;
            padding: 0 16px !important;
          }
        }
        @media (max-width: 640px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            text-align: center !important;
          }
          .footer-grid ul li a {
            display: inline-block !important;
          }
        }
      `}</style>
    </footer>
  );
}
