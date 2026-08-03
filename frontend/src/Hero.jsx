import { useState } from "react";
import { Shield, Lock, Zap, Home, Briefcase, User, CheckCircle } from "lucide-react";

function HeroForm() {
  const [tab, setTab] = useState(0);
  const tabs = ["Home Loan", "Personal Loan", "Business Loan"];
  const tabIcons = [<Home size={16} />, <User size={16} />, <Briefcase size={16} />];

  return (
    <div className="hero-form">
      <div className="form-tabs">
        {tabs.map((t, i) => (
          <button
            key={t}
            className={`form-tab ${tab === i ? "active" : ""}`}
            onClick={() => setTab(i)}
          >
            {tabIcons[i]}
            <span>{t}</span>
          </button>
        ))}
      </div>

      <div className="form-row">
        <div className="form-field">
          <label>Loan Amount</label>
          <select>
            <option>₹ 50 Lakh</option>
            <option>₹ 1 Crore</option>
            <option>₹ 2 Crore</option>
          </select>
        </div>

        <div className="form-field">
          <label>Loan Tenure</label>
          <select>
            <option>20 Years</option>
            <option>15 Years</option>
            <option>10 Years</option>
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-field">
          <label>Monthly Income</label>
          <input type="text" placeholder="₹ 75,000" />
        </div>

        <div className="form-field">
          <label>Employment Type</label>
          <select>
            <option>Salaried</option>
            <option>Self-Employed</option>
            <option>Business Owner</option>
          </select>
        </div>
      </div>

      <div className="form-field">
        <label>Mobile Number</label>
        <input type="tel" placeholder="+91 98765 43210" />
      </div>

      <button className="btn-hero">
        Check Eligibility & Compare Rates →
      </button>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-inner">

          {/* LEFT CONTENT */}
          <div className="hero-left">

            <h1>
              Get the <span>Best Loan</span><br />
              at the Lowest Rates
            </h1>

            <p className="hero-sub">
              Compare 50+ banks and NBFCs. Check eligibility instantly.
              Get approved in 24 hours — fully online, zero documentation hassle.
            </p>
          </div>

          {/* RIGHT FORM */}
          <HeroForm />
        </div>
      </div>

      <style jsx>{`
        .hero {
          background: linear-gradient(180deg, #f8fafc 0%, #ffffff 100%);
          padding: 60px 0 40px;
        }

        .hero-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 32px;
        }

        .hero-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 60px;
        }

        .hero-left {
          flex: 1;
        }

        .hero-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #fff7ed;
          color: #c2410c;
          padding: 6px 12px;
          border-radius: 999px;
          font-size: 12px;
          margin-bottom: 16px;
        }

        h1 {
          font-size: 42px;
          line-height: 1.2;
          margin-bottom: 16px;
        }

        h1 span {
          color: #f97316;
        }

        .hero-sub {
          color: #6b7280;
          margin-bottom: 24px;
        }

        .trust-badges {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }

        .trust-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
        }

        .trust-icon {
          padding: 6px;
          border-radius: 6px;
        }

        .hero-form {
          flex: 1;
          background: white;
          padding: 24px;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.08);
        }

        .form-tabs {
          display: flex;
          gap: 8px;
          margin-bottom: 20px;
        }

        .form-tab {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 8px;
          border-radius: 8px;
          border: none;
          background: #f3f4f6;
          cursor: pointer;
        }

        .form-tab.active {
          background: linear-gradient(135deg, #f97316, #eab308);
          color: white;
        }

        .form-row {
          display: flex;
          gap: 12px;
          margin-bottom: 12px;
        }

        .form-field {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        input, select {
          padding: 10px;
          border-radius: 8px;
          border: 1px solid #e5e7eb;
        }

        .btn-hero {
          width: 100%;
          margin-top: 12px;
          padding: 12px;
          border: none;
          border-radius: 8px;
          background: linear-gradient(135deg, #f97316, #eab308);
          color: white;
          font-weight: 600;
          cursor: pointer;
        }

        .form-note {
          font-size: 12px;
          margin-top: 8px;
          color: #6b7280;
        }

        /* MOBILE */
        @media (max-width: 768px) {
          .hero-container {
            padding: 0 16px;
          }

          .hero-inner {
            flex-direction: column;
          }

          h1 {
            font-size: 28px;
          }

          .form-row {
            flex-direction: column;
          }
        }
      `}</style>
    </section>
  );
}