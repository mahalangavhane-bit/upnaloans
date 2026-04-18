import { useState, useEffect } from "react";
import { Zap, TrendingDown, Lock, Handshake, BarChart2, CheckSquare, FileText, Rocket, MapPin, Building2, DollarSign, TrendingUp, Calendar, Star, Clock, CreditCard } from "lucide-react";

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
  const [calculationType, setCalculationType] = useState("exclusive");
  const [openFaq, setOpenFaq] = useState(null);

  let gstAmount, totalAmount, baseAmount;

  if (calculationType === "exclusive") {
    gstAmount = originalAmount * gstRate / 100;
    totalAmount = originalAmount + gstAmount;
    baseAmount = originalAmount;
  } else {
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

      {/* HERO */}
      <div style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #1e293b 100%)",
        padding: "clamp(40px, 8vw, 80px) clamp(16px, 5vw, 80px)",
        position: "relative", overflow: "hidden"
      }}>
        <div style={{ position: "absolute", right: 80, top: 20, width: 260, height: 260, borderRadius: "50%", background: "rgba(59,130,246,0.08)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", right: 140, top: 60, width: 120, height: 120, borderRadius: "50%", background: "rgba(59,130,246,0.05)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
            <div style={{ background: "rgba(59,130,246,0.15)", borderRadius: 20, padding: "4px 12px" }}>
              <span style={{ color: "#93c5fd", fontSize: 12, fontWeight: 600 }}>FREE TOOL</span>
            </div>
            <div style={{ background: "rgba(34,197,94,0.15)", borderRadius: 20, padding: "4px 12px" }}>
              <span style={{ color: "#86efac", fontSize: 12, fontWeight: 600 }}>INSTANT CALC</span>
            </div>
          </div>
          <h1 style={{ fontSize: "clamp(32px, 6vw, 48px)", fontWeight: 800, color: "#fff", lineHeight: 1.2, margin: "0 0 14px", letterSpacing: "-0.5px" }}>
            GST Calculator
          </h1>
          <p style={{ color: "#94a3b8", fontSize: "clamp(14px, 4vw, 16px)", lineHeight: 1.7, maxWidth: 580, margin: "0 0 24px" }}>
            Calculate GST amounts instantly for goods and services. Support for exclusive and inclusive GST calculations with current tax rates.
          </p>
          <div style={{ display: "flex", gap: "clamp(16px, 4vw, 28px)", flexWrap: "wrap" }}>
            {[["28%", "Max GST Rate"], ["4 Slabs", "Tax Structure"], ["CGST+SGST", "Split"], ["Instant", "Results"]].map(([val, lbl]) => (
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
        <span style={{ fontSize: 12, color: "#94a3b8" }}>Tax Tools</span>
        <span style={{ fontSize: 12, color: "#cbd5e1", margin: "0 6px" }}>›</span>
        <span style={{ fontSize: 12, color: "#2563eb", fontWeight: 500 }}>GST Calculator</span>
      </div>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "clamp(32px, 6vw, 48px) clamp(16px, 5vw, 48px)" }}>

        {/* CALCULATOR SECTION */}
        <div style={{ display: "flex", gap: "clamp(24px, 4vw, 40px)", marginTop: 20, flexWrap: "wrap" }}>

          {/* LEFT: Inputs */}
          <div style={{ flex: "1 1 380px", ...card }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "#1e293b", margin: "0 0 24px" }}>GST Details</h2>
            
            <div style={{ marginBottom: 24 }}>
              <label style={{ fontSize: 13, color: "#64748b", fontWeight: 500, marginBottom: 8, display: "block" }}>Calculation Type</label>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <button
                  onClick={() => setCalculationType("exclusive")}
                  style={{
                    flex: 1, padding: "10px", border: "2px solid #e2e8f0", borderRadius: 8,
                    background: calculationType === "exclusive" ? "#2563eb" : "#fff",
                    color: calculationType === "exclusive" ? "#fff" : "#1e293b",
                    fontSize: 13, fontWeight: 600, cursor: "pointer", minWidth: 120
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
                    fontSize: 13, fontWeight: 600, cursor: "pointer", minWidth: 120
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
              prefix="₹" 
              formatFn={v => formatINR(v)} 
            />
            <SliderInput label="GST Rate" value={gstRate} min={0} max={28} step={1}
              onChange={setGstRate} suffix="%" />
            <div style={{ background: "#eff6ff", borderRadius: 12, padding: "14px 18px", marginTop: 8, border: "1px solid #bfdbfe", display: "flex", alignItems: "flex-start", gap: 8 }}>
              <Zap size={14} color="#3b82f6" style={{ marginTop: 2, flexShrink: 0 }} />
              <p style={{ margin: 0, fontSize: 12, color: "#3b82f6", lineHeight: 1.6 }}>
                <strong>Tip:</strong> Use exclusive GST for adding tax to base price, inclusive GST for finding tax from MRP.
              </p>
            </div>
          </div>

          {/* RIGHT: Results */}
          <div style={{ flex: "1 1 340px", display: "flex", flexDirection: "column", gap: 20 }}>

            {/* Total Highlight */}
            <div style={{ background: "linear-gradient(135deg,#1d4ed8,#2563eb)", borderRadius: 16, padding: "clamp(20px, 4vw, 28px)", color: "#fff" }}>
              <p style={{ margin: "0 0 4px", fontSize: 13, opacity: 0.8, fontWeight: 500 }}>Total Amount</p>
              <h1 style={{ margin: "0 0 20px", fontSize: "clamp(36px, 6vw, 44px)", fontWeight: 800, letterSpacing: "-1px" }}>
                ₹{formatINR(totalAmount)}
              </h1>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))", gap: 12 }}>
                {[
                  ["Base Amount", `₹${formatINR(baseAmount)}`],
                  ["GST Amount", `₹${formatINR(gstAmount)}`],
                  ["GST Rate", `${gstRate}%`]
                ].map(([l, v]) => (
                  <div key={l} style={{ background: "rgba(255,255,255,0.12)", borderRadius: 10, padding: "10px 12px" }}>
                    <div style={{ fontSize: 10, opacity: 0.75, marginBottom: 3 }}>{l}</div>
                    <div style={{ fontSize: 13, fontWeight: 700 }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Donut + Legend */}
            <div style={{ ...card, display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap", justifyContent: "center" }}>
              <DonutChart original={baseAmount} gst={gstAmount} />
              <div style={{ flex: 1, minWidth: 180 }}>
                <p style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600, color: "#1e293b" }}>Breakup</p>
                {[
                  ["Base Amount", baseAmount, "#2563eb"],
                  ["GST Amount", gstAmount, "#fb923c"],
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
                <div style={{ marginTop: 12, background: "#f8fafc", borderRadius: 8, padding: "10px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ fontSize: 11, color: "#64748b" }}>CGST</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: "#1e293b" }}>₹{formatINR(cgstAmount)}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 11, color: "#64748b" }}>SGST</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: "#1e293b" }}>₹{formatINR(sgstAmount)}</span>
                  </div>
                </div>
                <button style={{
                  width: "100%", marginTop: 12, background: "#2563eb", color: "#fff",
                  border: "none", borderRadius: 10, padding: "12px", fontSize: 14,
                  fontWeight: 700, cursor: "pointer", letterSpacing: "0.2px"
                }}>Download GST Report →</button>
              </div>
            </div>
          </div>
        </div>

        {/* GST RATES */}
        <div style={{ marginTop: 48 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
            <div>
              <h2 style={{ fontSize: "clamp(20px, 5vw, 22px)", fontWeight: 800, color: "#1e293b", margin: 0 }}>GST Tax Slabs</h2>
              <p style={{ color: "#64748b", fontSize: 14, margin: "4px 0 0" }}>Current GST rates for different goods & services.</p>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "clamp(16px, 3vw, 24px)" }}>
            {gstRates.map((rate, i) => (
              <div key={i} style={{
                ...card, padding: "22px 22px 20px", position: "relative",
                transition: "transform 0.2s, box-shadow 0.2s", cursor: "pointer"
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.12)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 2px 16px rgba(0,0,0,0.07)"; }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                  <div style={{ width: 42, height: 42, borderRadius: 10, background: rate.color, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ color: "#fff", fontWeight: 800, fontSize: 14 }}>{rate.rate}</span>
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15, color: "#1e293b" }}>{rate.name}</div>
                    <div style={{ fontSize: 11, color: "#94a3b8" }}>GST Category</div>
                  </div>
                </div>
                <div style={{ marginBottom: 8 }}>
                  <span style={{ fontSize: 12, color: "#64748b" }}>Category:</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#1e293b", marginLeft: 8 }}>{rate.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* QUICK LINKS */}
        <div style={{ ...card, marginTop: 48 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#1e293b", margin: "0 0 18px" }}>Quick Links</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12 }}>
            {[
              [BarChart2, "GST Rates", "#eff6ff", "#2563eb"],
              [CheckSquare, "GST Returns", "#f0fdf4", "#16a34a"],
              [FileText, "GST Registration", "#fef9ec", "#d97706"],
              [Rocket, "GST Filing", "#fdf2f8", "#9333ea"],
              [Building2, "HSN Codes", "#fff1f2", "#e11d48"],
              [CreditCard, "GST Payment", "#f0f9ff", "#0284c7"],
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
            <h2 style={{ fontSize: "clamp(20px, 5vw, 22px)", fontWeight: 800, color: "#1e293b", margin: "0 0 6px" }}>Why Use Our GST Calculator?</h2>
            <p style={{ color: "#64748b", fontSize: 14, margin: 0 }}>Accurate, fast, and compliant with latest tax rules</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "clamp(16px, 3vw, 24px)" }}>
            {[
              [Zap, "Instant Results", "Calculate GST in seconds with real-time updates.", "#fefce8", "#ca8a04"],
              [TrendingDown, "Accurate Rates", "Always updated with latest GST tax slabs and rules.", "#eff6ff", "#2563eb"],
              [Lock, "Free to Use", "No registration, no charges - completely free tool.", "#f0fdf4", "#16a34a"],
              [Handshake, "Both Methods", "Support for exclusive and inclusive GST calculations.", "#fdf4ff", "#9333ea"],
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
            ["What is GST?", "GST (Goods and Services Tax) is a comprehensive indirect tax levied on the supply of goods and services in India. It replaced multiple cascading taxes like VAT, excise duty, and service tax, creating a unified tax system."],
            ["How to Calculate GST?", "For exclusive GST: GST Amount = (Original Cost × GST Rate) / 100. For inclusive GST: Original Cost = Total Amount / (1 + GST Rate/100). Use our calculator for instant, error-free results."],
            ["What are GST Tax Slabs?", "GST has 4 main tax slabs: 5% (essential items), 12% (standard goods), 18% (services and luxury items), and 28% (premium goods). Some items like gold have special rates."],
            ["What is CGST and SGST?", "CGST (Central GST) and SGST (State GST) are equal halves of the total GST rate for intra-state transactions. CGST goes to central government, SGST to state government."],
            ["Who Should Use This Calculator?", "Business owners, accountants, freelancers, and individuals can use this calculator for invoice preparation, tax planning, and understanding GST liability before making purchases."],
            ["Is GST Calculator Free?", "Yes! Our GST calculator is completely free to use with no hidden charges or registration required. Use it unlimited times for all your GST calculation needs."],
          ].map(([title, body]) => (
            <div key={title} style={{ ...card, padding: "22px 24px" }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: "#1e293b", margin: "0 0 10px", borderLeft: "3px solid #2563eb", paddingLeft: 10 }}>{title}</h3>
              <p style={{ fontSize: 13, color: "#475569", margin: 0, lineHeight: 1.7 }}>{body}</p>
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
            <h2 style={{ fontSize: "clamp(20px, 5vw, 26px)", fontWeight: 800, color: "#fff", margin: "0 0 8px" }}>Need Help with GST Filing?</h2>
            <p style={{ color: "rgba(255,255,255,0.75)", margin: 0, fontSize: "clamp(13px, 4vw, 15px)" }}>Expert assistance · Hassle-free compliance · Get started today</p>
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button style={{
              background: "#fff", color: "#2563eb", border: "none", borderRadius: 12,
              padding: "14px 28px", fontSize: 15, fontWeight: 800, cursor: "pointer", letterSpacing: "0.2px"
            }}>Get Expert Help</button>
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