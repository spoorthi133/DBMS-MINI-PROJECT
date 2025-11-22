import { useEffect, useState } from "react";
import api from "../api";

function CampDashboard() {

  const campID = localStorage.getItem("campID");

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/camp/${campID}/stats`)
      .then((res) => {
        setStats(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching stats:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="dashboard-container">

      {/* HEADER */}
      <div className="dashboard-header">
        <div className="header-content">
          <div className="admin-badge">
            <span className="badge-icon">⛺</span>
            <span className="badge-text">Camp Admin</span>
          </div>
          <h2 className="dashboard-title">Camp Dashboard</h2>
          <p className="dashboard-subtitle">Manage blood donation campaigns and drives</p>
        </div>
      </div>

      {/* NEW: STATS SECTION */}
      {loading ? (
        <p className="loading-stats">Loading statistics...</p>
      ) : (
        <div className="stats-grid">
          <div className="stat-card">
            <h4>Total Donations</h4>
            <p>{stats.total_donations}</p>
          </div>

          <div className="stat-card">
            <h4>Total Units Collected</h4>
            <p>{stats.total_units}</p>
          </div>

          <div className="stat-card">
            <h4>Today's Donations</h4>
            <p>{stats.today}</p>
          </div>

          <div className="stat-card">
            <h4>This Month</h4>
            <p>{stats.this_month}</p>
          </div>
        </div>
      )}

      {/* EXISTING CONTENT */}
      <div className="dashboard-content">
        <div className="section-card">
          <div className="section-header">
            <span className="section-icon">🩸</span>
            <h3 className="section-title">Donation Management</h3>
          </div>

          <div className="button-group">
            <a href="/donations" className="dashboard-link">
              <button className="dashboard-btn btn-view">
                <span className="btn-icon">📋</span>
                <span className="btn-text">View Donations</span>
              </button>
            </a>

            <a href="/add-donation" className="dashboard-link">
              <button className="dashboard-btn btn-add">
                <span className="btn-icon">➕</span>
                <span className="btn-text">Add Donation</span>
              </button>
            </a>
          </div>
        </div>

        <div className="section-card">
          <div className="section-header">
            <span className="section-icon">👥</span>
            <h3 className="section-title">Donor Information</h3>
          </div>
          <div className="section-card">
  <div className="section-header">
    <span className="section-icon">🩸</span>
    <h3 className="section-title">Blood Requests</h3>
  </div>

  <div className="button-group">
    <a href="/camp-admin/requests" className="dashboard-link">
  <button className="dashboard-btn btn-view">View Requests</button>
</a>

<a href="/camp-admin/request-blood" className="dashboard-link">
  <button className="dashboard-btn btn-add">Request Blood</button>
</a>

  </div>
</div>


          <div className="button-group">
            <a href="/donors" className="dashboard-link">
              <button className="dashboard-btn btn-donors">
                <span className="btn-icon">📖</span>
                <span className="btn-text">View Donors</span>
              </button>
            </a>
          </div>
        </div>
      </div>

      <div className="dashboard-footer">
        <a href="/" className="logout-link">← Logout</a>
      </div>

      {/* ADDITIONAL CSS (no conflicts) */}
      <style>{`

            * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .dashboard-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #fef5f7 0%, #fde8ed 100%);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          padding: 40px 20px;
        }

        .dashboard-header {
          max-width: 1200px;
          margin: 0 auto 40px;
          text-align: center;
        }

        .header-content {
          background: white;
          padding: 35px 40px;
          border-radius: 20px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
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

        .admin-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, #e85d75 0%, #d84567 100%);
          color: white;
          padding: 10px 20px;
          border-radius: 25px;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 20px;
          box-shadow: 0 4px 12px rgba(232, 93, 117, 0.3);
        }

        .badge-icon {
          font-size: 18px;
        }

        .dashboard-title {
          font-size: 32px;
          font-weight: 700;
          color: #2d3748;
          margin-bottom: 10px;
        }

        .dashboard-subtitle {
          font-size: 16px;
          color: #718096;
        }

        .dashboard-content {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 25px;
        }

        .section-card {
          background: white;
          padding: 30px;
          border-radius: 20px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
          animation: fadeIn 0.6s ease-out;
          animation-fill-mode: both;
        }

        .section-card:nth-child(1) { animation-delay: 0.1s; }
        .section-card:nth-child(2) { animation-delay: 0.2s; }

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

        .section-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
        }

        .section-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 25px;
          padding-bottom: 20px;
          border-bottom: 2px solid #f7fafc;
        }

        .section-icon {
          font-size: 32px;
        }

        .section-title {
          font-size: 20px;
          font-weight: 600;
          color: #2d3748;
        }

        .button-group {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .dashboard-link {
          text-decoration: none;
        }

        .dashboard-btn {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px 20px;
          border: none;
          border-radius: 12px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        }

        .btn-icon {
          font-size: 20px;
        }

        .btn-text {
          flex: 1;
          text-align: left;
        }

        .btn-view {
          background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%);
          color: white;
        }

        .btn-view:hover {
          transform: translateX(5px);
          box-shadow: 0 4px 15px rgba(107, 114, 128, 0.3);
        }

        .btn-add {
          background: linear-gradient(135deg, #e85d75 0%, #d84567 100%);
          color: white;
        }

        .btn-add:hover {
          transform: translateX(5px);
          box-shadow: 0 4px 15px rgba(232, 93, 117, 0.3);
        }

        .btn-donors {
          background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
          color: white;
        }

        .btn-donors:hover {
          transform: translateX(5px);
          box-shadow: 0 4px 15px rgba(139, 92, 246, 0.3);
        }

        .dashboard-footer {
          max-width: 1200px;
          margin: 40px auto 0;
          text-align: center;
        }

        .logout-link {
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

        .logout-link:hover {
          background: #e85d75;
          color: white;
          transform: translateX(-5px);
        }

        @media (max-width: 768px) {
          .dashboard-content {
            grid-template-columns: 1fr;
          }

          .header-content {
            padding: 25px 20px;
          }

          .dashboard-title {
            font-size: 26px;
          }

          .section-card {
            padding: 25px;
          }
        }
        .stats-grid {
          max-width: 1200px;
          margin: 0 auto 40px;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 20px;
          animation: fadeIn 0.6s ease-out;
        }

        .stat-card {
          background: white;
          padding: 25px;
          border-radius: 20px;
          text-align: center;
          box-shadow: 0 4px 15px rgba(0,0,0,0.08);
          transition: all 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.12);
        }

        .stat-card h4 {
          font-size: 16px;
          color: #555;
          margin-bottom: 10px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .stat-card p {
          font-size: 30px;
          font-weight: 700;
          color: #e85d75;
        }

        .loading-stats {
          text-align: center;
          font-size: 18px;
          color: #444;
          margin-bottom: 20px;
        }
      `}</style>

    </div>
  );
}

export default CampDashboard;
