// EmiCalculator.jsx
import { useState } from "react";
import { fmtINR } from "./styles";

export default function EmiCalculator() {
  const [loanAmt, setLoanAmt] = useState(5000000);
  const [rate,    setRate]    = useState(8.5);
  const [tenure,  setTenure]  = useState(20);

  const r        = rate / 12 / 100;
  const n        = tenure * 12;
  const emi      = loanAmt * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
  const total    = emi * n;
  const interest = total - loanAmt;
  const pPct     = Math.round((loanAmt / total) * 100);

  const rangeStyle = (val, min, max) => {
    const pct = ((val - min) / (max - min)) * 100;
    return { background: `linear-gradient(to right, #f97316 ${pct}%, #fed7aa ${pct}%)` };
  };

  return (
    <section className="section calc-section">
      <div className="section-inner">
        <div className="section-label">Smart Tools</div>
        <h2 className="section-title">EMI Calculator</h2>
        <p className="section-sub">Instantly calculate your monthly EMI, total interest and plan your loan repayment with ease.</p>

        <div className="calc-wrapper">
          {/* ── Input side ── */}
          <div className="calc-box">
            <div className="calc-field">
              <div className="calc-field-label">Loan Amount <span>{fmtINR(loanAmt)}</span></div>
              <input type="range" className="range-input"
                min={100000} max={10000000} step={50000}
                value={loanAmt} onChange={e => setLoanAmt(+e.target.value)}
                style={rangeStyle(loanAmt, 100000, 10000000)} />
            </div>
            <div className="calc-field">
              <div className="calc-field-label">Interest Rate <span>{rate.toFixed(1)}%</span></div>
              <input type="range" className="range-input"
                min={6} max={20} step={0.1}
                value={rate} onChange={e => setRate(+e.target.value)}
                style={rangeStyle(rate, 6, 20)} />
            </div>
            <div className="calc-field">
              <div className="calc-field-label">Loan Tenure <span>{tenure} Years</span></div>
              <input type="range" className="range-input"
                min={1} max={30} step={1}
                value={tenure} onChange={e => setTenure(+e.target.value)}
                style={rangeStyle(tenure, 1, 30)} />
            </div>
            <button className="btn-solid" style={{ width: "100%", height: 48 }}>Calculate EMI</button>
          </div>

          {/* ── Result side ── */}
          <div className="calc-result">
            <div className="result-label">Monthly EMI</div>
            <div className="result-emi">₹{Math.round(emi).toLocaleString("en-IN")}</div>
            <div className="result-grid">
              {[
                ["Principal Amount", fmtINR(loanAmt)],
                ["Total Interest",   fmtINR(interest)],
                ["Total Payment",    fmtINR(total)],
                ["Interest %",       (100 - pPct) + "%"],
              ].map(([label, val]) => (
                <div className="result-item" key={label}>
                  <div className="result-item-label">{label}</div>
                  <div className="result-item-val">{val}</div>
                </div>
              ))}
            </div>
            <div className="pie-bar">
              <div className="pie-principal" style={{ width: pPct + "%" }} />
              <div className="pie-interest" />
            </div>
            <div className="pie-legend">
              <div className="legend-item">
                <div className="legend-dot" style={{ background: "#f97316" }} />
                <span>Principal</span>
              </div>
              <div className="legend-item">
                <div className="legend-dot" style={{ background: "rgba(255,255,255,.3)" }} />
                <span>Interest</span>
              </div>
            </div>
            <button className="btn-apply-calc">Apply for This Loan →</button>
          </div>
        </div>
      </div>
    </section>
  );
}
