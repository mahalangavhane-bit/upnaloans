// HowItWorks.jsx
const steps = [
  { num: 1, title: "Check Eligibility",   desc: "Enter basic details and instantly see how much loan you qualify for — no documents needed." },
  { num: 2, title: "Compare Offers",      desc: "View personalised offers from 50+ lenders sorted by lowest EMI and best terms." },
  { num: 3, title: "Apply Online",        desc: "Submit your application digitally. Upload documents once and apply to multiple banks." },
  { num: 4, title: "Disbursal in 24 hrs", desc: "After approval, get funds directly in your bank account within 24 hours." },
];

export default function HowItWorks() {
  return (
    <section className="section process-section">
      <div className="section-inner">
        <div className="section-label">How It Works</div>
        <h2 className="section-title">Get Your Loan in 4 Simple Steps</h2>
        <p className="section-sub">From application to disbursal — the entire journey is online, transparent and fast.</p>
        <div className="steps-grid">
          {steps.map(s => (
            <div className="step-card" key={s.num}>
              <div className="step-num">{s.num}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
