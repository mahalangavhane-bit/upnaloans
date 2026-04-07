// WhyChooseUs.jsx
const whyItems = [
  { icon: "🔍", bg: "#fff7ed", color: "#c2410c", title: "Compare 50+ Lenders",  desc: "Instantly compare interest rates, EMI and eligibility from 50+ banks and NBFCs on a single screen." },
  { icon: "⚡", bg: "#f0fdf4", color: "#16a34a", title: "Instant Pre-Approval", desc: "Check your eligibility in under 60 seconds. Get pre-approved without impacting your credit score." },
  { icon: "🤝", bg: "#fefce8", color: "#92400e", title: "Zero Commission",       desc: "We earn from lenders — not from you. Our service is completely free with zero hidden charges." },
  { icon: "🛡️", bg: "#fff7ed", color: "#f97316", title: "End-to-End Support",   desc: "Dedicated loan advisors guide you from application to disbursal — and beyond, for the life of your loan." },
];

export default function WhyChooseUs() {
  return (
    <section className="section why-section">
      <div className="section-inner">
        <div className="section-label">Why UpnaLoans</div>
        <h2 className="section-title">Built for Your Financial Journey</h2>
        <p className="section-sub">Technology, transparency and trust — to get you the best deal every time.</p>
        <div className="why-grid">
          {whyItems.map(w => (
            <div className="why-card" key={w.title}>
              <div className="why-icon" style={{ background: w.bg, color: w.color }}>{w.icon}</div>
              <h3>{w.title}</h3>
              <p>{w.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
