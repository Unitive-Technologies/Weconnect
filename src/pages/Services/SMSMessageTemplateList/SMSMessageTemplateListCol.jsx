import React from "react";
import { Link } from "react-router-dom";
import { size, map } from "lodash";

const Name = (cell) => {
  return cell.value ? cell.value : "";
};

const Template = (cell) => {
  return cell.value ? cell.value : "";
};

const Category = (cell) => {
  return cell.value ? cell.value : "";
};

const SubCategory = (cell) => {
  return cell.value ? cell.value : "";
};
const Status = (cell) => {
  return cell.value ? cell.value : "";
};
const Sender = (cell) => {
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
  Template,
  Category,
  SubCategory,
  Status,
  Sender,
  CreatedAt,
  CreatedBy,
};
