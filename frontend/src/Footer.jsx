// Footer.jsx

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

// SVG initials fallback — renders when image URL fails
function InitialsBadge({ name, color }) {
  const initials = name.split(" ").slice(0, 2).map(w => w[0]).join("").toUpperCase();
  return (
    <svg width="38" height="26" viewBox="0 0 38 26" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="38" height="26" rx="4" fill={color} />
      <text
        x="19" y="18"
        textAnchor="middle"
        fill="#ffffff"
        style={{
          fontSize: initials.length > 3 ? "8px" : "10px",
          fontWeight: 700,
          fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
          letterSpacing: "0.4px",
        }}
      >
        {initials}
      </text>
    </svg>
  );
}

// Single bank card — Paisabazaar layout: [logo] | [name]
function BankCard({ bank }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 0,
        background: "#ffffff",
        border: "1px solid rgba(249,115,22,0.3)",   // ← keeps your orange border theme
        borderRadius: 8,
        overflow: "hidden",
        height: 50,
        cursor: "pointer",
        transition: "all 0.3s",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = "rgba(249,115,22,0.04)";
        e.currentTarget.style.borderColor = "rgba(249,115,22,0.6)";
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(249,115,22,0.2)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = "#ffffff";
        e.currentTarget.style.borderColor = "rgba(249,115,22,0.3)";
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 2px 6px rgba(0,0,0,0.1)";
      }}
    >
      {/* LEFT — logo area, fixed 52px wide, centered */}
      <div style={{
        width: 52,
        minWidth: 52,
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 6px",
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
        {/* Fallback SVG badge, hidden by default */}
        <span style={{ display: "none" }}>
          <InitialsBadge name={bank.name} color={bank.color} />
        </span>
      </div>

      {/* RIGHT — bank name */}
      <div style={{
        flex: 1,
        padding: "0 10px",
        overflow: "hidden",
      }}>
        <span style={{
          display: "block",
          color: "#1a1a1a",
          fontSize: bank.name.length > 14 ? "9px" : bank.name.length > 9 ? "10px" : "11px",
          fontWeight: 500,
          fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
          lineHeight: 1.3,
          letterSpacing: "0.1px",
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

// ─── Main Footer — original design fully preserved ────────────────────────────
export default function Footer() {
  return (
    <footer style={{
      backgroundColor: '#2d1063',
      color: "white",
    }}>
      {/* Top accent bar — ORIGINAL, untouched */}
      <div style={{
        height: 4,
        background: "linear-gradient(90deg, #f97316, #eab308, #f97316)"
      }} />

      {/* ── BANK PARTNERS SECTION — Paisabazaar style added here ── */}
      <div style={{
        padding: "40px 64px 20px",
        textAlign: "center",
        backgroundColor: "rgba(255,255,255,0.02)"
      }}>
        {/* Heading — ORIGINAL style preserved */}
        <h3 style={{
          fontSize: 16,
          fontWeight: 700,
          color: "white",
          marginBottom: 30,
          textTransform: "uppercase",
          letterSpacing: "2px",
          fontFamily: "'Sora', sans-serif"
        }}>Our Lending Partners</h3>

        {/* Paisabazaar-style responsive grid of horizontal cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
          gap: 10,
          maxWidth: "1400px",
          margin: "0 auto",
        }}>
          {banks.map(bank => (
            <BankCard key={bank.name} bank={bank} />
          ))}
        </div>

        {/* Responsive overrides via a style tag scoped to this section */}
        <style>{`
          @media (max-width: 768px) {
            .pb-bank-grid {
              grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)) !important;
              gap: 8px !important;
              padding: 0 !important;
            }
          }
          @media (max-width: 480px) {
            .pb-bank-grid {
              grid-template-columns: repeat(2, 1fr) !important;
            }
          }
        `}</style>
      </div>

      {/* Main footer content — ORIGINAL, untouched ─────────────────────── */}
      <div style={{
        padding: "20px 64px 40px",
        textAlign: "center",
        borderTop: "1px solid rgba(249,115,22,0.2)"
      }}>
        {/* Logo */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
          <img src="/logo.png" alt="Upna Loan" style={{ height: 70, objectFit: "contain" }} />
        </div>

        {/* Address */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          fontSize: 14,
          color: "rgba(255,255,255,0.8)",
          marginBottom: 20
        }}>
          <span> Mumbai, Maharashtra</span>
        </div>

        {/* Copyright */}
        <div style={{
          fontSize: 12,
          color: "rgba(255,255,255,0.6)",
          borderTop: "1px solid rgba(249,115,22,0.2)",
          paddingTop: 20,
          marginTop: 20
        }}>
          © 2024 Upna Loan. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
