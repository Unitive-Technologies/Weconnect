import React from "react";
import { Link } from "react-router-dom";
import { size, map } from "lodash";
import { UncontrolledTooltip } from "reactstrap";

const Name = (cell) => {
  return cell.value ? cell.value : "";
};

const Code = (cell) => {
  return cell.value ? cell.value : "";
};

const Type = (cell) => {
  return cell.value ? cell.value : "";
};

const PackageType = (cell) => {
  return cell.value ? cell.value : "";
};

const Status = (cell) => {
  return cell.value ? cell.value : "";
};

const CreatedAt = (cell) => {
  return cell.value ? cell.value : "";
};

const CreatedBy = (cell) => {
  return cell.value ? cell.value : "";
};

const CasCodes = (cell) => {
  return cell.value.map((casCode) => {
    return (
      <p key={casCode.cas_id}>
        {casCode.cas_lbl} ({casCode.cascode})
      </p>
    );
  });
};

const BBQ = (cell) => {
  const bbq = cell.value.map((bbq) => bbq.name).join(", ");
  return (
    <p
      style={{
        maxWidth: 250,
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      }}
    >
      {bbq}
    </p>
  );
};

const Channels = (cell) => {
  const channels = cell.value.map((channel) => channel.name).join(", ");
  return (
    <p
      style={{
        maxWidth: 200,
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      }}
    >
      {channels}
    </p>
  );
};

const Rate = (cell) => {
  return cell.value ? cell.value : "";
};

export {
  Name,
  Code,
  Type,
  PackageType,
  Status,
  CreatedAt,
  CreatedBy,
  CasCodes,
  BBQ,
  Rate,
  Channels,
};
