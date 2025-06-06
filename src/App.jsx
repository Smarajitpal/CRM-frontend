import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Leads from "./features/Leads/Leads";
import SalesAgent from "./features/SalesAgent/SalesAgent";
import AddLead from "./pages/AddLead";
import AddAgent from "./pages/AddAgent";
import LeadDetails from "./pages/LeadDetails";
import Report from "./pages/Report";
import AgentDetails from "./pages/AgentDetails";
import Sales from "./pages/Sales";
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/leads" element={<Leads />} />
          <Route path="/salesAgent" element={<SalesAgent />} />
          <Route path="/salesAgent/:agentId" element={<AgentDetails />} />
          <Route path="/addLead" element={<AddLead />} />
          <Route path="/updateLead/:leadId" element={<AddLead />} />
          <Route path="/addAgent" element={<AddAgent />} />
          <Route path="/leads/:leadId" element={<LeadDetails />} />
          <Route path="/report" element={<Report />} />
          <Route path="/sales" element={<Sales />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
