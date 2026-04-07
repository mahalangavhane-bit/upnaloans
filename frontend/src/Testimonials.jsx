// Testimonials.jsx
const testimonials = [
  {
    initials: "RK", avatarBg: "#fff7ed", avatarColor: "#f97316",
    name: "Rahul Kumar", city: "Mumbai, Maharashtra", rating: 5,
    text: "Got my home loan approved at 7.1% when other platforms were offering 8.5%. The team guided me through the entire process and there were zero surprises at the end.",
  },
  {
    initials: "PS", avatarBg: "#e8f7ef", avatarColor: "#16a34a",
    name: "Priya Shah", city: "Pune, Maharashtra", rating: 5,
    text: "Applied for a business loan on Monday, got sanctioned by Wednesday, and funds were in my account on Friday. Exceptional speed and completely transparent process.",
  },
  {
    initials: "AM", avatarBg: "#fefce8", avatarColor: "#eab308",
    name: "Amit Mehta", city: "Thane, Maharashtra", rating: 5,
    text: "The EMI calculator and bank comparison tools are genuinely useful. I saved ₹3.2 lakh in interest by switching to the bank UpnaLoans recommended.",
  },
];

export default function Testimonials() {
  return (
    <section className="testi-section">
      <div className="testi-header">
        <div className="section-label" style={{ background: "rgba(249,115,22,.15)", color: "#fb923c", borderColor: "rgba(249,115,22,.3)" }}>
          Customer Stories
        </div>
        <h2 className="section-title" style={{ color: "white", marginTop: 10 }}>2,40,000+ Happy Customers</h2>
        <p style={{ color: "rgba(255,255,255,.6)", fontSize: 15, maxWidth: 500, margin: "10px auto 0", lineHeight: 1.7 }}>
          Real stories from people who secured their dream home, grew their business, and planned their future.
        </p>
      </div>
      <div className="testi-grid">
        {testimonials.map(t => (
          <div className="testi-card" key={t.name}>
            <div className="stars">{"★".repeat(t.rating)}</div>
            <p className="testi-text">"{t.text}"</p>
            <div className="testi-author">
              <div className="testi-avatar" style={{ background: t.avatarBg, color: t.avatarColor }}>{t.initials}</div>
              <div>
                <div className="testi-name">{t.name}</div>
                <div className="testi-city">{t.city}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
