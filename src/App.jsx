import React, { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Body from "./Components/Body";
import Home from "./Pages/Home";
import Product from "./Pages/Product";
import Likes from "./Pages/Likes";
import AddProduct from "./Pages/AddProduct";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import { auth } from "./lib/firebase";
import { Cakes, Gifts, Ham, Pastries } from "./assets";
import About from "./Pages/About";
import ContactUs from "./Pages/ContactUs";
import ScrollToTop from "./Components/ScrollToTop";

function App() {
  const currentUser = auth.currentUser;
  const [home, setHome] = useState(true);

  useEffect(() => {
    if (currentUser) {
      setHome(false);
    }
  }, [window]);
  return (
    <div className=" h-screen bg-black overflow-hidden">
      {home ? (
        <div className=" bg-black text-white h-[100vh] relative overflow-hidden">
          {" "}
          <div className=" flex items-center justify-center gap-[15px] flex-col h-full">
            {/* image section  */}
            <section className=" flex gap-[10px] items-baseline">
              <img
                className="w-[100px] h-[100px] rounded-full border-2 border-pink-600"
                src={Cakes}
                alt=""
              />
              <img
                className="w-[80px] h-[80px] rounded-full border-2 border-pink-600"
                src={Pastries}
                alt=""
              />
              <img
                className="w-[60px] h-[60px] rounded-full border-2 border-pink-600"
                src={Gifts}
                alt=""
              />
            </section>
            {/* write up  */}
            <h1 className="text-[16px] font-[400">
              Welcome to{" "}
              <span className="text-[20px] font-bold font-serif">
                Chiomy's bakery
              </span>
            </h1>
            {/* button  */}
            <button
              className="bg-pink-600 px-[25px] py-[10px] text-[16px] font-bold text-white rounded-full my-[10px]"
              onClick={() => setHome(false)}>
              Get started
            </button>
          </div>
          {/* bg animation design */}
          <span className="w-[200px] h-[200px] bg-pink-600 rounded-full absolute top-[-50px] left-[-50px]"></span>
          <span className="w-[200px] h-[200px] bg-pink-600 rounded-full absolute bottom-[-50px] right-[-50px]"></span>
        </div>
      ) : (
        <div className=" bg-black text-white  h-[100vh] overflow-scroll relative ">
          <Router>
            <ScrollToTop />

            <Routes>
              <Route element={<Body />}>
                <Route index element={<Home />} />

                <Route path="/product" element={<Product />} />
                <Route path="/likes" element={<Likes />} />
                <Route path="/add" element={<AddProduct />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<ContactUs />} />
              </Route>
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
            </Routes>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
