// WhyChooseUs.jsx
import { Search, Zap, Handshake, Shield, TrendingUp, Users } from "lucide-react";

const whyItems = [
  { 
    icon: Search, 
    bg: "#fff7ed", 
    color: "#f97316", 
    title: "Compare 50+ Lenders",  
    desc: "Instantly compare interest rates, EMI and eligibility from 50+ banks and NBFCs on a single screen." 
  },
  { 
    icon: Zap, 
    bg: "#f0fdf4", 
    color: "#16a34a", 
    title: "Instant Pre-Approval", 
    desc: "Check your eligibility in under 60 seconds. Get pre-approved without impacting your credit score." 
  },
  { 
    icon: Handshake, 
    bg: "#fefce8", 
    color: "#eab308", 
    title: "Zero Commission",       
    desc: "We earn from lenders — not from you. Our service is completely free with zero hidden charges." 
  },
  { 
    icon: Shield, 
    bg: "#fff7ed", 
    color: "#f97316", 
    title: "End-to-End Support",   
    desc: "Dedicated loan advisors guide you from application to disbursal — and beyond, for the life of your loan." 
  },
];

export default function WhyChooseUs() {
  return (
    <section className="section why-section">
      <div className="section-inner">
        <div className="section-label">
          <TrendingUp size={16} />
          Why UpnaLoans
        </div>
        <h2 className="section-title">Built for Your Financial Journey</h2>
        <p className="section-sub">Technology, transparency and trust — to get you the best deal every time.</p>
        <div className="why-grid">
          {whyItems.map(w => {
            const Icon = w.icon;
            return (
              <div className="why-card" key={w.title}>
                <div className="why-icon" style={{ background: w.bg, color: w.color }}>
                  <Icon size={24} strokeWidth={1.5} />
                </div>
                <h3>{w.title}</h3>
                <p>{w.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}