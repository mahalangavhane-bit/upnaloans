import { useState, useRef, useEffect } from "react";

const gstRates = [
  { name: "Essential Goods", rate: "0%", category: "Unbranded Atta, Dal, Salt", color: "#16a34a" },
  { name: "Basic Necessities", rate: "3%", category: "Oil, Ghee, Coal", color: "#2563eb" },
  { name: "Standard Goods", rate: "5%", category: "Spices, Tea, Coffee", color: "#2563eb" },
  { name: "Capital Goods", rate: "12%", category: "Machinery, Equipment", color: "#2563eb" },
  { name: "Luxury Items", rate: "18%", category: "Electronics, AC, Fridge", color: "#2563eb" },
  { name: "Premium Services", rate: "28%", category: "Cars, Cinema, 5-Star Hotels", color: "#dc2626" },
];

const faqs = [
  { q: "What is GST?", a: "GST (Goods and Services Tax) is a comprehensive indirect tax on manufacture, sale and consumption of goods and services throughout India, replacing multiple indirect taxes." },
  { q: "How is GST calculated?", a: "GST is calculated as: GST Amount = Original Amount × GST Rate / 100. For inclusive GST: Original Amount = Total Amount / (1 + GST Rate/100)." },
  { q: "What are GST tax slabs?", a: "GST has 4 main tax slabs: 5% for essential items, 12% for standard goods, 18% for services and luxury items, and 28% for premium goods and sin goods." },
  { q: "What is the difference between CGST and SGST?", a: "CGST (Central GST) and SGST (State GST) are components of GST. Both are equal to half of the total GST rate. CGST goes to central government, SGST to state government." },
  { q: "Is UpnaLoan GST calculator accurate?", a: "Yes. Our calculator uses standard GST calculation formulas and current tax rates. Results are accurate for all GST calculations and tax planning." },
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

function DonutChart({ original, gst }) {
  const total = original + gst;
  const oPct = original / total;
  const gPct = gst / total;
  const r = 70, cx = 90, cy = 90, stroke = 22;
  const circ = 2 * Math.PI * r;
  const oDash = oPct * circ;
  const gDash = gPct * circ;
  return (
    <svg viewBox="0 0 180 180" style={{ width: 160, height: 160 }}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#e2e8f0" strokeWidth={stroke} />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#2563eb" strokeWidth={stroke}
        strokeDasharray={`${oDash} ${circ - oDash}`} strokeDashoffset={circ / 4} strokeLinecap="butt" />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#fb923c" strokeWidth={stroke}
        strokeDasharray={`${gDash} ${circ - gDash}`} strokeDashoffset={circ / 4 - oDash} strokeLinecap="butt" />
      <text x={cx} y={cy - 6} textAnchor="middle" fontSize="11" fill="#64748b">Original</text>
      <text x={cx} y={cy + 12} textAnchor="middle" fontSize="13" fontWeight="600" fill="#1e293b">{(oPct * 100).toFixed(0)}%</text>
    </svg>
  );
}

export default function GSTCalc() {
  const [originalAmount, setOriginalAmount] = useState(10000);
  const [gstRate, setGstRate] = useState(18);
  const [calculationType, setCalculationType] = useState("exclusive"); // exclusive or inclusive
  const [openFaq, setOpenFaq] = useState(null);

  // Calculate GST amounts
  let gstAmount, totalAmount, baseAmount;

  if (calculationType === "exclusive") {
    gstAmount = originalAmount * gstRate / 100;
    totalAmount = originalAmount + gstAmount;
    baseAmount = originalAmount;
  } else {
    // inclusive calculation
    baseAmount = originalAmount / (1 + gstRate / 100);
    gstAmount = originalAmount - baseAmount;
    totalAmount = originalAmount;
  }

  const cgstAmount = gstAmount / 2;
  const sgstAmount = gstAmount / 2;

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
              <span style={{ color: "#86efac", fontSize: 12, fontWeight: 600 }}>INSTANT CALC</span>
            </div>
          </div>
          <h1 style={{ fontSize: 38, fontWeight: 800, color: "#fff", lineHeight: 1.2, margin: "0 0 14px", letterSpacing: "-0.5px" }}>
            GST Calculator
          </h1>
          <p style={{ color: "#94a3b8", fontSize: 16, lineHeight: 1.7, maxWidth: 580, margin: "0 0 24px" }}>
            Calculate GST amounts instantly for goods and services. Support for exclusive and inclusive GST calculations with current tax rates.
          </p>
          <div style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
            {[["28%", "Max GST Rate"], ["4 Slabs", "Tax Structure"], ["CGST+SGST", "Split"], ["Instant", "Results"]].map(([val, lbl]) => (
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
        <span style={{ fontSize: 12, color: "#94a3b8" }}>Tax Tools</span>
        <span style={{ fontSize: 12, color: "#cbd5e1", margin: "0 6px" }}>·</span>
        <span style={{ fontSize: 12, color: "#2563eb", fontWeight: 500 }}>GST Calculator</span>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>

        {/* CALCULATOR SECTION */}
        <div style={{ display: "flex", gap: 28, marginTop: 36, flexWrap: "wrap" }}>

          {/* LEFT: Inputs */}
          <div style={{ flex: "1 1 380px", ...card }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "#1e293b", margin: "0 0 24px" }}>GST Details</h2>
            
            <div style={{ marginBottom: 24 }}>
              <label style={{ fontSize: 13, color: "#64748b", fontWeight: 500, marginBottom: 8, display: "block" }}>Calculation Type</label>
              <div style={{ display: "flex", gap: 12 }}>
                <button
                  onClick={() => setCalculationType("exclusive")}
                  style={{
                    flex: 1, padding: "10px", border: "2px solid #e2e8f0", borderRadius: 8,
                    background: calculationType === "exclusive" ? "#2563eb" : "#fff",
                    color: calculationType === "exclusive" ? "#fff" : "#1e293b",
                    fontSize: 13, fontWeight: 600, cursor: "pointer"
                  }}
                >
                  Exclusive GST
                </button>
                <button
                  onClick={() => setCalculationType("inclusive")}
                  style={{
                    flex: 1, padding: "10px", border: "2px solid #e2e8f0", borderRadius: 8,
                    background: calculationType === "inclusive" ? "#2563eb" : "#fff",
                    color: calculationType === "inclusive" ? "#fff" : "#1e293b",
                    fontSize: 13, fontWeight: 600, cursor: "pointer"
                  }}
                >
                  Inclusive GST
                </button>
              </div>
            </div>

            <SliderInput 
              label={calculationType === "exclusive" ? "Original Amount" : "Total Amount"} 
              value={originalAmount} 
              min={100} 
              max={1000000} 
              step={100}
              onChange={setOriginalAmount} 
              prefix="Rs." 
              formatFn={v => formatINR(v)} 
            />
            <SliderInput label="GST Rate" value={gstRate} min={0} max={28} step={1}
              onChange={setGstRate} suffix="%" />
          </div>

          {/* RIGHT: Results */}
          <div style={{ flex: "1 1 380px", ...card }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "#1e293b", margin: "0 0 24px" }}>GST Breakup</h2>
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <div style={{ fontSize: 14, color: "#64748b", marginBottom: 8 }}>Total Amount</div>
              <div style={{ fontSize: 36, fontWeight: 700, color: "#3b82f6", lineHeight: 1.2 }}>{formatINR(totalAmount)}</div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 32 }}>
              {[
                ["Base Amount", formatINR(baseAmount)],
                ["GST Amount", formatINR(gstAmount)],
                ["CGST", formatINR(cgstAmount)],
                ["SGST", formatINR(sgstAmount)]
              ].map(([label, val]) => (
                <div key={label} style={{ padding: 16, background: "#f8fafc", borderRadius: 8, border: "1px solid #e2e8f0" }}>
                  <div style={{ fontSize: 12, color: "#64748b", marginBottom: 4 }}>{label}</div>
                  <div style={{ fontSize: 18, fontWeight: 600, color: "#1e293b" }}>{val}</div>
                </div>
              ))}
            </div>

            {/* Donut Chart */}
            <div style={{ marginBottom: 32 }}>
              <DonutChart original={baseAmount} gst={gstAmount} />
              <div style={{ display: "flex", gap: 24, justifyContent: "center", marginTop: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 12, height: 12, background: "#3b82f6", borderRadius: 2 }} />
                  <span style={{ fontSize: 14, color: "#64748b" }}>Base Amount</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 12, height: 12, background: "#e2e8f0", borderRadius: 2 }} />
                  <span style={{ fontSize: 14, color: "#64748b" }}>GST</span>
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
              Download GST Report
            </button>
          </div>
        </div>

        {/* GST Rates */}
        <div style={{ marginTop: 48 }}>
          <h3 style={{ fontSize: 24, fontWeight: 700, color: "#1e293b", marginBottom: 24 }}>GST Tax Slabs</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            {gstRates.map((rate, index) => (
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
                <div style={{ fontSize: 18, fontWeight: 700, color: "#1e293b", marginBottom: 16 }}>{rate.name}</div>
                {[
                  ["GST Rate", rate.rate],
                  ["Category", rate.category]
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