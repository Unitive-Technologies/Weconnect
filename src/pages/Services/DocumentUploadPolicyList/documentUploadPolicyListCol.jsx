import React from "react";
import { Link } from "react-router-dom";
import { size, map } from "lodash";

const Name = (cell) => {
  return cell.value ? cell.value : "";
};

const Code = (cell) => {
  return cell.value ? cell.value : "";
};
const PolicyStart = (cell) => {
  return cell.value ? cell.value : "";
};
const PolicyUpload = (cell) => {
  return cell.value ? cell.value : "";
};
const Status = (cell) => {
  return cell.value ? cell.value : "";
};
const Financial = (cell) => {
  return cell.value ? cell.value : "";
};
const Remark = (cell) => {
  return cell.value ? cell.value : "";
};
const Initiated = (cell) => {
  return cell.value ? cell.value : "";
};
const Approved = (cell) => {
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
  PolicyStart,
  PolicyUpload,
  Status,
  Financial,
  Remark,
  Initiated,
  Approved,
  CreatedAt,
  CreatedBy,
};
