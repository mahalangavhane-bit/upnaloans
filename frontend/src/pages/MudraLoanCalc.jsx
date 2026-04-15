import { useState, useRef, useEffect } from "react";

const banks = [
  { name: "SBI", logo: "SBI", rate: "9.00%", min: "9.00%", amount: "₹10L", color: "#22488C", processing: "1%", tenure: "1-5 yrs" },
  { name: "HDFC Bank", logo: "HDFC", rate: "8.50%", min: "8.50%", amount: "₹10L", color: "#004C8F", processing: "0%", tenure: "1-5 yrs" },
  { name: "ICICI Bank", logo: "ICICI", rate: "8.75%", min: "8.75%", amount: "₹10L", color: "#F07D00", processing: "2%", tenure: "1-6 yrs" },
  { name: "Bajaj Finserv", logo: "BAJAJ", rate: "11.99%", min: "11.99%", amount: "₹10L", color: "#1E3A5F", processing: "3.93%", tenure: "1-8 yrs" },
  { name: "Punjab National Bank", logo: "PNB", rate: "8.90%", min: "8.90%", amount: "₹10L", color: "#004C8F", processing: "0.5%", tenure: "1-5 yrs" },
];

const faqs = [
  { q: "What is a Mudra Loan EMI?", a: "A Mudra Loan EMI (Equated Monthly Installment) is the fixed monthly payment you make to repay your Mudra loan principal along with applicable interest over a chosen tenure. It remains constant throughout the loan period." },
  { q: "How is Mudra Loan EMI calculated?", a: "EMI is calculated using the formula: EMI = [P × r × (1+r)^n] / [(1+r)^n – 1], where P = Principal amount, r = monthly interest rate, and n = total number of months." },
  { q: "What factors affect my Mudra Loan EMI?", a: "Your Mudra Loan EMI is primarily affected by three factors: loan amount borrowed, interest rate charged by the lender, and repayment tenure you select. A higher loan amount or rate increases EMI, while a longer tenure reduces it." },
  { q: "Can I reduce my Mudra Loan EMI?", a: "Yes — you can reduce your EMI by opting for a longer repayment tenure, maintaining a high credit score to negotiate lower interest rates, making partial prepayments to reduce principal, or refinancing with a lender offering better rates." },
  { q: "Is UpnaLoan Mudra Loan EMI calculator accurate?", a: "Yes. Our calculator uses the standard reducing balance formula used by all RBI-regulated banks and NBFCs in India. Results are accurate to the rupee for parameters you enter." },
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

export default function MudraLoanCalc() {
  const [loanAmount, setLoanAmount] = useState(50000);
  const [interestRate, setInterestRate] = useState(9.0);
  const [tenure, setTenure] = useState(5);
  const [openFaq, setOpenFaq] = useState(null);

  const monthlyRate = interestRate / 12 / 100;
  const n = tenure * 12;
  const emi = monthlyRate === 0 ? loanAmount / n :
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
  const totalAmount = emi * n;
  const totalInterest = totalAmount - loanAmount;

  const amortization = [];
  let balance = loanAmount;
  for (let i = 1; i <= Math.min(n, 12); i++) {
    const intPart = balance * monthlyRate;
    const prinPart = emi - intPart;
    balance -= prinPart;
    amortization.push({ month: i, emi: emi, principal: prinPart, interest: intPart, balance: Math.max(0, balance) });
  }

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
              <span style={{ color: "#86efac", fontSize: 12, fontWeight: 600 }}>INSTANT RESULT</span>
            </div>
          </div>
          <h1 style={{ fontSize: 38, fontWeight: 800, color: "#fff", lineHeight: 1.2, margin: "0 0 14px", letterSpacing: "-0.5px" }}>
            Mudra Loan EMI Calculator
          </h1>
          <p style={{ color: "#94a3b8", fontSize: 16, lineHeight: 1.7, maxWidth: 580, margin: "0 0 24px" }}>
            Calculate your monthly EMI instantly for Mudra loans. Compare rates, plan your budget, and apply for the best Mudra loan offer in seconds.
          </p>
          <div style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
            {[["₹10 Lakh", "Max Loan Amount"], ["9.00%", "Starting Interest Rate"], ["60 Months", "Max Tenure"], ["2 Min", "Instant Approval"]].map(([val, lbl]) => (
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
        <span style={{ fontSize: 12, color: "#cbd5e1", margin: "0 6px" }}>›</span>
        <span style={{ fontSize: 12, color: "#94a3b8" }}>Mudra Loan</span>
        <span style={{ fontSize: 12, color: "#cbd5e1", margin: "0 6px" }}>›</span>
        <span style={{ fontSize: 12, color: "#2563eb", fontWeight: 500 }}>EMI Calculator</span>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>

        {/* CALCULATOR SECTION */}
        <div style={{ display: "flex", gap: 28, marginTop: 36, flexWrap: "wrap" }}>

          {/* LEFT: Inputs */}
          <div style={{ flex: "1 1 380px", ...card }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "#1e293b", margin: "0 0 24px" }}>Loan Details</h2>
            <SliderInput label="Loan Amount" value={loanAmount} min={10000} max={1000000} step={10000}
              onChange={setLoanAmount} prefix="₹" formatFn={v => formatINR(v)} />
            <SliderInput label="Rate of Interest (p.a.)" value={interestRate} min={6} max={15} step={0.25}
              onChange={setInterestRate} suffix="%" />
            <SliderInput label="Loan Tenure" value={tenure} min={12} max={84} step={1}
              onChange={setTenure} suffix=" months" />
          </div>

          {/* RIGHT: Results */}
          <div style={{ flex: "1 1 380px", ...card }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "#1e293b", margin: "0 0 24px" }}>EMI Result</h2>
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <div style={{ fontSize: 14, color: "#64748b", marginBottom: 8 }}>Monthly EMI</div>
              <div style={{ fontSize: 36, fontWeight: 700, color: "#3b82f6", lineHeight: 1.2 }}>{formatINR(emi)}</div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 32 }}>
              {[
                ["Principal Amount", formatINR(loanAmount)],
                ["Total Interest", formatINR(totalInterest)],
                ["Total Payment", formatINR(totalAmount)],
                ["Interest Rate", interestRate.toFixed(2) + "%"]
              ].map(([label, val]) => (
                <div key={label} style={{ padding: 16, background: "#f8fafc", borderRadius: 8, border: "1px solid #e2e8f0" }}>
                  <div style={{ fontSize: 12, color: "#64748b", marginBottom: 4 }}>{label}</div>
                  <div style={{ fontSize: 18, fontWeight: 600, color: "#1e293b" }}>{val}</div>
                </div>
              ))}
            </div>

            {/* Donut Chart */}
            <div style={{ marginBottom: 32 }}>
              <DonutChart principal={loanAmount} interest={totalInterest} />
              <div style={{ display: "flex", gap: 24, justifyContent: "center", marginTop: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 12, height: 12, background: "#3b82f6", borderRadius: 2 }} />
                  <span style={{ fontSize: 14, color: "#64748b" }}>Principal</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 12, height: 12, background: "#e2e8f0", borderRadius: 2 }} />
                  <span style={{ fontSize: 14, color: "#64748b" }}>Interest</span>
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
              Apply for This Loan →
            </button>
          </div>
        </div>

        {/* Amortization Table */}
        <div style={{ marginTop: 48 }}>
          <h3 style={{ fontSize: 24, fontWeight: 700, color: "#1e293b", marginBottom: 24 }}>Amortization Schedule</h3>
          <div style={{ background: "#fff", borderRadius: 12, overflow: "hidden", border: "1px solid #e2e8f0" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", background: "#f8fafc" }}>
              {["Month", "EMI", "Principal", "Interest", "Balance"].map(header => (
                <div key={header} style={{ padding: 16, fontWeight: 600, color: "#1e293b", borderRight: "1px solid #e2e8f0" }}>
                  {header}
                </div>
              ))}
            </div>
            {amortization.map(row => (
              <div key={row.month} style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", borderTop: "1px solid #e2e8f0" }}>
                <div style={{ padding: 16, color: "#1e293b" }}>{row.month}</div>
                <div style={{ padding: 16, color: "#1e293b" }}>{formatINR(row.emi)}</div>
                <div style={{ padding: 16, color: "#1e293b" }}>{formatINR(row.principal)}</div>
                <div style={{ padding: 16, color: "#1e293b" }}>{formatINR(row.interest)}</div>
                <div style={{ padding: 16, color: "#1e293b" }}>{formatINR(row.balance)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bank Offers */}
        <div style={{ marginTop: 48 }}>
          <h3 style={{ fontSize: 24, fontWeight: 700, color: "#1e293b", marginBottom: 24 }}>Current Bank Offers</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            {banks.map((bank, index) => (
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
                <div style={{ fontSize: 18, fontWeight: 700, color: "#1e293b", marginBottom: 16 }}>{bank.name}</div>
                {[
                  ["Interest Rate", bank.rate],
                  ["Processing Fee", bank.processing],
                  ["Max Loan", bank.amount],
                  ["Tenure", bank.tenure]
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
