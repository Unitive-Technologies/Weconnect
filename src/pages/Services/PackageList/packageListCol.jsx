import React from "react";
import { Link } from "react-router-dom";
import { size, map } from "lodash";

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
  return cell.value.map((bbq) => {
    return <p key={bbq.cas_id}>{bbq.name}</p>;
  });
};

const Channels = (cell) => {
  return cell.value.map((channel) => {
    return <p key={channel.cas_id}>{channel.name}</p>;
  });
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
