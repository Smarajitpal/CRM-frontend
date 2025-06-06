import { useEffect, useState } from "react";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addAgentAsync,
  fetchAgents,
} from "../features/SalesAgent/salesAgentSlice";
function AddAgent() {
  const dispatch = useDispatch();
  const { salesAgent } = useSelector((state) => state.salesAgent);

  const [agentName, setAgentName] = useState("");
  const [agentEmail, setAgentEmail] = useState("");
  const [check, setCheck] = useState(false);
  const [success, setSuccess] = useState(false);

  function handleClick() {
    const existingAgent = salesAgent.find(
      (a) =>
        a.name.toLowerCase() === agentName.toLowerCase() ||
        a.email === agentEmail
    );
    if (existingAgent) {
      setCheck(true);
      return;
    } else {
      setCheck(false);
      const agentData = { name: agentName, email: agentEmail };
      dispatch(addAgentAsync(agentData));
      setSuccess(true);
      setAgentName("");
      setAgentEmail("");
    }
  }

  useEffect(() => {
    dispatch(fetchAgents());
  }, [dispatch]);
  return (
    <div className="container">
      <div>
        <h1 className="heading">Add New Sales Agent</h1>
      </div>
      <div className="form container">
        <input
          type="text"
          placeholder="Full Name"
          className="input"
          value={agentName}
          onChange={(e) => setAgentName(e.target.value)}
        />
        <input
          type="email"
          placeholder="example@test.com"
          className="input"
          value={agentEmail}
          onChange={(e) => setAgentEmail(e.target.value)}
        />
        {check && <p className="error-text">Name or Email Alredy exist.</p>}
        <button className="addBtn" onClick={handleClick}>
          Create Agent
        </button>
        {success && <p className="success-text">Agent Created Successfully!</p>}
      </div>
    </div>
  );
}

export default AddAgent;
