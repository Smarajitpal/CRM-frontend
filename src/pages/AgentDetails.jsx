import { useLocation, useNavigate, useParams, Link } from "react-router-dom";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchLeads } from "../features/Leads/leadSlice";
function AgentDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { agentId } = useParams();
  const location = useLocation();
  const { leads } = useSelector((state) => state.leads);
  const [sortBy, setSortBy] = useState("");

  const leadList = leads?.filter(
    (l) => l.salesAgent?._id === agentId && l.status !== "Closed"
  );
  const closedLeads = leads?.filter(
    (l) => l.salesAgent?._id === agentId && l.status === "Closed"
  );

  const sortedLeads = [...leadList].sort((a, b) => {
    if (sortBy === "priority") {
      return a.priority.localeCompare(b.priority);
    } else if (sortBy === "timeToClose") {
      return a.timeToClose - b.timeToClose;
    }
    return 0;
  });

  useEffect(() => {
    dispatch(fetchLeads());
  }, [dispatch]);
  return (
    <div className="container">
      <div>
        <h1 className="heading">Leads by Sales Agent</h1>
      </div>
      <div className="body">
        <div className="left-section">
          <div className="nav">
            <button className="list-btn" onClick={() => navigate("/")}>
              Back to Dashboard
            </button>
            <h3 className="c-text">Sort By:</h3>
            <label>
              <input
                type="checkbox"
                value="priority"
                checked={sortBy === "priority"}
                onChange={(e) => setSortBy(e.target.value)}
              />
              Priority
            </label>
            <br />
            <label>
              <input
                type="checkbox"
                value="timeToClose"
                checked={sortBy === "timeToClose"}
                onChange={(e) => setSortBy(e.target.value)}
              />
              Time To Close
            </label>
            <button className="cancelBtn" onClick={() => setSortBy("")}>
              Clear
            </button>
          </div>
        </div>
        <div className="content">
          <h2 className="heading-2">Lead list by Agent </h2>
          <h3 className="heading-3">Sales Agent : {location.state.name}</h3>
          {sortedLeads.length > 0 ? (
            <ul className="col">
              {sortedLeads?.map((l) => (
                <li key={l._id} className="link-item form">
                  <Link to={`/leads/${l._id}`} className="list-item">
                    <p>
                      <b>{l.name}</b> assigned to <b>{l.salesAgent.name}</b>
                    </p>
                    <p>
                      <b>Status: </b>
                      {l.status}
                      {l.status === "Closed"
                        ? ` at ${new Date(l.updatedAt).toLocaleString()}`
                        : ""}
                    </p>
                    <p>{l.tags.join(",")}</p>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="error-text">No Leads Available</p>
          )}
          <ul className="col">
            {closedLeads?.map((l) => (
              <li key={l._id} className="link-item form">
                <div className="list-item">
                  <p>
                    <b>{l.name}</b>
                  </p>
                  <p>
                    <b>Status: </b>
                    {l.status}
                    {l.status === "Closed"
                      ? ` at ${new Date(l.updatedAt).toLocaleString()}`
                      : ""}
                  </p>
                  <p>{l.tags.join(",")}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AgentDetails;
