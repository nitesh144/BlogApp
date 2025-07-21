// import React from 'react'

import { Link } from "react-router-dom";
import { Avatar } from "./BlogCard";

const Appbar = () => {
  return (
    <div className="border-b border-slate-200 px-10 py-2 flex justify-between">
      <Link
        to={"/blogs"}
        className="cursor-pointer flex justify-center flex-col"
      >
        Medium Blog
      </Link>
      <div className="flex gap-5 justify-center flex-row">
        <Link to={'/publish'}>
          <button
            type="button"
            className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-4 text-center cursor-pointer me-2 mb-2 "
          >
            New
          </button>
        </Link>
        <div className="w-10 h-10 flex flex-col justify-center">
          <Avatar name="Nitesh" />
        </div>
      </div>
    </div>
  );
};

export default Appbar;
