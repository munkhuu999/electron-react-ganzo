import React from "react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className=" w-1/3 h-10 flex justify-center, items-center">
      <span className=" bg-red-200 p-5 rounded-full cursor-pointer, hover:bg-blue-300 active:bg-indigo-400 ">
        <Link to="/Subgroup">Нүүр</Link>
      </span>
    </div>
  );
};

export default Index;
