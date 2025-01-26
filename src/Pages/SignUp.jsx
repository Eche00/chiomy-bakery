import React, { useEffect, useState } from "react";
import { Ham } from "../assets";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { HandleRegisteration } from "../lib/reLogic";
import { ArrowBackIos } from "@mui/icons-material";

function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    likes: [],
  });

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // handling form inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
    setError("");
    setLoading("");
  };
  // handling form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await HandleRegisteration(formData);
      navigate("/");
      setLoading(false);
    } catch (error) {
      console.log("Error:", error);
      setLoading(false);
      setError("Error Registering account, please try again !");
    } finally {
      setLoading(false);
    }
  };

  // handling if user is logged in
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/");
      }
    });
    return () => unSubscribe();
  }, [navigate]);
  return (
    <div>
      {/* container  */}
      <main className=" relative flex  items-end h-screen overflow-hidden">
        <img
          className="w-full h-[300px] object-cover absolute top-0 z-0"
          src={Ham}
          alt=""
        />
        <Link
          to="/"
          className="absolute top-2 left-2 text-white z-50 bg-pink-600 rounded-full py-3  px-[10px]">
          <ArrowBackIos fontSize="medium" />
        </Link>
        <div className=" bg-black w-full  z-50  h-[70vh] rounded-t-[50px]">
          <h1 className=" text-center font-bold font-serif my-[30px] text-[20px]">
            Sign up
          </h1>

          <form onSubmit={handleSubmit} className="w-[80%] mx-auto md:w-[40%]">
            <div className=" flex flex-col gap-[5px] my-5">
              <p>Name:</p>
              <input
                className=" bg-transparent border-2 border-pink-600 w-full rounded-full px-5 py-2 outline-none"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className=" flex flex-col gap-[5px] my-5">
              <p>Email:</p>
              <input
                className=" bg-transparent border-2 border-pink-600 w-full rounded-full px-5 py-2 outline-none"
                value={formData.email}
                type="email"
                name="email"
                onChange={handleChange}
              />
            </div>
            <div className=" flex flex-col gap-[5px] my-5">
              <p>Password:</p>
              <input
                className=" bg-transparent border-2 border-pink-600 w-full rounded-full px-5 py-2 outline-none"
                value={formData.password}
                type="password"
                name="password"
                onChange={handleChange}
              />
            </div>
            <div className=" w-full flex items-center justify-center flex-col">
              <button
                to="signin"
                className="bg-pink-600 px-[35px] py-[10px] text-[12px] font-bold text-white rounded-full my-[10px]">
                {loading ? "Loading..." : "Sign Up"}
              </button>
              {error && (
                <p className="text-[15px] font-bold text-red-600">{error}</p>
              )}
            </div>
            <p className="text-sm text-center">
              Have an account ?{" "}
              <Link to="/signin" className=" underline text-pink-600">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}

export default SignUp;
