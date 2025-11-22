function SystemAdminDashboard() {
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="header-content">
          <div className="admin-badge">
            <span className="badge-icon">🔐</span>
            <span className="badge-text">System Admin</span>
          </div>
          <h2 className="dashboard-title">Admin Dashboard</h2>
          <p className="dashboard-subtitle">Manage donors, recipients, and blood inventory</p>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="section-card">
          <div className="section-header">
            <span className="section-icon">👥</span>
            <h3 className="section-title">Donor Management</h3>
          </div>
          <div className="button-group">
            <a href="/donors" className="dashboard-link">
              <button className="dashboard-btn btn-view">
                <span className="btn-icon">📋</span>
                <span className="btn-text">View Donors</span>
              </button>
            </a>
            <a href="/add-donor" className="dashboard-link">
              <button className="dashboard-btn btn-add">
                <span className="btn-icon">➕</span>
                <span className="btn-text">Add Donor</span>
              </button>
            </a>
          </div>
        </div>

        <div className="section-card">
          <div className="section-header">
            <span className="section-icon">🏥</span>
            <h3 className="section-title">Recipient Management</h3>
          </div>
          <div className="button-group">
            <a href="/recipients" className="dashboard-link">
              <button className="dashboard-btn btn-view">
                <span className="btn-icon">📋</span>
                <span className="btn-text">View Recipients</span>
              </button>
            </a>
            <a href="/add-recipient" className="dashboard-link">
              <button className="dashboard-btn btn-add">
                <span className="btn-icon">➕</span>
                <span className="btn-text">Add Recipient</span>
              </button>
            </a>

            
          </div>
        </div>

        <div className="section-card">
          <div className="section-header">
            <span className="section-icon">🩸</span>
            <h3 className="section-title">Inventory Management</h3>
          </div>
          <div className="button-group">
            <a href="/stock" className="dashboard-link">
              <button className="dashboard-btn btn-stock">
                <span className="btn-icon">📊</span>
                <span className="btn-text">Blood Stock</span>
              </button>
            </a>
          </div>
        </div>
      </div>

      <div className="section-card">
  <div className="section-header">
    <span className="section-icon">🩸</span>
    <h3 className="section-title">Blood Requests</h3>
  </div>

  <div className="button-group">
    <a href="/system-admin/requests" className="dashboard-link">
      <button className="dashboard-btn btn-view">
        <span className="btn-icon">📨</span>
        <span className="btn-text">View Requests</span>
      </button>
    </a>
  </div>
</div>



      <div className="dashboard-footer">
        <a href="/" className="logout-link">← Logout</a>
      </div>

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .dashboard-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #f5f7fa 0%, #e8eef5 100%);
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
          background: linear-gradient(135deg, #5e72e4 0%, #825ee4 100%);
          color: white;
          padding: 10px 20px;
          border-radius: 25px;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 20px;
          box-shadow: 0 4px 12px rgba(94, 114, 228, 0.3);
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
    margin-top: 30px; /* adds space above */
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
        .section-card:nth-child(3) { animation-delay: 0.3s; }

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
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
        }

        .btn-add:hover {
          transform: translateX(5px);
          box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
        }

        .btn-stock {
          background: linear-gradient(135deg, #c53030 0%, #9b2c2c 100%);
          color: white;
        }

        .btn-stock:hover {
          transform: translateX(5px);
          box-shadow: 0 4px 15px rgba(197, 48, 48, 0.3);
        }

        .dashboard-footer {
          max-width: 1200px;
          margin: 40px auto 0;
          text-align: center;
        }

        .logout-link {
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

        .logout-link:hover {
          background: #5e72e4;
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
      `}</style>
    </div>
  );
}

export default SystemAdminDashboard;