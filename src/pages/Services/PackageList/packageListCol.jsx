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
  return cell.value ? cell.value : "";
};

const BBQ = (cell) => {
  return cell.value ? cell.value : "";
};

const Channels = (cell) => {
  return cell.value ? cell.value : "";
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
