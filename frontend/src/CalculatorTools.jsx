// CalculatorTools.jsx
const toolsData = [
  {
    icon: "🧮", title: "Loan EMI Calculators", headClass: "tool-head-emi",
    items: ["Personal Loan EMI Calculator", "Business Loan EMI Calculator", "Home Loan EMI Calculator", "Mudra Loan EMI Calculator"],
  },
  {
    icon: "📊", title: "Eligibility Calculators", headClass: "tool-head-elig",
    items: ["Personal Loan Eligibility", "Home Loan Eligibility", "Personal Loan Prepayment", "Home Loan Prepayment"],
  },
  {
    icon: "🪙", title: "Investment Calculators", headClass: "tool-head-inv",
    items: ["Fixed Deposit Calculator", "Post Office FD Calculator", "GST Calculator", "NPS Calculator"],
  },
];

export default function CalculatorTools() {
  return (
    <section className="section tools-section">
      <div className="section-inner">
        <div className="section-label">Financial Calculators</div>
        <h2 className="section-title">Plan Smart with Our Calculators</h2>
        <p className="section-sub">Easy-to-use EMI, eligibility and investment calculators for smarter financial decisions.</p>
        <div className="tools-grid">
          {toolsData.map(t => (
            <div className="tool-card" key={t.title}>
              <div className={`tool-head ${t.headClass}`}>
                <span style={{ fontSize: 20 }}>{t.icon}</span>
                <h3>{t.title}</h3>
              </div>
              <div className="tool-body">
                {t.items.map(item => (
                  <div className="tool-item" key={item}>
                    {item} <span style={{ opacity: .4 }}>›</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
