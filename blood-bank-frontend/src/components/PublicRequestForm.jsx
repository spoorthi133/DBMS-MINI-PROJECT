import { useState } from "react";
import api from "../api";
import "../styles/PublicRequestForm.css";

function PublicRequestForm() {
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
        Camp_ID: null
      });

      alert("Your blood request has been submitted successfully!");

      setForm({
        Name: "",
        Gender: "",
        Age: "",
        Blood_Group: "",
        Contact_No: "",
        Address: "",
        Units_Requested: ""
      });

    } catch (error) {
      console.error(error);
      alert("Failed to submit request.");
    }

    setLoading(false);
  };

  return (
    <div className="public-request-container">
      
      <h2 className="public-request-title">Request Blood</h2>
      <p className="public-request-subtitle">
        No login required — fill the form below.
      </p>

      <form className="public-request-form" onSubmit={handleSubmit}>
        
        <input
          type="text"
          name="Name"
          placeholder="Full Name"
          value={form.Name}
          onChange={handleChange}
          required
        />

        <select name="Gender" value={form.Gender} onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <input
          type="number"
          name="Age"
          placeholder="Age"
          value={form.Age}
          onChange={handleChange}
          required
        />

        <select name="Blood_Group" value={form.Blood_Group} onChange={handleChange} required>
          <option value="">Select Blood Group</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
        </select>

        <input
          type="text"
          name="Contact_No"
          placeholder="Contact Number"
          value={form.Contact_No}
          onChange={handleChange}
          required
        />

        <textarea
          name="Address"
          placeholder="Home Address"
          value={form.Address}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="Units_Requested"
          placeholder="Units Needed"
          value={form.Units_Requested}
          onChange={handleChange}
          required
        />

        <button className="public-request-btn" type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Request"}
        </button>
      </form>
    </div>
  );
}

export default PublicRequestForm;
