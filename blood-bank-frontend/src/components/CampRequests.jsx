import { useEffect, useState } from "react";
import api from "../api";

function CampRequests() {
  const [requests, setRequests] = useState([]);
  const campID = localStorage.getItem("campID");

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const res = await api.get(`/requests/camp/${campID}`);
      setRequests(res.data);
    } catch (err) {
      console.error(err);
      alert("Could not load camp requests");
    }
  };

  const getStatusStyle = (status) => {
    const baseStyle = {
      display: 'inline-block',
      padding: '8px 16px',
      borderRadius: '25px',
      fontWeight: '600',
      fontSize: '13px',
      textTransform: 'capitalize',
      letterSpacing: '0.5px',
      minWidth: '90px',
      textAlign: 'center',
      border: '2px solid transparent',
      transition: 'all 0.3s ease',
    };

    switch(status?.toLowerCase()) {
      case 'approved':
      case 'completed':
        return {
          ...baseStyle,
          background: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)',
          color: '#065f46',
          borderColor: '#6ee7b7',
        };
      case 'pending':
        return {
          ...baseStyle,
          background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
          color: '#92400e',
          borderColor: '#fcd34d',
        };
      case 'rejected':
      case 'cancelled':
        return {
          ...baseStyle,
          background: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
          color: '#991b1b',
          borderColor: '#fca5a5',
        };
      default:
        return {
          ...baseStyle,
          background: 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)',
          color: '#3730a3',
          borderColor: '#a5b4fc',
        };
    }
  };

  const styles = {
    container: {
      padding: '30px',
      maxWidth: '1400px',
      margin: '0 auto',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)',
      minHeight: '100vh',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '30px',
      padding: '25px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      borderRadius: '15px',
      boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)',
      color: 'white',
    },
    headerTitle: {
      margin: 0,
      fontSize: '28px',
      fontWeight: '700',
      letterSpacing: '-0.5px',
    },
    requestsCount: {
      background: 'rgba(255, 255, 255, 0.2)',
      padding: '12px 20px',
      borderRadius: '25px',
      fontSize: '14px',
      fontWeight: '600',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
    },
    countNumber: {
      fontSize: '20px',
      fontWeight: '700',
      marginLeft: '8px',
    },
    noRequests: {
      textAlign: 'center',
      padding: '80px 40px',
      background: 'white',
      borderRadius: '20px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    },
    noRequestsIcon: {
      fontSize: '80px',
      marginBottom: '20px',
      opacity: 0.5,
    },
    noRequestsText: {
      fontSize: '24px',
      color: '#1e293b',
      fontWeight: '600',
      margin: '0 0 10px 0',
    },
    noRequestsSubtext: {
      fontSize: '16px',
      color: '#64748b',
    },
    tableWrapper: {
      background: 'white',
      borderRadius: '20px',
      padding: '25px',
      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
      overflowX: 'auto',
    },
    table: {
      width: '100%',
      borderCollapse: 'separate',
      borderSpacing: 0,
    },
    tableHeader: {
      background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
      color: 'white',
    },
    th: {
      padding: '18px 20px',
      textAlign: 'left',
      fontWeight: '600',
      fontSize: '14px',
      letterSpacing: '0.5px',
      textTransform: 'uppercase',
      border: 'none',
    },
    thFirst: {
      borderTopLeftRadius: '12px',
    },
    thLast: {
      borderTopRightRadius: '12px',
    },
    tr: {
      transition: 'all 0.3s ease',
      borderBottom: '1px solid #e2e8f0',
    },
    td: {
      padding: '20px',
      color: '#1e293b',
      fontSize: '15px',
      verticalAlign: 'middle',
    },
    requestId: {
      fontWeight: '700',
      color: '#6366f1',
      fontFamily: '"Courier New", monospace',
    },
    recipientName: {
      fontWeight: '600',
      color: '#1e293b',
    },
    bloodBadge: {
      display: 'inline-block',
      padding: '8px 16px',
      background: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
      color: '#dc2626',
      borderRadius: '25px',
      fontWeight: '700',
      fontSize: '14px',
      border: '2px solid #fca5a5',
      minWidth: '60px',
      textAlign: 'center',
    },
    unitsCell: {
      fontWeight: '600',
      color: '#059669',
      fontSize: '16px',
    },
    dateCell: {
      color: '#64748b',
      fontSize: '14px',
      fontWeight: '500',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.headerTitle}>Blood Requests Sent by Your Camp</h2>
        <div style={styles.requestsCount}>
          Total Requests: <span style={styles.countNumber}>{requests.length}</span>
        </div>
      </div>

      {requests.length === 0 ? (
        <div style={styles.noRequests}>
          <div style={styles.noRequestsIcon}>📋</div>
          <p style={styles.noRequestsText}>No requests found.</p>
          <span style={styles.noRequestsSubtext}>Requests sent by your camp will appear here</span>
        </div>
      ) : (
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead style={styles.tableHeader}>
              <tr>
                <th style={{...styles.th, ...styles.thFirst}}>Request ID</th>
                <th style={styles.th}>Recipient Name</th>
                <th style={styles.th}>Blood Group</th>
                <th style={styles.th}>Units Requested</th>
                <th style={styles.th}>Status</th>
                <th style={{...styles.th, ...styles.thLast}}>Request Date</th>
              </tr>
            </thead>

            <tbody>
              {requests.map((r, index) => (
                <tr 
                  key={r.Request_ID} 
                  style={{
                    ...styles.tr,
                    ...(index === requests.length - 1 ? { borderBottom: 'none' } : {})
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)';
                    e.currentTarget.style.transform = 'translateX(5px)';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(99, 102, 241, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.transform = 'translateX(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <td style={{...styles.td, ...styles.requestId}}>#{r.Request_ID}</td>
                  <td style={{...styles.td, ...styles.recipientName}}>{r.Name}</td>
                  <td style={styles.td}>
                    <span style={styles.bloodBadge}>{r.Blood_Group}</span>
                  </td>
                  <td style={{...styles.td, ...styles.unitsCell}}>{r.Units_Requested} units</td>
                  <td style={styles.td}>
                    <span 
                      style={getStatusStyle(r.Status)}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      {r.Status}
                    </span>
                  </td>
                  <td style={{...styles.td, ...styles.dateCell}}>
                    {new Date(r.Request_Date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default CampRequests;