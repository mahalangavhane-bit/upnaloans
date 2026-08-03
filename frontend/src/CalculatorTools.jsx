// CalculatorTools.jsx
import { useNavigate } from "react-router-dom";
import { Calculator, TrendingUp, PiggyBank, ChevronRight } from "lucide-react";

const toolsData = [
  {
    icon: Calculator,
    title: "Loan EMI Calculators",
    headClass: "tool-head-emi",
    items: [
      { name: "Personal Loan EMI Calculator", path: "/calculator/personal-loan" },
      { name: "Business Loan EMI Calculator", path: "/calculator/business-loan" },
      { name: "Home Loan EMI Calculator", path: "/calculator/home-loan" },
      { name: "Mudra Loan EMI Calculator", path: "/calculator/mudra-loan" },
    ],
  },
  {
    icon: TrendingUp,
    title: "Eligibility Calculators",
    headClass: "tool-head-elig",
    items: [
      { name: "Personal Loan Eligibility", path: "/calculator/personal-eligibility" },
      { name: "Home Loan Eligibility", path: "/calculator/home-eligibility" },
      { name: "Personal Loan Prepayment", path: "/calculator/personal-prepayment" },
      { name: "Home Loan Prepayment", path: "/calculator/home-prepayment" },
    ],
  },
  {
    icon: PiggyBank,
    title: "Investment Calculators",
    headClass: "tool-head-inv",
    items: [
      { name: "Fixed Deposit Calculator", path: "/calculator/fd" },
      { name: "Post Office FD Calculator", path: "/calculator/post-office-fd" },
      { name: "GST Calculator", path: "/calculator/gst" },
      { name: "NPS Calculator", path: "/calculator/nps" },
    ],
  },
];

export default function CalculatorTools() {
  const navigate = useNavigate();
  return (
    <section className="section tools-section">
      <div className="section-inner">
        <h2 className="section-title">Plan Smart with Our Calculators</h2>
        <p className="section-sub">Easy-to-use EMI, eligibility and investment calculators for smarter financial decisions.</p>
        <div className="tools-grid">
          {toolsData.map(t => {
            const Icon = t.icon;
            return (
              <div className="tool-card" key={t.title}>
                <div className={`tool-head ${t.headClass}`}>
                  <Icon size={20} strokeWidth={1.5} />
                  <h3>{t.title}</h3>
                </div>
                <div className="tool-body">
                  {t.items.map(item => (
                    <div
                      className="tool-item"
                      key={item.name}
                      onClick={() => navigate(item.path)}
                      style={{ cursor: "pointer" }}
                    >
                      {item.name}
                      <ChevronRight size={14} style={{ opacity: 0.4 }} />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}