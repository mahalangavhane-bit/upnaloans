import { useState, useEffect } from "react";
import { Zap, TrendingDown, Lock, Handshake, BarChart2, CheckSquare, FileText, Rocket, MapPin, Building2, DollarSign, TrendingUp, Calendar, Star, Clock, CreditCard } from "lucide-react";

const faqs = [
  { q: "What is Personal Loan Eligibility?", a: "Personal Loan Eligibility determines the maximum loan amount you can borrow based on your monthly income, existing EMIs, credit score, and other financial obligations." },
  { q: "How is Personal Loan Eligibility calculated?", a: "Eligibility is calculated using the formula: Eligible Amount = (Monthly Income × 60%) - Existing EMIs. Most lenders consider 60% of monthly income as the maximum EMI capacity." },
  { q: "What factors affect Personal Loan Eligibility?", a: "Your Personal Loan Eligibility is primarily affected by your monthly income, existing loan obligations, credit score, employment stability, age, and the lender's internal policies." },
  { q: "How can I improve my Personal Loan Eligibility?", a: "You can improve eligibility by increasing your monthly income, reducing existing EMIs, maintaining a good credit score, choosing lenders with flexible eligibility criteria, and providing accurate documentation." },
  { q: "Is UpnaLoan Personal Loan Eligibility calculator accurate?", a: "Yes. Our calculator uses standard RBI guidelines and industry best practices to determine your loan eligibility. Results are accurate for informational purposes only." },
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

export default function PLECalc() {
  const [monthlyIncome, setMonthlyIncome] = useState(50000);
  const [existingEMI, setExistingEMI] = useState(10000);
  const [interestRate, setInterestRate] = useState(12.0);
  const [openFaq, setOpenFaq] = useState(null);

  const maxEMI = monthlyIncome * 0.6 - existingEMI;
  const eligibleAmount = maxEMI * 1000 / (interestRate / 12 / 100);

  const card = {
    background: "#fff", borderRadius: 16, boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
    border: "1px solid #f1f5f9", padding: 28
  };

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", background: "#f8fafc", minHeight: "100vh" }}>

      {/* HERO */}
      <div style={{
        background: "#ffffff",
        padding: "clamp(40px, 8vw, 80px) clamp(16px, 5vw, 80px)",
        position: "relative", overflow: "hidden",
        borderBottom: "1px solid #f1f5f9"
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
            fontWeight: 800, color: "#111827", 
            lineHeight: 1.2, 
            margin: "0 0 14px", 
            letterSpacing: "-0.5px" }}>
              <span style={{color:"#111827"}}>
            Personal Loan {" "}</span>
            <span style={{color:"#f97316"}}>
            Eligibility Calculator
            </span>
          </h1>
          <p style={{ color: "#475569", fontSize: "clamp(14px, 4vw, 16px)", lineHeight: 1.7, maxWidth: 580, margin: "0 0 24px" }}>
            Check your personal loan eligibility instantly based on your income and existing obligations. Calculate the maximum loan amount you can qualify for from top lenders.
          </p>
          <div style={{ display: "flex", gap: "clamp(16px, 4vw, 28px)", flexWrap: "wrap" }}>
            {[["60% Rule", "Max Loan Amount"], ["12.0%", "Interest Rate"], ["2 Min", "Instant Check"]].map(([val, lbl]) => (
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
        <span style={{ fontSize: 12, color: "#94a3b8" }}>Home</span>
        <span style={{ fontSize: 12, color: "#cbd5e1", margin: "0 6px" }}>›</span>
        <span style={{ fontSize: 12, color: "#94a3b8" }}>Personal Loan</span>
        <span style={{ fontSize: 12, color: "#cbd5e1", margin: "0 6px" }}>›</span>
        <span style={{ fontSize: 12, color: "#2563eb", fontWeight: 500 }}>Eligibility Calculator</span>
      </div>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "clamp(32px, 6vw, 48px) clamp(16px, 5vw, 48px)" }}>

        {/* CALCULATOR SECTION */}
        <div style={{ display: "flex", gap: "clamp(24px, 4vw, 40px)", marginTop: 20, flexWrap: "wrap" }}>

          {/* LEFT: Inputs */}
          <div style={{ flex: "1 1 380px", ...card }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "#1e293b", margin: "0 0 24px" }}>Income Details</h2>
            <SliderInput label="Monthly Income" value={monthlyIncome} min={15000} max={500000} step={1000}
              onChange={setMonthlyIncome} prefix="₹" formatFn={v => formatINR(v)} />
            <SliderInput label="Existing EMI" value={existingEMI} min={0} max={monthlyIncome * 0.5} step={1000}
              onChange={setExistingEMI} prefix="₹" formatFn={v => formatINR(v)} />
            <SliderInput label="Interest Rate (p.a.)" value={interestRate} min={6} max={20} step={0.25}
              onChange={setInterestRate} suffix="%" />
            <div style={{ background: "#eff6ff", borderRadius: 12, padding: "14px 18px", marginTop: 8, border: "1px solid #bfdbfe", display: "flex", alignItems: "flex-start", gap: 8 }}>
              <Zap size={14} color="#3b82f6" style={{ marginTop: 2, flexShrink: 0 }} />
              <p style={{ margin: 0, fontSize: 12, color: "#3b82f6", lineHeight: 1.6 }}>
                <strong>Tip:</strong> Most lenders consider 60% of monthly income as maximum EMI capacity. Reduce existing EMIs to improve eligibility.
              </p>
            </div>
          </div>

          {/* RIGHT: Results */}
          <div style={{ flex: "1 1 340px", display: "flex", flexDirection: "column", gap: 20 }}>

            {/* Eligibility Highlight */}
            <div style={{ background: "linear-gradient(135deg,#1d4ed8,#2563eb)", borderRadius: 16, padding: "clamp(20px, 4vw, 28px)", color: "#fff" }}>
              <p style={{ margin: "0 0 4px", fontSize: 13, opacity: 0.8, fontWeight: 500 }}>Maximum Eligible Amount</p>
              <h1 style={{ margin: "0 0 20px", fontSize: "clamp(36px, 6vw, 44px)", fontWeight: 800, letterSpacing: "-1px" }}>
                ₹{formatINR(eligibleAmount)}
              </h1>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))", gap: 12 }}>
                {[
                  ["Monthly Income", `₹${formatINR(monthlyIncome)}`],
                  ["Max EMI Capacity", `₹${formatINR(maxEMI)}`],
                ].map(([l, v]) => (
                  <div key={l} style={{ background: "rgba(255,255,255,0.12)", borderRadius: 10, padding: "10px 12px" }}>
                    <div style={{ fontSize: 10, opacity: 0.75, marginBottom: 3 }}>{l}</div>
                    <div style={{ fontSize: 13, fontWeight: 700 }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Details Card */}
            <div style={{ ...card }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: "#1e293b", margin: "0 0 16px" }}>Eligibility Breakdown</h3>
              <div style={{ display: "grid", gap: 12 }}>
                {[
                  ["Monthly Income", formatINR(monthlyIncome)],
                  ["Existing EMI", formatINR(existingEMI)],
                  ["Available for EMI", formatINR(Math.max(0, monthlyIncome * 0.6 - existingEMI))],
                  ["Interest Rate", interestRate.toFixed(1) + "%"],
                  ["Eligible Amount", formatINR(eligibleAmount)],
                ].map(([label, val]) => (
                  <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px", background: "#f8fafc", borderRadius: 8 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: "#1e293b" }}>{label}</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "#2563eb" }}>₹{val}</span>
                  </div>
                ))}
              </div>
              <button style={{
                width: "100%", marginTop: 20, background: "#2563eb", color: "#fff",
                border: "none", borderRadius: 10, padding: "12px", fontSize: 14,
                fontWeight: 700, cursor: "pointer", letterSpacing: "0.2px"
              }}>Check Eligibility →</button>
            </div>
          </div>
        </div>

        {/* QUICK LINKS */}
        <div style={{ ...card, marginTop: 48 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#1e293b", margin: "0 0 18px" }}>Quick Links</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12 }}>
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
        <div style={{ ...card, marginTop: 48 }}>
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <h2 style={{ fontSize: "clamp(20px, 5vw, 22px)", fontWeight: 800, color: "#1e293b", margin: "0 0 6px" }}>Why Choose UpnaLoan?</h2>
            <p style={{ color: "#64748b", fontSize: 14, margin: 0 }}>Trusted by 5 lakh+ borrowers across India</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "clamp(16px, 3vw, 24px)" }}>
            {[
              [Zap, "Instant Results", "Check eligibility in seconds with our accurate calculator.", "#fefce8", "#ca8a04"],
              [TrendingDown, "Lowest Rates", "Access exclusive personal loan rates from 50+ lenders.", "#eff6ff", "#2563eb"],
              [Lock, "Secure Process", "Bank-grade encryption for your data protection.", "#f0fdf4", "#16a34a"],
              [Handshake, "Expert Guidance", "Get help from loan experts throughout the process.", "#fdf4ff", "#9333ea"],
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
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "clamp(20px, 4vw, 32px)", marginTop: 48 }}>
          {[
            ["What is Personal Loan Eligibility?", "Personal loan eligibility determines the maximum loan amount you can borrow based on your income, existing EMIs, credit score, age, employment stability, and lender policies."],
            ["How is Eligibility Calculated?", "Lenders use the FOIR (Fixed Obligation to Income Ratio) method. Your total monthly EMIs (including proposed loan EMI) should not exceed 50-60% of your monthly income."],
            ["Factors Affecting Eligibility", "Monthly income, existing EMIs, credit score (750+ ideal), employment type, work experience, age, and lender policies all impact your eligibility."],
            ["How to Improve Eligibility?", "Add co-applicant, reduce existing debts, improve credit score, choose longer tenure, opt for lower loan amount, or apply with lenders offering flexible criteria."],
            ["Documents Required", "Income proof (salary slips/ITR), identity proof (Aadhar/PAN), address proof, bank statements (last 3-6 months), and employment proof are typically required."],
            ["Why Use Our Calculator?", "Instant results, accurate calculations based on RBI guidelines, compare multiple lenders, understand your borrowing capacity before applying for a personal loan."],
          ].map(([title, body]) => (
            <div key={title} style={{ ...card, padding: "22px 24px" }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: "#1e293b", margin: "0 0 10px", borderLeft: "3px solid #2563eb", paddingLeft: 10 }}>{title}</h3>
              <p style={{ fontSize: 13, color: "#475569", margin: 0, lineHeight: 1.7 }}>{body}</p>
            </div>
          ))}
        </div>

        {/* IMPACT + REDUCE GRID */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "clamp(20px, 4vw, 32px)", marginTop: 48 }}>
          {[
            ["What Impacts Your Eligibility?", [
              [DollarSign, "Monthly Income", "Higher income → Higher eligibility", "#eff6ff"],
              [TrendingUp, "Interest Rate", "Lower rate → Higher loan amount", "#eff6ff"],
              [Calendar, "Loan Tenure", "Longer tenure → Higher eligibility", "#eff6ff"],
              [Star, "Credit Score", "750+ score → Better terms", "#eff6ff"],
            ]],
            ["How to Improve Your Eligibility?", [
              [Clock, "Add Co-applicant", "Combine income for higher amount", "#eff6ff"],
              [BarChart2, "Reduce Existing Debt", "Pay off other loans first", "#eff6ff"],
              [Handshake, "Improve Credit Score", "Pay bills on time", "#eff6ff"],
              [CreditCard, "Choose Longer Tenure", "Reduces EMI burden", "#eff6ff"],
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
        <div style={{ ...card, marginTop: 48 }}>
          <h2 style={{ fontSize: "clamp(20px, 5vw, 22px)", fontWeight: 800, color: "#1e293b", margin: "0 0 20px" }}>Frequently Asked Questions</h2>
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
          margin: "48px 0 0",
          background: "linear-gradient(135deg, #1d4ed8 0%, #2563eb 60%, #3b82f6 100%)",
          borderRadius: 20, padding: "clamp(32px, 6vw, 48px) clamp(24px, 5vw, 48px)",
          display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 24
        }}>
          <div>
            <h2 style={{ fontSize: "clamp(20px, 5vw, 26px)", fontWeight: 800, color: "#fff", margin: "0 0 8px" }}>Ready to Apply for a Personal Loan?</h2>
            <p style={{ color: "rgba(255,255,255,0.75)", margin: 0, fontSize: "clamp(13px, 4vw, 15px)" }}>Lowest interest rates · Quick approval · Expert assistance</p>
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
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