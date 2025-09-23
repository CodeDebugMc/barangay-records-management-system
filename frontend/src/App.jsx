import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Leave from "./components/Leave";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Dashboard1 from "./components/Dashboard1";
import CertificationAction from "./components/CertificationAction";
import CertificationFinancialAssistance from "./components/CertFinancialAssistance";
import CompanySettingsForm from "./components/CompanySettingsForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/user" element={<Dashboard1 />} />
        <Route path="/leave" element={<Leave />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/company-settings" element={<CompanySettingsForm />} />
        <Route path="/cert1" element={<CertificationAction />} />
        <Route path="/cert2" element={<CertificationFinancialAssistance />} />
      </Routes>
    </Router>
  );
}

export default App;
