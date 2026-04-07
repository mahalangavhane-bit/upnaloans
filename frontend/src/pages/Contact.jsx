// pages/Contact.jsx
import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "Home Loan", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const submit  = e => { e.preventDefault(); setSubmitted(true); };

  const inputStyle = {
    width: "100%", height: 44, border: "1.5px solid #fed7aa", borderRadius: 8,
    padding: "0 14px", fontSize: 14, fontFamily: "'DM Sans',sans-serif",
    color: "#1c1108", background: "white", outline: "none",
    boxSizing: "border-box", transition: "border-color .2s"
  };

  const contacts = [
    { icon: "📞", label: "Call Us",       value: "+91 9999 999 999", sub: "Mon–Sat, 9am–7pm" },
    { icon: "✉️", label: "Email Us",      value: "info@upnaloans.com", sub: "Reply within 24 hrs" },
    { icon: "📍", label: "Visit Us",      value: "Mumbai, Maharashtra", sub: "By appointment" },
    { icon: "💬", label: "WhatsApp",      value: "+91 9999 999 999", sub: "Chat anytime" },
  ];

  return (
    <div style={{ minHeight: "80vh", background: "#fafaf8" }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg,#1a0800,#2d1200)",
        padding: "52px 32px", textAlign: "center"
      }}>
        <div style={{
          display: "inline-block", background: "rgba(249,115,22,.15)", color: "#fb923c",
          padding: "4px 12px", borderRadius: 6, fontSize: 12, fontWeight: 600,
          textTransform: "uppercase", letterSpacing: ".5px", marginBottom: 14,
          border: "1px solid rgba(249,115,22,.3)"
        }}>Get In Touch</div>
        <h1 style={{ fontFamily: "'Sora',sans-serif", fontSize: 36, fontWeight: 700, color: "white", marginBottom: 12 }}>
          Contact Us
        </h1>
        <p style={{ color: "rgba(255,255,255,.65)", fontSize: 15, maxWidth: 480, margin: "0 auto", lineHeight: 1.7 }}>
          Have questions about a loan? Our advisors are ready to help you get the best deal.
        </p>
      </div>

      <div style={{ padding: "60px 32px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 48, alignItems: "start" }}>

          {/* Left — contact cards */}
          <div>
            <h2 style={{ fontFamily: "'Sora',sans-serif", fontSize: 22, fontWeight: 700, color: "#1a0800", marginBottom: 24 }}>
              Reach Us Directly
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 36 }}>
              {contacts.map(c => (
                <div key={c.label} style={{
                  display: "flex", alignItems: "center", gap: 16,
                  background: "white", border: "1.5px solid #fed7aa", borderRadius: 14,
                  padding: "18px 20px", cursor: "pointer", transition: "all .2s"
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "#f97316"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(249,115,22,.12)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "#fed7aa"; e.currentTarget.style.boxShadow = "none"; }}
                >
                  <div style={{
                    width: 48, height: 48, borderRadius: 12,
                    background: "#fff7ed", display: "flex", alignItems: "center",
                    justifyContent: "center", fontSize: 22, flexShrink: 0
                  }}>{c.icon}</div>
                  <div>
                    <div style={{ fontSize: 13, color: "#78716c", marginBottom: 2 }}>{c.label}</div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: "#1a0800" }}>{c.value}</div>
                    <div style={{ fontSize: 12, color: "#a78bfa" }}>{c.sub}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Office hours */}
            <div style={{ background: "linear-gradient(135deg,#fff7ed,#fefce8)", border: "1.5px solid #fed7aa", borderRadius: 14, padding: "22px 24px" }}>
              <h4 style={{ fontFamily: "'Sora',sans-serif", fontSize: 15, fontWeight: 700, color: "#1a0800", marginBottom: 14 }}>Office Hours</h4>
              {[["Monday – Friday", "9:00 AM – 7:00 PM"], ["Saturday", "10:00 AM – 5:00 PM"], ["Sunday", "Closed"]].map(([day, time]) => (
                <div key={day} style={{ display: "flex", justifyContent: "space-between", fontSize: 13.5, marginBottom: 8 }}>
                  <span style={{ color: "#78716c" }}>{day}</span>
                  <span style={{ fontWeight: 600, color: "#1a0800" }}>{time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div style={{ background: "white", borderRadius: 20, padding: 36, border: "1.5px solid #fed7aa", boxShadow: "0 8px 32px rgba(249,115,22,.1)" }}>
            {submitted ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <div style={{ fontSize: 56, marginBottom: 20 }}>✅</div>
                <h3 style={{ fontFamily: "'Sora',sans-serif", fontSize: 22, fontWeight: 700, color: "#1a0800", marginBottom: 12 }}>
                  Message Sent!
                </h3>
                <p style={{ color: "#78716c", lineHeight: 1.7 }}>
                  Thank you for reaching out. Our advisor will contact you within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  style={{
                    marginTop: 24, background: "linear-gradient(135deg,#f97316,#eab308)",
                    color: "white", border: "none", borderRadius: 10, padding: "12px 28px",
                    fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans',sans-serif"
                  }}
                >Send Another Message</button>
              </div>
            ) : (
              <>
                <h2 style={{ fontFamily: "'Sora',sans-serif", fontSize: 22, fontWeight: 700, color: "#1a0800", marginBottom: 24 }}>
                  Send Us a Message
                </h2>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
                  <div>
                    <label style={{ display: "block", fontSize: 12.5, fontWeight: 500, color: "#374151", marginBottom: 5 }}>Full Name *</label>
                    <input name="name" value={form.name} onChange={handle} placeholder="Rahul Kumar" style={inputStyle}
                      onFocus={e => e.target.style.borderColor = "#f97316"}
                      onBlur={e => e.target.style.borderColor = "#fed7aa"} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 12.5, fontWeight: 500, color: "#374151", marginBottom: 5 }}>Phone *</label>
                    <input name="phone" value={form.phone} onChange={handle} placeholder="+91 98765 43210" style={inputStyle}
                      onFocus={e => e.target.style.borderColor = "#f97316"}
                      onBlur={e => e.target.style.borderColor = "#fed7aa"} />
                  </div>
                </div>
                <div style={{ marginBottom: 14 }}>
                  <label style={{ display: "block", fontSize: 12.5, fontWeight: 500, color: "#374151", marginBottom: 5 }}>Email Address</label>
                  <input name="email" value={form.email} onChange={handle} placeholder="rahul@example.com" style={inputStyle}
                    onFocus={e => e.target.style.borderColor = "#f97316"}
                    onBlur={e => e.target.style.borderColor = "#fed7aa"} />
                </div>
                <div style={{ marginBottom: 14 }}>
                  <label style={{ display: "block", fontSize: 12.5, fontWeight: 500, color: "#374151", marginBottom: 5 }}>I need help with</label>
                  <select name="subject" value={form.subject} onChange={handle} style={inputStyle}
                    onFocus={e => e.target.style.borderColor = "#f97316"}
                    onBlur={e => e.target.style.borderColor = "#fed7aa"}>
                    {["Home Loan", "Personal Loan", "Business Loan", "Car Loan", "EMI Calculator", "Property Search", "Other"].map(o => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </div>
                <div style={{ marginBottom: 22 }}>
                  <label style={{ display: "block", fontSize: 12.5, fontWeight: 500, color: "#374151", marginBottom: 5 }}>Message</label>
                  <textarea
                    name="message" value={form.message} onChange={handle}
                    placeholder="Tell us how we can help you..."
                    rows={4}
                    style={{ ...inputStyle, height: "auto", padding: "12px 14px", resize: "vertical" }}
                    onFocus={e => e.target.style.borderColor = "#f97316"}
                    onBlur={e => e.target.style.borderColor = "#fed7aa"}
                  />
                </div>
                <button
                  onClick={submit}
                  style={{
                    width: "100%", height: 50,
                    background: "linear-gradient(135deg,#f97316,#eab308)",
                    color: "white", border: "none", borderRadius: 10,
                    fontSize: 15, fontWeight: 600, cursor: "pointer",
                    fontFamily: "'DM Sans',sans-serif",
                    boxShadow: "0 4px 16px rgba(249,115,22,.35)"
                  }}
                >Send Message →</button>
                <p style={{ textAlign: "center", fontSize: 12, color: "#78716c", marginTop: 12 }}>
                  🔒 Your information is secure and will never be shared.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
