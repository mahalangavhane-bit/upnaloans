// pages/Contact.jsx
import { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Clock,
  CheckCircle,
  Send,
} from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Home Loan",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handle = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setSubmitted(true);
        setForm({
          name: "",
          email: "",
          phone: "",
          subject: "Home Loan",
          message: "",
        });
      } else {
        alert(data.message || "Something went wrong");
      }
    } catch (error) {
      console.log(error);
      alert("Server error");
    }
  };

  const inputStyle = {
    width: "100%",
    height: 38,
    border: "1.5px solid #fed7aa",
    borderRadius: 8,
    padding: "0 12px",
    fontSize: 13.5,
    fontFamily: "'DM Sans',sans-serif",
    color: "#1c1108",
    background: "white",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color .2s",
  };

  const contacts = [
    {
      icon: <Phone size={17} />,
      label: "Call Us",
      value: "+91 9999 999 999",
    },
    {
      icon: <Mail size={17} />,
      label: "Email Us",
      value: "info@upnaloans.com",
    },
    {
      icon: <MapPin size={17} />,
      label: "Visit Us",
      value: "Mumbai, Maharashtra",
    },
    {
      icon: <MessageCircle size={17} />,
      label: "WhatsApp",
      value: "+91 9999 999 999",
    },
  ];

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "#fafaf8",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        className="page-container-h"
        style={{
          flexShrink: 0,
          background: "linear-gradient(135deg,#1a0800,#2d1200)",
          padding: "22px 32px 20px",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontFamily: "'Sora',sans-serif",
            fontSize: 26,
            fontWeight: 700,
            color: "white",
            margin: "0 0 6px",
          }}
        >
          Contact Us
        </h1>

        <p
          style={{
            color: "rgba(255,255,255,.65)",
            fontSize: 13,
            maxWidth: 480,
            margin: "0 auto",
            lineHeight: 1.5,
          }}
        >
          Have questions about a loan? Our advisors are ready to help you get
          the best deal.
        </p>
      </div>

      {/* Body */}
      <div
        className="contact-body page-container-h"
        style={{
          flex: 1,
          minHeight: 0,
          padding: "20px 32px",
          maxWidth: 1100,
          width: "100%",
          margin: "0 auto",
          boxSizing: "border-box",
        }}
      >
        <div
          className="contact-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.3fr",
            gap: 24,
            height: "100%",
          }}
        >
          {/* Left */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              minHeight: 0,
            }}
          >
            <h2
              style={{
                fontFamily: "'Sora',sans-serif",
                fontSize: 17,
                fontWeight: 700,
                color: "#1a0800",
                margin: "0 0 12px",
              }}
            >
              Reach Us Directly
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 10,
                marginBottom: 14,
              }}
            >
              {contacts.map((c) => (
                <div
                  key={c.label}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                    background: "white",
                    border: "1.5px solid #fed7aa",
                    borderRadius: 12,
                    padding: "12px 14px",
                    cursor: "pointer",
                    transition: "all .2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#f97316";
                    e.currentTarget.style.boxShadow =
                      "0 4px 16px rgba(249,115,22,.12)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#fed7aa";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: 9,
                      background: "#fff7ed",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#f97316",
                      flexShrink: 0,
                    }}
                  >
                    {c.icon}
                  </div>

                  <div>
                    <div style={{ fontSize: 11, color: "#78716c" }}>
                      {c.label}
                    </div>
                    <div
                      style={{
                        fontSize: 12.5,
                        fontWeight: 600,
                        color: "#1a0800",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {c.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Office hours */}
            <div
              style={{
                background: "linear-gradient(135deg,#fff7ed,#fefce8)",
                border: "1.5px solid #fed7aa",
                borderRadius: 12,
                padding: "14px 16px",
                flex: 1,
                minHeight: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <h4
                style={{
                  fontFamily: "'Sora',sans-serif",
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#1a0800",
                  margin: "0 0 10px",
                  display: "flex",
                  alignItems: "center",
                  gap: 7,
                }}
              >
                <Clock size={14} /> Office Hours
              </h4>

              {[
                ["Monday – Friday", "9:00 AM – 7:00 PM"],
                ["Saturday", "10:00 AM – 5:00 PM"],
                ["Sunday", "Closed"],
              ].map(([day, time]) => (
                <div
                  key={day}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 12,
                    marginBottom: 6,
                  }}
                >
                  <span style={{ color: "#78716c" }}>{day}</span>
                  <span style={{ fontWeight: 600, color: "#1a0800" }}>
                    {time}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right */}
          <div
            style={{
              background: "white",
              borderRadius: 18,
              padding: 24,
              border: "1.5px solid #fed7aa",
              boxShadow: "0 8px 32px rgba(249,115,22,.1)",
              display: "flex",
              flexDirection: "column",
              minHeight: 0,
              overflow: "hidden",
            }}
          >
            {submitted ? (
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                <CheckCircle
                  size={44}
                  color="#f97316"
                  style={{ marginBottom: 14 }}
                />

                <h3
                  style={{
                    fontFamily: "'Sora',sans-serif",
                    fontSize: 19,
                    fontWeight: 700,
                    color: "#1a0800",
                    margin: "0 0 8px",
                  }}
                >
                  Message Sent!
                </h3>

                <p
                  style={{
                    color: "#78716c",
                    lineHeight: 1.6,
                    fontSize: 13.5,
                    maxWidth: 320,
                  }}
                >
                  Thank you for reaching out. Our advisor will contact you
                  within 24 hours.
                </p>

                <button
                  onClick={() => setSubmitted(false)}
                  style={{
                    marginTop: 18,
                    background: "linear-gradient(135deg,#f97316,#eab308)",
                    color: "white",
                    border: "none",
                    borderRadius: 10,
                    padding: "10px 24px",
                    fontSize: 13.5,
                    fontWeight: 600,
                    cursor: "pointer",
                    fontFamily: "'DM Sans',sans-serif",
                  }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <>
                <h2
                  style={{
                    fontFamily: "'Sora',sans-serif",
                    fontSize: 17,
                    fontWeight: 700,
                    color: "#1a0800",
                    margin: "0 0 14px",
                  }}
                >
                  Send Us a Message
                </h2>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 12,
                    marginBottom: 12,
                  }}
                >
                  <div>
                    <label style={labelStyle}>Full Name *</label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handle}
                      placeholder="Rahul Kumar"
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>Phone *</label>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handle}
                      placeholder="+91 98765 43210"
                      style={inputStyle}
                    />
                  </div>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 12,
                    marginBottom: 12,
                  }}
                >
                  <div>
                    <label style={labelStyle}>Email Address</label>
                    <input
                      name="email"
                      value={form.email}
                      onChange={handle}
                      placeholder="rahul@example.com"
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>I need help with</label>
                    <select
                      name="subject"
                      value={form.subject}
                      onChange={handle}
                      style={inputStyle}
                    >
                      {[
                        "Home Loan",
                        "Personal Loan",
                        "Business Loan",
                        "Car Loan",
                        "EMI Calculator",
                        "Property Search",
                        "Other",
                      ].map((o) => (
                        <option key={o}>{o}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div
                  style={{
                    marginBottom: 14,
                    flex: 1,
                    minHeight: 0,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <label style={labelStyle}>Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handle}
                    placeholder="Tell us how we can help you..."
                    style={{
                      ...inputStyle,
                      flex: 1,
                      height: "auto",
                      minHeight: 48,
                      padding: "10px 12px",
                      resize: "none",
                    }}
                  />
                </div>

                <button
                  onClick={submit}
                  style={{
                    width: "100%",
                    height: 44,
                    background: "linear-gradient(135deg,#f97316,#eab308)",
                    color: "white",
                    border: "none",
                    borderRadius: 10,
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: "pointer",
                    fontFamily: "'DM Sans',sans-serif",
                    boxShadow: "0 4px 16px rgba(249,115,22,.35)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    flexShrink: 0,
                  }}
                >
                  Send Message <Send size={15} />
                </button>

                <p
                  style={{
                    textAlign: "center",
                    fontSize: 11,
                    color: "#78716c",
                    margin: "8px 0 0",
                    flexShrink: 0,
                  }}
                >
                  Your information is secure and will never be shared.
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Responsive */}
      <style>
        {`
          @media (max-width: 900px) {
            .contact-grid {
              grid-template-columns: 1fr !important;
              height: auto !important;
            }
          }

          @media (max-width: 900px) {
            div[style*="height: 100vh"] {
              height: auto !important;
              min-height: 100vh;
              overflow: visible !important;
            }
            .contact-body {
              overflow: visible !important;
            }
          }

          @media (max-width: 640px) {
            .contact-grid > div:first-child > div:nth-child(2) {
              grid-template-columns: 1fr !important;
            }
          }
        `}
      </style>
    </div>
  );
}

const labelStyle = {
  display: "block",
  fontSize: 11,
  fontWeight: 500,
  color: "#374151",
  marginBottom: 4,
};
