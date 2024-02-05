import React from "react";
import { Link } from "react-router-dom";
import { size, map } from "lodash";

const Name = (cell) => {
  return cell.value ? cell.value : "";
};

const Code = (cell) => {
  return cell.value ? cell.value : "";
};

const Broadcaster = (cell) => {
  return cell.value ? cell.value : "";
};

const Type = (cell) => {
  return cell.value ? cell.value : "";

};

const FTA = (cell) => {
  return cell.value ? cell.value : "";
};

const Channels = (cell) => {
  return (
    <p
      style={{
        maxWidth: 300,
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        paddingTop: 15,
      }}
    >
      {cell.value ? cell.value : ""}
    </p>
  );
};

const Status = (cell) => {
  return cell.value ? cell.value : "";
};

const Rate = (cell) => {
  return cell.value ? cell.value : "";
};

const CreatedAt = (cell) => {
  return cell.value ? cell.value : "";
};

const CreatedBy = (cell) => {
  return cell.value ? cell.value : "";
};
export {
  Name,
  Code,
  Broadcaster,
  Type,
  FTA,
  Channels,
  Status,
  Rate,
  CreatedAt,
  CreatedBy,
};
