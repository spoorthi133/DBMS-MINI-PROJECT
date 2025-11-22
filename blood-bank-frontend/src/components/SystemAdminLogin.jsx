import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function SystemAdminLogin() {
  const [form, setForm] = useState({ Username: "", Password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await api.post("/login", form);
      alert("System Admin Login Successful");
      navigate("/system-admin/dashboard");
    } catch (err) {
      alert("Invalid login credentials");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="background-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>

      <div className="login-card">
        <div className="login-header">
          <div className="icon-wrapper">
            <div className="admin-icon">🔐</div>
          </div>
          <h2 className="login-title">System Admin Login</h2>
          <p className="login-subtitle">Access the admin dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <div className="input-wrapper">
              <span className="input-icon">👤</span>
              <input
                type="text"
                id="username"
                name="Username"
                placeholder="Enter your username"
                onChange={handleChange}
                value={form.Username}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <span className="input-icon">🔒</span>
              <input
                type="password"
                id="password"
                name="Password"
                placeholder="Enter your password"
                onChange={handleChange}
                value={form.Password}
                required
              />
            </div>
          </div>

          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? (
              <span className="loading-spinner">⏳ Logging in...</span>
            ) : (
              <span>Login</span>
            )}
          </button>
        </form>

        <div className="login-footer">
          <a href="/" className="back-link">← Back to Home</a>
        </div>
      </div>

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .login-container {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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

        .login-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          width: 100%;
          max-width: 450px;
          padding: 45px 40px;
          border-radius: 30px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
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

        .login-header {
          text-align: center;
          margin-bottom: 35px;
        }

        .icon-wrapper {
          margin-bottom: 20px;
        }

        .admin-icon {
          display: inline-block;
          font-size: 50px;
          padding: 20px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 20px;
          box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        .login-title {
          font-size: 28px;
          font-weight: 700;
          background: linear-gradient(135deg, #667eea, #764ba2);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 8px;
        }

        .login-subtitle {
          font-size: 15px;
          color: #6c757d;
          font-weight: 400;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 25px;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .input-group label {
          font-size: 14px;
          font-weight: 600;
          color: #333;
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
          font-size: 20px;
          pointer-events: none;
          z-index: 1;
        }

        .input-wrapper input {
          width: 100%;
          padding: 15px 15px 15px 50px;
          border: 2px solid #e0e0e0;
          border-radius: 12px;
          font-size: 15px;
          transition: all 0.3s ease;
          background: white;
          color: #333;
        }

        .input-wrapper input:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
          transform: translateY(-2px);
        }

        .input-wrapper input::placeholder {
          color: #adb5bd;
        }

        .login-button {
          margin-top: 10px;
          padding: 16px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
        }

        .login-button:hover:not(:disabled) {
          transform: translateY(-3px);
          box-shadow: 0 12px 30px rgba(102, 126, 234, 0.5);
        }

        .login-button:active:not(:disabled) {
          transform: translateY(-1px);
        }

        .login-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .loading-spinner {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .login-footer {
          margin-top: 25px;
          text-align: center;
        }

        .back-link {
          color: #667eea;
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.3s ease;
          display: inline-block;
        }

        .back-link:hover {
          color: #764ba2;
          transform: translateX(-3px);
        }

        @media (max-width: 600px) {
          .login-card {
            padding: 35px 30px;
          }

          .login-title {
            font-size: 24px;
          }

          .admin-icon {
            font-size: 40px;
            padding: 15px;
          }
        }
      `}</style>
    </div>
  );
}

export default SystemAdminLogin;