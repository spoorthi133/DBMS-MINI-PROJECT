import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicRequestForm from "./components/PublicRequestForm";

// Home
import Home from "./components/Home";

// Logins
import SystemAdminLogin from "./components/SystemAdminLogin";
import CampAdminLogin from "./components/CampAdminLogin";

// Dashboards
import SystemAdminDashboard from "./components/SystemAdminDashboard";
import CampDashboard from "./components/CampDashboard";

// Donors
import DonorForm from "./components/DonorForm";
import DonorList from "./components/DonorList";
import DonorProfile from "./components/DonorProfile";
import EditDonor from "./components/EditDonor";

// Recipients
import RecipientForm from "./components/RecipientForm";
import RecipientList from "./components/RecipientList";

// Donations
import DonationList from "./components/DonationList";
import AddDonation from "./components/AddDonation";
import CampDonorList from "./components/CampDonorList";

import Stock from "./components/Stock";

// Requests (System Admin)
import AdminRequests from "./components/AdminRequests";

// Requests (Camp Admin)
import AddRequestCampAdmin from "./components/AddRequestCampAdmin";
import CampRequests from "./components/CampRequests";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Login Pages */}
        <Route path="/system-admin/login" element={<SystemAdminLogin />} />
        <Route path="/camp-admin/login" element={<CampAdminLogin />} />

        {/* Dashboards */}
        <Route path="/system-admin/dashboard" element={<SystemAdminDashboard />} />
        <Route path="/camp-admin/dashboard" element={<CampDashboard />} />

        {/* Donor Routes */}
        <Route path="/donors" element={<DonorList />} />
        <Route path="/system-admin/donors" element={<DonorList />} />
        <Route path="/add-donor" element={<DonorForm />} />
        <Route path="/donor/:id" element={<DonorProfile />} />
        <Route path="/system-admin/donors/edit/:id" element={<EditDonor />} />

        {/* Recipient Routes */}
        <Route path="/recipients" element={<RecipientList />} />
        <Route path="/add-recipient" element={<RecipientForm />} />

        {/* Donation Routes */}
        <Route path="/donations" element={<DonationList />} />
        <Route path="/add-donation" element={<AddDonation />} />
        <Route path="/camp-donors" element={<CampDonorList />} />

        {/* Stock */}
        <Route path="/stock" element={<Stock />} />

        {/* System Admin Requests */}
        <Route path="/system-admin/requests" element={<AdminRequests />} />

        {/* Camp Admin Requests */}
        <Route path="/camp-admin/request-blood" element={<AddRequestCampAdmin />} />
        <Route path="/camp-admin/requests" element={<CampRequests />} />

        <Route path="/request-blood" element={<PublicRequestForm />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
