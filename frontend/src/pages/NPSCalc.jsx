import { useState, useEffect } from "react";
import { Zap, TrendingDown, Lock, Handshake, BarChart2, CheckSquare, FileText, Rocket, MapPin, Building2, DollarSign, TrendingUp, Calendar, Star, Clock, CreditCard } from "lucide-react";

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

  const yearsToRetirement = 60 - age;
  const monthlyRate = expectedReturn / 100 / 12;
  const months = yearsToRetirement * 12;
  
  const initialFutureValue = initialContribution * Math.pow(1 + expectedReturn / 100, yearsToRetirement);
  const monthlyFutureValue = monthlyContribution * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
  const totalCorpus = initialFutureValue + monthlyFutureValue;
  const taxFreeWithdrawal = totalCorpus * 0.6;
  const annuityAmount = totalCorpus * 0.4;
  const estimatedMonthlyPension = annuityAmount * 0.06 / 12;

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
        <span style={{ fontSize: 12, color: "#cbd5e1", margin: "0 6px" }}>›</span>
        <span style={{ fontSize: 12, color: "#94a3b8" }}>Investments</span>
        <span style={{ fontSize: 12, color: "#cbd5e1", margin: "0 6px" }}>›</span>
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
              onChange={setInitialContribution} prefix="₹" formatFn={v => formatINR(v)} />
            <SliderInput label="Monthly Contribution" value={monthlyContribution} min={500} max={50000} step={500}
              onChange={setMonthlyContribution} prefix="₹" formatFn={v => formatINR(v)} />
            <SliderInput label="Expected Return" value={expectedReturn} min={6} max={15} step={0.5}
              onChange={setExpectedReturn} suffix="%" />
            <div style={{ background: "#eff6ff", borderRadius: 12, padding: "14px 18px", marginTop: 8, border: "1px solid #bfdbfe", display: "flex", alignItems: "flex-start", gap: 8 }}>
              <Zap size={14} color="#3b82f6" style={{ marginTop: 2, flexShrink: 0 }} />
              <p style={{ margin: 0, fontSize: 12, color: "#3b82f6", lineHeight: 1.6 }}>
                <strong>Tip:</strong> Start early to maximize your retirement corpus through the power of compounding.
              </p>
            </div>
          </div>

          {/* RIGHT: Results */}
          <div style={{ flex: "1 1 340px", display: "flex", flexDirection: "column", gap: 20 }}>

            {/* Corpus Highlight */}
            <div style={{ background: "linear-gradient(135deg,#1d4ed8,#2563eb)", borderRadius: 16, padding: "28px 28px 24px", color: "#fff" }}>
              <p style={{ margin: "0 0 4px", fontSize: 13, opacity: 0.8, fontWeight: 500 }}>Total Corpus at 60</p>
              <h1 style={{ margin: "0 0 20px", fontSize: 44, fontWeight: 800, letterSpacing: "-1px" }}>
                ₹{formatINR(totalCorpus)}
              </h1>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {[
                  ["Tax-Free (60%)", `₹${formatINR(taxFreeWithdrawal)}`],
                  ["Annuity (40%)", `₹${formatINR(annuityAmount)}`],
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
              <DonutChart principal={taxFreeWithdrawal} interest={annuityAmount} />
              <div style={{ flex: 1 }}>
                <p style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600, color: "#1e293b" }}>Breakup</p>
                {[
                  ["Tax-Free Withdrawal", taxFreeWithdrawal, "#2563eb"],
                  ["Annuity Amount", annuityAmount, "#fb923c"],
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
                      <div style={{ height: "100%", borderRadius: 99, background: clr, width: `${(val / totalCorpus) * 100}%` }} />
                    </div>
                  </div>
                ))}
                <div style={{ marginTop: 12, background: "#f8fafc", borderRadius: 8, padding: "10px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ fontSize: 11, color: "#64748b" }}>Monthly Pension (est.)</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: "#16a34a" }}>₹{formatINR(estimatedMonthlyPension)}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 11, color: "#64748b" }}>Years to Retirement</span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: "#1e293b" }}>{yearsToRetirement} years</span>
                  </div>
                </div>
                <button style={{
                  width: "100%", marginTop: 12, background: "#2563eb", color: "#fff",
                  border: "none", borderRadius: 10, padding: "12px", fontSize: 14,
                  fontWeight: 700, cursor: "pointer", letterSpacing: "0.2px"
                }}>Open NPS Account →</button>
              </div>
            </div>
          </div>
        </div>

        {/* SCHEMES */}
        <div style={{ marginTop: 40 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: "#1e293b", margin: 0 }}>NPS Investment Options</h2>
              <p style={{ color: "#64748b", fontSize: 14, margin: "4px 0 0" }}>Choose between Auto and Active choice based on your risk appetite.</p>
            </div>
            <span style={{ fontSize: 13, color: "#2563eb", cursor: "pointer", fontWeight: 600 }}>View All Options →</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 18 }}>
            {schemes.map((scheme, i) => (
              <div key={i} style={{
                ...card, padding: "22px 22px 20px", position: "relative",
                transition: "transform 0.2s, box-shadow 0.2s", cursor: "pointer"
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.12)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 2px 16px rgba(0,0,0,0.07)"; }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                  <div style={{ width: 42, height: 42, borderRadius: 10, background: scheme.color, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <TrendingUp size={20} color="#fff" />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: "#1e293b" }}>{scheme.name}</div>
                    <div style={{ fontSize: 11, color: "#94a3b8" }}>Risk: {scheme.risk}</div>
                  </div>
                </div>
                <div style={{ marginBottom: 8, display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 12, color: "#64748b" }}>Expected Return</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#16a34a" }}>{scheme.return}</span>
                </div>
                <div>
                  <span style={{ fontSize: 12, color: "#64748b" }}>Asset Allocation</span>
                  <div style={{ fontSize: 12, fontWeight: 500, color: "#1e293b", marginTop: 2 }}>{scheme.allocation}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* QUICK LINKS */}
        <div style={{ ...card, marginTop: 36 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#1e293b", margin: "0 0 18px" }}>Quick Links</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12 }}>
            {[
              [BarChart2, "Returns", "#eff6ff", "#2563eb"],
              [CheckSquare, "Tax Benefits", "#f0fdf4", "#16a34a"],
              [FileText, "Documents", "#fef9ec", "#d97706"],
              [Rocket, "Open Account", "#fdf2f8", "#9333ea"],
              [Building2, "Pension Funds", "#fff1f2", "#e11d48"],
              [CreditCard, "Contribute", "#f0f9ff", "#0284c7"],
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
            <h2 style={{ fontSize: 22, fontWeight: 800, color: "#1e293b", margin: "0 0 6px" }}>Why Invest in NPS?</h2>
            <p style={{ color: "#64748b", fontSize: 14, margin: 0 }}>Government-backed retirement solution with market-linked returns</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 18 }}>
            {[
              [Zap, "Tax Benefits", "Additional ₹50,000 tax saving under 80CCD(1B).", "#fefce8", "#ca8a04"],
              [TrendingDown, "Market Returns", "Higher returns than traditional retirement products.", "#eff6ff", "#2563eb"],
              [Lock, "Government Backed", "Safe and regulated by PFRDA.", "#f0fdf4", "#16a34a"],
              [Handshake, "Low Cost", "Lowest fund management charges among retirement products.", "#fdf4ff", "#9333ea"],
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
            ["What is NPS?", "NPS (National Pension System) is a government-backed retirement savings scheme that helps you build a retirement corpus through regular contributions. It offers market-linked returns with tax benefits."],
            ["How to Calculate NPS Corpus?", "NPS corpus is calculated using compound interest formula considering initial lump sum and monthly contributions. Use our calculator for instant, accurate results."],
            ["NPS Tax Benefits", "NPS offers triple tax benefits: Section 80CCD(1) deduction up to ₹1.5 lakh, additional ₹50,000 under 80CCD(1B), and 60% of maturity amount is tax-free."],
            ["NPS Withdrawal Rules", "At 60, you must use 40% for annuity (pension). 60% can be withdrawn tax-free. Early exit is allowed with conditions. You can defer withdrawal up to 70 years."],
            ["NPS vs PPF vs Mutual Funds", "NPS offers higher returns than PPF with some market risk, lower than pure equity funds, but with lowest charges and tax benefits unmatched by other products."],
            ["Who Should Invest in NPS?", "Salaried employees, self-employed professionals, and anyone looking for retirement planning with tax benefits should consider NPS as part of their portfolio."],
          ].map(([title, body]) => (
            <div key={title} style={{ ...card, padding: "22px 24px" }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: "#1e293b", margin: "0 0 10px", borderLeft: "3px solid #2563eb", paddingLeft: 10 }}>{title}</h3>
              <p style={{ fontSize: 13, color: "#475569", margin: 0, lineHeight: 1.7 }}>{body}</p>
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
            <h2 style={{ fontSize: 26, fontWeight: 800, color: "#fff", margin: "0 0 8px" }}>Start Planning Your Retirement Today</h2>
            <p style={{ color: "rgba(255,255,255,0.75)", margin: 0, fontSize: 15 }}>Tax benefits · Market-linked returns · Government backed · Low costs</p>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <button style={{
              background: "#fff", color: "#2563eb", border: "none", borderRadius: 12,
              padding: "14px 28px", fontSize: 15, fontWeight: 800, cursor: "pointer", letterSpacing: "0.2px"
            }}>Open NPS Account</button>
            <button style={{
              background: "rgba(255,255,255,0.15)", color: "#fff", border: "2px solid rgba(255,255,255,0.4)",
              borderRadius: 12, padding: "14px 28px", fontSize: 15, fontWeight: 700, cursor: "pointer"
            }}>Learn More →</button>
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