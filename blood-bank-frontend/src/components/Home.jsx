import React from 'react';
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-container">
      <div className="background-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>

      <div className="home-card">
        <div className="icon-wrapper">
          <svg className="blood-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C12 2 6 8 6 13C6 16.31 8.69 19 12 19C15.31 19 18 16.31 18 13C18 8 12 2 12 2Z" />
          </svg>
        </div>
        
        <h1 className="title">Blood Bank Management</h1>
        <p className="subtitle">Saving lives through efficient blood donation</p>

        <div className="button-group">
          <a href="/system-admin/login" className="card-link">
            <div className="action-card admin-card">
              <div className="card-icon">🔐</div>
              <h3>System Admin</h3>
              <p>Manage entire system</p>
            </div>
          </a>

          <a href="/camp-admin/login" className="card-link">
            <div className="action-card camp-card">
              <div className="card-icon">⛺</div>
              <h3>Camp Admin</h3>
              <p>Organize blood drives</p>
            </div>
          </a>

          <a href="/stock" className="card-link">
            <div className="action-card stock-card">
              <div className="card-icon">📊</div>
              <h3>Blood Stock</h3>
              <p>View availability</p>
            </div>
          </a>

          <Link to="/request-blood" className="card-link">
            <div className="action-card request-card">
              <div className="card-icon">🆘</div>
              <h3>Request Blood</h3>
              <p>Emergency blood request</p>
            </div>
          </Link>
        </div>
      </div>

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .home-container {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          padding: 20px;
          position: relative;
          overflow: hidden;
        }

        .background-shapes {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: 0;
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

        .home-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          width: 100%;
          max-width: 500px;
          padding: 50px 40px;
          border-radius: 30px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          text-align: center;
          animation: slideUp 0.8s ease-out;
          position: relative;
          z-index: 1;
        }

        @keyframes slideUp {
          from { 
            opacity: 0; 
            transform: translateY(50px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }

        .icon-wrapper {
          margin-bottom: 25px;
        }

        .blood-icon {
          width: 70px;
          height: 70px;
          color: #e63946;
          animation: pulse 2s infinite;
          filter: drop-shadow(0 4px 8px rgba(230, 57, 70, 0.3));
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        .title {
          font-size: 32px;
          font-weight: 700;
          background: linear-gradient(135deg, #e63946, #f72585);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 12px;
          letter-spacing: -0.5px;
        }

        .subtitle {
          font-size: 16px;
          color: #6c757d;
          margin-bottom: 40px;
          font-weight: 400;
        }

        .button-group {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .card-link {
          text-decoration: none;
        }

        .action-card {
          background: white;
          padding: 25px;
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          border: 2px solid transparent;
          position: relative;
          overflow: hidden;
        }

        .action-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          transition: left 0.5s;
        }

        .action-card:hover::before {
          left: 100%;
        }

        .action-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
        }

        .admin-card {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
        }

        .admin-card:hover {
          border-color: #667eea;
          box-shadow: 0 15px 40px rgba(102, 126, 234, 0.5);
        }

        .camp-card {
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          color: white;
          box-shadow: 0 8px 20px rgba(240, 147, 251, 0.4);
        }

        .camp-card:hover {
          border-color: #f093fb;
          box-shadow: 0 15px 40px rgba(240, 147, 251, 0.5);
        }

        .stock-card {
          background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
          color: white;
          box-shadow: 0 8px 20px rgba(79, 172, 254, 0.4);
        }

        .stock-card:hover {
          border-color: #4facfe;
          box-shadow: 0 15px 40px rgba(79, 172, 254, 0.5);
        }

        .request-card {
          background: linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%);
          color: white;
          box-shadow: 0 8px 20px rgba(255, 107, 107, 0.4);
        }

        .request-card:hover {
          border-color: #ff6b6b;
          box-shadow: 0 15px 40px rgba(255, 107, 107, 0.5);
        }

        .card-icon {
          font-size: 40px;
          margin-bottom: 12px;
          animation: bounce 2s infinite;
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .action-card h3 {
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 8px;
          letter-spacing: -0.3px;
        }

        .action-card p {
          font-size: 14px;
          opacity: 0.95;
          font-weight: 400;
        }

        @media (max-width: 600px) {
          .home-card {
            padding: 40px 30px;
          }

          .title {
            font-size: 26px;
          }

          .subtitle {
            font-size: 14px;
          }
        }
      `}</style>
    </div>
  );
}

export default Home;