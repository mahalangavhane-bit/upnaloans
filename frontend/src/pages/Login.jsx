import { useState } from "react";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        setMessage("Login Successful!");
      } else {
        setMessage(data.message || "Invalid credentials");
      }
    } catch (err) {
      console.log(err);
      setMessage("Server error");
    }
  };

  const inputStyle = {
    width: "100%",
    height: 44,
    border: "1.5px solid #fed7aa",
    borderRadius: 8,
    padding: "0 14px",
    fontSize: 14,
    fontFamily: "'DM Sans', sans-serif",
    color: "#1c1108",
    background: "white",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color .2s",
  };

  return (
    <div style={{ minHeight: "80vh", padding: "60px 32px", maxWidth: 480, margin: "0 auto" }}>
      <h1 style={{ fontFamily: "'Sora', sans-serif", fontSize: 28, marginBottom: 24 }}>Login</h1>

      {message && (
        <div style={{ marginBottom: 16, color: message.includes("Successful") ? "green" : "red" }}>
          {message}
        </div>
      )}

      <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handle}
          style={inputStyle}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handle}
          style={inputStyle}
          required
        />
        <button
          type="submit"
          style={{
            height: 50,
            background: "linear-gradient(135deg,#f97316,#eab308)",
            color: "white",
            border: "none",
            borderRadius: 10,
            fontSize: 15,
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif",
            boxShadow: "0 4px 16px rgba(249,115,22,.35)",
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}