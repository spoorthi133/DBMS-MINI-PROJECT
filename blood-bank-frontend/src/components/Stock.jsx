import { useEffect, useState } from "react";
import api from "../api";

function Stock() {
  const [stock, setStock] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api.get("/stock")
      .then((res) => {
        setStock(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
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

  return (
    <div className="stock-container">
      <div className="background-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>

      <div className="stock-content">
        <div className="stock-header">
          <div className="header-icon">📊</div>
          <h2 className="stock-title">Blood Stock Inventory</h2>
          <p className="stock-subtitle">Current availability of blood units</p>
        </div>

        {isLoading ? (
          <div className="loading-state">
            <div className="spinner">⏳</div>
            <p>Loading stock data...</p>
          </div>
        ) : stock.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <p>No stock data available</p>
          </div>
        ) : (
          <div className="table-wrapper">
            <table className="stock-table">
              <thead>
                <tr>
                  <th>Blood Group</th>
                  <th>Units Available</th>
                  <th>Expiry Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {stock.map((s) => {
                  const units = s.Units_Available;
                  const status = units > 50 ? 'High' : units > 20 ? 'Medium' : 'Low';
                  const statusClass = units > 50 ? 'status-high' : units > 20 ? 'status-medium' : 'status-low';
                  
                  return (
                    <tr key={s.Stock_ID} className="table-row">
                      <td>
                        <div className="blood-group-cell">
                          <span 
                            className="blood-group-badge" 
                            style={{ backgroundColor: getBloodGroupColor(s.Blood_Group) }}
                          >
                            {s.Blood_Group}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className="units-cell">
                          <span className="units-number">{units}</span>
                          <span className="units-label">units</span>
                        </div>
                      </td>
                      <td>
                        <div className="date-cell">
                          📅 {new Date(s.Expiry_Date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </div>
                      </td>
                      <td>
                        <span className={`status-badge ${statusClass}`}>
                          {status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        <div className="stock-footer">
          <a href="/" className="back-link">← Back to Home</a>
        </div>
      </div>

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .stock-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #f46878ff  0%, #ef2943ff 100%);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          padding: 40px 20px;
          position: relative;
          overflow-x: hidden;
        }

        .background-shapes {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: 0;
          top: 0;
          left: 0;
        }

        .shape {
          position: absolute;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          animation: float 20s infinite ease-in-out;
        }

        .shape-1 {
          width: 300px;
          height: 300px;
          top: -100px;
          left: -100px;
          animation-delay: 0s;
        }

        .shape-2 {
          width: 200px;
          height: 200px;
          bottom: -50px;
          right: -50px;
          animation-delay: 5s;
        }

        .shape-3 {
          width: 250px;
          height: 250px;
          top: 50%;
          right: -80px;
          animation-delay: 10s;
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(30px, -30px) rotate(90deg); }
          50% { transform: translate(-20px, 20px) rotate(180deg); }
          75% { transform: translate(20px, 30px) rotate(270deg); }
        }

        .stock-content {
          max-width: 1000px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .stock-header {
          text-align: center;
          margin-bottom: 40px;
          animation: slideDown 0.8s ease-out;
        }

        @keyframes slideDown {
          from { 
            opacity: 0; 
            transform: translateY(-30px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }

        .header-icon {
          font-size: 60px;
          margin-bottom: 15px;
          animation: bounce 2s infinite;
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .stock-title {
          font-size: 36px;
          font-weight: 700;
          color: white;
          margin-bottom: 10px;
          text-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        }

        .stock-subtitle {
          font-size: 16px;
          color: rgba(255, 255, 255, 0.9);
        }

        .loading-state,
        .empty-state {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          padding: 60px 40px;
          border-radius: 30px;
          text-align: center;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
          animation: slideUp 0.8s ease-out;
        }

        @keyframes slideUp {
          from { 
            opacity: 0; 
            transform: translateY(30px); 
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
          animation: spin 2s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .empty-icon {
          animation: pulse 2s infinite;
        }

        .loading-state p,
        .empty-state p {
          font-size: 18px;
          color: #6c757d;
        }

        .table-wrapper {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-radius: 30px;
          padding: 30px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
          overflow-x: auto;
          animation: slideUp 0.8s ease-out;
        }

        .stock-table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0 12px;
        }

        .stock-table thead tr {
          background: linear-gradient(135deg, #f46878ff 0%, #ef2943ff 100%);
          box-shadow: 0 4px 15px rgba(79, 172, 254, 0.3);
        }

        .stock-table thead th {
          padding: 18px 20px;
          text-align: left;
          font-size: 14px;
          font-weight: 600;
          color: white;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .stock-table thead th:first-child {
          border-radius: 15px 0 0 15px;
        }

        .stock-table thead th:last-child {
          border-radius: 0 15px 15px 0;
        }

        .stock-table tbody tr {
          background: white;
          transition: all 0.3s ease;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        .stock-table tbody tr:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 20px rgba(79, 172, 254, 0.3);
        }

        .stock-table tbody td {
          padding: 20px;
          font-size: 15px;
          color: #333;
        }

        .stock-table tbody tr td:first-child {
          border-radius: 15px 0 0 15px;
        }

        .stock-table tbody tr td:last-child {
          border-radius: 0 15px 15px 0;
        }

        .blood-group-cell {
          display: flex;
          align-items: center;
        }

        .blood-group-badge {
          display: inline-block;
          padding: 8px 20px;
          border-radius: 12px;
          color: white;
          font-weight: 700;
          font-size: 16px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
          min-width: 60px;
          text-align: center;
        }

        .units-cell {
          display: flex;
          align-items: baseline;
          gap: 6px;
        }

        .units-number {
          font-size: 22px;
          font-weight: 700;
          color: #333;
        }

        .units-label {
          font-size: 13px;
          color: #6c757d;
        }

        .date-cell {
          color: #6c757d;
          font-weight: 500;
        }

        .status-badge {
          display: inline-block;
          padding: 6px 16px;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .status-high {
          background: #d4edda;
          color: #155724;
        }

        .status-medium {
          background: #fff3cd;
          color: #856404;
        }

        .status-low {
          background: #f8d7da;
          color: #721c24;
        }

        .stock-footer {
          margin-top: 30px;
          text-align: center;
        }

        .back-link {
          display: inline-block;
          color: white;
          text-decoration: none;
          font-size: 16px;
          font-weight: 600;
          padding: 12px 30px;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          border-radius: 12px;
          transition: all 0.3s ease;
          border: 2px solid rgba(255, 255, 255, 0.3);
        }

        .back-link:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateX(-5px);
        }

        @media (max-width: 768px) {
          .stock-title {
            font-size: 28px;
          }

          .header-icon {
            font-size: 50px;
          }

          .table-wrapper {
            padding: 20px;
            border-radius: 20px;
          }

          .stock-table {
            font-size: 14px;
          }

          .stock-table thead th,
          .stock-table tbody td {
            padding: 12px 10px;
          }

          .blood-group-badge {
            padding: 6px 12px;
            font-size: 14px;
          }

          .units-number {
            font-size: 18px;
          }
        }
      `}</style>
    </div>
  );
}

export default Stock;