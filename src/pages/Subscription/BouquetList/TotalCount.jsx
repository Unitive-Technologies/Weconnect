import React from "react";

function TotalCount() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        border: "1px solid grey",
        marginLeft: "25px",
        marginRight: "25px",
      }}
    >
      <div style={{ borderRight: "1px solid grey", paddingRight: "20px" }}>
        <div>Total FTA Count: 0 | Total Pay Channel Count: 0</div>
        <div>Total NCF Channels: 0 | Total Channels: 0</div>
      </div>
      <div>
        <div>Overall Total: 0**</div>
      </div>
    </div>
  );
}

export default TotalCount;
