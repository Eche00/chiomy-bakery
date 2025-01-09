import { FavoriteOutlined, Search } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
    <div className=" fixed w-full bg-black/80 backdrop-blur-sm z-20">
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
            <p className="text-xs font-bold">{user?.name}</p>
          </div>
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

          {/* menu  */}
          <button className=" font-bold text-[24px]">&#9776;</button>
        </section>

        {/* search  */}
        <section>
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
