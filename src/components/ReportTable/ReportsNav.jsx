import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
export default function ReportsNav({ truncatedPath, content }) {
  return (
    <div className="p-4 bg-gray-200 flex justify-between items-center rounded-md shadow-md">
      <div>
        <a
          className="text-[#7367f0d9] hover:underline hover:text-blue-800"
          href="/dashboard"
        >
          Home
        </a>
        <span className="mx-2">|</span>

        <span>
          {truncatedPath.map((item, i) => {
            return (
              <span key={i}>
                {item.charAt(0).toUpperCase() + item.slice(1)}
                <span className="mx-2">|</span>
              </span>
            );
          })}
        </span>
        {content}
      </div>
      <div>
        <Link to="/dashboard">
          <Button variant="contained">Go Back</Button>
        </Link>
      </div>
    </div>
  );
}
