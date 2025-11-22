import { useEffect, useState } from "react";
import api from "../api";

function RecipientList() {
  const [recipients, setRecipients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    api.get("/recipients")
      .then((res) => {
        setRecipients(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching recipients:", err);
        setIsLoading(false);
      });
  }, []);

  const getBloodGroupColor = (bloodGroup) => {
    const colors = {
      'A+': '#667eea',
      'A-': '#764ba2',
      'B+': '#f093fb',
      'B-': '#f5576c',
      'AB+': '#4facfe',
      'AB-': '#00f2fe',
      'O+': '#e63946',
      'O-': '#f72585'
    };
    return colors[bloodGroup] || '#6c757d';
  };

  const getUrgencyLevel = (units) => {
    if (units >= 5) return { level: 'High', class: 'urgency-high' };
    if (units >= 3) return { level: 'Medium', class: 'urgency-medium' };
    return { level: 'Low', class: 'urgency-low' };
  };

  const filteredRecipients = recipients.filter(recipient =>
    recipient.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipient.Blood_Group.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipient.Contact_No.includes(searchTerm)
  );

  return (
    <div className="list-container">
      <div className="list-header">
        <div className="header-content">
          <div className="header-icon">🏥</div>
          <h2 className="list-title">Recipient List</h2>
          <p className="list-subtitle">Blood requirement requests and urgent needs</p>
        </div>

        <div className="search-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder="Search by name, blood group, or contact..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="loading-state">
          <div className="spinner">⏳</div>
          <p>Loading recipients...</p>
        </div>
      ) : filteredRecipients.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📭</div>
          <p>{searchTerm ? "No recipients found matching your search" : "No recipient requests yet"}</p>
        </div>
      ) : (
        <div className="table-card">
          <div className="stats-bar">
            <div className="stat-item">
              <span className="stat-label">Total Requests</span>
              <span className="stat-value">{recipients.length}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Showing</span>
              <span className="stat-value">{filteredRecipients.length}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Total Units Needed</span>
              <span className="stat-value">
                {filteredRecipients.reduce((sum, r) => sum + parseInt(r.Required_Units || 0), 0)}
              </span>
            </div>
          </div>



          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Recipient Name</th>
                  <th>Blood Group</th>
                  <th>Contact</th>
                  <th>Units Needed</th>
                  <th>Request Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredRecipients.map((r) => {
                  const urgency = getUrgencyLevel(r.Required_Units);
                  return (
                    <tr key={r.Recipient_ID}>
                      <td>
                        <div className="recipient-cell">
                          <span className="recipient-icon">👤</span>
                          <span className="recipient-name">{r.Name}</span>
                        </div>
                      </td>
                      <td>
                        <span 
                          className="blood-group-badge" 
                          style={{ backgroundColor: getBloodGroupColor(r.Blood_Group) }}
                        >
                          {r.Blood_Group}
                        </span>
                      </td>
                      <td>
                        <div className="contact-cell">
                          <span className="contact-icon">📞</span>
                          <span className="contact-number">{r.Contact_No}</span>
                        </div>
                      </td>
                      <td>
                        <div className="units-cell">
                          <span className="units-number">{r.Required_Units}</span>
                          <span className={`urgency-badge ${urgency.class}`}>
                            {urgency.level}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className="date-cell">
                          📅 {new Date(r.Request_Date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="list-footer">
        <a href="/system-admin/dashboard" className="back-link">← Back to Dashboard</a>
      </div>

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .list-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #f5f7fa 0%, #e8eef5 100%);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          padding: 40px 20px;
        }

        .list-header {
          max-width: 1200px;
          margin: 0 auto 30px;
        }

        .header-content {
          background: white;
          padding: 35px 40px;
          border-radius: 20px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
          text-align: center;
          margin-bottom: 20px;
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

        .list-title {
          font-size: 32px;
          font-weight: 700;
          color: #2d3748;
          margin-bottom: 8px;
        }

        .list-subtitle {
          font-size: 16px;
          color: #718096;
        }

        .search-wrapper {
          position: relative;
          animation: fadeIn 0.6s ease-out;
          animation-delay: 0.2s;
          animation-fill-mode: both;
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

        .search-icon {
          position: absolute;
          left: 18px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 20px;
          pointer-events: none;
          z-index: 1;
        }

        .search-input {
          width: 100%;
          padding: 16px 16px 16px 52px;
          border: 2px solid #e2e8f0;
          border-radius: 15px;
          font-size: 15px;
          transition: all 0.3s ease;
          background: white;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
        }

        .search-input:focus {
          outline: none;
          border-color: #c53030;
          box-shadow: 0 4px 20px rgba(197, 48, 48, 0.2);
        }

        .search-input::placeholder {
          color: #a0aec0;
        }

        .loading-state,
        .empty-state {
          max-width: 1200px;
          margin: 0 auto;
          background: white;
          padding: 60px 40px;
          border-radius: 20px;
          text-align: center;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
          animation: fadeIn 0.6s ease-out;
        }

        .spinner,
        .empty-icon {
          font-size: 50px;
          margin-bottom: 20px;
        }

        .spinner {
          animation: spin 2s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .loading-state p,
        .empty-state p {
          font-size: 18px;
          color: #718096;
        }

        .table-card {
          max-width: 1200px;
          margin: 0 auto;
          background: white;
          border-radius: 20px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
          overflow: hidden;
          animation: fadeIn 0.6s ease-out;
          animation-delay: 0.3s;
          animation-fill-mode: both;
        }

        .stats-bar {
          display: flex;
          justify-content: space-around;
          padding: 25px 30px;
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          border-bottom: 2px solid #e2e8f0;
        }

        .stat-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

        .stat-label {
          font-size: 13px;
          color: #718096;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .stat-value {
          font-size: 28px;
          font-weight: 700;
          color: #c53030;
        }

        .table-wrapper {
          overflow-x: auto;
          padding: 30px;
        }

        .data-table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0 10px;
        }

        .data-table thead tr {
          background: linear-gradient(135deg, #c53030 0%, #9b2c2c 100%);
        }

        .data-table thead th {
          padding: 16px 20px;
          text-align: left;
          font-size: 13px;
          font-weight: 600;
          color: white;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .data-table thead th:first-child {
          border-radius: 12px 0 0 12px;
        }

        .data-table thead th:last-child {
          border-radius: 0 12px 12px 0;
        }

        .data-table tbody tr {
          background: #f8f9fa;
          transition: all 0.3s ease;
        }

        .data-table tbody tr:hover {
          background: #fff5f5;
          transform: scale(1.01);
          box-shadow: 0 4px 12px rgba(197, 48, 48, 0.15);
        }

        .data-table tbody td {
          padding: 18px 20px;
          font-size: 15px;
          color: #2d3748;
        }

        .data-table tbody tr td:first-child {
          border-radius: 12px 0 0 12px;
        }

        .data-table tbody tr td:last-child {
          border-radius: 0 12px 12px 0;
        }

        .recipient-cell,
        .contact-cell {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .recipient-icon,
        .contact-icon {
          font-size: 18px;
        }

        .recipient-name {
          font-weight: 600;
          color: #2d3748;
        }

        .blood-group-badge {
          display: inline-block;
          padding: 8px 18px;
          border-radius: 10px;
          color: white;
          font-weight: 700;
          font-size: 15px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
          min-width: 55px;
          text-align: center;
        }

        .contact-number {
          color: #4a5568;
          font-weight: 500;
        }

        .units-cell {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .units-number {
          font-size: 22px;
          font-weight: 700;
          color: #c53030;
        }

        .urgency-badge {
          padding: 4px 12px;
          border-radius: 8px;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .urgency-high {
          background: #fed7d7;
          color: #c53030;
        }

        .urgency-medium {
          background: #feebc8;
          color: #c05621;
        }

        .urgency-low {
          background: #c6f6d5;
          color: #22543d;
        }

        .date-cell {
          color: #4a5568;
          font-weight: 500;
        }

        .list-footer {
          max-width: 1200px;
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
          .header-content {
            padding: 25px 20px;
          }

          .list-title {
            font-size: 26px;
          }

          .header-icon {
            font-size: 40px;
          }

          .stats-bar {
            flex-direction: column;
            gap: 20px;
            padding: 20px;
          }

          .table-wrapper {
            padding: 20px;
          }

          .data-table {
            font-size: 13px;
          }

          .data-table thead th,
          .data-table tbody td {
            padding: 12px 10px;
          }

          .units-cell {
            flex-direction: column;
            align-items: flex-start;
            gap: 6px;
          }
        }
      `}</style>
    </div>
  );
}

export default RecipientList;