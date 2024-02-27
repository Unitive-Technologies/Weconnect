import React from "react";

function Count({
  ftaCount,
  paychannelCount,
  ncfCount,
  totalChannel,
  totalRate,
}) {
  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      <div style={{ borderRight: "1px solid grey", paddingRight: "20px" }}>
        <div>
          FTA Count: {ftaCount} | Pay Channel Count: {paychannelCount}
        </div>
        <div>
          NCF Channels: {ncfCount} | Total Channels: {totalChannel}
        </div>
      </div>
      <div>
        <div>Total: {parseFloat(totalRate).toFixed(2)}</div>
      </div>
    </div>
  );
}

export default Count;
