import { useState, useEffect } from "react";
import { Zap, TrendingDown, Lock, Handshake, BarChart2, CheckSquare, FileText, Rocket, MapPin, Building2, DollarSign, TrendingUp, Calendar, Star, Clock, CreditCard } from "lucide-react";

const banks = [
  { name: "HDFC Bank", logo: "HDFC", rate: "8.50%", min: "8.50%", amount: "₹40L", color: "#004C8F", processing: "0%", tenure: "1-5 yrs" },
  { name: "ICICI Bank", logo: "ICICI", rate: "8.75%", min: "8.75%", amount: "₹40L", color: "#F07D00", processing: "2%", tenure: "1-6 yrs" },
  { name: "SBI", logo: "SBI", rate: "11.00%", min: "11.00%", amount: "₹20L", color: "#22488C", processing: "1.5%", tenure: "1-6 yrs" },
  { name: "Bajaj Finserv", logo: "BAJAJ", rate: "11.99%", min: "11.99%", amount: "₹35L", color: "#1E3A5F", processing: "3.93%", tenure: "1-8 yrs" },
];

const faqs = [
  { q: "What is a Home Loan EMI?", a: "A Home Loan EMI (Equated Monthly Installment) is the fixed payment amount you pay each month to repay your home loan over the entire loan tenure." },
  { q: "How is Home Loan EMI calculated?", a: "EMI is calculated using the formula: EMI = [P × r × (1+r)^n] / [(1+r)^n – 1], where P = Principal amount, r = monthly interest rate, and n = total number of months." },
  { q: "What factors affect my Home Loan EMI?", a: "Your Home Loan EMI is primarily affected by three factors: loan amount borrowed, interest rate charged by the lender, and repayment tenure you select. A higher loan amount or rate increases EMI, while a longer tenure reduces it." },
  { q: "Can I reduce my Home Loan EMI?", a: "Yes — you can reduce your EMI by opting for a longer repayment tenure, maintaining a high credit score to negotiate lower interest rates, making partial prepayments to reduce principal, or refinancing with a lender offering better rates." },
  { q: "Is UpnaLoan Home Loan EMI calculator accurate?", a: "Yes. Our calculator uses the standard reducing balance formula used by all RBI-regulated banks and NBFCs in India. Results are accurate to the rupee for parameters you enter." },
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

export default function HomeLoanCalc() {
  const [loanAmount, setLoanAmount] = useState(1000000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);
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

      {/* HERO */}
      <div style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #1e293b 100%)",
        padding: "52px 48px 60px",
        position: "relative", overflow: "hidden"
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
            Home Loan EMI Calculator
          </h1>
          <p style={{ color: "#94a3b8", fontSize: 16, lineHeight: 1.7, maxWidth: 580, margin: "0 0 24px" }}>
            Calculate your monthly EMI instantly across India's top lenders. Compare rates, plan your budget, and apply for the best home loan offer in seconds.
          </p>
          <div style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
            {[["₹40 Lakh", "Max Loan Amount"], ["8.50%", "Starting Interest Rate"], ["240 Months", "Max Tenure"], ["2 Min", "Instant Approval"]].map(([val, lbl]) => (
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
        <span style={{ fontSize: 12, color: "#94a3b8" }}>Home Loan</span>
        <span style={{ fontSize: 12, color: "#cbd5e1", margin: "0 6px" }}>›</span>
        <span style={{ fontSize: 12, color: "#2563eb", fontWeight: 500 }}>EMI Calculator</span>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>

        {/* CALCULATOR SECTION */}
        <div style={{ display: "flex", gap: 28, marginTop: 36, flexWrap: "wrap" }}>

          {/* LEFT: Inputs */}
          <div style={{ flex: "1 1 380px", ...card }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "#1e293b", margin: "0 0 24px" }}>Loan Details</h2>
            <SliderInput label="Loan Amount" value={loanAmount} min={1000000} max={100000000} step={100000}
              onChange={setLoanAmount} prefix="₹" formatFn={v => formatINR(v)} />
            <SliderInput label="Rate of Interest (p.a.)" value={interestRate} min={6} max={15} step={0.25}
              onChange={setInterestRate} suffix="%" />
            <SliderInput label="Loan Tenure" value={tenure} min={12} max={360} step={1}
              onChange={setTenure} suffix=" months" />
            <div style={{ background: "#eff6ff", borderRadius: 12, padding: "14px 18px", marginTop: 8, border: "1px solid #bfdbfe", display: "flex", alignItems: "flex-start", gap: 8 }}>
              <Zap size={14} color="#3b82f6" style={{ marginTop: 2, flexShrink: 0 }} />
              <p style={{ margin: 0, fontSize: 12, color: "#3b82f6", lineHeight: 1.6 }}>
                <strong>Tip:</strong> Higher tenure means lower EMI but more total interest. Use the comparison below to find the sweet spot.
              </p>
            </div>
          </div>

          {/* RIGHT: Results */}
          <div style={{ flex: "1 1 340px", display: "flex", flexDirection: "column", gap: 20 }}>

            {/* EMI Highlight */}
            <div style={{ background: "linear-gradient(135deg,#1d4ed8,#2563eb)", borderRadius: 16, padding: "28px 28px 24px", color: "#fff" }}>
              <p style={{ margin: "0 0 4px", fontSize: 13, opacity: 0.8, fontWeight: 500 }}>Monthly EMI</p>
              <h1 style={{ margin: "0 0 20px", fontSize: 44, fontWeight: 800, letterSpacing: "-1px" }}>
                ₹{formatINR(emi)}
              </h1>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                {[
                  ["Principal", `₹${formatINR(loanAmount)}`],
                  ["Interest", `₹${formatINR(totalInterest)}`],
                  ["Total Pay", `₹${formatINR(totalAmount)}`]
                ].map(([l, v]) => (
                  <div key={l} style={{ background: "rgba(255,255,255,0.12)", borderRadius: 10, padding: "10px 12px" }}>
                    <div style={{ fontSize: 10, opacity: 0.75, marginBottom: 3 }}>{l}</div>
                    <div style={{ fontSize: 13, fontWeight: 700 }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Donut + Legend */}
            <div style={{ ...card, display: "flex", alignItems: "center", gap: 20 }}>
              <DonutChart principal={loanAmount} interest={totalInterest} />
              <div style={{ flex: 1 }}>
                <p style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600, color: "#1e293b" }}>Breakup</p>
                {[
                  ["Principal Amount", loanAmount, "#2563eb"],
                  ["Total Interest", totalInterest, "#fb923c"],
                ].map(([lbl, val, clr]) => (
                  <div key={lbl} style={{ marginBottom: 10 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                      <span style={{ fontSize: 12, color: "#475569", display: "flex", alignItems: "center", gap: 5 }}>
                        <span style={{ width: 8, height: 8, borderRadius: "50%", background: clr, display: "inline-block" }} />
                        {lbl}
                      </span>
                      <span style={{ fontSize: 12, fontWeight: 600, color: "#1e293b" }}>₹{formatINR(val)}</span>
                    </div>
                    <div style={{ height: 4, borderRadius: 99, background: "#f1f5f9" }}>
                      <div style={{ height: "100%", borderRadius: 99, background: clr, width: `${(val / totalAmount) * 100}%` }} />
                    </div>
                  </div>
                ))}
                <button style={{
                  width: "100%", marginTop: 12, background: "#2563eb", color: "#fff",
                  border: "none", borderRadius: 10, padding: "12px", fontSize: 14,
                  fontWeight: 700, cursor: "pointer", letterSpacing: "0.2px"
                }}>Apply for Loan →</button>
              </div>
            </div>
          </div>
        </div>

        {/* AMORTIZATION TABLE */}
        <div style={{ ...card, marginTop: 32, overflow: "hidden" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "#1e293b", margin: 0 }}>Amortization Schedule <span style={{ fontSize: 13, color: "#94a3b8", fontWeight: 400 }}>(First 12 Months)</span></h2>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ background: "#f8fafc" }}>
                  {["Month", "EMI", "Principal", "Interest", "Balance"].map(h => (
                    <th key={h} style={{ padding: "10px 16px", textAlign: "right", color: "#64748b", fontWeight: 600, borderBottom: "1px solid #f1f5f9" }}>{h}</th>
                  ))}
          </tr>
              </thead>
              <tbody>
                {amortization.map((row, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid #f8fafc" }}
                    onMouseEnter={e => e.currentTarget.style.background = "#f8fafc"}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                    <td style={{ padding: "10px 16px", textAlign: "right", color: "#2563eb", fontWeight: 600 }}>{row.month}</td>
                    <td style={{ padding: "10px 16px", textAlign: "right", color: "#1e293b" }}>₹{formatINR(row.emi)}</td>
                    <td style={{ padding: "10px 16px", textAlign: "right", color: "#16a34a", fontWeight: 500 }}>₹{formatINR(row.principal)}</td>
                    <td style={{ padding: "10px 16px", textAlign: "right", color: "#dc2626" }}>₹{formatINR(row.interest)}</td>
                    <td style={{ padding: "10px 16px", textAlign: "right", color: "#475569" }}>₹{formatINR(row.balance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* BANK OFFERS */}
        <div style={{ marginTop: 40 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: "#1e293b", margin: 0 }}>Current Bank Offers</h2>
              <p style={{ color: "#64748b", fontSize: 14, margin: "4px 0 0" }}>Compare rates from top banks & NBFCs. Updated daily.</p>
            </div>
            <span style={{ fontSize: 13, color: "#2563eb", cursor: "pointer", fontWeight: 600 }}>View All Offers →</span>
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
                  {[["Interest Rate", b.rate], ["Max Amount", b.amount], ["Processing Fee", b.processing], ["Tenure", b.tenure]].map(([lbl, val]) => (
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

        {/* QUICK LINKS */}
        <div style={{ ...card, marginTop: 36 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#1e293b", margin: "0 0 18px" }}>Quick Links</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12 }}>
            {[
              [BarChart2, "Interest Rates", "#eff6ff", "#2563eb"],
              [CheckSquare, "Eligibility", "#f0fdf4", "#16a34a"],
              [FileText, "Documents", "#fef9ec", "#d97706"],
              [Rocket, "Apply Now", "#fdf2f8", "#9333ea"],
              [Building2, "Top Banks", "#fff1f2", "#e11d48"],
              [CreditCard, "EMI Calc", "#f0f9ff", "#0284c7"],
            ].map(([Icon, label, bg, clr]) => (
              <div key={label} style={{
                background: bg, borderRadius: 12, padding: "16px 14px",
                border: `1px solid ${clr}22`, cursor: "pointer", textAlign: "center",
                transition: "transform 0.15s, box-shadow 0.15s"
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.08)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>
                  <Icon size={22} color={clr} />
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, color: clr }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* WHY CHOOSE */}
        <div style={{ ...card, marginTop: 32 }}>
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: "#1e293b", margin: "0 0 6px" }}>Why Choose UpnaLoan?</h2>
            <p style={{ color: "#64748b", fontSize: 14, margin: 0 }}>Trusted by 5 lakh+ borrowers across India</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 18 }}>
            {[
              [Zap, "Fast Approval", "Get instant approval decision in under 2 minutes with minimal documentation.", "#fefce8", "#ca8a04"],
              [TrendingDown, "Lowest Rates", "Access exclusive rates starting at 8.50% from 50+ partner lenders.", "#eff6ff", "#2563eb"],
              [Lock, "Secure Process", "Bank-grade encryption ensures your data and transactions stay protected.", "#f0fdf4", "#16a34a"],
              [Handshake, "Trusted Lenders", "Partnered with RBI-regulated banks, NBFCs, and top financial institutions.", "#fdf4ff", "#9333ea"],
            ].map(([Icon, title, desc, bg, clr]) => (
              <div key={title} style={{ background: bg, borderRadius: 14, padding: "22px 18px", border: `1px solid ${clr}18` }}>
                <div style={{ marginBottom: 10 }}>
                  <Icon size={24} color={clr} />
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: "#1e293b", margin: "0 0 6px" }}>{title}</h3>
                <p style={{ fontSize: 13, color: "#64748b", margin: 0, lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* INFO SECTIONS */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 20, marginTop: 32 }}>
          {[
            ["What is a Home Loan EMI?", "EMI stands for Equated Monthly Installment — a fixed monthly payment comprising principal repayment and interest. It helps borrowers plan structured repayments over a chosen tenure, making loan management predictable and hassle-free."],
            ["What is a Home Loan EMI Calculator?", "A home loan EMI calculator is a free online tool that instantly estimates your monthly installment based on your loan amount, interest rate, and tenure. It removes manual calculation errors and saves significant time."],
            ["What is an Amortization Schedule?", "An amortization schedule is a detailed month-wise table showing the breakup of each EMI into principal and interest components, along with the outstanding loan balance. It helps track how your loan reduces over time."],
            ["Why Use UpnaLoan's EMI Calculator?", "Our calculator supports 50+ lenders, offers real-time comparison, and instantly computes total interest and payable amounts. It's faster, more accurate, and more insightful than any manual calculation method."],
            ["How to Use the EMI Calculator?", "Enter your desired loan amount using the slider or text input. Select the applicable interest rate. Choose your preferred repayment tenure. The calculator instantly shows your EMI, total interest, and total payable amount."],
            ["Compare EMIs Across Banks & NBFCs", "Different lenders offer varying rates. HDFC starts at 8.50%, ICICI at 8.75%, SBI at 11.00%, and Bajaj Finserv at 11.99%. Using our calculator helps you identify the most cost-effective lender before applying."],
          ].map(([title, body]) => (
            <div key={title} style={{ ...card, padding: "22px 24px" }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: "#1e293b", margin: "0 0 10px", borderLeft: "3px solid #2563eb", paddingLeft: 10 }}>{title}</h3>
              <p style={{ fontSize: 13, color: "#475569", margin: 0, lineHeight: 1.7 }}>{body}</p>
            </div>
          ))}
        </div>

        {/* IMPACT + REDUCE GRID */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 20, flexWrap: "wrap" }}>
          {[
            ["What Impacts Your Home Loan EMI?", [
              [DollarSign, "Loan Amount", "Higher principal → higher EMI", "#eff6ff"],
              [TrendingUp, "Interest Rate", "Higher rate → higher EMI", "#eff6ff"],
              [Calendar, "Loan Tenure", "Longer tenure → lower EMI", "#eff6ff"],
              [Star, "Credit Score", "Better score → better rate", "#eff6ff"],
            ]],
            ["How to Reduce Your Home Loan EMI?", [
              [Clock, "Choose Longer Tenure", "Spreads cost over more months", "#eff6ff"],
              [BarChart2, "Improve Credit Score", "Negotiate better interest rates", "#eff6ff"],
              [Handshake, "Negotiate with Lender", "Ask for rate reduction", "#eff6ff"],
              [CreditCard, "Make Prepayments", "Reduce outstanding principal early", "#eff6ff"],
            ]],
          ].map(([title, items]) => (
            <div key={title} style={{ ...card }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: "#1e293b", margin: "0 0 16px" }}>{title}</h3>
              {items.map(([Icon, lbl, desc, bg]) => (
                <div key={lbl} style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 14 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon size={16} color="#2563eb" />
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#1e293b" }}>{lbl}</div>
                    <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 2 }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          ))}
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
                }}>{openFaq === i ? "−" : "+"}</span>
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
            <h2 style={{ fontSize: 26, fontWeight: 800, color: "#fff", margin: "0 0 8px" }}>Ready to Apply for a Home Loan?</h2>
            <p style={{ color: "rgba(255,255,255,0.75)", margin: 0, fontSize: 15 }}>Lowest interest rates · Quick approval · Expert assistance</p>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <button style={{
              background: "#fff", color: "#2563eb", border: "none", borderRadius: 12,
              padding: "14px 28px", fontSize: 15, fontWeight: 800, cursor: "pointer", letterSpacing: "0.2px"
            }}>Check Eligibility</button>
            <button style={{
              background: "rgba(255,255,255,0.15)", color: "#fff", border: "2px solid rgba(255,255,255,0.4)",
              borderRadius: 12, padding: "14px 28px", fontSize: 15, fontWeight: 700, cursor: "pointer"
            }}>Apply Now →</button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: none; } }
        input[type=range] { -webkit-appearance: none; appearance: none; height: 20px; background: transparent; }
        input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; width: 18px; height: 18px; border-radius: 50%; background: #2563eb; border: 3px solid white; box-shadow: 0 1px 6px rgba(37,99,235,0.4); cursor: pointer; }
        * { box-sizing: border-box; }
        @media (max-width: 768px) {
          .calc-wrapper { padding: 0 16px !important; }
        }
      `}</style>
    </div>
  );
}