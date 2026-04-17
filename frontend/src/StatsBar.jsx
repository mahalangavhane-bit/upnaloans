// StatsBar.jsx

const stats = [
  { num: "2.4L+",      label: "Happy Customers", color: "#16a34a" },
  { num: "50+",        label: "Lending Partners", color: "#2563eb" },
  { num: "₹8,200 Cr+", label: "Loans Disbursed", color: "#f97316" },
  { num: "7.1%",       label: "Lowest Rate Offered", color: "#8b5cf6" },
];

export default function StatsBar() {
  return (
    <div className="stats-bar" style={{ 
      background: "#fff", 
      borderBottom: "1px solid #f1f5f9",
      borderTop: "1px solid #f1f5f9",
      padding: "48px 0",
    }}>
      <div className="stats-inner" style={{
        maxWidth: "1280px",
        margin: "0 auto",
        padding: "0 32px",
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "32px",
        textAlign: "center",
      }}>
        {stats.map(s => {
          return (
            <div className="stat-item" key={s.label} style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
            }}>
              <div className="stat-num" style={{
                fontSize: "36px",
                fontWeight: "800",
                color: s.color,
                letterSpacing: "-0.5px",
                lineHeight: "1.2",
              }}>{s.num}</div>
              <div className="stat-label" style={{
                fontSize: "14px",
                color: "#64748b",
                fontWeight: "500",
              }}>{s.label}</div>
            </div>
          );
        })}
      </div>
      
      {/* Mobile Responsive Styles */}
      <style>{`
        @media (max-width: 768px) {
          .stats-inner {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 24px !important;
            padding: 0 16px !important;
          }
          .stat-num {
            font-size: 28px !important;
          }
          .stat-label {
            font-size: 12px !important;
          }
        }
      `}</style>
    </div>
  );
}