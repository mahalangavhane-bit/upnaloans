// PlatformProducts.jsx
import { Home, Briefcase, User, Car, GraduationCap, Building2, CreditCard, Heart } from "lucide-react";

const products = [
  { icon: Home, bg: "#fff7ed", color: "#f97316", label: "Home Loan" },
  { icon: Briefcase, bg: "#fefce8", color: "#eab308", label: "Business Loan" },
  { icon: User, bg: "#fff7ed", color: "#f97316", label: "Personal Loan" },
  { icon: Car, bg: "#fefce8", color: "#eab308", label: "Car Loan" },
  { icon: GraduationCap, bg: "#f0fdf4", color: "#16a34a", label: "Education Loan" },
  { icon: Building2, bg: "#fff7ed", color: "#f97316", label: "Plot Loan" },
  { icon: CreditCard, bg: "#fefce8", color: "#eab308", label: "Credit Card" },
  { icon: Heart, bg: "#fff7ed", color: "#f97316", label: "Medical Loan" },
];

export default function PlatformProducts() {
  return (
    <section className="section products-section">
      <div className="section-inner">
        <div className="section-label">Our Products</div>
        <h2 className="section-title">Every Financial Need, One Platform</h2>
        <p className="section-sub">From home loans to credit cards — compare, apply and get approved across all categories.</p>
        <div className="products-grid">
          {products.map(p => {
            const Icon = p.icon;
            return (
              <div className="product-card" key={p.label}>
                <div className="product-icon" style={{ background: p.bg, color: p.color }}>
                  <Icon size={24} strokeWidth={1.5} />
                </div>
                <p>{p.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}