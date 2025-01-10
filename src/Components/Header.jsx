import {
  Cancel,
  CancelOutlined,
  Favorite,
  FavoriteOutlined,
  Search,
} from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { auth, db } from "../lib/firebase";
import { Avatar } from "../assets";
import { collection, getDocs } from "firebase/firestore";
import { signOut } from "firebase/auth";

function Header() {
  const currentUser = auth.currentUser;
  const [user, setUser] = useState({});
  const [nav, setNav] = useState(false);
  const navigate = useNavigate();
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

  const handleSignOut = (e) => {
    e.preventDefault();
    try {
      signOut(auth).then(() => {
        console.log("user logged out");
        navigate("/signin");
      });
    } catch (error) {
      console.log("Error:", error);
    }
  };
  return (
    <div className=" overflow-visible fixed w-full bg-black/80 backdrop-blur-sm z-20 sm:border-b-[0.1px] sm:border-pink-600">
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
            <button
              className=" font-bold text-[24px] sm:hidden flex"
              onClick={() => setNav(true)}>
              &#9776;
            </button>
            {nav && (
              <div className="w-full bg-black/80 backdrop-blur-sm fixed top-0 left-0  h-[100vh] flex  justify-end  ">
                {" "}
                <section className="  w-[70%] bg-pink-600  text-white  z-50  px-[20px] py-[30px] flex flex-col gap-[30px]">
                  <span
                    className="absolute left-[5px] top-[5px] text-pink-600 "
                    onClick={() => setNav(false)}>
                    <CancelOutlined fontSize="large" />
                  </span>
                  <section className=" sm:hidden flex">
                    <div className="border-2 border-black w-full rounded-full flex items-center pr-5">
                      <input
                        className="   bg-transparent py-2 px-5 outline-none flex-1 flex "
                        type="text"
                      />
                      <span className=" text-black">
                        <Search />
                      </span>
                    </div>
                  </section>
                  <ul>
                    <li>hekko</li>
                    <li>hekko</li>
                    {!currentUser ? (
                      <div className=" my-[10px]">
                        <Link
                          to="signin"
                          className="bg-black px-[25px] py-[10px] text-[12px] font-bold text-white rounded-[10px] my-[10px]">
                          SignIn
                        </Link>
                      </div>
                    ) : (
                      <div className=" my-[10px]">
                        <Link
                          to="signin"
                          className="bg-black px-[25px] py-[10px] text-[12px] font-bold text-white rounded-[10px] my-[10px]"
                          onClick={handleSignOut}>
                          SignOut
                        </Link>
                      </div>
                    )}
                  </ul>
                </section>{" "}
              </div>
            )}
            {/* nav for mobile  */}
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
