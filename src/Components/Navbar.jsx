import { FavoriteOutlined, Home } from "@mui/icons-material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { auth, db } from "../lib/firebase";
import { collection, getDocs } from "firebase/firestore";

function Navbar() {
  const currentUser = auth.currentUser;
  const [user, setUser] = useState({});
  useEffect(() => {
    const userDataRef = collection(db, "users");
    getDocs(userDataRef)
      .then((querySnap) => {
        const userData = querySnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // // filtering the db to check for the id which matches the propertyId
        const filteredUser = userData.find(
          (prop) => prop.id === currentUser.uid
        );

        setUser(filteredUser);
      })
      .catch((error) => {
        console.error("Error retrieving document:", error);
      });
  }, []);

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
          <AddShoppingCartIcon />
          <span className="text-sm">Shop</span>
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
        {user?.email === "echeze00@gmail.com" && (
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
        )}
      </nav>
    </div>
  );
}

export default Navbar;
