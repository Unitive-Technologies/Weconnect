import React from "react";
import { Link } from "react-router-dom";
import { size, map } from "lodash";

const Name = (cell) => {
  return cell.value ? cell.value : "";
};

const Code = (cell) => {
  return cell.value ? cell.value : "";
};

const BoxType = (cell) => {
  return cell.value ? cell.value : "";
};

const Brand = (cell) => {
  return cell.value ? cell.value : "";
};
const CharLength = (cell) => {
  return cell.value ? cell.value : "";
};
const Significant = (cell) => {
  return cell.value ? cell.value : "";
};
const Allowed = (cell) => {
  return cell.value ? cell.value : "";
};
const Cas = (cell) => {
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
  BoxType,
  Brand,
  CharLength,
  Significant,
  Allowed,
  Cas,
  Status,
  CreatedAt,
  CreatedBy,
};
