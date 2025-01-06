import React, { useEffect, useState } from "react";
import { Ham } from "../assets";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";

function SignIn() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  // handling form inputs
  const [emaill, setEmaill] = useState("");
  const [passwordl, setPasswordl] = useState("");
  const navigate = useNavigate();

  // handle sign in
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, emaill, passwordl);
      navigate("/");
    } catch (error) {
      setLoading(false);
      setError("Invalid user cresidentials");
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
          className="w-full h-[250px] object-cover absolute top-0 z-0"
          src={Ham}
          alt=""
        />

        <div className=" bg-black w-full  z-50  h-[70vh] rounded-t-[50px]">
          <h1 className=" text-center font-bold font-serif my-[30px] text-[20px]">
            Sign in
          </h1>

          <form onSubmit={handleLogin} className="w-[80%] mx-auto">
            <div className=" flex flex-col gap-[5px] my-5">
              <p>Email:</p>
              <input
                className=" bg-transparent border-2 border-pink-600 w-full rounded-full px-5 py-2 outline-none"
                type="text"
                name="email"
                onChange={(e) => setEmaill(e.target.value)}
              />
            </div>
            <div className=" flex flex-col gap-[5px] my-5">
              <p>Password:</p>
              <input
                className=" bg-transparent border-2 border-pink-600 w-full rounded-full px-5 py-2 outline-none"
                type="text"
                value={passwordl}
                onChange={(e) => setPasswordl(e.target.value)}
              />
            </div>
            <div className=" w-full flex items-center justify-center flex-col">
              <button
                to="signin"
                className="bg-pink-600 px-[35px] py-[10px] text-[12px] font-bold text-white rounded-full my-[10px]">
                {loading ? "Loading..." : "Sign In"}
              </button>
              {error && (
                <p className="text-[15px] font-bold text-red-600">{error}</p>
              )}
            </div>
            <p className="text-sm text-center">
              Don't have an account ?{" "}
              <Link to="/signup" className=" underline text-pink-600">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}

export default SignIn;
