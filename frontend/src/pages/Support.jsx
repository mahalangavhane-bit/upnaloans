// pages/Support.jsx
import { useState } from "react";

const faqs = [
  { q: "How do I check my loan eligibility?",         a: "Click 'Check Eligibility' on the homepage, fill in your monthly income, employment type and loan amount. You'll get an instant result — no documents needed and no impact on your credit score." },
  { q: "Does checking eligibility affect my CIBIL score?", a: "No. We use a soft inquiry to check your eligibility, which does not affect your CIBIL or credit score in any way." },
  { q: "How long does loan approval take?",           a: "Most lenders on our platform approve loans within 24–48 hours for salaried applicants. Self-employed applicants may take 3–5 working days depending on the lender." },
  { q: "What documents are required for a home loan?", a: "Typically: PAN card, Aadhaar, last 3 months salary slips (salaried) or 2 years ITR (self-employed), last 6 months bank statement, and property documents. Requirements vary by lender." },
  { q: "Is UpnaLoans a direct lender?",               a: "No — we are a loan comparison and facilitation platform. We partner with 50+ banks and NBFCs and help you find the best offer. You apply through us and the lender disburses directly." },
  { q: "Are there any charges for using UpnaLoans?",  a: "Our service is completely free for borrowers. We are compensated by lenders when a loan is disbursed. There are zero hidden charges from our side." },
  { q: "What is the minimum CIBIL score required?",   a: "Most lenders require a minimum CIBIL score of 700–750 for home loans and 720+ for personal loans. Some NBFCs accept scores as low as 650 with a higher interest rate." },
  { q: "Can I prepay my loan?",                       a: "Yes. Most banks allow prepayment. For floating-rate loans, RBI guidelines prohibit prepayment penalties. Fixed-rate loans may carry a 2–4% prepayment charge depending on the lender." },
];

const helpTopics = [
  { icon: "📋", title: "Loan Application",    desc: "How to apply, documents needed, and tracking your application status.", color: "#fff7ed" },
  { icon: "💳", title: "EMI & Repayment",     desc: "EMI calculation, due dates, auto-debit setup, and prepayment options.", color: "#fefce8" },
  { icon: "📊", title: "Eligibility & CIBIL", desc: "Understand your loan eligibility and how your credit score affects rates.", color: "#f0fdf4" },
  { icon: "🏠", title: "Home Loan Queries",   desc: "Property valuation, legal verification, RERA and registration process.", color: "#eff6ff" },
  { icon: "🔐", title: "Account & Privacy",   desc: "Update your profile, manage data preferences and security settings.", color: "#fdf4ff" },
  { icon: "📞", title: "Talk to an Advisor",  desc: "Schedule a free 1-on-1 call with our loan experts at your convenience.", color: "#fff7ed" },
];

export default function Support() {
  const [open, setOpen] = useState(null);
  const [search, setSearch] = useState("");

  const filtered = faqs.filter(f =>
    f.q.toLowerCase().includes(search.toLowerCase()) ||
    f.a.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ minHeight: "80vh", background: "#fafaf8" }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg,#1a0800,#2d1200)",
        padding: "60px 32px", textAlign: "center"
      }}>
        <div style={{
          display: "inline-block", background: "rgba(249,115,22,.15)", color: "#fb923c",
          padding: "4px 12px", borderRadius: 6, fontSize: 12, fontWeight: 600,
          textTransform: "uppercase", letterSpacing: ".5px", marginBottom: 14,
          border: "1px solid rgba(249,115,22,.3)"
        }}>Help Center</div>
        <h1 style={{ fontFamily: "'Sora',sans-serif", fontSize: 36, fontWeight: 700, color: "white", marginBottom: 14 }}>
          Support &amp; Help
        </h1>
        <p style={{ color: "rgba(255,255,255,.65)", fontSize: 15, maxWidth: 480, margin: "0 auto 30px", lineHeight: 1.7 }}>
          Find answers to common questions or connect with our team directly.
        </p>
        {/* Search bar */}
        <div style={{ maxWidth: 500, margin: "0 auto", position: "relative" }}>
          <span style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", fontSize: 18 }}>🔍</span>
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search your question..."
            style={{
              width: "100%", height: 50, borderRadius: 12, border: "none", outline: "none",
              paddingLeft: 48, paddingRight: 16, fontSize: 15,
              fontFamily: "'DM Sans',sans-serif", color: "#1c1108",
              boxSizing: "border-box", boxShadow: "0 4px 20px rgba(0,0,0,.2)"
            }}
          />
        </div>
      </div>

      <div style={{ padding: "60px 32px", maxWidth: 1100, margin: "0 auto" }}>

        {/* Help topics grid */}
        <h2 style={{ fontFamily: "'Sora',sans-serif", fontSize: 24, fontWeight: 700, color: "#1a0800", marginBottom: 24 }}>
          Browse by Topic
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 18, marginBottom: 60 }}>
          {helpTopics.map(t => (
            <div key={t.title} style={{
              background: "white", borderRadius: 14, border: "1.5px solid #fed7aa",
              padding: "22px 22px", cursor: "pointer", transition: "all .2s"
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#f97316"; e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(249,115,22,.12)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#fed7aa"; e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "none"; }}
            >
              <div style={{
                width: 48, height: 48, borderRadius: 12, background: t.color,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 22, marginBottom: 14
              }}>{t.icon}</div>
              <h3 style={{ fontFamily: "'Sora',sans-serif", fontSize: 15, fontWeight: 600, color: "#1a0800", marginBottom: 6 }}>{t.title}</h3>
              <p style={{ fontSize: 13, color: "#78716c", lineHeight: 1.6 }}>{t.desc}</p>
            </div>
          ))}
        </div>

        {/* FAQ accordion */}
        <h2 style={{ fontFamily: "'Sora',sans-serif", fontSize: 24, fontWeight: 700, color: "#1a0800", marginBottom: 10 }}>
          Frequently Asked Questions
        </h2>
        <p style={{ fontSize: 14, color: "#78716c", marginBottom: 28 }}>
          {search ? `${filtered.length} result${filtered.length !== 1 ? "s" : ""} for "${search}"` : `${faqs.length} questions answered`}
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 780 }}>
          {filtered.map((f, i) => (
            <div key={i} style={{
              background: "white", borderRadius: 14,
              border: `1.5px solid ${open === i ? "#f97316" : "#fed7aa"}`,
              overflow: "hidden", transition: "border-color .2s"
            }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: "100%", display: "flex", justifyContent: "space-between",
                  alignItems: "center", padding: "18px 22px", background: "none",
                  border: "none", cursor: "pointer", textAlign: "left", gap: 12
                }}
              >
                <span style={{ fontFamily: "'Sora',sans-serif", fontSize: 15, fontWeight: 600, color: "#1a0800", lineHeight: 1.4 }}>{f.q}</span>
                <span style={{
                  flexShrink: 0, width: 28, height: 28, borderRadius: "50%",
                  background: open === i ? "linear-gradient(135deg,#f97316,#eab308)" : "#fff7ed",
                  color: open === i ? "white" : "#f97316",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 18, fontWeight: 300, transition: "all .2s"
                }}>{open === i ? "−" : "+"}</span>
              </button>
              {open === i && (
                <div style={{ padding: "0 22px 20px", fontSize: 14, color: "#57534e", lineHeight: 1.75 }}>
                  {f.a}
                </div>
              )}
            </div>
          ))}
          {filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: "40px 20px", color: "#78716c" }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
              <p>No results found for "<strong>{search}</strong>". Try different keywords or <a href="#" style={{ color: "#f97316" }}>contact us</a>.</p>
            </div>
          )}
        </div>

        {/* Still need help CTA */}
        <div style={{
          marginTop: 60, background: "linear-gradient(135deg,#f97316,#eab308)",
          borderRadius: 20, padding: "48px 36px", textAlign: "center"
        }}>
          <h3 style={{ fontFamily: "'Sora',sans-serif", fontSize: 26, fontWeight: 700, color: "white", marginBottom: 10 }}>
            Still need help?
          </h3>
          <p style={{ color: "rgba(255,255,255,.9)", fontSize: 15, marginBottom: 28 }}>
            Our loan advisors are available Mon–Sat, 9am–7pm to help you personally.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <button style={{
              height: 48, padding: "0 30px", background: "#1a0800", color: "white",
              border: "none", borderRadius: 10, fontSize: 15, fontWeight: 600,
              cursor: "pointer", fontFamily: "'DM Sans',sans-serif"
            }}>📞 Call Us Now</button>
            <button style={{
              height: 48, padding: "0 30px", background: "rgba(255,255,255,.2)", color: "white",
              border: "2px solid rgba(255,255,255,.6)", borderRadius: 10, fontSize: 15, fontWeight: 600,
              cursor: "pointer", fontFamily: "'DM Sans',sans-serif"
            }}>💬 WhatsApp Us</button>
          </div>
        </div>
      </div>
    </div>
  );
}
