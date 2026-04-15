import { useState, useRef, useEffect } from "react";

const faqs = [
  { q: "What is Home Loan Eligibility?", a: "Home Loan Eligibility determines the maximum loan amount you can borrow based on your monthly income, existing EMIs, credit score, and other financial obligations." },
  { q: "How is Home Loan Eligibility calculated?", a: "Eligibility is calculated using the formula: Eligible Amount = (Monthly Income × 60%) - Existing EMIs. Most lenders consider 60% of monthly income as the maximum EMI capacity." },
  { q: "What factors affect Home Loan Eligibility?", a: "Your Home Loan Eligibility is primarily affected by your monthly income, existing loan obligations, credit score, employment stability, age, and the lender's internal policies." },
  { q: "How can I improve my Home Loan Eligibility?", a: "You can improve eligibility by increasing your monthly income, reducing existing EMIs, maintaining a good credit score, choosing lenders with flexible eligibility criteria, and providing accurate documentation." },
  { q: "Is UpnaLoan Home Loan Eligibility calculator accurate?", a: "Yes. Our calculator uses standard RBI guidelines and industry best practices to determine your loan eligibility. Results are accurate for informational purposes only." },
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

export default function HomeLoanEligibility() {
  const [monthlyIncome, setMonthlyIncome] = useState(50000);
  const [existingEMI, setExistingEMI] = useState(10000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [openFaq, setOpenFaq] = useState(null);

  // Calculate eligibility
  const maxEMI = monthlyIncome * 0.6 - existingEMI;
  const eligibleAmount = maxEMI * 1000 / (interestRate / 12 / 100);
  const maxLoanAmount = eligibleAmount;

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
            Home Loan Eligibility Calculator
          </h1>
          <p style={{ color: "#94a3b8", fontSize: 16, lineHeight: 1.7, maxWidth: 580, margin: "0 0 24px" }}>
            Check your home loan eligibility instantly based on your income and existing obligations. Calculate the maximum loan amount you can qualify for from top lenders.
          </p>
          <div style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
            {[["60% Rule", "Max Loan Amount"], ["8.50%", "Interest Rate"], ["2 Min", "Instant Check"]].map(([val, lbl]) => (
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
        <span style={{ fontSize: 12, color: "#2563eb", fontWeight: 500 }}>Eligibility Calculator</span>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>

        {/* CALCULATOR SECTION */}
        <div style={{ display: "flex", gap: 28, marginTop: 36, flexWrap: "wrap" }}>

          {/* LEFT: Inputs */}
          <div style={{ flex: "1 1 380px", ...card }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "#1e293b", margin: "0 0 24px" }}>Income Details</h2>
            <SliderInput label="Monthly Income" value={monthlyIncome} min={25000} max={1000000} step={1000}
              onChange={setMonthlyIncome} prefix="₹" formatFn={v => formatINR(v)} />
            <SliderInput label="Existing EMI" value={existingEMI} min={0} max={monthlyIncome * 0.5} step={1000}
              onChange={setExistingEMI} prefix="₹" formatFn={v => formatINR(v)} />
            <SliderInput label="Interest Rate (p.a.)" value={interestRate} min={6} max={20} step={0.25}
              onChange={setInterestRate} suffix="%" />
          </div>

          {/* RIGHT: Results */}
          <div style={{ flex: "1 1 380px", ...card }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "#1e293b", margin: "0 0 24px" }}>Eligibility Result</h2>
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <div style={{ fontSize: 14, color: "#64748b", marginBottom: 8 }}>Maximum Eligible Amount</div>
              <div style={{ fontSize: 36, fontWeight: 700, color: "#3b82f6", lineHeight: 1.2 }}>{formatINR(eligibleAmount)}</div>
            </div>
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <div style={{ fontSize: 14, color: "#64748b", marginBottom: 8 }}>Maximum EMI Capacity</div>
              <div style={{ fontSize: 36, fontWeight: 700, color: "#3b82f6", lineHeight: 1.2 }}>{formatINR(maxEMI)}</div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 32 }}>
              {[
                ["Monthly Income", formatINR(monthlyIncome)],
                ["Existing EMI", formatINR(existingEMI)],
                ["Interest Rate", interestRate.toFixed(1) + "%"],
                ["Eligible Amount", formatINR(eligibleAmount)],
                ["Max EMI Capacity", formatINR(maxEMI)]
              ].map(([label, val]) => (
                <div key={label} style={{ padding: 16, background: "#f8fafc", borderRadius: 8, border: "1px solid #e2e8f0" }}>
                  <div style={{ fontSize: 12, color: "#64748b", marginBottom: 4 }}>{label}</div>
                  <div style={{ fontSize: 18, fontWeight: 600, color: "#1e293b" }}>{val}</div>
                </div>
              ))}
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
              Check Eligibility →
            </button>
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
