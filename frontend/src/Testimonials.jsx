// Testimonials.jsx
import { Star, User, MapPin, Quote } from "lucide-react";

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
          <Star size={14} fill="#fb923c" />
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
            <div className="stars">
              {[...Array(t.rating)].map((_, i) => (
                <Star key={i} size={16} fill="#f97316" color="#f97316" />
              ))}
            </div>
            <Quote size={32} style={{ opacity: 0.15, position: "absolute", top: 20, right: 24 }} />
            <p className="testi-text">"{t.text}"</p>
            <div className="testi-author">
              <div className="testi-avatar" style={{ background: t.avatarBg, color: t.avatarColor }}>
                {t.initials}
              </div>
              <div>
                <div className="testi-name">
                  <User size={12} style={{ marginRight: 4, opacity: 0.6 }} />
                  {t.name}
                </div>
                <div className="testi-city">
                  <MapPin size={10} style={{ marginRight: 3, opacity: 0.5 }} />
                  {t.city}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}