import React from "react";
import { Link } from "react-router-dom";
import { size, map } from "lodash";

const Name = (cell) => {
  return cell.value ? cell.value : "";
};

const Code = (cell) => {
  return cell.value ? cell.value : "";
};

const Contact = (cell) => {
  return cell.value ? cell.value : "";
};

const Mobile = (cell) => {
  return cell.value ? cell.value : "";
};

const Description = (cell) => {
  return cell.value ? cell.value : "";
};

const Address = (cell) => {
  return cell.value ? cell.value : "";
};

const RegionalOffice = (cell) => {
  return cell.value ? cell.value : "";
};

const LCO = (cell) => {
  return cell.value ? cell.value : "";
};

const LcoCode = (cell) => {
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

export {
  Name,
  Code,
  Contact,
  Mobile,
  Address,
  Description,
  RegionalOffice,
  LCO,
  LcoCode,
  Status,
  CreatedAt,
  CreatedBy,
};
