// CtaBanner.jsx
import { ArrowRight, PhoneCall } from "lucide-react";

export default function CtaBanner() {
  return (
    <section className="cta-banner">
      <div className="cta-inner">
        <h2>Ready to Get the Best Loan Deal?</h2>
        <p>
          Join 2.4 lakh+ customers. Compare, apply and get approved — all in one place.
        </p>

        <div className="cta-btns">
          <button className="cta-primary">
            <ArrowRight size={16} />
            Check Eligibility Free
          </button>

          <button className="cta-secondary">
            <PhoneCall size={16} />
            Talk to an Advisor
          </button>
        </div>
      </div>

      <style>{`
        .cta-banner {
          width: 100%;
          display: flex;
          justify-content: center;
          margin-bottom: 80px;
        }

        .cta-inner {
          width: 100%;
          max-width: 1200px;
          padding: 60px 32px;
          border-radius: 16px;
          text-align: center;
          background: linear-gradient(135deg, #f97316, #eab308);
          color: white;
          box-shadow: 0 10px 40px rgba(249,115,22,0.3);
        }

        .cta-inner h2 {
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 12px;
        }

        .cta-inner p {
          font-size: 15px;
          opacity: 0.9;
          margin-bottom: 28px;
        }

        .cta-btns {
          display: flex;
          justify-content: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .cta-primary {
          display: flex;
          align-items: center;
          gap: 8px;
          background: white;
          color: #f97316;
          border: none;
          padding: 12px 22px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .cta-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.15);
        }

        .cta-secondary {
          display: flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          color: white;
          border: 1px solid rgba(255,255,255,0.6);
          padding: 12px 22px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .cta-secondary:hover {
          background: rgba(255,255,255,0.1);
        }

        /* Tablet */
        @media (max-width: 1024px) {
          .cta-inner {
            padding: 50px 24px;
          }
        }

        /* Mobile */
        @media (max-width: 768px) {
          .cta-banner {
            margin-bottom: 60px;
          }

          .cta-inner {
            padding: 40px 16px;
          }

          .cta-inner h2 {
            font-size: 22px;
          }

          .cta-inner p {
            font-size: 14px;
          }

          .cta-btns {
            flex-direction: column;
            gap: 12px;
          }

          .cta-primary,
          .cta-secondary {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}