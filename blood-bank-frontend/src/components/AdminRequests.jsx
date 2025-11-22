import { useEffect, useState } from "react";
import api from "../api";

function AdminRequests() {
  const [requests, setRequests] = useState([]);
  const [stock, setStock] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const res = await api.get("/requests");
      setRequests(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch requests");
    } finally {
      setLoading(false);
    }
  };

  const fetchStock = async () => {
    try {
      const res = await api.get("/stock");
      setStock(res.data);
    } catch (err) {
      console.error("Stock fetch failed");
    }
  };

  useEffect(() => {
    fetchRequests();
    fetchStock();
  }, []);

  const getAvailableUnits = (group) => {
    const item = stock.find((s) => s.Blood_Group === group);
    return item ? item.Units_Available : 0;
  };

  const approve = async (id) => {
    if (!window.confirm("Approve this request?")) return;

    try {
      await api.put(`/requests/${id}/approve`);
      alert("Request approved");
      fetchRequests();
      fetchStock();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Approval failed");
    }
  };

  const reject = async (id) => {
    if (!window.confirm("Reject this request?")) return;

    try {
      await api.put(`/requests/${id}/reject`);
      alert("Request rejected");
      fetchRequests();
    } catch (err) {
      console.error(err);
      alert("Rejection failed");
    }
  };

  const statusBadge = (status) => {
    if (status === "Approved")
      return <span className="badge approved">Approved</span>;
    if (status === "Rejected")
      return <span className="badge rejected">Rejected</span>;
    return <span className="badge pending">Pending</span>;
  };

  return (
    <div className="req-list-container">
      <h2 className="req-list-title">Blood Requests</h2>

      {loading ? (
        <p>Loading...</p>
      ) : requests.length === 0 ? (
        <p>No Requests Found</p>
      ) : (
        <table className="req-table">
          <thead>
            <tr>
              <th>Request ID</th>
              <th>Name</th>
              <th>Blood Group</th>
              <th>Requested Units</th>
              <th>Available Units</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {requests.map((r) => {
              const available = getAvailableUnits(r.Blood_Group);
              const lowStock = available < 2;

              return (
                <tr
                  key={r.Request_ID}
                  className={lowStock ? "low-stock-row" : ""}
                >
                  <td>{r.Request_ID}</td>
                  <td>{r.Name}</td>
                  <td>{r.Blood_Group}</td>
                  <td>{r.Units_Requested}</td>
                  <td>{available}</td>
                  <td>{statusBadge(r.Status)}</td>

                  <td>
                    {r.Status === "Pending" && (
                      <>
                        <button
                          className="btn-approve"
                          disabled={available < r.Units_Requested}
                          onClick={() => approve(r.Request_ID)}
                        >
                          Approve
                        </button>

                        <button
                          className="btn-reject"
                          onClick={() => reject(r.Request_ID)}
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      <style>{`
        .req-list-container {
          padding: 30px;
          font-family: 'Segoe UI';
        }
        .req-list-title {
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 20px;
        }
        .req-table {
          width: 100%;
          border-collapse: collapse;
          background: white;
          border-radius: 10px;
          overflow: hidden;
        }
        th, td {
          padding: 14px;
          text-align: left;
          border-bottom: 1px solid #ddd;
        }

        /* Status badges */
        .badge {
          padding: 6px 10px;
          border-radius: 6px;
          font-size: 13px;
          color: white;
          font-weight: 600;
        }
        .approved { background: #2dce89; }
        .rejected { background: #e63946; }
        .pending { background: #f4a261; color: black; }

        /* Row highlight when low stock */
        .low-stock-row {
          background: rgba(255, 214, 214, 0.4);
        }

        .btn-approve {
          padding: 8px 12px;
          background: #2dce89;
          color: white;
          margin-right: 10px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
        }
        .btn-approve:disabled {
          background: #a8dfc6;
          cursor: not-allowed;
        }
        .btn-reject {
          padding: 8px 12px;
          background: #e63946;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}

export default AdminRequests;
