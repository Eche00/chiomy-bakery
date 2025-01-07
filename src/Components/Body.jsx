import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function Body() {
  return (
    <div>
      <Header />
      <div className=" pt-[130px]">
        <Outlet />
      </div>
      <Navbar />
    </div>
  );
}

export default Body;
