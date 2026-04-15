import { useState, useRef, useEffect } from "react";

const banks = [
  { name: "SBI Home Loan", logo: "SBI", rate: "8.50%", min: "8.40%", amount: "Rs.5Cr", color: "#22488C", processing: "0.35%", tenure: "30 yrs", prepayment: "Nil charges" },
  { name: "HDFC Home Loan", logo: "HDFC", rate: "8.70%", min: "8.65%", amount: "Rs.10Cr", color: "#004C8F", processing: "0.5%", tenure: "30 yrs", prepayment: "Nil charges" },
  { name: "ICICI Home Loan", logo: "ICICI", rate: "8.75%", min: "8.70%", amount: "Rs.5Cr", color: "#F07D00", processing: "0.75%", tenure: "30 yrs", prepayment: "Nil charges" },
  { name: "LIC Housing", logo: "LIC", rate: "8.85%", min: "8.80%", amount: "Rs.10Cr", color: "#1E3A5F", processing: "0.5%", tenure: "30 yrs", prepayment: "Nil charges" },
];

const faqs = [
  { q: "What is Home Loan Prepayment?", a: "Home loan prepayment is paying off your home loan partially or fully before the scheduled tenure ends. This helps reduce the total interest burden and can lead to significant savings over the long term." },
  { q: "Are there prepayment charges on home loans?", a: "Most banks have waived prepayment charges for home loans, especially for floating rate loans. Fixed rate loans may have charges, but many banks allow partial prepayment without any fees." },
  { q: "How much can I save by prepaying my home loan?", a: "Savings depend on loan amount, interest rate, tenure, and timing of prepayment. Early prepayment saves more interest. Use our calculator to estimate your exact savings potential." },
  { q: "Should I reduce EMI or tenure for home loan?", a: "For home loans, reducing tenure is generally better as it saves more total interest due to the long tenure. However, reducing EMI provides monthly cash flow relief for better financial planning." },
  { q: "Is the UpnaLoan home loan prepayment calculator accurate?", a: "Yes. Our calculator uses standard banking formulas and considers current RBI guidelines. Results help you make informed prepayment decisions for your home loan." },
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

export default function HomeLoanPrepaymentCalc() {
  const [loanAmount, setLoanAmount] = useState(2000000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);
  const [prepaymentAmount, setPrepaymentAmount] = useState(200000);
  const [prepaymentMonth, setPrepaymentMonth] = useState(24);
  const [prepaymentCharge, setPrepaymentCharge] = useState(0);
  const [reduceTenure, setReduceTenure] = useState(true);
  const [openFaq, setOpenFaq] = useState(null);

  // Calculate original loan details
  const monthlyRate = interestRate / 12 / 100;
  const totalMonths = tenure * 12;
  const originalEmi = monthlyRate === 0 ? loanAmount / totalMonths :
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
  const originalTotalAmount = originalEmi * totalMonths;
  const originalTotalInterest = originalTotalAmount - loanAmount;

  // Calculate prepayment impact
  const prepaymentFee = (prepaymentAmount * prepaymentCharge) / 100;
  const netPrepaymentAmount = prepaymentAmount - prepaymentFee;
  
  // Calculate remaining balance after prepayment
  let balance = loanAmount;
  for (let i = 1; i <= prepaymentMonth; i++) {
    const intPart = balance * monthlyRate;
    const prinPart = originalEmi - intPart;
    balance -= prinPart;
  }
  
  const remainingBalance = Math.max(0, balance - netPrepaymentAmount);
  
  // Calculate new loan terms
  let newEmi, newTenure, newTotalInterest, newTotalAmount;
  
  if (remainingBalance <= 0) {
    // Loan fully paid off
    newEmi = 0;
    newTenure = 0;
    newTotalInterest = 0;
    newTotalAmount = originalEmi * prepaymentMonth + prepaymentAmount;
  } else {
    if (reduceTenure) {
      // Keep EMI same, reduce tenure
      newEmi = originalEmi;
      newTenure = Math.ceil(-Math.log(1 - (remainingBalance * monthlyRate) / newEmi) / Math.log(1 + monthlyRate));
      newTotalAmount = originalEmi * prepaymentMonth + newEmi * newTenure + prepaymentAmount;
      newTotalInterest = newTotalAmount - loanAmount;
    } else {
      // Reduce EMI, keep tenure same
      const remainingMonths = totalMonths - prepaymentMonth;
      newTenure = remainingMonths;
      newEmi = (remainingBalance * monthlyRate * Math.pow(1 + monthlyRate, remainingMonths)) / (Math.pow(1 + monthlyRate, remainingMonths) - 1);
      newTotalAmount = originalEmi * prepaymentMonth + newEmi * newTenure + prepaymentAmount;
      newTotalInterest = newTotalAmount - loanAmount;
    }
  }

  const totalSavings = originalTotalInterest - newTotalInterest - prepaymentFee;
  const monthsSaved = reduceTenure ? (totalMonths - prepaymentMonth - newTenure) : 0;
  const emiReduced = reduceTenure ? 0 : (originalEmi - newEmi);

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
              <span style={{ color: "#86efac", fontSize: 12, fontWeight: 600 }}>ZERO CHARGES</span>
            </div>
          </div>
          <h1 style={{ fontSize: 38, fontWeight: 800, color: "#fff", lineHeight: 1.2, margin: "0 0 14px", letterSpacing: "-0.5px" }}>
            Home Loan Prepayment Calculator
          </h1>
          <p style={{ color: "#94a3b8", fontSize: 16, lineHeight: 1.7, maxWidth: 580, margin: "0 0 24px" }}>
            Calculate your savings on home loan prepayment. Most banks offer zero prepayment charges. Save lakhs on interest and become debt-free faster.
          </p>
          <div style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
            {[["Rs.10 Cr", "Max Loan Amount"], ["8.50%", "Starting Interest Rate"], ["30 Years", "Max Tenure"], ["Zero Charges", "Prepayment Fees"]].map(([val, lbl]) => (
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
        <span style={{ fontSize: 12, color: "#94a3b8" }}>Home Loan</span>
        <span style={{ fontSize: 12, color: "#cbd5e1", margin: "0 6px" }}>·</span>
        <span style={{ fontSize: 12, color: "#2563eb", fontWeight: 500 }}>Prepayment Calculator</span>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>

        {/* CALCULATOR SECTION */}
        <div style={{ display: "flex", gap: 28, marginTop: 36, flexWrap: "wrap" }}>

          {/* LEFT: Inputs */}
          <div style={{ flex: "1 1 380px", ...card }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "#1e293b", margin: "0 0 24px" }}>Loan Details</h2>
            <SliderInput label="Loan Amount" value={loanAmount} min={100000} max={10000000} step={50000}
              onChange={setLoanAmount} prefix="Rs." formatFn={v => formatINR(v)} />
            <SliderInput label="Rate of Interest (p.a.)" value={interestRate} min={6} max={12} step={0.25}
              onChange={setInterestRate} suffix="%" />
            <SliderInput label="Loan Tenure" value={tenure} min={5} max={30} step={1}
              onChange={setTenure} suffix=" years" />
            
            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#1e293b", margin: "24px 0 16px" }}>Prepayment Details</h3>
            <SliderInput label="Prepayment Amount" value={prepaymentAmount} min={50000} max={loanAmount} step={50000}
              onChange={setPrepaymentAmount} prefix="Rs." formatFn={v => formatINR(v)} />
            <SliderInput label="Prepayment Month" value={prepaymentMonth} min={1} max={totalMonths} step={1}
              onChange={setPrepaymentMonth} suffix=" month" />
            <SliderInput label="Prepayment Charges" value={prepaymentCharge} min={0} max={5} step={0.5}
              onChange={setPrepaymentCharge} suffix="%" />
            
            <div style={{ marginTop: 20 }}>
              <label style={{ fontSize: 13, color: "#64748b", fontWeight: 500, display: "block", marginBottom: 8 }}>Prepayment Option</label>
              <div style={{ display: "flex", gap: 12 }}>
                <button
                  onClick={() => setReduceTenure(true)}
                  style={{
                    flex: 1, padding: "12px", borderRadius: 8, border: "1.5px solid #e2e8f0",
                    background: reduceTenure ? "#2563eb" : "#fff", color: reduceTenure ? "#fff" : "#1e293b",
                    fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all 0.2s"
                  }}
                >
                  Reduce Tenure
                </button>
                <button
                  onClick={() => setReduceTenure(false)}
                  style={{
                    flex: 1, padding: "12px", borderRadius: 8, border: "1.5px solid #e2e8f0",
                    background: !reduceTenure ? "#2563eb" : "#fff", color: !reduceTenure ? "#fff" : "#1e293b",
                    fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all 0.2s"
                  }}
                >
                  Reduce EMI
                </button>
              </div>
            </div>
            
            <div style={{ background: "#eff6ff", borderRadius: 12, padding: "14px 18px", marginTop: 20, border: "1px solid #bfdbfe" }}>
              <p style={{ margin: 0, fontSize: 12, color: "#3b82f6", lineHeight: 1.6 }}>
                ð¡ <strong>Tip:</strong> Most banks offer zero prepayment charges on home loans. Check with your lender for exact terms.
              </p>
            </div>
          </div>

          {/* RIGHT: Results */}
          <div style={{ flex: "1 1 340px", display: "flex", flexDirection: "column", gap: 20 }}>

            {/* Savings Highlight */}
            <div style={{ background: "linear-gradient(135deg,#16a34a,#22c55e)", borderRadius: 16, padding: "28px 28px 24px", color: "#fff" }}>
              <p style={{ margin: "0 0 4px", fontSize: 13, opacity: 0.8, fontWeight: 500 }}>Total Savings</p>
              <h1 style={{ margin: "0 0 20px", fontSize: 44, fontWeight: 800, letterSpacing: "-1px" }}>
                Rs.{formatINR(Math.max(0, totalSavings))}
              </h1>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                {[
                  ["Interest Saved", `Rs.${formatINR(Math.max(0, originalTotalInterest - newTotalInterest))}`],
                  ["Prepayment Fee", `Rs.${formatINR(prepaymentFee)}`],
                  ["Net Savings", `Rs.${formatINR(Math.max(0, totalSavings))}`]
                ].map(([l, v]) => (
                  <div key={l} style={{ background: "rgba(255,255,255,0.12)", borderRadius: 10, padding: "10px 12px" }}>
                    <div style={{ fontSize: 10, opacity: 0.75, marginBottom: 3 }}>{l}</div>
                    <div style={{ fontSize: 13, fontWeight: 700 }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Comparison Card */}
            <div style={{ ...card }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: "#1e293b", margin: "0 0 16px" }}>Before vs After Prepayment</h3>
              <div style={{ display: "grid", gap: 12 }}>
                {[
                  ["Monthly EMI", `Rs.${formatINR(originalEmi)}`, `Rs.${formatINR(newEmi)}`],
                  ["Loan Tenure", `${tenure} years`, reduceTenure ? `${((prepaymentMonth + newTenure) / 12).toFixed(1)} years` : `${tenure} years`],
                  ["Total Interest", `Rs.${formatINR(originalTotalInterest)}`, `Rs.${formatINR(newTotalInterest)}`],
                  ["Total Amount", `Rs.${formatINR(originalTotalAmount)}`, `Rs.${formatINR(newTotalAmount)}`]
                ].map(([label, before, after]) => (
                  <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px", background: "#f8fafc", borderRadius: 8 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: "#1e293b", width: 100 }}>{label}</span>
                    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: 11, color: "#94a3b8" }}>Before</div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: "#64748b" }}>{before}</div>
                      </div>
                      <span style={{ fontSize: 16, color: "#cbd5e1" }}>×</span>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: 11, color: "#94a3b8" }}>After</div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: "#2563eb" }}>{after}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div style={{ ...card }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: "#1e293b", margin: "0 0 16px" }}>Prepayment Benefits</h3>
              <div style={{ display: "grid", gap: 12 }}>
                {[
                  [emiReduced > 0 ? `Rs.${formatINR(emiReduced)}` : "No Change", "EMI Reduction"],
                  [monthsSaved > 0 ? `${monthsSaved} months` : "No Change", "Tenure Reduction"],
                  [`${(totalSavings/originalTotalInterest*100).toFixed(1)}%`, "Interest Saved"],
                  [prepaymentCharge === 0 ? "Zero Charges" : `${prepaymentCharge}%`, "Prepayment Charges"]
                ].map(([value, label]) => (
                  <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", background: "#f0fdf4", borderRadius: 8, border: "1px solid #bbf7d0" }}>
                    <span style={{ fontSize: 13, color: "#16a34a", fontWeight: 600 }}>{label}</span>
                    <span style={{ fontSize: 14, fontWeight: 700, color: "#1e293b" }}>{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* BANK OFFERS */}
        <div style={{ marginTop: 40 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: "#1e293b", margin: 0 }}>Best Home Loan Offers</h2>
              <p style={{ color: "#64748b", fontSize: 14, margin: "4px 0 0" }}>Compare prepayment charges from top banks & housing finance companies</p>
            </div>
            <span style={{ fontSize: 13, color: "#2563eb", cursor: "pointer", fontWeight: 600 }}>View All Offers</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 18 }}>
            {banks.map((b, i) => (
              <div key={i} style={{
                ...card, padding: "22px 22px 20px", position: "relative",
                transition: "transform 0.2s, box-shadow 0.2s", cursor: "pointer"
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.12)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 2px 16px rgba(0,0,0,0.07)"; }}>
                {i === 0 && <div style={{ position: "absolute", top: -1, right: 20, background: "#16a34a", color: "#fff", fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: "0 0 8px 8px" }}>LOWEST RATE</div>}
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                  <div style={{ width: 42, height: 42, borderRadius: 10, background: b.color, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ color: "#fff", fontWeight: 800, fontSize: 11 }}>{b.logo}</span>
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15, color: "#1e293b" }}>{b.name}</div>
                    <div style={{ fontSize: 11, color: "#94a3b8" }}>Home Loan</div>
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
                  {[["Interest Rate", b.rate], ["Max Amount", b.amount], ["Processing Fee", b.processing], ["Prepayment", b.prepayment]].map(([lbl, val]) => (
                    <div key={lbl} style={{ background: "#f8fafc", borderRadius: 8, padding: "10px 12px" }}>
                      <div style={{ fontSize: 10, color: "#94a3b8", marginBottom: 3 }}>{lbl}</div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: "#1e293b" }}>{val}</div>
                    </div>
                  ))}
                </div>
                <button style={{
                  width: "100%", background: i === 0 ? "#2563eb" : "#fff",
                  color: i === 0 ? "#fff" : "#2563eb", border: `1.5px solid #2563eb`,
                  borderRadius: 10, padding: "11px", fontSize: 13, fontWeight: 700, cursor: "pointer",
                  transition: "all 0.15s"
                }}
                  onMouseEnter={e => { e.target.style.background = "#2563eb"; e.target.style.color = "#fff"; }}
                  onMouseLeave={e => { e.target.style.background = i === 0 ? "#2563eb" : "#fff"; e.target.style.color = i === 0 ? "#fff" : "#2563eb"; }}>
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div style={{ ...card, marginTop: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: "#1e293b", margin: "0 0 20px" }}>Frequently Asked Questions</h2>
          {faqs.map((faq, i) => (
            <div key={i} style={{ borderBottom: i < faqs.length - 1 ? "1px solid #f1f5f9" : "none" }}>
              <div
                style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 0", cursor: "pointer" }}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <span style={{ fontSize: 14, fontWeight: 600, color: "#1e293b", paddingRight: 16 }}>{faq.q}</span>
                <span style={{
                  width: 28, height: 28, borderRadius: "50%", background: openFaq === i ? "#2563eb" : "#f1f5f9",
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                  fontSize: 16, color: openFaq === i ? "#fff" : "#64748b", fontWeight: 700, lineHeight: 1, transition: "all 0.2s"
                }}>{openFaq === i ? "â" : "+"}</span>
              </div>
              {openFaq === i && (
                <div style={{ padding: "0 0 16px", animation: "fadeIn 0.15s" }}>
                  <p style={{ margin: 0, fontSize: 13, color: "#475569", lineHeight: 1.7, background: "#f8fafc", borderRadius: 10, padding: "14px 16px" }}>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA FOOTER BANNER */}
        <div style={{
          margin: "36px 0 48px",
          background: "linear-gradient(135deg, #1d4ed8 0%, #2563eb 60%, #3b82f6 100%)",
          borderRadius: 20, padding: "40px 48px",
          display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 24
        }}>
          <div>
            <h2 style={{ fontSize: 26, fontWeight: 800, color: "#fff", margin: "0 0 8px" }}>Save Lakhs on Home Loan Interest?</h2>
            <p style={{ color: "rgba(255,255,255,0.75)", margin: 0, fontSize: 15 }}>Zero prepayment charges · Instant calculations · Compare top lenders · Expert guidance</p>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <button style={{
              background: "#fff", color: "#2563eb", border: "none", borderRadius: 12,
              padding: "14px 28px", fontSize: 15, fontWeight: 800, cursor: "pointer", letterSpacing: "0.2px"
            }}>Check Eligibility</button>
            <button style={{
              background: "rgba(255,255,255,0.15)", color: "#fff", border: "2px solid rgba(255,255,255,0.4)",
              borderRadius: 12, padding: "14px 28px", fontSize: 15, fontWeight: 700, cursor: "pointer"
            }}>Apply Now</button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: none; } }
        input[type=range] { -webkit-appearance: none; appearance: none; height: 20px; background: transparent; }
        input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; width: 18px; height: 18px; border-radius: 50%; background: #2563eb; border: 3px solid white; box-shadow: 0 1px 6px rgba(37,99,235,0.4); cursor: pointer; }
        * { box-sizing: border-box; }
      `}</style>
    </div>
  );
}
