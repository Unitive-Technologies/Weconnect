import React from "react";
import { Link } from "react-router-dom";
import { size, map } from "lodash";

const Name = (cell) => {
  return cell.value ? cell.value : "";
};

const Code = (cell) => {
  return cell.value ? cell.value : "";
};

const StateType = (cell) => {
  return cell.value ? cell.value : "";
};

const Description = (cell) => {
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

export { Name, Code, StateType, Description, Status, CreatedAt, CreatedBy };
