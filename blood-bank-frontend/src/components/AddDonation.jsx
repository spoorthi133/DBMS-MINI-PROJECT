import { useState } from "react";
import api from "../api";

function AddDonation() {
  const [form, setForm] = useState({
    Donor_ID: "",
    Camp_ID: "",
    Date: "",
    Units_Donated: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => 
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await api.post("/donations", form);
      alert("Donation added successfully!");
      setForm({
        Donor_ID: "",
        Camp_ID: "",
        Date: "",
        Units_Donated: ""
      });
    } catch (err) {
      console.error("Error adding donation:", err);
      alert("Error adding donation");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <div className="header-icon">🩸</div>
        <h2 className="form-title">Add New Donation</h2>
        <p className="form-subtitle">Record a blood donation from camp</p>
      </div>

      <div className="form-card">
        <form onSubmit={handleSubmit} className="donation-form">
          <div className="form-group">
            <label htmlFor="donorId">Donor ID *</label>
            <div className="input-wrapper">
              <span className="input-icon">🆔</span>
              <input
                id="donorId"
                name="Donor_ID"
                type="number"
                placeholder="Enter donor ID"
                value={form.Donor_ID}
                onChange={handleChange}
                required
              />
            </div>
            <span className="input-help">Enter the registered donor's ID number</span>
          </div>

          <div className="form-group">
            <label htmlFor="campId">Camp ID *</label>
            <div className="input-wrapper">
              <span className="input-icon">⛺</span>
              <input
                id="campId"
                name="Camp_ID"
                type="number"
                placeholder="Enter camp ID"
                value={form.Camp_ID}
                onChange={handleChange}
                required
              />
            </div>
            <span className="input-help">Enter the blood camp ID where donation occurred</span>
          </div>

          <div className="form-group">
            <label htmlFor="date">Donation Date *</label>
            <div className="input-wrapper">
              <span className="input-icon">📅</span>
              <input
                id="date"
                name="Date"
                type="date"
                value={form.Date}
                onChange={handleChange}
                max={new Date().toISOString().split('T')[0]}
                required
              />
            </div>
            <span className="input-help">Select the date of donation</span>
          </div>

          <div className="form-group">
            <label htmlFor="units">Units Donated *</label>
            <div className="input-wrapper">
              <span className="input-icon">💉</span>
              <input
  id="units"
  name="Units_Donated"
  type="number"
  placeholder="Enter units donated"
  value={form.Units_Donated}
  onChange={handleChange}
  min="1"
  max="5"        // change this or remove
  step="0.5"
  required
/>

            </div>
            <span className="input-help">Typically 1-2 units per donation</span>
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-btn" disabled={isLoading}>
              {isLoading ? (
                <span>⏳ Adding Donation...</span>
              ) : (
                <span>✓ Add Donation</span>
              )}
            </button>
          </div>
        </form>
      </div>

      <div className="form-footer">
        <a href="/camp-admin/dashboard" className="back-link">← Back to Dashboard</a>
      </div>

      

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .form-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #fef5f7 0%, #fde8ed 100%);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          padding: 40px 20px;
        }

        .form-header {
          max-width: 600px;
          margin: 0 auto 30px;
          text-align: center;
          animation: slideDown 0.6s ease-out;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .header-icon {
          font-size: 50px;
          margin-bottom: 15px;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        .form-title {
          font-size: 32px;
          font-weight: 700;
          color: #2d3748;
          margin-bottom: 8px;
        }

        .form-subtitle {
          font-size: 16px;
          color: #718096;
        }

        .form-card {
          max-width: 600px;
          margin: 0 auto;
          background: white;
          border-radius: 20px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
          padding: 40px;
          animation: fadeIn 0.6s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .donation-form {
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-group label {
          font-size: 14px;
          font-weight: 600;
          color: #2d3748;
          margin-left: 4px;
        }

        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-icon {
          position: absolute;
          left: 15px;
          font-size: 18px;
          pointer-events: none;
          z-index: 1;
        }

        .input-wrapper input {
          width: 100%;
          padding: 14px 14px 14px 48px;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          font-size: 15px;
          font-family: inherit;
          transition: all 0.3s ease;
          background: #f8f9fa;
          color: #2d3748;
        }

        .input-wrapper input:focus {
          outline: none;
          border-color: #e85d75;
          background: white;
          box-shadow: 0 0 0 4px rgba(232, 93, 117, 0.1);
          transform: translateY(-2px);
        }

        .input-wrapper input::placeholder {
          color: #a0aec0;
        }

        .input-help {
          font-size: 12px;
          color: #718096;
          margin-left: 4px;
          font-style: italic;
        }

        .form-actions {
          margin-top: 10px;
        }

        .submit-btn {
          width: 100%;
          padding: 16px;
          background: linear-gradient(135deg, #e85d75 0%, #d84567 100%);
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(232, 93, 117, 0.3);
        }

        .submit-btn:hover:not(:disabled) {
          transform: translateY(-3px);
          box-shadow: 0 6px 20px rgba(232, 93, 117, 0.4);
        }

        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .form-footer {
          max-width: 600px;
          margin: 30px auto 0;
          text-align: center;
        }

        .back-link {
          display: inline-block;
          color: #e85d75;
          text-decoration: none;
          font-size: 16px;
          font-weight: 600;
          padding: 12px 30px;
          background: white;
          border-radius: 12px;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
        }

        .back-link:hover {
          background: #e85d75;
          color: white;
          transform: translateX(-5px);
        }

        @media (max-width: 768px) {
          .form-card {
            padding: 30px 20px;
          }

          .form-title {
            font-size: 26px;
          }

          .header-icon {
            font-size: 40px;
          }
        }
      `}</style>
    </div>
  );
}

export default AddDonation;