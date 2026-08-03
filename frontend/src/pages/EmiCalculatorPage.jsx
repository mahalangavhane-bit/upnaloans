// pages/EmiCalculatorPage.jsx
import EmiCalculator from "../EmiCalculator";
import CalculatorTools from "../CalculatorTools";

export default function EmiCalculatorPage() {
  return (
    <div style={{ minHeight: "80vh" }}>
      {/* Page hero banner */}
      <div
        className="page-container-h"
        style={{
          background: "linear-gradient(135deg,#1a0800,#2d1200)",
          padding: "64px 32px",
          textAlign: "center",
        }}
      >
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

      <div className="page-container-h" style={{
        maxWidth: "1200px",
        margin: "0 auto", 
        padding: "0 32px",
        display:"flex",
        justifyContent: "center" 
        }}>
          <div style={{width: "100%"}}>
            <EmiCalculator />
      </div>
      </div>
      <div className="page-container-h" style={{
        maxWidth: "1200px",
        margin: "40px auto 0" ,
        padding: "0 32px"
        }}>
        <CalculatorTools />
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          h1 {
            font-size: 32px !important;
          }
          p {
            font-size: 14px !important;
          }
        }
      `}</style>
    </div>
  );
}