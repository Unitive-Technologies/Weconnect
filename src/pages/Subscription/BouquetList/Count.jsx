import React from "react";

function Count() {
  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      <div style={{ borderRight: "1px solid grey", paddingRight: "20px" }}>
        <div>FTA Count: 0 | Pay Channel Count: 0</div>
        <div>NCF Channels: 0 | Total Channels: 0</div>
      </div>
      <div>
        <div>Total: 0</div>
      </div>
    </div>
  );
}

export default Count;
