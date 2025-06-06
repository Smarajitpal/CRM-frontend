import { useNavigate, useSearchParams, Link } from "react-router-dom";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchLeads } from "../features/Leads/leadSlice";

function Sales() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status");
  const { leads } = useSelector((state) => state.leads);
  const leadByStatus = leads?.filter((l) => l.status === status);

  useEffect(() => {
    dispatch(fetchLeads());
  }, [dispatch]);

  return (
    <div className="container">
      <div>
        <h1 className="heading">Leads by Status</h1>
      </div>
      <div className="body">
        <div className="left-section">
          <button className="list-btn" onClick={() => navigate("/")}>
            Back To DashBoard
          </button>
          {status === "Closed" && (
            <p className="d-text">Total Sales: {leadByStatus.length}</p>
          )}
        </div>
        <div className="content">
          <h2 className="heading-2">Lead List by Status</h2>
          <h3 className="heading-3">Status: {status}</h3>
          {leadByStatus.length > 0 ? (
            <ul className="col">
              {leadByStatus?.map((l) => (
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
export default Sales;
