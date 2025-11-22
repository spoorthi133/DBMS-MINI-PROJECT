import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api"; // or "../api/api" depending on your project

function DonorProfile() {
  const { id } = useParams(); // route param: /donor/123/details
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    api.get(`/donor/${id}/details`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching donor details:", err);
        setError(err.response?.data || { message: "Failed to fetch" });
        setLoading(false);
      });
  }, [id]);

  // Eligibility check: 56 days after last donation
  const checkEligibility = (lastDonationDateStr) => {
    if (!lastDonationDateStr) return { eligible: true, message: "No previous donations" };
    const last = new Date(lastDonationDateStr);
    const nextEligible = new Date(last.getTime() + 56 * 24 * 60 * 60 * 1000); // 56 days
    const today = new Date();
    if (today >= nextEligible) return { eligible: true, nextDate: nextEligible };
    return { eligible: false, nextDate: nextEligible };
  };

  if (loading) {
    return (
      <div className="container">
        <p>Loading donor profile...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="container">
        <p>Error: {error.message || JSON.stringify(error)}</p>
        <button onClick={() => navigate(-1)}>Back</button>
      </div>
    );
  }

  const donor = data.donor;
  const history = data.history || [];
  const ag = data.aggregates || {};
  const lastDonation = ag.last_donation_date || donor.Last_Donation_Date || null;
  const elig = checkEligibility(lastDonation);

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-left">
          <div className="avatar">👤</div>
        </div>
        <div className="profile-right">
          <h2>{donor.Name} <span className="small">({donor.Donor_ID})</span></h2>
          <p><strong>Blood Group:</strong> {donor.Blood_Group}</p>
          <p><strong>Age:</strong> {donor.Age} &nbsp; <strong>Gender:</strong> {donor.Gender}</p>
          <p><strong>Contact:</strong> {donor.Contact_No}</p>
          <p><strong>Address:</strong> {donor.Address}</p>
          <div className="aggregates">
            <div><strong>Total Units:</strong> {ag.total_units}</div>
            <div><strong>Donations:</strong> {ag.donations_count}</div>
            <div><strong>Last Donation:</strong> {lastDonation ? new Date(lastDonation).toLocaleDateString() : "—"}</div>
          </div>

          <div className={`eligibility ${elig.eligible ? "ok" : "not-ok"}`}>
            {elig.eligible ? (
              <span>✅ Eligible to donate</span>
            ) : (
              <span>❌ Not eligible until {elig.nextDate.toLocaleDateString()}</span>
            )}
          </div>

          <div style={{ marginTop: 12 }}>
            <button onClick={() => navigate(-1)} className="back-btn">← Back</button>
          </div>
        </div>
      </div>

      <div className="history-card">
        <h3>Donation History</h3>
        {history.length === 0 ? (
          <p>No donations recorded yet.</p>
        ) : (
          <table className="history-table">
            <thead>
              <tr>
                <th>Donation ID</th>
                <th>Camp ID</th>
                <th>Date</th>
                <th>Units</th>
              </tr>
            </thead>
            <tbody>
              {history.map(h => (
                <tr key={h.Donation_ID}>
                  <td>{h.Donation_ID}</td>
                  <td>{h.Camp_ID}</td>
                  <td>{new Date(h.Date).toLocaleDateString()}</td>
                  <td>{h.Units_Donated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <style>{`
        .profile-container { max-width: 1000px; margin: 30px auto; font-family: 'Segoe UI', sans-serif; padding: 0 16px;}
        .profile-card { display:flex; gap:20px; background: #fff; padding:20px; border-radius:12px; box-shadow:0 6px 18px rgba(0,0,0,0.08); align-items:center; }
        .avatar { font-size:56px; width:100px; text-align:center; }
        .profile-right h2 { margin:0 0 8px 0; font-size:22px; }
        .small { font-size:14px; color:#666; margin-left:8px; }
        .aggregates { display:flex; gap:18px; margin-top:12px; color:#333; }
        .eligibility { margin-top:14px; padding:10px 12px; border-radius:10px; font-weight:600; display:inline-block; }
        .eligibility.ok { background:#e6ffed; color:#057a3b; }
        .eligibility.not-ok { background:#fff1f0; color:#9b1a1a; }
        .history-card { margin-top:20px; background:#fff; padding:20px; border-radius:12px; box-shadow:0 6px 18px rgba(0,0,0,0.06); }
        .history-table { width:100%; border-collapse:collapse; }
        .history-table th, .history-table td { padding:10px; text-align:left; border-bottom:1px solid #eee; }
        .back-btn { padding:8px 14px; border-radius:8px; border:none; background:#5e72e4; color:white; cursor:pointer; }
      `}</style>
    </div>
  );
}

export default DonorProfile;
