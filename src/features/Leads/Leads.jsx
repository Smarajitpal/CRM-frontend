import { Link, useNavigate, useSearchParams } from "react-router-dom";
import "../../pages/Home.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeads, setSortBy } from "./leadSlice";
import { fetchAgents } from "../SalesAgent/salesAgentSlice";
function Leads() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { leads, status, error, sortBy } = useSelector((state) => state.leads);
  const { salesAgent } = useSelector((state) => state.salesAgent);

  const [searchParams, setSearchParams] = useSearchParams();
  const statusFilter = searchParams.get("status") || "";
  const agentFilter = searchParams.get("salesAgent") || "";
  const sourceFilter = searchParams.get("source") || "";

  const sortedLeads = [...leads].sort((a, b) => {
    if (sortBy === "priority") {
      return a.priority.localeCompare(b.priority);
    } else if (sortBy === "timeToClose") {
      return a.timeToClose - b.timeToClose;
    }
    return 0;
  });

  useEffect(() => {
    dispatch(
      fetchLeads({
        status: statusFilter,
        salesAgent: agentFilter,
        source: sourceFilter,
      })
    );
    dispatch(fetchAgents());
  }, [dispatch, statusFilter, agentFilter, sourceFilter]);
  return (
    <div className="container">
      <h1 className="heading">Lead List</h1>
      <div className="body">
        <div className="left-section">
          <div className="nav">
            <button className="list-btn" onClick={() => navigate("/")}>
              Back To DashBoard
            </button>
            <button className="addBtn" onClick={() => navigate("/addLead")}>
              Add New Lead
            </button>
            <h3 className="c-text">Filters:</h3>
            <button
              onClick={() => {
                setSearchParams({ status: "", salesAgent: "", source: "" });
                dispatch(setSortBy(""));
              }}
              className="cancelBtn"
            >
              Clear Filter
            </button>
            <p>Filter by Status:</p>
            <select
              className="filter"
              name="status"
              value={statusFilter}
              onChange={(e) =>
                setSearchParams({
                  status: e.target.value,
                  salesAgent: agentFilter,
                  source: sourceFilter,
                })
              }
            >
              <option value="">All</option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Proposal Sent">Proposal Sent</option>
              <option value="Closed">Closed</option>
            </select>
            <p>Filter by Sales Agent:</p>
            <select
              className="filter"
              name="salesAgent"
              value={agentFilter}
              onChange={(e) =>
                setSearchParams({
                  status: statusFilter,
                  salesAgent: e.target.value,
                  source: sourceFilter,
                })
              }
            >
              <option value="">All</option>
              {salesAgent.map((m) => (
                <option key={m.name} value={m._id}>
                  {m.name}
                </option>
              ))}
            </select>
            <p>Filter by Source:</p>
            <select
              className="filter"
              name="source"
              value={sourceFilter}
              onChange={(e) =>
                setSearchParams({
                  status: statusFilter,
                  salesAgent: agentFilter,
                  source: e.target.value,
                })
              }
            >
              <option value="">All</option>
              <option value="Website">Website</option>
              <option value="Referral">Referral</option>
              <option value="Cold Call">Cold Call</option>
              <option value="Advertisement">Advertisement</option>
              <option value="Email">Email</option>
              <option value="Other">Other</option>
            </select>

            <h3 className="c-text">Sort By: </h3>
            <label>
              <input
                type="checkbox"
                checked={sortBy === "priority"}
                onChange={() => dispatch(setSortBy("priority"))}
              />
              Priority
            </label>
            <br />
            <label>
              <input
                type="checkbox"
                checked={sortBy === "timeToClose"}
                onChange={() => dispatch(setSortBy("timeToClose"))}
              />
              Time To Close
            </label>
          </div>
        </div>

        <div className="content">
          <h2 className="heading-2">Lead Overview</h2>
          {status === "loading" && <div className="loader"></div>}
          {error && <p>Error Occured</p>}
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
        </div>
      </div>
    </div>
  );
}

export default Leads;
