import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";

function EditDonor() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    Name: "",
    Gender: "",
    Age: "",
    Blood_Group: "",
    Contact_No: "",
    Address: "",
    Last_Donation_Date: ""
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/donor/${id}/details`)
      .then((res) => {
        if (res.data && res.data.donor) {
          const donor = res.data.donor;

          donor.Last_Donation_Date = donor.Last_Donation_Date
            ? donor.Last_Donation_Date.split("T")[0]
            : "";

          setForm(donor);
        }
      })
      .catch((err) => {
        console.error("Fetch donor error:", err);
        alert("Error fetching donor");
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      Last_Donation_Date: form.Last_Donation_Date || null
    };

    try {
      await api.put(`/donors/${id}`, payload);
      alert("Donor updated successfully");
      navigate("/system-admin/donors");
    } catch (err) {
      console.error("Update error:", err);
      alert("Failed to update donor");
    }
  };

  if (loading) return <div style={{ padding: 20 }}>Loading...</div>;

  return (
    <div className="edit-container">

      <h2 className="edit-title">Edit Donor #{id}</h2>

      <form className="edit-form" onSubmit={handleSave}>
        
        <label>
          Name
          <input className="edit-input" name="Name" value={form.Name} onChange={handleChange} required />
        </label>

        <label>
          Gender
          <input className="edit-input" name="Gender" value={form.Gender} onChange={handleChange} required />
        </label>

        <label>
          Age
          <input className="edit-input" type="number" name="Age" value={form.Age} onChange={handleChange} required />
        </label>

        <label>
          Blood Group
          <input className="edit-input" name="Blood_Group" value={form.Blood_Group} onChange={handleChange} required />
        </label>

        <label>
          Contact No
          <input className="edit-input" name="Contact_No" value={form.Contact_No} onChange={handleChange} required />
        </label>

        <label>
          Address
          <textarea className="edit-textarea" name="Address" value={form.Address} onChange={handleChange} required />
        </label>

        <label>
          Last Donation Date
          <input
            className="edit-date"
            type="date"
            name="Last_Donation_Date"
            value={form.Last_Donation_Date || ""}
            onChange={handleChange}
          />
        </label>

        <div className="btn-row">
          <button type="submit" className="btn-save">Save</button>
          <button type="button" onClick={() => navigate(-1)} className="btn-cancel">Cancel</button>
        </div>

      </form>

      {/* STYLES */}
      <style>{`
  .edit-container {
    max-width: 650px;
    margin: 40px auto;
    background: #ffffff;
    padding: 35px 40px;
    border-radius: 18px;
    box-shadow: 0 6px 20px rgba(0,0,0,0.08);
    font-family: 'Segoe UI', sans-serif;
  }

  .edit-title {
    font-size: 28px;
    font-weight: 700;
    color: #2d3748;
    margin-bottom: 20px;
    text-align: center;
  }

  .edit-form {
    display: grid;
    gap: 18px;
  }

  .edit-form label {
    font-weight: 600;
    color: #4a5568;
    display: flex;
    flex-direction: column;
    gap: 6px;
    font-size: 14px;
  }

  .edit-input,
  .edit-textarea,
  .edit-date {
    padding: 12px 14px;
    border: 2px solid #e2e8f0;
    border-radius: 10px;
    font-size: 15px;
    transition: 0.2s ease;
    background: #ffffff;
  }

  .edit-input:focus,
  .edit-textarea:focus,
  .edit-date:focus {
    outline: none;
    border-color: #3182ce;
    box-shadow: 0 0 0 3px rgba(49,130,206,0.25);
  }

  .edit-textarea {
    resize: vertical;
    min-height: 80px;
  }

  .btn-row {
    margin-top: 10px;
    display: flex;
    gap: 12px;
  }

  .btn-save {
    padding: 12px 20px;
    background: #3182ce;
    color: white;
    border: none;
    border-radius: 10px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: 0.2s ease;
  }

  .btn-save:hover {
    background: #2563eb;
    transform: translateY(-2px);
  }

  .btn-cancel {
    padding: 12px 20px;
    background: #e2e8f0;
    color: #2d3748;
    border: none;
    border-radius: 10px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: 0.2s ease;
  }

  .btn-cancel:hover {
    background: #cbd5e1;
    transform: translateY(-2px);
  }
      `}</style>

    </div>
  );
}

export default EditDonor;
