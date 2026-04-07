// StatsBar.jsx
const stats = [
  { num: "2.4L+",      label: "Happy Customers" },
  { num: "50+",        label: "Lending Partners" },
  { num: "₹8,200 Cr+", label: "Loans Disbursed" },
  { num: "7.1%",       label: "Lowest Rate Offered" },
];

export default function StatsBar() {
  return (
    <div className="stats-bar">
      <div className="stats-inner">
        {stats.map(s => (
          <div className="stat-item" key={s.label}>
            <div className="stat-num">{s.num}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
