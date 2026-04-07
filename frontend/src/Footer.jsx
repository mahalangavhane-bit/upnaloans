// Footer.jsx
import { LOGO_SRC } from "./logoData";

const popularSearches = [
  ["2 BHK Flats in Mumbai", "3 BHK Flats in Mumbai", "Premium Apartments in Mumbai", "Ready to Move Flats in Mumbai"],
  ["Under Construction Flats in Mumbai", "2 BHK Flats in Thane", "3 BHK Flats in Thane", "Under Construction in Thane"],
  ["2 BHK Flats in Navi Mumbai", "Premium Apartments in Navi Mumbai", "Plots in Navi Mumbai", "Office Spaces in Andheri"],
  ["Flats in Mira Road", "Commercial Land in Mumbai", "Plots in Panvel", "Properties in Kharghar"],
  ["Properties in Ulwe", "Villas in Mumbai", "Properties in Badlapur", "Warehouses in Bhiwandi"],
];

const allSearches = popularSearches.flat();

const navCategories = [
  { label: "RESIDENTIAL", active: false },
  { label: "INDUSTRIAL", active: false },
  { label: "COMMERCIAL", active: false },
  { label: "RETAIL", active: false },
  { label: "PLOT", active: false },
  { label: "POPULAR SEARCHES", active: true },
];

export default function Footer() {
  return (
    <footer style={{
      backgroundColor: '#2d1063',
      color: "white",
    }}>
      {/* Top accent bar */}
      <div style={{
        height: 4,
        background: "linear-gradient(90deg, #f97316, #eab308, #f97316)"
      }} />

      {/* Logo strip + category nav */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "32px 40px 0",
        flexWrap: "wrap", gap: 16,
        borderBottom: "1px solid rgba(249,115,22,0.2)",
        paddingBottom: 24
      }}>
        {/* Footer logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <img src={LOGO_SRC} alt="Upna Loan" style={{ height: 38, objectFit: "contain" }} />
        </div>

        {/* Category nav tabs */}
        <div style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
          {navCategories.map(cat => (
            <span key={cat.label} style={{
              fontSize: 12.5, fontWeight: 700, cursor: "pointer",
              color: cat.active ? "#facc15" : "rgba(255,255,255,0.5)",
              borderBottom: cat.active ? "2px solid #f97316" : "2px solid transparent",
              paddingBottom: 4, transition: "all .2s",
              letterSpacing: ".5px"
            }}
              onMouseEnter={e => { e.target.style.color = "#facc15"; e.target.style.borderBottomColor = "#f97316"; }}
              onMouseLeave={e => {
                e.target.style.color = cat.active ? "#facc15" : "rgba(255,255,255,0.5)";
                e.target.style.borderBottomColor = cat.active ? "#f97316" : "transparent";
              }}
            >{cat.label}</span>
          ))}
        </div>
      </div>

      {/* Popular searches section */}
      <div style={{ padding: "28px 40px 0", textAlign: "left" }}>
        <h3 style={{
          fontSize: 16, fontWeight: 700, marginBottom: 20,
          color: "white",
          fontFamily: "'Sora', sans-serif"
        }}>
          Popular Property Searches
        </h3>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "6px 30px",
        }}>
          {allSearches.map(s => (
            <div key={s} style={{
              fontSize: 13, color: "rgba(255,255,255,0.55)", cursor: "pointer",
              marginBottom: 7, transition: "color .2s"
            }}
              onMouseEnter={e => { e.target.style.color = "#fbbf24"; }}
              onMouseLeave={e => { e.target.style.color = "rgba(255,255,255,0.55)"; }}
            >{s}</div>
          ))}
        </div>
      </div>

      {/* Main footer columns */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "2fr 1fr 1fr 1fr",
        gap: 40,
        padding: "40px 40px 32px",
        borderTop: "1px solid rgba(249,115,22,0.15)",
        marginTop: 36,
        textAlign: "left"
      }}>
        {/* Brand column */}
        <div>
          <img src={LOGO_SRC} alt="Upna Loan" style={{ height: 34, objectFit: "contain", marginBottom: 16 }} />
          <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.6)", lineHeight: 1.75, maxWidth: 300, marginBottom: 22 }}>
            India's smart lending platform — compare 50+ lenders, calculate EMI, check eligibility and get approved in 24 hours.
          </p>
          {[
            { icon: "📞", text: "+91 9999 999 999" },
            { icon: "✉️", text: "info@upnaloans.com" },
            { icon: "📍", text: "Mumbai, Maharashtra" },
          ].map(c => (
            <div key={c.text} style={{
              display: "flex", alignItems: "center", gap: 10,
              fontSize: 13.5, color: "rgba(255,255,255,0.7)", marginBottom: 11
            }}>
              <span style={{ fontSize: 15 }}>{c.icon}</span> {c.text}
            </div>
          ))}
          {/* Social icons */}
          <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
            {[
              { icon: "▶", label: "YouTube" },
              { icon: "in", label: "LinkedIn" },
              { icon: "📷", label: "Instagram" },
            ].map(s => (
              <a key={s.label} href="#" style={{
                width: 38, height: 38, borderRadius: "50%",
                background: "rgba(249,115,22,0.18)",
                border: "1px solid rgba(249,115,22,0.3)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 13, cursor: "pointer", color: "white",
                textDecoration: "none", fontWeight: 700, transition: "all .2s"
              }}
                onMouseEnter={e => { e.currentTarget.style.background = "linear-gradient(135deg, #f97316, #eab308)"; e.currentTarget.style.borderColor = "transparent"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(249,115,22,0.18)"; e.currentTarget.style.borderColor = "rgba(249,115,22,0.3)"; }}
              >{s.icon}</a>
            ))}
          </div>
        </div>

        {/* Company */}
        <div>
          <h4 style={{
            fontSize: 12.5, fontWeight: 800, marginBottom: 18,
            color: "#f97316", textTransform: "uppercase", letterSpacing: "1px",
            fontFamily: "'Sora', sans-serif"
          }}>COMPANY</h4>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {["Properties", "About", "Compare Projects", "For Buyers", "For Developers", "Contact"].map(l => (
              <li key={l} style={{ fontSize: 13.5, color: "rgba(255,255,255,0.6)", marginBottom: 11, cursor: "pointer", transition: "color .2s" }}
                onMouseEnter={e => e.target.style.color = "#fbbf24"}
                onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.6)"}
              >{l}</li>
            ))}
          </ul>
        </div>

        {/* Explore */}
        <div>
          <h4 style={{
            fontSize: 12.5, fontWeight: 800, marginBottom: 18,
            color: "#f97316", textTransform: "uppercase", letterSpacing: "1px",
            fontFamily: "'Sora', sans-serif"
          }}>EXPLORE</h4>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {["News", "Home Loans", "Home Interior", "Sitemap", "AI Smart Search", "Testimonials"].map(l => (
              <li key={l} style={{ fontSize: 13.5, color: "rgba(255,255,255,0.6)", marginBottom: 11, cursor: "pointer", transition: "color .2s" }}
                onMouseEnter={e => e.target.style.color = "#fbbf24"}
                onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.6)"}
              >{l}</li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 style={{
            fontSize: 12.5, fontWeight: 800, marginBottom: 18,
            color: "#f97316", textTransform: "uppercase", letterSpacing: "1px",
            fontFamily: "'Sora', sans-serif"
          }}>CONTACT</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
            {[
              { icon: "📞", text: "+91 9999 999 999" },
              { icon: "✉️", text: "info@compareprojects.in" },
              { icon: "📍", text: "Mumbai, Maharashtra" },
            ].map(c => (
              <div key={c.text} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 13.5, color: "rgba(255,255,255,0.7)" }}>
                <span style={{ flexShrink: 0 }}>{c.icon}</span> {c.text}
              </div>
            ))}
          </div>

          <h4 style={{
            fontSize: 12.5, fontWeight: 800, marginTop: 26, marginBottom: 16,
            color: "#f97316", textTransform: "uppercase", letterSpacing: "1px",
            fontFamily: "'Sora', sans-serif"
          }}>FOLLOW US</h4>
          <div style={{ display: "flex", gap: 10 }}>
            {["▶", "in", "📷"].map((icon, i) => (
              <a key={i} href="#" style={{
                width: 38, height: 38, borderRadius: "50%",
                background: "rgba(249,115,22,0.18)",
                border: "1px solid rgba(249,115,22,0.3)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 13, cursor: "pointer", color: "white",
                textDecoration: "none", fontWeight: 700, transition: "all .2s"
              }}
                onMouseEnter={e => { e.currentTarget.style.background = "linear-gradient(135deg, #f97316, #eab308)"; e.currentTarget.style.borderColor = "transparent"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(249,115,22,0.18)"; e.currentTarget.style.borderColor = "rgba(249,115,22,0.3)"; }}
              >{icon}</a>
            ))}
          </div>
        </div>
      </div>

      {/* Trust badges */}
      <div style={{
        display: "flex", justifyContent: "flex-start", gap: 20,
        padding: "18px 40px",
        borderTop: "1px solid rgba(249,115,22,0.15)",
        flexWrap: "wrap"
      }}>
        {["🏛️ RERA Listed Projects", "✓ Verified Developers", "🔒 Secure Platform"].map(b => (
          <span key={b} style={{
            fontSize: 13, color: "rgba(255,255,255,0.65)",
            border: "1px solid rgba(249,115,22,0.35)",
            background: "rgba(249,115,22,0.07)",
            borderRadius: 20, padding: "6px 16px"
          }}>{b}</span>
        ))}
      </div>

      {/* Bottom bar */}
      <div style={{
        display: "flex", justifyContent: "flex-start", alignItems: "center",
        flexWrap: "wrap", gap: 16,
        padding: "14px 40px 20px",
        fontSize: 12.5, color: "rgba(255,255,255,0.4)"
      }}>
        {["Privacy Policy", "Terms of Use", "Disclaimer", "Cookie Policy"].map((item, i) => (
          <span key={item} style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ cursor: "pointer", transition: "color .2s" }}
              onMouseEnter={e => e.target.style.color = "#fbbf24"}
              onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.4)"}
            >{item}</span>
            {i < 3 && <span style={{ opacity: 0.3 }}>•</span>}
          </span>
        ))}
        <span style={{ width: "100%", textAlign: "left", marginTop: 6, color: "rgba(255,255,255,0.35)" }}>
          © 2026 Upna Loans Pvt. Ltd. All rights reserved.
        </span>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&display=swap');
        @media (max-width: 900px) {
          footer > div:nth-child(4) { grid-template-columns: 1fr 1fr !important; }
          footer > div:nth-child(3) { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 580px) {
          footer > div:nth-child(4) { grid-template-columns: 1fr !important; }
          footer > div:nth-child(3) { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </footer>
  );
}
