import { useState, useRef, useEffect } from "react";

const schemes = [
  { name: "Auto Choice - Life Cycle Fund", return: "10.50%", risk: "High", allocation: "Equity 75% + Debt 25%", color: "#2563eb" },
  { name: "Auto Choice - Aggressive", return: "9.80%", risk: "High", allocation: "Equity 50% + Debt 50%", color: "#2563eb" },
  { name: "Auto Choice - Moderate", return: "8.90%", risk: "Medium", allocation: "Equity 25% + Debt 75%", color: "#2563eb" },
  { name: "Active Choice - Equity", return: "12.00%", risk: "Very High", allocation: "Equity 100%", color: "#2563eb" },
  { name: "Active Choice - Corporate", return: "8.50%", risk: "Low", allocation: "Corporate Bonds 100%", color: "#2563eb" },
  { name: "Active Choice - Government", return: "7.20%", risk: "Very Low", allocation: "Govt Bonds 100%", color: "#2563eb" },
];

const faqs = [
  { q: "What is National Pension System (NPS)?", a: "NPS is a government-backed retirement savings scheme that helps you build a retirement corpus through regular contributions. It offers market-linked returns with tax benefits under Section 80CCD." },
  { q: "How is NPS maturity amount calculated?", a: "NPS maturity is calculated using compound interest: Corpus = P × (1 + r)^n + Monthly Contribution × [((1 + r)^n - 1) / r], where P = initial contribution, r = expected return, n = years." },
  { q: "What happens at NPS maturity?", a: "At maturity (60 years), you must use 40% of corpus to buy annuity (pension) and can withdraw 60% tax-free. You can extend NPS till 70 years or exit early with conditions." },
  { q: "What are NPS tax benefits?", a: "NPS offers tax benefits: 80CCD(1) deduction up to Rs. 1.5 lakh, additional 80CCD(1B) deduction up to Rs. 50,000, and 60% of maturity amount is tax-free." },
  { q: "Is UpnaLoan NPS calculator accurate?", a: "Yes. Our calculator uses standard NPS calculation formulas with realistic return expectations. Results are accurate for planning purposes but actual returns may vary." },
];

function formatINR(val) {
  return Number(val.toFixed(0)).toLocaleString("en-IN");
}

function SliderInput({ label, value, min, max, step, onChange, prefix, suffix, formatFn }) {
  const [inputVal, setInputVal] = useState(String(value));
  const [focused, setFocused] = useState(false);
  const pct = ((value - min) / (max - min)) * 100;

  useEffect(() => {
    if (!focused) setInputVal(String(value));
  }, [value, focused]);

  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <label style={{ fontSize: 13, color: "#64748b", fontWeight: 500 }}>{label}</label>
        <div style={{
          display: "flex", alignItems: "center", background: "#f1f5f9",
          borderRadius: 8, padding: "4px 10px", border: "1.5px solid #e2e8f0",
          transition: "border-color 0.2s"
        }}>
          {prefix && <span style={{ fontSize: 13, color: "#475569", marginRight: 2 }}>{prefix}</span>}
          <input
            type="text"
            value={focused ? inputVal : (formatFn ? formatFn(value) : value)}
            onFocus={() => { setFocused(true); setInputVal(String(value)); }}
            onBlur={(e) => {
              setFocused(false);
              const num = parseFloat(e.target.value.replace(/,/g, ""));
              if (!isNaN(num)) onChange(Math.min(max, Math.max(min, num)));
            }}
            onChange={(e) => setInputVal(e.target.value)}
            style={{ width: 80, border: "none", background: "transparent", fontSize: 13, fontWeight: 600, color: "#1e293b", outline: "none", textAlign: "right" }}
          />
          {suffix && <span style={{ fontSize: 13, color: "#475569", marginLeft: 2 }}>{suffix}</span>}
        </div>
      </div>
      <div style={{ position: "relative", height: 6, borderRadius: 99, background: "#e2e8f0", cursor: "pointer" }}>
        <div style={{ position: "absolute", left: 0, top: 0, height: "100%", borderRadius: 99, width: `${pct}%`, background: "linear-gradient(90deg, #2563eb, #3b82f6)" }} />
        <input
          type="range" min={min} max={max} step={step} value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          style={{ position: "absolute", top: "50%", left: 0, transform: "translateY(-50%)", width: "100%", opacity: 0, height: 20, cursor: "pointer", margin: 0 }}
        />
        <div style={{
          position: "absolute", top: "50%", left: `${pct}%`, transform: "translate(-50%, -50%)",
          width: 18, height: 18, borderRadius: "50%", background: "#2563eb", border: "3px solid white",
          boxShadow: "0 1px 6px rgba(37,99,235,0.4)", pointerEvents: "none"
        }} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
        <span style={{ fontSize: 11, color: "#94a3b8" }}>{prefix}{formatFn ? formatFn(min) : min}{suffix}</span>
        <span style={{ fontSize: 11, color: "#94a3b8" }}>{prefix}{formatFn ? formatFn(max) : max}{suffix}</span>
      </div>
    </div>
  );
}

function DonutChart({ principal, interest }) {
  const total = principal + interest;
  const pPct = principal / total;
  const iPct = interest / total;
  const r = 70, cx = 90, cy = 90, stroke = 22;
  const circ = 2 * Math.PI * r;
  const pDash = pPct * circ;
  const iDash = iPct * circ;
  const iOffset = -pDash;
  return (
    <svg viewBox="0 0 180 180" style={{ width: 160, height: 160 }}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#e2e8f0" strokeWidth={stroke} />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#2563eb" strokeWidth={stroke}
        strokeDasharray={`${pDash} ${circ - pDash}`} strokeDashoffset={circ / 4} strokeLinecap="butt" />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#fb923c" strokeWidth={stroke}
        strokeDasharray={`${iDash} ${circ - iDash}`} strokeDashoffset={circ / 4 - pDash} strokeLinecap="butt" />
      <text x={cx} y={cy - 6} textAnchor="middle" fontSize="11" fill="#64748b">Principal</text>
      <text x={cx} y={cy + 12} textAnchor="middle" fontSize="13" fontWeight="600" fill="#1e293b">{(pPct * 100).toFixed(0)}%</text>
    </svg>
  );
}

export default function NPSCalc() {
  const [monthlyContribution, setMonthlyContribution] = useState(5000);
  const [initialContribution, setInitialContribution] = useState(50000);
  const [expectedReturn, setExpectedReturn] = useState(9.5);
  const [age, setAge] = useState(30);
  const [openFaq, setOpenFaq] = useState(null);

  // Calculate NPS corpus and pension
  const yearsToRetirement = 60 - age;
  const monthlyRate = expectedReturn / 100 / 12;
  const months = yearsToRetirement * 12;
  
  // Future value of initial contribution
  const initialFutureValue = initialContribution * Math.pow(1 + expectedReturn / 100, yearsToRetirement);
  
  // Future value of monthly contributions
  const monthlyFutureValue = monthlyContribution * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
  
  const totalCorpus = initialFutureValue + monthlyFutureValue;
  const taxFreeWithdrawal = totalCorpus * 0.6;
  const annuityAmount = totalCorpus * 0.4;
  const estimatedMonthlyPension = annuityAmount * 0.06 / 12; // Assuming 6% annuity rate

  const card = {
    background: "#fff", borderRadius: 16, boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
    border: "1px solid #f1f5f9", padding: 28
  };

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", background: "#f8fafc", minHeight: "100vh" }}>

      {/* TOP NAV BAR */}
      <div style={{ background: "#1e293b", padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 56 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: "linear-gradient(135deg,#3b82f6,#2563eb)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#fff", fontWeight: 700, fontSize: 13 }}>U</span>
          </div>
          <span style={{ color: "#fff", fontWeight: 700, fontSize: 16, letterSpacing: "-0.3px" }}>UpnaLoan</span>
        </div>
        <div style={{ display: "flex", gap: 24 }}>
          {["Personal Loan", "Home Loan", "Car Loan", "Credit Cards", "Insurance"].map(t => (
            <span key={t} style={{ fontSize: 13, color: "#94a3b8", cursor: "pointer", transition: "color 0.15s" }}
              onMouseEnter={e => e.target.style.color = "#fff"} onMouseLeave={e => e.target.style.color = "#94a3b8"}>{t}</span>
          ))}
        </div>
        <button style={{ background: "#2563eb", color: "#fff", border: "none", borderRadius: 8, padding: "8px 18px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Apply Now</button>
      </div>

      {/* HERO */}
      <div style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #1e293b 100%)",
        padding: "52px 48px 60px", position: "relative", overflow: "hidden"
      }}>
        <div style={{ position: "absolute", right: 80, top: 20, width: 260, height: 260, borderRadius: "50%", background: "rgba(59,130,246,0.08)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", right: 140, top: 60, width: 120, height: 120, borderRadius: "50%", background: "rgba(59,130,246,0.05)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 720 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
            <div style={{ background: "rgba(59,130,246,0.15)", borderRadius: 20, padding: "4px 12px" }}>
              <span style={{ color: "#93c5fd", fontSize: 12, fontWeight: 600 }}>FREE TOOL</span>
            </div>
            <div style={{ background: "rgba(34,197,94,0.15)", borderRadius: 20, padding: "4px 12px" }}>
              <span style={{ color: "#86efac", fontSize: 12, fontWeight: 600 }}>GOVT BACKED</span>
            </div>
          </div>
          <h1 style={{ fontSize: 38, fontWeight: 800, color: "#fff", lineHeight: 1.2, margin: "0 0 14px", letterSpacing: "-0.5px" }}>
            NPS Calculator
          </h1>
          <p style={{ color: "#94a3b8", fontSize: 16, lineHeight: 1.7, maxWidth: 580, margin: "0 0 24px" }}>
            Calculate your National Pension System retirement corpus and monthly pension. Plan your retirement with tax benefits and market-linked returns.
          </p>
          <div style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
            {[["60 Years", "Retirement Age"], ["12%", "Expected Return"], ["2 Lakh", "Tax Benefit"], ["Monthly", "Pension"]].map(([val, lbl]) => (
              <div key={lbl} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: "#3b82f6", lineHeight: 1 }}>{val}</div>
                <div style={{ fontSize: 11, color: "#64748b", marginTop: 3, fontWeight: 500 }}>{lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BREADCRUMB */}
      <div style={{ background: "#fff", borderBottom: "1px solid #f1f5f9", padding: "10px 48px" }}>
        <span style={{ fontSize: 12, color: "#94a3b8" }}>Home</span>
        <span style={{ fontSize: 12, color: "#cbd5e1", margin: "0 6px" }}>·</span>
        <span style={{ fontSize: 12, color: "#94a3b8" }}>Investments</span>
        <span style={{ fontSize: 12, color: "#cbd5e1", margin: "0 6px" }}>·</span>
        <span style={{ fontSize: 12, color: "#2563eb", fontWeight: 500 }}>NPS Calculator</span>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>

        {/* CALCULATOR SECTION */}
        <div style={{ display: "flex", gap: 28, marginTop: 36, flexWrap: "wrap" }}>

          {/* LEFT: Inputs */}
          <div style={{ flex: "1 1 380px", ...card }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "#1e293b", margin: "0 0 24px" }}>NPS Details</h2>
            <SliderInput label="Current Age" value={age} min={18} max={55} step={1}
              onChange={setAge} suffix=" years" />
            <SliderInput label="Initial Contribution" value={initialContribution} min={0} max={1000000} step={1000}
              onChange={setInitialContribution} prefix="Rs." formatFn={v => formatINR(v)} />
            <SliderInput label="Monthly Contribution" value={monthlyContribution} min={500} max={50000} step={500}
              onChange={setMonthlyContribution} prefix="Rs." formatFn={v => formatINR(v)} />
            <SliderInput label="Expected Return" value={expectedReturn} min={6} max={15} step={0.5}
              onChange={setExpectedReturn} suffix="%" />
          </div>

          {/* RIGHT: Results */}
          <div style={{ flex: "1 1 380px", ...card }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "#1e293b", margin: "0 0 24px" }}>Retirement Details</h2>
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <div style={{ fontSize: 14, color: "#64748b", marginBottom: 8 }}>Total Corpus at 60</div>
              <div style={{ fontSize: 36, fontWeight: 700, color: "#3b82f6", lineHeight: 1.2 }}>{formatINR(totalCorpus)}</div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 32 }}>
              {[
                ["Tax-Free Withdrawal", formatINR(taxFreeWithdrawal)],
                ["Annuity Amount", formatINR(annuityAmount)],
                ["Monthly Pension", formatINR(estimatedMonthlyPension)],
                ["Years to Retirement", yearsToRetirement + " years"]
              ].map(([label, val]) => (
                <div key={label} style={{ padding: 16, background: "#f8fafc", borderRadius: 8, border: "1px solid #e2e8f0" }}>
                  <div style={{ fontSize: 12, color: "#64748b", marginBottom: 4 }}>{label}</div>
                  <div style={{ fontSize: 18, fontWeight: 600, color: "#1e293b" }}>{val}</div>
                </div>
              ))}
            </div>

            {/* Donut Chart */}
            <div style={{ marginBottom: 32 }}>
              <DonutChart principal={taxFreeWithdrawal} interest={annuityAmount} />
              <div style={{ display: "flex", gap: 24, justifyContent: "center", marginTop: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 12, height: 12, background: "#3b82f6", borderRadius: 2 }} />
                  <span style={{ fontSize: 14, color: "#64748b" }}>Tax-Free (60%)</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 12, height: 12, background: "#e2e8f0", borderRadius: 2 }} />
                  <span style={{ fontSize: 14, color: "#64748b" }}>Annuity (40%)</span>
                </div>
              </div>
            </div>

            <button style={{ width: "100%", height: 48, background: "#3b82f6", color: "#fff", border: "none", borderRadius: 8, fontSize: 16, fontWeight: 600, cursor: "pointer", marginBottom: 24 }}
              onMouseEnter={e => {
                e.target.style.background = "#2563eb";
                e.target.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={e => {
                e.target.style.background = "#3b82f6";
                e.target.style.transform = "translateY(0)";
              }}
            >
              Open NPS Account
            </button>
          </div>
        </div>

        {/* Schemes */}
        <div style={{ marginTop: 48 }}>
          <h3 style={{ fontSize: 24, fontWeight: 700, color: "#1e293b", marginBottom: 24 }}>NPS Investment Options</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            {schemes.map((scheme, index) => (
              <div key={index} style={{ background: "#fff", borderRadius: 12, padding: 24, border: "1px solid #e2e8f0", transition: "all 0.3s", cursor: "pointer" }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.12)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div style={{ fontSize: 18, fontWeight: 700, color: "#1e293b", marginBottom: 16 }}>{scheme.name}</div>
                {[
                  ["Expected Return", scheme.return],
                  ["Risk Level", scheme.risk],
                  ["Asset Allocation", scheme.allocation]
                ].map(([label, val]) => (
                  <div key={label} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <span style={{ fontSize: 14, color: "#64748b" }}>{label}</span>
                    <span style={{ fontSize: 14, fontWeight: 600, color: "#1e293b" }}>{val}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div style={{ marginTop: 48 }}>
          <h3 style={{ fontSize: 24, fontWeight: 700, color: "#1e293b", marginBottom: 24 }}>Frequently Asked Questions</h3>
          <div style={{ display: "grid", gap: 16 }}>
            {faqs.map((faq, index) => (
              <div key={index} style={{ background: "#fff", borderRadius: 12, border: "1px solid #e2e8f0", overflow: "hidden" }}>
                <div style={{ padding: 20, background: "#f8fafc", cursor: "pointer", fontWeight: 600, color: "#1e293b" }}
                  onClick={() => {
                    const element = document.getElementById(`faq-${index}`);
                    element.style.display = element.style.display === "block" ? "none" : "block";
                  }}
                >
                  {faq.q}
                </div>
                <div id={`faq-${index}`} style={{ padding: 20, display: "none", borderTop: "1px solid #e2e8f0" }}>
                  {faq.a}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}