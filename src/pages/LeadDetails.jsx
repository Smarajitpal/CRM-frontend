import { useEffect, useState } from "react";
import "./Home.css";
import { deleteLeadAsync, fetchLeads } from "../features/Leads/leadSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  addCommentAsync,
  fetchComments,
} from "../features/Comments/commentSlice";
import { fetchAgents } from "../features/SalesAgent/salesAgentSlice";

function LeadDetails() {
  const { leadId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { leads, status, error } = useSelector((state) => state.leads);
  const { salesAgent } = useSelector((state) => state.salesAgent);
  const { comments } = useSelector((state) => state.comments);
  const [comment, setComment] = useState("");
  const [authorInput, setAuthorInput] = useState("");
  const [addComment, setAddComment] = useState(false);

  const lead = leads?.find((l) => l._id === leadId);

  const handleSave = () => {
    if (!comment || !authorInput) {
      alert("Please Write a Comment or Select a author");
      return;
    } else {
      const data = {
        lead: leadId,
        author: authorInput,
        commentText: comment.split(","),
      };
      dispatch(addCommentAsync(data));
      setAddComment(false);
    }
  };
  const handleDelete = (id) => {
    dispatch(deleteLeadAsync(id));
    alert("Lead Deleted Successfully");
  };

  useEffect(() => {
    dispatch(fetchLeads());
    if (leadId) {
      dispatch(fetchComments(leadId));
    }
    dispatch(fetchAgents());
  }, [dispatch, leadId]);

  return (
    <div className="container">
      <div>
        <h1 className="heading">Lead Management: {lead?.name}</h1>
      </div>
      <div className="body">
        <div className="left-section">
          <div className="nav">
            <button className="list-btn" onClick={() => navigate("/")}>
              Back to Dashboard
            </button>
            <button className="addBtn" onClick={() => setAddComment(true)}>
              Add Comment
            </button>
          </div>
        </div>

        <div className="content">
          <h2 className="heading-2">Lead Details</h2>
          {status === "loading" && <div className="loader"></div>}
          {error && <p>Error</p>}
          {lead && (
            <>
              <div>
                <p className="d-text">
                  <b>Lead Name: </b>
                  {lead.name}
                </p>
                <p className="d-text">
                  <b>Sales Agent: </b>
                  {lead.salesAgent.name}
                </p>
                <p className="d-text">
                  <b>Lead Source: </b>
                  {lead.source}
                </p>
                <p className="d-text">
                  <b>Lead Status: </b>
                  {lead.status}{" "}
                  {lead.status === "Closed"
                    ? ` at ${new Date(lead.updatedAt).toLocaleString()}`
                    : ""}
                </p>
                <p className="d-text">
                  <b>Priority: </b>
                  {lead.priority}
                </p>
                <p className="d-text">
                  <b>Time to Close: </b>
                  {lead.timeToClose} days
                </p>
                <div className="body">
                  <Link
                    className="addBtn"
                    to={`/updateLead/${leadId}`}
                    state={lead}
                  >
                    Update Lead
                  </Link>
                  <button
                    className="cancelBtn"
                    onClick={() => handleDelete(lead._id)}
                  >
                    Delete Lead
                  </button>
                </div>
              </div>
            </>
          )}
          <h2 className="heading-2 h-extra">Comment Section</h2>
          {addComment && (
            <div>
              <input
                className="input"
                type="text"
                placeholder="Comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <select
                className="input"
                onChange={(e) => setAuthorInput(e.target.value)}
              >
                <option value="">--Select Your Name--</option>
                {salesAgent?.map((s) => (
                  <option key={s._id} value={s._id}>
                    {s.name}
                  </option>
                ))}
              </select>
              <div className="body">
                <button className="addBtn" onClick={handleSave}>
                  Save
                </button>
                <button
                  className="cancelBtn"
                  onClick={() => setAddComment(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
          {comments.length > 0 ? (
            <ul>
              {comments.map((c) => (
                <li key={c._id}>
                  <b className="c-text">
                    {c.author?.name} - {new Date(c.createdAt).toLocaleString()}
                  </b>
                  <p className="c-text">
                    <b>Comments: </b>
                    {c.commentText.join(", ")}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="error-text">No Comments</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default LeadDetails;
