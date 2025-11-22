import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function DonorList() {
  const [donors, setDonors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchDonors();
  }, []);

  const fetchDonors = async () => {
    setIsLoading(true);
    try {
      const res = await api.get("/donors");
      setDonors(res.data);
    } catch (err) {
      console.error("Error fetching donors:", err);
      alert("Could not fetch donors");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const ok = window.confirm("Are you sure you want to delete this donor?");
    if (!ok) return;

    try {
      await api.delete(`/donors/${id}`);
      // update UI locally
      setDonors((prev) => prev.filter((d) => d.Donor_ID !== id));
      alert("Donor deleted");
    } catch (err) {
      console.error("Error deleting donor:", err);
      alert("Failed to delete donor");
    }
  };

  const handleEdit = (id) => {
    // use React Router navigate to keep SPA behavior
    navigate(`/system-admin/donors/edit/${id}`);
  };

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

  const filteredDonors = donors.filter(donor =>
    donor.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (donor.Blood_Group || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (donor.Contact_No || "").includes(searchTerm)
  );

  return (
    <div className="list-container">
      <div className="list-header">
        <div className="header-content">
          <div className="header-icon">👥</div>
          <h2 className="list-title">All Donors</h2>
          <p className="list-subtitle">Complete list of registered blood donors</p>
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
          <p>Loading donors...</p>
        </div>
      ) : filteredDonors.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📭</div>
          <p>{searchTerm ? "No donors found matching your search" : "No donors registered yet"}</p>
        </div>
      ) : (
        <div className="table-card">
          <div className="stats-bar">
            <div className="stat-item">
              <span className="stat-label">Total Donors</span>
              <span className="stat-value">{donors.length}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Showing</span>
              <span className="stat-value">{filteredDonors.length}</span>
            </div>
          </div>

          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Donor ID</th>
                  <th>Donor Name</th>
                  <th>Blood Group</th>
                  <th>Contact Number</th>
                  <th style={{ textAlign: "center" }}>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredDonors.map((d) => (
                  <tr key={d.Donor_ID}>
                    <td>
                      <div className="id-cell">
                        <span className="id-badge">{d.Donor_ID}</span>
                      </div>
                    </td>

                    <td>
                      <div className="donor-cell">
                        <span className="donor-icon">👤</span>
                        <a href={`/donor/${d.Donor_ID}`} className="donor-name-link">{d.Name}</a>
                      </div>
                    </td>

                    <td>
                      <span
                        className="blood-group-badge"
                        style={{ backgroundColor: getBloodGroupColor(d.Blood_Group) }}
                      >
                        {d.Blood_Group}
                      </span>
                    </td>

                    <td>
                      <div className="contact-cell">
                        <span className="contact-icon">📞</span>
                        <span className="contact-number">{d.Contact_No}</span>
                      </div>
                    </td>

                    <td style={{ width: "220px" }}>
                      <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                        <button
                          onClick={() => handleEdit(d.Donor_ID)}
                          className="btn btn-edit"
                          style={{
                            padding: "8px 12px",
                            background: "#3182ce",
                            color: "white",
                            borderRadius: "8px",
                            border: "none",
                            cursor: "pointer",
                            fontSize: "14px",
                            fontWeight: "600"
                          }}
                        >
                          ✏️ Edit
                        </button>

                        <button
                          onClick={() => handleDelete(d.Donor_ID)}
                          className="btn btn-delete"
                          style={{
                            padding: "8px 12px",
                            background: "#e53935",
                            color: "white",
                            borderRadius: "8px",
                            border: "none",
                            cursor: "pointer",
                            fontSize: "14px",
                            fontWeight: "600"
                          }}
                        >
                          🗑 Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="list-footer">
        <a href="/system-admin/dashboard" className="back-link">← Back to Dashboard</a>
      </div>

      <style>  {`    * {
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

          .id-cell {
  display: flex;
  align-items: center;
}

.id-badge {
  background: #2d3748;
  color: white;
  padding: 6px 14px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 14px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
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
          border-color: #5e72e4;
          box-shadow: 0 4px 20px rgba(94, 114, 228, 0.2);
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
          color: #5e72e4;
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
          background: linear-gradient(135deg, #5e72e4 0%, #825ee4 100%);
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
          background: #f0f4ff;
          transform: scale(1.01);
          box-shadow: 0 4px 12px rgba(94, 114, 228, 0.15);
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

        .donor-cell,
        .contact-cell {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .donor-icon,
        .contact-icon {
          font-size: 18px;
        }

        .donor-name {
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

        .list-footer {
          max-width: 1200px;
          margin: 30px auto 0;
          text-align: center;
        }

        .back-link {
          display: inline-block;
          color: #5e72e4;
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
          background: #5e72e4;
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

          .donor-cell,
          .contact-cell {
            font-size: 13px;
          }}
        `}</style>
      
      
    </div>
  );
}

export default DonorList;
