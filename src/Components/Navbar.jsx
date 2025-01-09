import {
  FavoriteOutlined,
  Home,
  ProductionQuantityLimits,
} from "@mui/icons-material";
import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <div className=" fixed bottom-0 w-full bg-pink-600  rounded-t-[10px] sm:hidden flex">
      <nav className=" flex items-center justify-between w-[80%] mx-auto py-[10px]">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "flex flex-col items-center justify-center   font-bold"
              : "flex flex-col items-center justify-center  "
          }>
          <Home />
          <span className="text-sm">Home</span>
        </NavLink>
        <NavLink
          to="/product"
          className={({ isActive }) =>
            isActive
              ? "flex flex-col items-center justify-center   font-bold"
              : "flex flex-col items-center justify-center  "
          }>
          <ProductionQuantityLimits />
          <span className="text-sm">Home</span>
        </NavLink>
        <NavLink
          to="/likes"
          className={({ isActive }) =>
            isActive
              ? "flex flex-col items-center justify-center   font-bold"
              : "flex flex-col items-center justify-center  "
          }>
          <FavoriteOutlined />
          <span className="text-sm">Likes</span>
        </NavLink>
        <NavLink
          to="/add"
          className={({ isActive }) =>
            isActive
              ? "flex flex-col items-center justify-center   font-bold"
              : "flex flex-col items-center justify-center  "
          }>
          <span className="text-[16px] font-bold">+</span>
          <span className="text-sm">Add</span>
        </NavLink>
      </nav>
    </div>
  );
}

export default Navbar;
