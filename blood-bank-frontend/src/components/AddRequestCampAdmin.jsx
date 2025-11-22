import { useState } from "react";
import api from "../api";

function AddRequestCampAdmin() {
  const campID = localStorage.getItem("campID");

  const [form, setForm] = useState({
    Name: "",
    Gender: "",
    Age: "",
    Blood_Group: "",
    Contact_No: "",
    Address: "",
    Units_Requested: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    await api.post("/request-blood", {
      ...form,
      Camp_ID: campID
    });

    alert("Request sent successfully!");

    setForm({
      Name: "",
      Gender: "",
      Age: "",
      Blood_Group: "",
      Contact_No: "",
      Address: "",
      Units_Requested: ""
    });

  } catch (err) {
    console.error("Error submitting:", err);
    alert("Failed to submit request");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="req-container">
      <h2 className="req-title">Request Blood (Camp Admin)</h2>

      <form className="req-form" onSubmit={handleSubmit}>

        <label>Name
          <input name="Name" value={form.Name} onChange={handleChange} required />
        </label>

        <label>Gender
          <select name="Gender" value={form.Gender} onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </label>

        <label>Age
          <input type="number" name="Age" value={form.Age} onChange={handleChange} required />
        </label>

        <label>Blood Group
          <select name="Blood_Group" value={form.Blood_Group} onChange={handleChange} required>
            <option value="">Select Blood Group</option>
            <option>A+</option><option>A-</option>
            <option>B+</option><option>B-</option>
            <option>O+</option><option>O-</option>
            <option>AB+</option><option>AB-</option>
          </select>
        </label>

        <label>Contact Number
          <input name="Contact_No" value={form.Contact_No} onChange={handleChange} required />
        </label>

        <label>Address
          <textarea name="Address" value={form.Address} onChange={handleChange} required />
        </label>

        <label>Units Requested
          <input type="number" name="Units_Requested" value={form.Units_Requested} onChange={handleChange} required />
        </label>

        <button className="btn-req" disabled={loading}>
          {loading ? "Submitting..." : "Submit Request"}
        </button>
      </form>

      <style>{`
        .req-container { max-width: 600px; margin: 40px auto; padding: 30px; background:white; border-radius:15px; box-shadow:0 5px 20px rgba(0,0,0,0.1); }
        .req-title { font-size:28px; text-align:center; margin-bottom:25px; font-weight:700; }
        .req-form { display:grid; gap:18px; }
        label { font-weight:600; display:flex; flex-direction:column; gap:6px; }
        input, select, textarea { padding:12px; border:2px solid #ddd; border-radius:10px; }
        .btn-req { padding:14px; background:#d62839; color:white; border:none; border-radius:10px; font-size:16px; }
      `}</style>
    </div>
  );
}

export default AddRequestCampAdmin;
