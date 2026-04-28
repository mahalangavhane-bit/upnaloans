import { useState, useRef, useEffect } from "react";
import { Home, PiggyBank, Calculator, TrendingUp, ChevronDown, ChevronUp, Building2, CircleHelp, IndianRupee, Calendar, Percent } from "lucide-react";

const banks = [
  { name: "SBI", logo: "SBI", rate: "6.75%", min: "6.75%", amount: "No Limit", color: "#22488C", tenure: "7 days - 10 yrs" },
  { name: "HDFC Bank", logo: "HDFC", rate: "6.60%", min: "6.60%", amount: "No Limit", color: "#004C8F", tenure: "7 days - 10 yrs" },
  { name: "ICICI Bank", logo: "ICICI", rate: "6.70%", min: "6.70%", amount: "No Limit", color: "#F07D00", tenure: "7 days - 10 yrs" },
  { name: "Axis Bank", logo: "AXIS", rate: "6.75%", min: "6.75%", amount: "No Limit", color: "#8B1538", tenure: "7 days - 10 yrs" },
  { name: "Post Office", logo: "PO", rate: "6.90%", min: "6.90%", amount: "No Limit", color: "#1E3A5F", tenure: "1 yr - 5 yrs" },
];

const faqs = [
  { q: "What is a Fixed Deposit?", a: "A Fixed Deposit (FD) is a financial instrument where you deposit a lump sum amount for a fixed tenure at a predetermined interest rate. The interest is compounded quarterly and paid at maturity." },
  { q: "How is FD interest calculated?", a: "FD interest is calculated using compound interest formula: Maturity Amount = P × (1 + r/n)^(n×t), where P = principal, r = annual rate, n = compounding frequency, t = tenure in years." },
  { q: "What factors affect FD returns?", a: "Your FD returns are affected by principal amount, interest rate, tenure period, compounding frequency, and whether you choose cumulative or non-cumulative payout options." },
  { q: "Can I break my FD prematurely?", a: "Yes, most banks allow premature FD withdrawal but charge a penalty (usually 0.5-1% on the applicable rate). This reduces your effective returns." },
  { q: "Is UpnaLoan FD calculator accurate?", a: "Yes. Our calculator uses the standard compound interest formula with quarterly compounding as per RBI guidelines. Results are accurate for informational purposes only." },
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

export default function FDCalc() {
  const [principal, setPrincipal] = useState(100000);
  const [interestRate, setInterestRate] = useState(6.75);
  const [tenure, setTenure] = useState(2);
  const [openFaq, setOpenFaq] = useState(null);

  // Calculate FD maturity amount and interest
  const quarterlyRate = interestRate / 100 / 4;
  const quarters = tenure * 4;
  const maturityAmount = principal * Math.pow(1 + quarterlyRate, quarters);
  const totalInterest = maturityAmount - principal;

  const card = {
    background: "#fff", borderRadius: 16, boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
    border: "1px solid #f1f5f9", padding: 28
  };

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", background: "#f8fafc", minHeight: "100vh" }}>

      {/* HERO SECTION - simplified, no navbar */}
      <div style={{
        background: "#ffffff",
        padding: "clamp(40px, 8vw, 80px) clamp(16px, 5vw, 80px)", 
        position: "relative", 
        overflow: "hidden",
        borderBottom:"1px solid #f1f5f9"
      }}>
        <div style={{ position: "absolute", right: 80, top: 20, width: 260, height: 260, borderRadius: "50%", background: "rgba(59,130,246,0.08)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", right: 140, top: 60, width: 120, height: 120, borderRadius: "50%", background: "rgba(59,130,246,0.05)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
            <div style={{ background: "rgba(59,130,246,0.15)", borderRadius: 20, padding: "4px 12px" }}>
              <span style={{ color: "#93c5fd", fontSize: 12, fontWeight: 600 }}>FREE TOOL</span>
            </div>
            <div style={{ background: "rgba(34,197,94,0.15)", borderRadius: 20, padding: "4px 12px" }}>
              <span style={{ color: "#86efac", fontSize: 12, fontWeight: 600 }}>INSTANT RESULT</span>
            </div>
          </div>
          <h1 style={{ 
            fontSize: "clamp(32px, 6vw, 48px)", 
            fontWeight: 800,
            lineHeight: 1.2, 
            margin: "0 0 14px", 
            letterSpacing: "-0.5px" 
            }}>
              <span style={{color : "#111827"}}>Fixed Deposit{" "}</span>
           <span style={{color: "#f97316"}}>Calculator</span>
          </h1>
          <p style={{ color: "#94a3b8", fontSize: "clamp(14px, 4vw, 16px)", lineHeight: 1.7, maxWidth: 580, margin: "0 0 24px" }}>
            Calculate your FD maturity amount and interest earnings instantly. Compare rates across banks and maximize your investment returns.
          </p>
          <div style={{ display: "flex", gap: "clamp(16px, 4vw, 28px)", flexWrap: "wrap" }}>
            {[["No Limit", "Max Amount"], ["6.75%", "Starting Rate"], ["10 Years", "Max Tenure"], ["Quarterly", "Compounding"]].map(([val, lbl]) => (
              <div key={lbl} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "clamp(18px, 4vw, 22px)", fontWeight: 800, color: "#3b82f6", lineHeight: 1 }}>{val}</div>
                <div style={{ fontSize: 11, color: "#64748b", marginTop: 3, fontWeight: 500 }}>{lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BREADCRUMB */}
      <div style={{ background: "#fff", borderBottom: "1px solid #f1f5f9", padding: "10px clamp(16px, 5vw, 48px)" }}>
        <span style={{ fontSize: 12, color: "#94a3b8", display: "inline-flex", alignItems: "center", gap: 4 }}><Home size={12} /> Home</span>
        <span style={{ fontSize: 12, color: "#cbd5e1", margin: "0 6px" }}>/</span>
        <span style={{ fontSize: 12, color: "#94a3b8", display: "inline-flex", alignItems: "center", gap: 4 }}><PiggyBank size={12} /> Investments</span>
        <span style={{ fontSize: 12, color: "#cbd5e1", margin: "0 6px" }}>/</span>
        <span style={{ fontSize: 12, color: "#2563eb", fontWeight: 500, display: "inline-flex", alignItems: "center", gap: 4 }}><Calculator size={12} /> Fixed Deposit Calculator</span>
      </div>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "clamp(32px, 6vw, 48px) clamp(16px, 5vw, 48px)" }}>

        {/* CALCULATOR SECTION */}
        <div style={{ display: "flex", gap: "clamp(24px, 4vw, 40px)", marginTop: 20, flexWrap: "wrap" }}>

          {/* LEFT: Inputs */}
          <div style={{ flex: "1 1 380px", ...card }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "#1e293b", margin: "0 0 24px", display: "flex", alignItems: "center", gap: 8 }}><TrendingUp size={18} /> FD Details</h2>
            <SliderInput label="Principal Amount" value={principal} min={1000} max={10000000} step={1000}
              onChange={setPrincipal} prefix="Rs." formatFn={v => formatINR(v)} />
            <SliderInput label="Interest Rate (p.a.)" value={interestRate} min={3} max={9} step={0.25}
              onChange={setInterestRate} suffix="%" />
            <SliderInput label="Tenure" value={tenure} min={0.25} max={10} step={0.25}
              onChange={setTenure} suffix=" years" />
          </div>

          {/* RIGHT: Results */}
          <div style={{ flex: "1 1 380px", ...card }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "#1e293b", margin: "0 0 24px", display: "flex", alignItems: "center", gap: 8 }}><Calculator size={18} /> Maturity Details</h2>
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <div style={{ fontSize: 14, color: "#64748b", marginBottom: 8 }}>Maturity Amount</div>
              <div style={{ fontSize: "clamp(32px, 6vw, 42px)", fontWeight: 700, color: "#3b82f6", lineHeight: 1.2 }}>{formatINR(maturityAmount)}</div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 16, marginBottom: 32 }}>
              {[
                ["Principal Amount", formatINR(principal)],
                ["Total Interest", formatINR(totalInterest)],
                ["Interest Rate", interestRate.toFixed(2) + "%"],
                ["Tenure", tenure + " years"]
              ].map(([label, val]) => (
                <div key={label} style={{ padding: 16, background: "#f8fafc", borderRadius: 8, border: "1px solid #e2e8f0" }}>
                  <div style={{ fontSize: 12, color: "#64748b", marginBottom: 4 }}>{label}</div>
                  <div style={{ fontSize: "clamp(16px, 4vw, 18px)", fontWeight: 600, color: "#1e293b" }}>{val}</div>
                </div>
              ))}
            </div>

            {/* Donut Chart */}
            <div style={{ marginBottom: 32, display: "flex", justifyContent: "center" }}>
              <DonutChart principal={principal} interest={totalInterest} />
            </div>
            <div style={{ display: "flex", gap: 24, justifyContent: "center", marginTop: -8, marginBottom: 24, flexWrap: "wrap" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 12, height: 12, background: "#2563eb", borderRadius: 2 }} />
                <span style={{ fontSize: 14, color: "#64748b" }}>Principal</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 12, height: 12, background: "#fb923c", borderRadius: 2 }} />
                <span style={{ fontSize: 14, color: "#64748b" }}>Interest</span>
              </div>
            </div>

            <button style={{ width: "100%", height: 48, background: "#3b82f6", color: "#fff", border: "none", borderRadius: 12, fontSize: 16, fontWeight: 600, cursor: "pointer", marginBottom: 24 }}
              onMouseEnter={e => {
                e.target.style.background = "#2563eb";
                e.target.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={e => {
                e.target.style.background = "#3b82f6";
                e.target.style.transform = "translateY(0)";
              }}
            >
              Open FD Account Now
            </button>
          </div>
        </div>

        {/* Bank Offers */}
        <div style={{ marginTop: 48 }}>
          <h3 style={{ fontSize: "clamp(20px, 5vw, 24px)", fontWeight: 700, color: "#1e293b", marginBottom: 24, display: "flex", alignItems: "center", gap: 8 }}><Building2 size={22} /> Current FD Rates</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "clamp(16px, 3vw, 24px)" }}>
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
                  ["Min Amount", bank.amount],
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
        <div style={{ marginTop: 48, marginBottom: 0 }}>
          <h3 style={{ fontSize: "clamp(20px, 5vw, 24px)", fontWeight: 700, color: "#1e293b", marginBottom: 24, display: "flex", alignItems: "center", gap: 8 }}><CircleHelp size={22} /> Frequently Asked Questions</h3>
          <div style={{ display: "grid", gap: 16 }}>
            {faqs.map((faq, index) => {
              const [isOpen, setIsOpen] = useState(false);
              return (
                <div key={index} style={{ background: "#fff", borderRadius: 12, border: "1px solid #e2e8f0", overflow: "hidden" }}>
                  <div 
                    style={{ padding: 20, background: "#f8fafc", cursor: "pointer", fontWeight: 600, color: "#1e293b", display: "flex", justifyContent: "space-between", alignItems: "center" }}
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    {faq.q}
                    {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                  {isOpen && (
                    <div style={{ padding: 20, borderTop: "1px solid #e2e8f0" }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}