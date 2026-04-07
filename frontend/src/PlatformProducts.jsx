// PlatformProducts.jsx
const products = [
  { icon: "🏠", bg: "#fff7ed", label: "Home Loan" },
  { icon: "💼", bg: "#fefce8", label: "Business Loan" },
  { icon: "👤", bg: "#fff7ed", label: "Personal Loan" },
  { icon: "🚗", bg: "#fefce8", label: "Car Loan" },
  { icon: "🎓", bg: "#f0fdf4", label: "Education Loan" },
  { icon: "🏗️", bg: "#fff7ed", label: "Plot Loan" },
  { icon: "💳", bg: "#fefce8", label: "Credit Card" },
  { icon: "🏥", bg: "#fff7ed", label: "Medical Loan" },
];

export default function PlatformProducts() {
  return (
    <section className="section products-section">
      <div className="section-inner">
        <div className="section-label">Our Products</div>
        <h2 className="section-title">Every Financial Need, One Platform</h2>
        <p className="section-sub">From home loans to credit cards — compare, apply and get approved across all categories.</p>
        <div className="products-grid">
          {products.map(p => (
            <div className="product-card" key={p.label}>
              <div className="product-icon" style={{ background: p.bg }}>{p.icon}</div>
              <p>{p.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
