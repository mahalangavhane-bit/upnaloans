// Footer.jsx
import { Mail, Phone, MapPin } from "lucide-react";

// ─── Paisabazaar-style bank card: logo LEFT | divider | name RIGHT ───────────
const banks = [
  { name: "SBI",               slug: "sbi",                color: "#0047ab" },
  { name: "HDFC Bank",         slug: "hdfc-bank",          color: "#0052cc" },
  { name: "ICICI Bank",        slug: "icici-bank",         color: "#ff6600" },
  { name: "Axis Bank",         slug: "axis-bank",          color: "#8b1538" },
  { name: "PNB",               slug: "pnb",                color: "#0066b3" },
  { name: "Kotak Mahindra",    slug: "kotak-mahindra-bank",color: "#cc0000" },
  { name: "Bank of Baroda",    slug: "bank-of-baroda",     color: "#ff6600" },
  { name: "Bank of India",     slug: "bank-of-india",      color: "#0066b3" },
  { name: "Canara Bank",       slug: "canara-bank",        color: "#0066b3" },
  { name: "Union Bank",        slug: "union-bank",         color: "#cc0000" },
  { name: "IDFC First Bank",   slug: "idfc-first-bank",    color: "#0066b3" },
  { name: "IndusInd Bank",     slug: "indusind-bank",      color: "#0066b3" },
  { name: "Bandhan Bank",      slug: "bandhan-bank",       color: "#cc0000" },
  { name: "Central Bank",      slug: "central-bank",       color: "#0066b3" },
  { name: "Indian Bank",       slug: "indian-bank",        color: "#0066b3" },
  { name: "UCO Bank",          slug: "uco-bank",           color: "#cc0000" },
  { name: "IDBI Bank",         slug: "idbi-bank",          color: "#0066b3" },
  { name: "RBL Bank",          slug: "rbl-bank",           color: "#cc0000" },
  { name: "Yes Bank",          slug: "yes-bank",           color: "#0066b3" },
  { name: "Federal Bank",      slug: "federal-bank",       color: "#cc0000" },
  { name: "South Indian Bank", slug: "south-indian-bank",  color: "#0066b3" },
  { name: "Karur Vysya Bank",  slug: "karur-vysya",        color: "#cc0000" },
  { name: "Deutsche Bank",     slug: "deutsche-bank",      color: "#0066b3" },
  { name: "Standard Chartered",slug: "standard-chartered", color: "#0066b3" },
  { name: "Citibank",          slug: "citibank",           color: "#cc0000" },
  { name: "HSBC",              slug: "hsbc",               color: "#cc0000" },
  { name: "Aditya Birla",      slug: "aditya-birla-capital",color: "#cc0000"},
  { name: "Bajaj Finance",     slug: "bajaj-finance",      color: "#003399" },
  { name: "Tata Capital",      slug: "tata-capital",       color: "#003399" },
  { name: "Mahindra Finance",  slug: "mahindra-finance",   color: "#0066b3" },
  { name: "Fullerton India",   slug: "fullerton",          color: "#cc0000" },
  { name: "Muthoot Finance",   slug: "muthoot-finance",    color: "#c8980a" },
  { name: "Manappuram",        slug: "manappuram",         color: "#cc0000" },
  { name: "Cholamandalam",     slug: "cholamandalam",      color: "#0066b3" },
  { name: "Shriram Finance",   slug: "shriram-finance",    color: "#cc0000" },
  { name: "IIFL Finance",      slug: "iifl-finance",       color: "#0066b3" },
  { name: "Ujjivan SF Bank",   slug: "ujjivan-small-finance",color:"#cc0000"},
  { name: "AU Small Finance",  slug: "au-small-finance",   color: "#0066b3" },
  { name: "HDB Financial",     slug: "hdb-financial",      color: "#cc0000" },
  { name: "LIC Housing",       slug: "lic-hfl",            color: "#0066b3" },
  { name: "PNB Housing",       slug: "pnb-housing",        color: "#0066b3" },
  { name: "DHFL",              slug: "dhfl",               color: "#0066b3" },
  { name: "KreditBee",         slug: "kreditbee",          color: "#5b2d8e" },
  { name: "MoneyView",         slug: "moneyview",          color: "#00897b" },
  { name: "Lendingkart",       slug: "lendingkart",        color: "#cc0000" },
  { name: "Navi Finserv",      slug: "navi",               color: "#003399" },
  { name: "Piramal Finance",   slug: "piramal-capital",    color: "#003399" },
  { name: "Fibe",              slug: "fibe",               color: "#7c3aed" },
  { name: "InCred Finance",    slug: "incred",             color: "#cc0000" },
  { name: "Stashfin",          slug: "stashfin",           color: "#003399" },
  { name: "Jana Bank",         slug: "jana-bank",          color: "#cc0000" },
  { name: "Five Star Finance", slug: "five-star",          color: "#cc0000" },
  { name: "SREI Finance",      slug: "srei",               color: "#0066b3" },
];

const LOGO_BASE = "https://static.paisabazaar.com/media/icons/lenders/";

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
function BankCard({ bank }) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      background: "#ffffff",
      border: "1px solid rgba(249,115,22,0.3)",
      borderRadius: 8,
      overflow: "hidden",
      height: 50,
      cursor: "pointer",
      transition: "all 0.3s",
      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    }}
    onMouseEnter={e => {
      e.currentTarget.style.background = "rgba(249,115,22,0.04)";
      e.currentTarget.style.transform = "translateY(-2px)";
    }}
    onMouseLeave={e => {
      e.currentTarget.style.background = "#ffffff";
      e.currentTarget.style.transform = "translateY(0)";
    }}>
      <div style={{
        width: 52,
        minWidth: 52,
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fafafa",
        borderRight: "1px solid rgba(249,115,22,0.15)",
      }}>
        <img
          src={`${LOGO_BASE}${bank.slug}.png`}
          alt={bank.name}
          style={{ maxWidth: 38, maxHeight: 26, objectFit: "contain", display: "block" }}
          onError={e => {
            e.currentTarget.style.display = "none";
            e.currentTarget.nextSibling.style.display = "block";
          }}
        />
        <span style={{ display: "none" }}>
          <InitialsBadge name={bank.name} color={bank.color} />
        </span>
      </div>
      <div style={{ flex: 1, padding: "0 10px" }}>
        <span style={{
          display: "block",
          color: "#1a1a1a",
          fontSize: bank.name.length > 14 ? "9px" : bank.name.length > 9 ? "10px" : "11px",
          fontWeight: 500,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}>
          {bank.name}
        </span>
      </div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#2d1063', color: "white" }}>
      {/* Top accent bar */}
      <div style={{ height: 4, background: "linear-gradient(90deg, #f97316, #eab308, #f97316)" }} />

      {/* BANK PARTNERS SECTION */}
      <div style={{ padding: "60px 80px 40px", textAlign: "center", backgroundColor: "rgba(255,255,255,0.02)" }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: "white", marginBottom: 30, textTransform: "uppercase", letterSpacing: "2px" }}>Our Lending Partners</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 12, maxWidth: "1400px", margin: "0 auto" }}>
          {banks.map(bank => <BankCard key={bank.name} bank={bank} />)}
        </div>
      </div>

      {/* Main footer content */}
      <div style={{ padding: "40px 80px 40px", borderTop: "1px solid rgba(249,115,22,0.2)" }}>
        
        {/* Logo */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 48 }}>
          <img src="/logo.png" alt="Upna Loan" style={{ height: 100, objectFit: "contain" }} />
        </div>

        {/* 4 Column Grid */}
        <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "40px", maxWidth: "1200px", margin: "0 auto 50px", textAlign: "left" }}>
          
          {/* COMPANY */}
          <div>
            <h4 style={{ fontSize: "16px", fontWeight: "700", color: "#f97316", marginBottom: "24px" }}>COMPANY</h4>
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
            <h4 style={{ fontSize: "16px", fontWeight: "700", color: "#f97316", marginBottom: "24px" }}>EXPLORE</h4>
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
            <h4 style={{ fontSize: "16px", fontWeight: "700", color: "#f97316", marginBottom: "24px" }}>CONTACT</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              <li style={{ marginBottom: "14px", display: "flex", alignItems: "center", gap: "10px" }}>
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

          {/* FOLLOW US - No lucide-react icons, using simple text */}
          <div>
            <h4 style={{ fontSize: "16px", fontWeight: "700", color: "#f97316", marginBottom: "24px" }}>FOLLOW US</h4>
            <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
              {["Facebook", "Twitter", "LinkedIn", "Instagram"].map(social => (
                <a key={social} href="#" style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "38px",
                  height: "38px",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.1)",
                  color: "white",
                  textDecoration: "none",
                  fontSize: "12px",
                  fontWeight: "600",
                  transition: "all 0.3s",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = "#f97316";
                  e.currentTarget.style.transform = "translateY(-3px)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}>
                  {social[0]}{social[1]}
                </a>
              ))}
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