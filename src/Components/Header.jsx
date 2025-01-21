import {
  Cancel,
  CancelOutlined,
  Close,
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
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "flex flex-col items-center justify-center   font-bold text-pink-600"
                  : "flex flex-col items-center justify-center  "
              }>
              <span className="text-sm">About</span>
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
              <div className="flex sm:hidden fixed w-full top-0 left-0 bg-black/50 backdrop-blur-sm h-[100vh] ">
                <section className=" bg-[#07010D] w-[70%] h-full  ml-auto px-[20px] py-[10px] relative overflow-hidden   flex justify-between">
                  <div className=" flex flex-col  text-[14px] font-[600] gap-[20px]  w-full z-50  justify-between">
                    {/* logo  */}

                    <nav className=" flex flex-col  text-[14px] font-[600] gap-[40px] pb-[40px] z-50 border-b-[0.5px] border-white h-fit w-[70%] pt-[50px]">
                      <>
                        <NavLink
                          to="/"
                          className={({ isActive }) =>
                            isActive ? "   font-bold text-pink-600" : "  "
                          }>
                          <span className="text-sm">Home</span>
                        </NavLink>
                        <NavLink
                          to="/about"
                          className={({ isActive }) =>
                            isActive ? "   font-bold text-pink-600" : "  "
                          }>
                          <span className="text-sm">About</span>
                        </NavLink>
                        <NavLink
                          to="/product"
                          className={({ isActive }) =>
                            isActive ? "   font-bold text-pink-600" : "  "
                          }>
                          <span className="text-sm">Product</span>
                        </NavLink>
                        <NavLink
                          to="/contact"
                          className={({ isActive }) =>
                            isActive ? "   font-bold text-pink-600" : "  "
                          }>
                          <span className="text-sm">Contact</span>
                        </NavLink>
                      </>
                    </nav>

                    <section className=" flex flex-col justify-between h-full ">
                      {!currentUser ? (
                        <div>
                          <section className=" flex flex-col justify-between h-full ">
                            <Link
                              to="signin"
                              className=" py-[5px] px-[10px] border opacity-90 rounded-[5px] max-w-[70%]">
                              SignIn
                            </Link>
                          </section>
                        </div>
                      ) : (
                        <div>
                          <section className=" flex flex-col justify-between h-full ">
                            <button
                              className=" py-[5px] px-[10px] border opacity-90 rounded-[5px] max-w-[70%]"
                              onClick={handleSignOut}>
                              SignOut
                            </button>
                          </section>
                        </div>
                      )}
                    </section>
                    <p className=" text-sm font-serif capitalize">
                      chiomy's Bakery
                    </p>
                  </div>
                  <span className="  z-50  " onClick={() => setNav(!nav)}>
                    <Close fontSize="medium" />
                  </span>
                </section>
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
