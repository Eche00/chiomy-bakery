import { Favorite, FavoriteOutlined, Search } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { auth, db } from "../lib/firebase";
import { Avatar } from "../assets";
import { collection, getDocs } from "firebase/firestore";

function Header() {
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
    <div className=" fixed w-full bg-black/80 backdrop-blur-sm z-20 sm:border-b-[0.1px] sm:border-pink-600">
      <header className=" w-[95%] mx-auto py-[20px] flex flex-col gap-[10px] ">
        {/* profile section && like  */}
        <section className=" flex items-center justify-between">
          <div className=" flex gap-[5px] items-center">
            {" "}
            <img
              className=" w-[50px] h-[50px] rounded-full border-2 border-pink-600 "
              src={Avatar}
              alt=""
            />
            <p className="text-xs font-bold sm:hidden">{user?.name}</p>
          </div>

          {/* search  desktop */}
          <section className=" sm:flex hidden flex-1 mx-[50px]">
            <div className="border-2 border-pink-600 w-full rounded-full flex items-center pr-5">
              <input
                className="   bg-transparent py-2 px-5 outline-none flex-1 flex "
                type="text"
              />
              <Search />
            </div>
          </section>
          {/* navigation desktop  */}
          <nav className="  items-centers  gap-[20px]   mx-auto py-[10px] sm:flex hidden flex-1  justify-center">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "flex flex-col items-center justify-center    font-bold text-pink-600"
                  : "flex flex-col items-center justify-center  "
              }>
              <span className="text-sm">Home</span>
            </NavLink>
            <NavLink
              to="/product"
              className={({ isActive }) =>
                isActive
                  ? "flex flex-col items-center justify-center   font-bold text-pink-600"
                  : "flex flex-col items-center justify-center  "
              }>
              <span className="text-sm">Product</span>
            </NavLink>

            <NavLink
              to="/add"
              className={({ isActive }) =>
                isActive
                  ? "flex flex-col items-center justify-center   font-bold text-pink-600"
                  : "flex flex-col items-center justify-center  "
              }>
              <span className="text-sm">Add</span>
            </NavLink>
          </nav>

          <section className="flex items-center gap-[10px]">
            {/* sign in  */}
            {!currentUser && (
              <div className=" my-[10px]">
                <Link
                  to="signin"
                  className="bg-pink-600 px-[25px] py-[10px] text-[12px] font-bold text-white rounded-[10px] my-[10px]">
                  SignIn
                </Link>
              </div>
            )}
            {/* likes  */}
            <div className=" sm:flex hidden">
              <NavLink
                to="/likes"
                className={({ isActive }) =>
                  isActive
                    ? "flex flex-col items-center justify-center   font-bold text-pink-600"
                    : "flex flex-col items-center justify-center  "
                }>
                <span className="text-sm">
                  <Favorite />
                </span>
              </NavLink>
            </div>

            {/* menu  */}
            <button className=" font-bold text-[24px] sm:hidden flex">
              &#9776;
            </button>
          </section>
        </section>
        {/* search  mobile */}
        <section className=" sm:hidden flex">
          <div className="border-2 border-pink-600 w-full rounded-full flex items-center pr-5">
            <input
              className="   bg-transparent py-2 px-5 outline-none flex-1 flex "
              type="text"
            />
            <Search />
          </div>
        </section>
      </header>
    </div>
  );
}

export default Header;
