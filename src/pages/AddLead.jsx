import { useEffect, useState } from "react";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchAgents } from "../features/SalesAgent/salesAgentSlice";
import { useLocation, useParams } from "react-router-dom";
import { addLeadAsync, updateLeadAsync } from "../features/Leads/leadSlice";

function AddLead() {
  const { salesAgent } = useSelector((state) => state.salesAgent);
  const { leadId } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState(
    location.state || {
      name: "",
      source: "",
      salesAgent: "",
      status: "",
      priority: "",
      timeToClose: "",
      tags: "",
    }
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.name === "tags" ? e.target.value.split(",") : e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.source ||
      !formData.salesAgent ||
      !formData.status ||
      !formData.priority ||
      !formData.timeToClose ||
      !formData.tags
    ) {
      alert("Please select correct Value");
      return;
    } else {
      if (location.state) {
        setSuccess(true);
        dispatch(updateLeadAsync({ leadId, formData }));
      } else {
        setSuccess(true);
        dispatch(addLeadAsync(formData));
      }
    }

    setFormData({
      name: "",
      source: "",
      salesAgent: "",
      status: "",
      priority: "",
      timeToClose: "",
      tags: "",
    });
  };
  useEffect(() => {
    dispatch(fetchAgents());
  }, [dispatch]);
  return (
    <div className="container">
      <div>
        <h1 className="heading">
          {!location.state ? "Add New Lead" : "Update Lead"}
        </h1>
      </div>
      <div className="container">
        <form onSubmit={handleSubmit} className="form">
          {success && (
            <p className="success-text">
              {!location.state
                ? "Lead Added Successfully"
                : "Lead Updated Successfully"}
            </p>
          )}
          <input
            className="input"
            name="name"
            type="text"
            placeholder="Lead Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <select
            className="input"
            name="source"
            value={formData.source}
            onChange={handleChange}
            required
          >
            <option>Select a Lead Source</option>
            <option value="Website">Website</option>
            <option value="Referral">Referral</option>
            <option value="Cold Call">Cold Call</option>
            <option value="Advertisement">Advertisement</option>
            <option value="Email">Email</option>
            <option value="Other">Other</option>
          </select>
          <select
            className="input"
            name="salesAgent"
            value={formData.salesAgent}
            onChange={handleChange}
            required
          >
            <option>
              {formData.salesAgent === ""
                ? "Select a Lead Agent"
                : location.state
                ? location.state.salesAgent.name
                : "Select a Lead Agent"}
            </option>
            {salesAgent.map((m) => (
              <option key={m.name} value={m._id}>
                {m.name}
              </option>
            ))}
          </select>
          <select
            className="input"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option>Select a Lead Status</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Qualified">Qualified</option>
            <option value="Proposal Sent">Proposal Sent</option>
            <option value="Closed">Closed</option>
          </select>
          <select
            className="input"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            required
          >
            <option>Select a Priority Level</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <input
            className="input"
            name="timeToClose"
            type="number"
            placeholder="Time To Close"
            value={formData.timeToClose}
            onChange={handleChange}
            required
          />
          <input
            className="input"
            name="tags"
            type="text"
            placeholder="Tags"
            value={formData.tags}
            onChange={handleChange}
            required
          />
          <button className="addBtn" type="submit">
            {!location.state ? "Create Lead" : "Update Lead"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddLead;
