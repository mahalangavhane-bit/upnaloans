// TopBanks.jsx
import "./TopBanks.css";
const banks = [
  { code: "SBI",   name: "State Bank of India", type: "PSU Bank",     rate: "7.10%", emi: "₹69,240", max: "₹5 Cr",  process: "3–5 Days", logo: "#1e40af", featured: true  },
  { code: "HDFC",  name: "HDFC Bank",            type: "Private Bank", rate: "7.40%", emi: "₹70,963", max: "₹10 Cr", process: "48 Hrs",   logo: "#dc2626", featured: false },
  { code: "ICICI", name: "ICICI Bank",           type: "Private Bank", rate: "7.60%", emi: "₹72,082", max: "₹10 Cr", process: "24 Hrs",   logo: "#f97316", featured: false },
  { code: "AXIS",  name: "Axis Bank",            type: "Private Bank", rate: "7.75%", emi: "₹72,928", max: "₹5 Cr",  process: "48 Hrs",   logo: "#7c3aed", featured: false },
];

function BankCard({ bank }) {
  return (
    <div className={`bank-card${bank.featured ? " featured" : ""}`}>
      {bank.featured && <div className="bank-best-badge">⭐ BEST RATE</div>}
      <div className="bank-header">
        <div className="bank-logo" style={{ background: bank.logo + "20", color: bank.logo }}>
          {bank.code}
        </div>
        <div>
          <div className="bank-name">{bank.name}</div>
          <div className="bank-type">{bank.type}</div>
        </div>
      </div>
      <div className="bank-rate">{bank.rate} p.a.</div>
      {[
        ["EMI / Lakh", bank.emi,     false],
        ["Max Loan",   bank.max,     false],
        ["Processing", bank.process, true],
      ].map(([label, val, isGreen]) => (
        <div className="bank-row" key={label}>
          <span className="bank-meta-label">{label}</span>
          <span className={`bank-meta-val${isGreen ? " green" : ""}`}>{val}</span>
        </div>
      ))}
      <button className="apply-bank-btn">Apply Now →</button>
    </div>
  );
}

export default function TopBanks() {
  return (
    <section className="section banks-section">
      <div className="section-inner">
        <h2 className="section-title">Top Banks for Home Loan</h2>
        <p className="section-sub">Compare rates, EMI and eligibility from leading banks &amp; NBFCs — choose what's best for you.</p>
        <div className="banks-grid">
          {banks.map(b => <BankCard key={b.code} bank={b} />)}
        </div>
        <div className="view-all-wrap">
          <button className="btn-view-all">View All 50+ Banks &amp; NBFCs →</button>
        </div>
      </div>
    </section>
  );
}
