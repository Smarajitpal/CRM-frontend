import "./Home.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchLeads } from "../features/Leads/leadSlice";

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { leads } = useSelector((state) => state.leads);
  useEffect(() => {
    dispatch(fetchLeads());
  }, [dispatch]);
  return (
    <div className="container">
      <div>
        <h1 className="heading">Zentact CRM Dashboard</h1>
      </div>
      <div className="body">
        <div className="left-section">
          <div className="nav">
            <button className="list-btn" onClick={() => navigate("/leads")}>
              Leads
            </button>
            <button
              className="list-btn"
              onClick={() => navigate("/sales?status=Closed")}
            >
              Sales
            </button>
            <button
              className="list-btn"
              onClick={() => navigate("/salesAgent")}
            >
              Agents
            </button>
            <button className="list-btn" onClick={() => navigate("/report")}>
              Reports
            </button>
            <button className="list-btn" onClick={() => navigate("/settings")}>
              Settings
            </button>
          </div>
        </div>

        <div className="content">
          <h2 className="heading-2">Main Content</h2>
          <h3 className="heading-3">Lead Status: </h3>
          <Link className="newLink" to="/sales?status=New">
            <p className="d-text">
              <b>New:</b> [{leads?.filter((l) => l.status === "New").length}]
              Lead
              {leads?.filter((l) => l.status === "New").length > 1 ? "s" : ""}
            </p>
          </Link>
          <Link className="newLink" to="/sales?status=Contacted">
            <p className="d-text">
              <b>Contacted:</b> [
              {leads?.filter((l) => l.status === "Contacted").length}] Lead
              {leads?.filter((l) => l.status === "Contacted").length > 1
                ? "s"
                : ""}
            </p>
          </Link>
          <Link className="newLink" to="/sales?status=Qualified">
            <p className="d-text">
              <b>Qualified:</b> [
              {leads?.filter((l) => l.status === "Qualified").length}] Lead
              {leads?.filter((l) => l.status === "Qualified").length > 1
                ? "s"
                : ""}
            </p>
          </Link>
          <Link className="newLink" to="/sales?status=Proposal Sent">
            <p className="d-text">
              <b>Proposal Sent:</b> [
              {leads?.filter((l) => l.status === "Proposal Sent").length}] Lead
              {leads?.filter((l) => l.status === "Proposal Sent").length > 1
                ? "s"
                : ""}
            </p>
          </Link>
          <Link className="newLink" to="/sales?status=Closed">
            <p className="d-text">
              <b>Closed:</b> [
              {leads?.filter((l) => l.status === "Closed").length}] Lead
              {leads?.filter((l) => l.status === "Closed").length > 1
                ? "s"
                : ""}
            </p>
          </Link>
          <button className="addBtn" onClick={() => navigate("/addLead")}>
            Add New Lead
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
