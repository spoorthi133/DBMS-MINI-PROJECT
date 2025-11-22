import { useState } from "react";
import api from "../api";

function RecipientForm() {
  const [data, setData] = useState({
    Name: "",
    Gender: "",
    Age: "",
    Blood_Group: "",
    Contact_No: "",
    Address: "",
    Request_Date: "",
    Required_Units: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await api.post("/recipients", data);
      alert("Recipient added successfully!");
      setData({
        Name: "",
        Gender: "",
        Age: "",
        Blood_Group: "",
        Contact_No: "",
        Address: "",
        Request_Date: "",
        Required_Units: ""
      });
    } catch (err) {
      alert("Error adding recipient");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <div className="header-icon">🏥</div>
        <h2 className="form-title">Add New Recipient</h2>
        <p className="form-subtitle">Register a blood recipient request</p>
      </div>

      <div className="form-card">
        <form onSubmit={handleSubmit} className="recipient-form">
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <div className="input-wrapper">
                <span className="input-icon"></span>
                <input
                  id="name"
                  name="Name"
                  type="text"
                  placeholder="Enter full name"
                  value={data.Name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="gender">Gender *</label>
              <div className="input-wrapper">
                <span className="input-icon">⚥</span>
                <select
                  id="gender"
                  name="Gender"
                  value={data.Gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="age">Age *</label>
              <div className="input-wrapper">
                <span className="input-icon"></span>
                <input
                  id="age"
                  name="Age"
                  type="number"
                  placeholder="Enter age"
                  value={data.Age}
                  onChange={handleChange}
                  min="1"
                  max="120"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="bloodGroup">Blood Group Required *</label>
              <div className="input-wrapper">
                <span className="input-icon">🩸</span>
                <select
                  id="bloodGroup"
                  name="Blood_Group"
                  value={data.Blood_Group}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select blood group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="contact">Contact Number *</label>
              <div className="input-wrapper">
                <span className="input-icon">📞</span>
                <input
                  id="contact"
                  name="Contact_No"
                  type="tel"
                  placeholder="Enter contact number"
                  value={data.Contact_No}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="requestDate">Request Date *</label>
              <div className="input-wrapper">
                <span className="input-icon">📅</span>
                <input
                  id="requestDate"
                  name="Request_Date"
                  type="date"
                  value={data.Request_Date}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="units">Units Required *</label>
              <div className="input-wrapper">
                <span className="input-icon"></span>
                <input
                  id="units"
                  name="Required_Units"
                  type="number"
                  placeholder="Enter units needed"
                  value={data.Required_Units}
                  onChange={handleChange}
                  min="1"
                  max="10"
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-group full-width">
            <label htmlFor="address">Address *</label>
            <div className="input-wrapper">
              <span className="input-icon"></span>
              <textarea
                id="address"
                name="Address"
                placeholder="Enter full address"
                value={data.Address}
                onChange={handleChange}
                rows="3"
                required
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-btn" disabled={isLoading}>
              {isLoading ? (
                <span>⏳ Adding Recipient...</span>
              ) : (
                <span>✓ Add Recipient</span>
              )}
            </button>
          </div>
        </form>
      </div>

      <div className="form-footer">
        <a href="/system-admin/dashboard" className="back-link">← Back to Dashboard</a>
      </div>

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .form-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #f5f7fa 0%, #e8eef5 100%);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          padding: 40px 20px;
        }

        .form-header {
          max-width: 900px;
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
          max-width: 900px;
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

        .recipient-form {
          display: flex;
          flex-direction: column;
          gap: 25px;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 25px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-group.full-width {
          grid-column: 1 / -1;
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

        .input-wrapper input,
        .input-wrapper select,
        .input-wrapper textarea {
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

        .input-wrapper textarea {
          resize: vertical;
          min-height: 80px;
        }

        .input-wrapper input:focus,
        .input-wrapper select:focus,
        .input-wrapper textarea:focus {
          outline: none;
          border-color: #c53030;
          background: white;
          box-shadow: 0 0 0 4px rgba(197, 48, 48, 0.1);
          transform: translateY(-2px);
        }

        .input-wrapper select {
          cursor: pointer;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%232d3748' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 15px center;
          padding-right: 40px;
        }

        .input-wrapper input::placeholder,
        .input-wrapper textarea::placeholder {
          color: #a0aec0;
        }

        .form-actions {
          margin-top: 10px;
        }

        .submit-btn {
          width: 100%;
          padding: 16px;
          background: linear-gradient(135deg, #c53030 0%, #9b2c2c 100%);
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(197, 48, 48, 0.3);
        }

        .submit-btn:hover:not(:disabled) {
          transform: translateY(-3px);
          box-shadow: 0 6px 20px rgba(197, 48, 48, 0.4);
        }

        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .form-footer {
          max-width: 900px;
          margin: 30px auto 0;
          text-align: center;
        }

        .back-link {
          display: inline-block;
          color: #c53030;
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
          background: #c53030;
          color: white;
          transform: translateX(-5px);
        }

        @media (max-width: 768px) {
          .form-card {
            padding: 30px 20px;
          }

          .form-grid {
            grid-template-columns: 1fr;
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

export default RecipientForm;