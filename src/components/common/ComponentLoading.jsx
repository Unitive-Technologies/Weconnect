import { CircularProgress } from "@mui/material";
import React from "react";

function ComponentLoading() {
  return (
    <div className="flex justify-center items-center p-5">
      <CircularProgress className=" !text-[#7367f0d9]" />
    </div>
  );
}

export default ComponentLoading;
