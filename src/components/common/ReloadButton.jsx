import React from "react";
import { AiOutlineReload } from "react-icons/ai";

function ReloadButton({ functions }) {
  return (
    <button
      onClick={() => {
        functions();
      }}
      className="bg-[#7367f0d9] hover:bg-[#544caed9] duration-300 shadow  text-white rounded-full p-1 hover:rotate-[360deg] "
    >
      <AiOutlineReload />
    </button>
  );
}

export default ReloadButton;
