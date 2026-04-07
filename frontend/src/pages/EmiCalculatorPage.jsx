// pages/EmiCalculatorPage.jsx
import EmiCalculator   from "../EmiCalculator";
import CalculatorTools from "../CalculatorTools";

export default function EmiCalculatorPage() {
  return (
    <div style={{ minHeight: "80vh" }}>
      {/* Page hero banner */}
      <div style={{
        background: "linear-gradient(135deg,#1a0800,#2d1200)",
        padding: "52px 32px",
        textAlign: "center"
      }}>
        <div style={{
          display: "inline-block", background: "rgba(249,115,22,.15)",
          color: "#fb923c", padding: "4px 12px", borderRadius: 6,
          fontSize: 12, fontWeight: 600, textTransform: "uppercase",
          letterSpacing: ".5px", marginBottom: 14,
          border: "1px solid rgba(249,115,22,.3)"
        }}>Free Tools</div>
        <h1 style={{
          fontFamily: "'Sora',sans-serif", fontSize: 36, fontWeight: 700,
          color: "white", marginBottom: 12
        }}>EMI &amp; Financial Calculators</h1>
        <p style={{ color: "rgba(255,255,255,.65)", fontSize: 15, maxWidth: 520, margin: "0 auto", lineHeight: 1.7 }}>
          Plan your loan repayment, check eligibility and make smarter financial decisions — all for free.
        </p>
      </div>

      <EmiCalculator />
      <CalculatorTools />
    </div>
  );
}
