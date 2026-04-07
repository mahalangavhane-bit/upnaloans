// Hero.jsx
import { useState } from "react";

function HeroForm() {
  const [tab, setTab] = useState(0);
  const tabs = ["Home Loan", "Personal Loan", "Business Loan"];
  return (
    <div className="hero-form">
      <div className="form-tabs">
        {tabs.map((t, i) => (
          <button key={t} className={`form-tab${tab === i ? " active" : ""}`} onClick={() => setTab(i)}>{t}</button>
        ))}
      </div>
      <div className="form-row">
        <div className="form-field">
          <label>Loan Amount</label>
          <select><option>₹ 50 Lakh</option><option>₹ 1 Crore</option><option>₹ 2 Crore</option></select>
        </div>
        <div className="form-field">
          <label>Loan Tenure</label>
          <select><option>20 Years</option><option>15 Years</option><option>10 Years</option></select>
        </div>
      </div>
      <div className="form-row">
        <div className="form-field">
          <label>Monthly Income</label>
          <input type="text" placeholder="₹ 75,000" />
        </div>
        <div className="form-field">
          <label>Employment Type</label>
          <select><option>Salaried</option><option>Self-Employed</option><option>Business Owner</option></select>
        </div>
      </div>
      <div className="form-field">
        <label>Mobile Number</label>
        <input type="tel" placeholder="+91 98765 43210" />
      </div>
      <button className="btn-hero">Check Eligibility &amp; Compare Rates →</button>
      <p className="form-note">✓ Free check &nbsp;•&nbsp; No credit score impact</p>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-inner">
        <div>
          <div className="hero-tag">🏆 India's #1 Loan Comparison Platform</div>
          <h1>Get the <span>Best Loan</span><br />at the Lowest Rates</h1>
          <p className="hero-sub">
            Compare 50+ banks and NBFCs. Check eligibility instantly. Get approved in 24 hours — fully online, zero documentation hassle.
          </p>
          <div className="trust-badges">
            {[
              { bg: "#f0fdf4", color: "#16a34a", icon: "✓", text: "Zero Hidden Charges" },
              { bg: "#fff7ed", color: "#c2410c", icon: "🔒", text: "100% Secure" },
              { bg: "#fefce8", color: "#92400e", icon: "⚡", text: "Instant Approval" },
            ].map(b => (
              <div className="trust-badge" key={b.text}>
                <div className="trust-icon" style={{ background: b.bg, color: b.color }}>{b.icon}</div>
                {b.text}
              </div>
            ))}
          </div>
        </div>
        <HeroForm />
      </div>
    </section>
  );
}
