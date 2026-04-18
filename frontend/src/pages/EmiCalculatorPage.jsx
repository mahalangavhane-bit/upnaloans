// pages/EmiCalculatorPage.jsx
import EmiCalculator from "../EmiCalculator";
import CalculatorTools from "../CalculatorTools";

export default function EmiCalculatorPage() {
  return (
    <div style={{ minHeight: "80vh" }}>
      {/* Page hero banner */}
      <div
        style={{
          background: "linear-gradient(135deg,#1a0800,#2d1200)",
          padding: "64px 80px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "inline-block",
            background: "rgba(249,115,22,.15)",
            color: "#fb923c",
            padding: "6px 14px",
            borderRadius: 40,
            fontSize: 13,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "1px",
            marginBottom: 20,
            border: "1px solid rgba(249,115,22,.3)",
          }}
        >
          Free Tools
        </div>
        <h1
          style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: 44,
            fontWeight: 800,
            color: "white",
            marginBottom: 16,
            letterSpacing: "-0.02em",
          }}
        >
          EMI &amp; Financial Calculators
        </h1>
        <p
          style={{
            color: "rgba(255,255,255,.7)",
            fontSize: 16,
            maxWidth: 580,
            margin: "0 auto",
            lineHeight: 1.6,
            fontWeight: 400,
          }}
        >
          Plan your loan repayment, check eligibility and make smarter financial
          decisions — all for free.
        </p>
      </div>

      <div style={{
        maxWidth: "1200px",
        margin: "0 auto", 
        padding: "0 16px" }}>
        <EmiCalculator />
      </div>
      <div style={{
        maxWidth: "1200px",
        margin: "40px auto 0" ,
        padding: "0 16px"
        }}>
        <CalculatorTools />
      </div>

      <style jsx>{`
        @media (max-width: 1024px) {
          div[style*="padding: 64px 80px"] {
            padding: 56px 40px !important;
          }
          div[style*="padding: 0 80px"] {
            padding-left: 40px !important;
            padding-right: 40px !important;
          }
        }
        @media (max-width: 768px) {
          div[style*="padding: 64px 80px"] {
            padding: 48px 20px !important;
          }
          div[style*="padding: 0 80px"] {
            padding-left: 20px !important;
            padding-right: 20px !important;
          }
          h1 {
            font-size: 32px !important;
          }
          p {
            font-size: 14px !important;
          }
        }
        @media (max-width: 480px) {
          div[style*="padding: 64px 80px"] {
            padding: 40px 16px !important;
          }
          div[style*="padding: 0 80px"] {
            padding-left: 16px !important;
            padding-right: 16px !important;
          }
        }
      `}</style>
    </div>
  );
}