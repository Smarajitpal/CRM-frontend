import "./Home.css";
import React, { useEffect } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import { fetchAgents } from "../features/SalesAgent/salesAgentSlice";
import { fetchLeads } from "../features/Leads/leadSlice";
import { useNavigate } from "react-router-dom";
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

function Report() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { salesAgent } = useSelector((state) => state.salesAgent);
  const { leads } = useSelector((state) => state.leads);

  useEffect(() => {
    dispatch(fetchAgents());
    dispatch(fetchLeads());
  }, [dispatch]);

  const agentsName =
    salesAgent?.length > 0 ? salesAgent.map((s) => s.name) : [];

  const agentLeadCounts =
    salesAgent?.length > 0 && leads?.length > 0
      ? salesAgent.map(
          (agent) =>
            leads.filter(
              (lead) =>
                lead.salesAgent?._id === agent._id && lead.status === "Closed"
            ).length
        )
      : Array(salesAgent.length).fill(0);

  const totalLeadsClosed =
    leads.length > 0
      ? leads.filter((lead) => lead.status === "Closed").length
      : 0;
  const totalLeadsInPipeline =
    leads.length > 0
      ? leads.filter((lead) => lead.status !== "Closed").length
      : 0;

  const pieChartData = {
    labels: ["Closed Leads", "Leads in Pipeline"],
    datasets: [
      {
        data: [totalLeadsClosed, totalLeadsInPipeline],
        backgroundColor: ["rgba(75, 128, 192, 0.6)", "rgba(151, 192, 75, 0.6)"],
        borderColor: ["rgba(75,192,192,1)", "rgba(192,75,75,1)"],
        borderWidth: 1,
      },
    ],
  };

  const barChartData = {
    labels: agentsName,
    datasets: [
      {
        label: "Leads Closed By Sales Agent",
        data: agentLeadCounts,
        backgroundColor: "rgba(72, 192, 192, 0.6)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  };
  const status = ["New", "Contacted", "Qualified", "Proposal Sent", "Closed"];
  const statusCount =
    leads.length > 0
      ? status.map((s) => leads?.filter((l) => l.status === s).length)
      : 0;
  const barChartData2 = {
    labels: status,
    datasets: [
      {
        label: "Leads By Status",
        data: statusCount,
        backgroundColor: "rgba(72, 192, 150, 0.6)",
        borderColor: "rgb(75, 192, 141)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="container">
      <div>
        <h1 className="heading">Zentact CRM Reports</h1>
      </div>
      <div className="body">
        <div className="left-section">
          <div className="nav">
            <button className="list-btn" onClick={() => navigate("/")}>
              Back to Dashboard
            </button>
          </div>
        </div>
        <div className="content">
          <h2 className="heading-2">Report Overview</h2>
          <h3 className="heading-3">Leads Closed and Leads in Pipeine</h3>
          <div className="pie">
            <Pie data={pieChartData} />
          </div>
          <h3 className="heading-3">Leads Closed by Sales Agent</h3>
          <div className="bar">
            <Bar data={barChartData} />
          </div>
          <h3 className="heading-3">Lead Status Distribution</h3>
          <div className="bar">
            <Bar data={barChartData2} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Report;
