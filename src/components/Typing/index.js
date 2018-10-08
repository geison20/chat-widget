import React from "react";
import ReactLoading from "react-loading";

const Typing = ({ agentName }) => (
  <div className="agent-typing">
    <span>{agentName} está digitando</span>
    <ReactLoading
      color="#000000"
      type="bubbles"
      height={40}
      width={40}
      className="typingClientName"
    />
  </div>
);

export default Typing;
