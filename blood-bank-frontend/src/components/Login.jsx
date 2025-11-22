import { useState } from "react";
import API_BASE from "../api";

export default function Login() {
  const [form, setForm] = useState({ Username: "", Password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API_BASE}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setMessage(data.message || data.error);
  };

  return (
    <>
      <h2>System Admin Login</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input name="Username" placeholder="Username" onChange={handleChange} />
        <input name="Password" type="password" placeholder="Password" onChange={handleChange} />
        <button type="submit">Login</button>
      </form>
      <p style={{ textAlign: "center", marginTop: "10px" }}>{message}</p>
    </>
  );
}
