import { Link, useNavigate } from "react-router-dom";
import "../../pages/Home.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAgents } from "./salesAgentSlice";
function SalesAgent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { salesAgent, status, error } = useSelector(
    (state) => state.salesAgent
  );

  useEffect(() => {
    dispatch(fetchAgents());
  }, [dispatch]);
  return (
    <div className="container">
      <h1 className="heading">Sales Agent Management</h1>
      <div className="body">
        <div className="left-section">
          <div className="nav">
            <button className="list-btn" onClick={() => navigate("/")}>
              Back To DashBoard
            </button>
            <button className="addBtn" onClick={() => navigate("/addAgent")}>
              Add New Agent
            </button>
          </div>
        </div>

        <div className="content">
          <h2 className="heading-2">Sales Agent List</h2>
          {status === "loading" && <div className="loader"></div>}
          {error && <p>Error Occured {error}</p>}

          {salesAgent.length > 0 ? (
            <ul>
              {salesAgent?.map((a) => (
                <li key={a.name} className="link-item">
                  <Link
                    to={`/salesAgent/${a._id}`}
                    className="list-item"
                    state={a}
                  >
                    <p>
                      <b>Agent Name:-</b> {a.name}
                    </p>
                    <p>
                      <b>Email:-</b>
                      {a.email}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="error-text">Sales Agent Not Found</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default SalesAgent;
