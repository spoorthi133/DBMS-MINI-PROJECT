import { useEffect, useState } from "react";
import api from "../api";

function DonationList() {
  const [donations, setDonations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api.get("/donations")
      .then((res) => {
        setDonations(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="list-container">
      <div className="list-header">
        <div className="header-content">
          <div className="header-icon">🩸</div>
          <h2 className="list-title">Donations List</h2>
          <p className="list-subtitle">Track all blood donation records</p>
        </div>
      </div>

      {isLoading ? (
        <div className="loading-state">
          <div className="spinner">⏳</div>
          <p>Loading donations...</p>
        </div>
      ) : donations.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📭</div>
          <p>No donations found</p>
        </div>
      ) : (
        <div className="table-card">
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Donation ID</th>
                  <th>Donor Name</th>
                  <th>Camp Name</th>
                  <th>Date</th>
                  <th>Units Donated</th>
                </tr>
              </thead>
              <tbody>
                {donations.map((d) => (
                  <tr key={d.Donation_ID}>
                    <td>
                      <span className="id-badge">#{d.Donation_ID}</span>
                    </td>
                    <td>
                      <div className="donor-cell">
                        <span className="donor-icon">👤</span>
                        {d.Donor_Name}
                      </div>
                    </td>
                    <td>
                      <div className="camp-cell">
                        <span className="camp-icon">⛺</span>
                        {d.Camp_Name}
                      </div>
                    </td>
                    <td>
                      <div className="date-cell">
                        📅 {new Date(d.Date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </div>
                    </td>
                    <td>
                      <span className="units-badge">{d.Units_Donated} units</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="list-footer">
        <a href="/camp-admin/dashboard" className="back-link">← Back to Dashboard</a>
      </div>

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .list-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #fef5f7 0%, #fde8ed 100%);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          padding: 40px 20px;
        }

        .list-header {
          max-width: 1200px;
          margin: 0 auto 40px;
        }

        .header-content {
          background: white;
          padding: 35px 40px;
          border-radius: 20px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
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
          background: linear-gradient(135deg, #e85d75 0%, #d84567 100%);
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
          background: #fff5f7;
          transform: scale(1.01);
          box-shadow: 0 4px 12px rgba(232, 93, 117, 0.15);
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

        .id-badge {
          display: inline-block;
          padding: 6px 14px;
          background: linear-gradient(135deg, #e85d75 0%, #d84567 100%);
          color: white;
          border-radius: 8px;
          font-weight: 600;
          font-size: 14px;
        }

        .donor-cell,
        .camp-cell,
        .date-cell {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .donor-icon,
        .camp-icon {
          font-size: 18px;
        }

        .units-badge {
          display: inline-block;
          padding: 6px 14px;
          background: #d4edda;
          color: #155724;
          border-radius: 8px;
          font-weight: 600;
          font-size: 14px;
        }

        .list-footer {
          max-width: 1200px;
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
          .header-content {
            padding: 25px 20px;
          }

          .list-title {
            font-size: 26px;
          }

          .header-icon {
            font-size: 40px;
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

          .donor-cell,
          .camp-cell,
          .date-cell {
            font-size: 13px;
          }
        }
      `}</style>
    </div>
  );
}

export default DonationList;