import { useEffect, useState } from "react";
import api from "../api"; // adjust path to your api import

function CampDonorList() {
  const [data, setData] = useState([]);
  const campID = localStorage.getItem("campID"); // ensure you set this on login

  useEffect(() => {
    if (!campID) return;
    api.get(`/camp-donors/${campID}`)
      .then(res => setData(res.data))
      .catch(err => {
        console.error("Error fetching camp donors:", err);
      });
  }, [campID]);

  return (
    <div className="container">
      <h2>Donations for Your Camp</h2>
      <table>
        <thead>
          <tr>
            <th>Donation ID</th>
            <th>Donor ID</th>
            <th>Name</th>
            <th>Blood Group</th>
            <th>Units</th>
            <th>Date</th>
            <th>Contact</th>
          </tr>
        </thead>
        <tbody>
          {data.map(d => (
            <tr key={d.Donation_ID}>
              <td>{d.Donation_ID}</td>
              <td>{d.Donor_ID}</td>
              <td>{d.Name}</td>
              <td>{d.Blood_Group}</td>
              <td>{d.Units_Donated}</td>
              <td>{new Date(d.Date).toLocaleDateString()}</td>
              <td>{d.Contact_No}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CampDonorList;
