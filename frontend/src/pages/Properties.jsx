// pages/Properties.jsx
const listings = [
  { title: "2 BHK Flat in Andheri West",    price: "₹1.2 Cr",  location: "Andheri West, Mumbai",    type: "Residential", tag: "RERA Listed",   tagBg: "#e8f7ef", tagColor: "#16a34a", img: "🏢" },
  { title: "3 BHK Premium Apartment",       price: "₹2.8 Cr",  location: "Powai, Mumbai",            type: "Residential", tag: "Ready to Move", tagBg: "#fff7ed", tagColor: "#c2410c", img: "🏠" },
  { title: "Office Space in BKC",           price: "₹4.5 Cr",  location: "Bandra Kurla Complex",     type: "Commercial",  tag: "Under Const.",  tagBg: "#eff6ff", tagColor: "#2563eb", img: "🏗️" },
  { title: "2 BHK Flat in Thane West",      price: "₹78 L",    location: "Thane West, Thane",        type: "Residential", tag: "RERA Listed",   tagBg: "#e8f7ef", tagColor: "#16a34a", img: "🏘️" },
  { title: "Plot in Panvel",                price: "₹45 L",    location: "Panvel, Navi Mumbai",      type: "Plot",        tag: "Ready to Move", tagBg: "#fff7ed", tagColor: "#c2410c", img: "🌿" },
  { title: "1 BHK in Mira Road",            price: "₹52 L",    location: "Mira Road East, Mumbai",   type: "Residential", tag: "Under Const.",  tagBg: "#eff6ff", tagColor: "#2563eb", img: "🏠" },
];

const filters = ["All", "Residential", "Commercial", "Plot", "Industrial"];

export default function Properties() {
  return (
    <div style={{ padding: "60px 32px", minHeight: "80vh", background: "#fafaf8" }}>
      {/* Header */}
      <div style={{ marginBottom: 40 }}>
        <div style={{
          display: "inline-block", background: "#fefce8", color: "#92400e",
          padding: "4px 12px", borderRadius: 6, fontSize: 12, fontWeight: 600,
          textTransform: "uppercase", letterSpacing: ".5px", marginBottom: 12,
          border: "1px solid #fed7aa"
        }}>Browse Listings</div>
        <h1 style={{
          fontFamily: "'Sora', sans-serif", fontSize: 36, fontWeight: 700,
          color: "#1a0800", marginBottom: 10
        }}>Verified Properties in Mumbai</h1>
        <p style={{ fontSize: 15, color: "#78716c", maxWidth: 560, lineHeight: 1.7 }}>
          Explore RERA-registered residential, commercial and plot listings with instant home loan eligibility.
        </p>
      </div>

      {/* Filter tabs */}
      <div style={{ display: "flex", gap: 10, marginBottom: 36, flexWrap: "wrap" }}>
        {filters.map((f, i) => (
          <button key={f} style={{
            padding: "8px 20px", borderRadius: 20, border: "1.5px solid",
            borderColor: i === 0 ? "#f97316" : "#fed7aa",
            background: i === 0 ? "linear-gradient(135deg,#f97316,#eab308)" : "white",
            color: i === 0 ? "white" : "#78716c",
            fontSize: 13.5, fontWeight: 500, cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif"
          }}>{f}</button>
        ))}
      </div>

      {/* Grid */}
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: 24
      }}>
        {listings.map(l => (
          <div key={l.title} style={{
            background: "white", borderRadius: 16, border: "1.5px solid #fed7aa",
            overflow: "hidden", transition: "all .2s", cursor: "pointer",
            boxShadow: "0 2px 12px rgba(249,115,22,.06)"
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(249,115,22,.14)"; e.currentTarget.style.borderColor = "#f97316"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 2px 12px rgba(249,115,22,.06)"; e.currentTarget.style.borderColor = "#fed7aa"; }}
          >
            {/* Image placeholder */}
            <div style={{
              height: 160, background: "linear-gradient(135deg,#fff7ed,#fefce8)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 56, position: "relative"
            }}>
              {l.img}
              <span style={{
                position: "absolute", top: 12, left: 12,
                background: l.tagBg, color: l.tagColor,
                fontSize: 11, fontWeight: 700, padding: "3px 10px",
                borderRadius: 20, letterSpacing: ".3px"
              }}>{l.tag}</span>
              <span style={{
                position: "absolute", top: 12, right: 12,
                background: "rgba(0,0,0,.5)", color: "white",
                fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20
              }}>{l.type}</span>
            </div>
            {/* Info */}
            <div style={{ padding: "18px 20px" }}>
              <h3 style={{ fontFamily: "'Sora',sans-serif", fontSize: 15, fontWeight: 600, color: "#1a0800", marginBottom: 6 }}>{l.title}</h3>
              <p style={{ fontSize: 13, color: "#78716c", marginBottom: 14 }}>📍 {l.location}</p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: "'Sora',sans-serif", fontSize: 20, fontWeight: 700, color: "#f97316" }}>{l.price}</span>
                <button style={{
                  background: "linear-gradient(135deg,#f97316,#eab308)", color: "white",
                  border: "none", borderRadius: 8, padding: "8px 16px", fontSize: 13,
                  fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans',sans-serif"
                }}>View Details →</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
