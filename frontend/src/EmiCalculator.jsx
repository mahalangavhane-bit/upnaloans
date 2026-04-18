// EmiCalculator.jsx
import { useState } from "react";
import { IndianRupee, Percent, Calendar, TrendingUp, Calculator, CheckCircle } from "lucide-react";
import { fmtINR } from "./styles";

export default function EmiCalculator() {
  const [loanAmt, setLoanAmt] = useState(5000000);
  const [rate,    setRate]    = useState(8.5);
  const [tenure,  setTenure]  = useState(20);

  const r        = rate / 12 / 100;
  const n        = tenure * 12;
  const emi      = loanAmt * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
  const total    = emi * n;
  const interest = total - loanAmt;
  const pPct     = Math.round((loanAmt / total) * 100);

  const rangeStyle = (val, min, max) => {
    const pct = ((val - min) / (max - min)) * 100;
    return { background: `linear-gradient(to right, #f97316 ${pct}%, #fed7aa ${pct}%)` };
  };

  return (
    <section className="section calc-section" style={{ padding: "80px 0", background: "#f8fafc" }}>
      <div className="section-inner" style={{ 
        maxWidth: "1280px", 
        margin: "0 auto", 
        paddingLeft: "clamp(16px, 5vw, 80px)", 
        paddingRight: "clamp(16px, 5vw, 80px)" 
      }}>
        <div className="section-label" style={{ 
          display: "flex", 
          alignItems: "center", 
          gap: "8px", 
          fontSize: "13px", 
          fontWeight: "600",
          textTransform: "uppercase",
          letterSpacing: "1px",
          color: "#f97316",
          marginBottom: "16px"
        }}>
          <Calculator size={16} />
          Smart Tools
        </div>
        <h2 className="section-title" style={{ 
          fontSize: "clamp(28px, 5vw, 40px)", 
          fontWeight: "700",
          marginBottom: "12px",
          lineHeight: "1.2",
          color: "#0f172a",
          letterSpacing: "-0.5px"
        }}>EMI Calculator</h2>
        <p className="section-sub" style={{ 
          fontSize: "16px", 
          color: "#64748b", 
          marginBottom: "48px",
          maxWidth: "600px",
          lineHeight: "1.5"
        }}>Instantly calculate your monthly EMI, total interest and plan your loan repayment with ease.</p>

        <div className="calc-wrapper" style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", 
          gap: "clamp(24px, 4vw, 40px)",
          alignItems: "start"
        }}>
          {/* ── Input side ── */}
          <div className="calc-box" style={{ 
            background: "#ffffff", 
            borderRadius: "24px", 
            padding: "clamp(24px, 4vw, 32px)", 
            boxShadow: "0 20px 35px -10px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.02)",
            border: "1px solid #e2e8f0"
          }}>
            <div className="calc-field" style={{ marginBottom: "28px" }}>
              <div className="calc-field-label" style={{ 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "space-between",
                marginBottom: "12px",
                fontSize: "14px",
                fontWeight: "500",
                color: "#334155"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <IndianRupee size={14} />
                  Loan Amount
                </div>
                <span style={{ fontWeight: "700", color: "#f97316" }}>{fmtINR(loanAmt)}</span>
              </div>
              <input type="range" className="range-input"
                min={100000} max={10000000} step={50000}
                value={loanAmt} onChange={e => setLoanAmt(+e.target.value)}
                style={{
                  width: "100%",
                  height: "6px",
                  borderRadius: "10px",
                  WebkitAppearance: "none",
                  ...rangeStyle(loanAmt, 100000, 10000000)
                }} />
            </div>
            <div className="calc-field" style={{ marginBottom: "28px" }}>
              <div className="calc-field-label" style={{ 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "space-between",
                marginBottom: "12px",
                fontSize: "14px",
                fontWeight: "500",
                color: "#334155"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <Percent size={14} />
                  Interest Rate
                </div>
                <span style={{ fontWeight: "700", color: "#f97316" }}>{rate.toFixed(1)}%</span>
              </div>
              <input type="range" className="range-input"
                min={6} max={20} step={0.1}
                value={rate} onChange={e => setRate(+e.target.value)}
                style={{
                  width: "100%",
                  height: "6px",
                  borderRadius: "10px",
                  WebkitAppearance: "none",
                  ...rangeStyle(rate, 6, 20)
                }} />
            </div>
            <div className="calc-field" style={{ marginBottom: "32px" }}>
              <div className="calc-field-label" style={{ 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "space-between",
                marginBottom: "12px",
                fontSize: "14px",
                fontWeight: "500",
                color: "#334155"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <Calendar size={14} />
                  Loan Tenure
                </div>
                <span style={{ fontWeight: "700", color: "#f97316" }}>{tenure} Years</span>
              </div>
              <input type="range" className="range-input"
                min={1} max={30} step={1}
                value={tenure} onChange={e => setTenure(+e.target.value)}
                style={{
                  width: "100%",
                  height: "6px",
                  borderRadius: "10px",
                  WebkitAppearance: "none",
                  ...rangeStyle(tenure, 1, 30)
                }} />
            </div>
            <button className="btn-solid" style={{ 
              width: "100%", 
              height: 52,
              background: "#f97316",
              color: "#ffffff",
              border: "none",
              borderRadius: "14px",
              fontSize: "16px",
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              cursor: "pointer",
              transition: "all 0.2s ease"
            }}>
              <TrendingUp size={16} />
              Calculate EMI
            </button>
          </div>

          {/* ── Result side ── */}
          <div className="calc-result" style={{ 
            background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)", 
            borderRadius: "24px", 
            padding: "clamp(24px, 4vw, 32px)", 
            color: "#ffffff",
            boxShadow: "0 20px 35px -10px rgba(0,0,0,0.15)"
          }}>
            <div className="result-label" style={{ 
              fontSize: "13px", 
              textTransform: "uppercase", 
              letterSpacing: "1px",
              opacity: "0.7",
              marginBottom: "8px"
            }}>Monthly EMI</div>
            <div className="result-emi" style={{ 
              fontSize: "clamp(36px, 6vw, 52px)", 
              fontWeight: "800", 
              marginBottom: "24px",
              color: "#f97316",
              letterSpacing: "-1px"
            }}>₹{Math.round(emi).toLocaleString("en-IN")}</div>
            <div className="result-grid" style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(2, 1fr)", 
              gap: "16px",
              marginBottom: "28px"
            }}>
              {[
                ["Principal Amount", fmtINR(loanAmt), IndianRupee],
                ["Total Interest",   fmtINR(interest), Percent],
                ["Total Payment",    fmtINR(total), TrendingUp],
                ["Interest %",       (100 - pPct) + "%", null],
              ].map(([label, val, Icon]) => (
                <div className="result-item" key={label} style={{ 
                  borderBottom: "1px solid rgba(255,255,255,0.1)",
                  paddingBottom: "10px"
                }}>
                  <div className="result-item-label" style={{ 
                    display: "flex", 
                    alignItems: "center", 
                    gap: "6px",
                    fontSize: "11px",
                    opacity: "0.7",
                    marginBottom: "6px"
                  }}>
                    {Icon && <Icon size={12} />}
                    {label}
                  </div>
                  <div className="result-item-val" style={{ 
                    fontSize: "16px", 
                    fontWeight: "700" 
                  }}>{val}</div>
                </div>
              ))}
            </div>
            <div className="pie-bar" style={{ 
              display: "flex", 
              height: "8px", 
              borderRadius: "10px", 
              overflow: "hidden",
              marginBottom: "16px",
              background: "rgba(255,255,255,0.1)"
            }}>
              <div className="pie-principal" style={{ width: pPct + "%", background: "#f97316" }} />
              <div className="pie-interest" style={{ flex: 1, background: "rgba(255,255,255,0.2)" }} />
            </div>
            <div className="pie-legend" style={{ 
              display: "flex", 
              gap: "24px",
              marginBottom: "32px"
            }}>
              <div className="legend-item" style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px" }}>
                <div className="legend-dot" style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#f97316" }} />
                <span>Principal</span>
              </div>
              <div className="legend-item" style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px" }}>
                <div className="legend-dot" style={{ width: "10px", height: "10px", borderRadius: "50%", background: "rgba(255,255,255,0.3)" }} />
                <span>Interest</span>
              </div>
            </div>
            <button className="btn-apply-calc" style={{ 
              width: "100%",
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "#ffffff",
              padding: "14px",
              borderRadius: "14px",
              fontSize: "14px",
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              cursor: "pointer",
              transition: "all 0.2s ease"
            }}>
              <CheckCircle size={16} />
              Apply for This Loan →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}