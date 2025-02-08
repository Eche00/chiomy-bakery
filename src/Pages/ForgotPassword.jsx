import React, { useState } from "react";
import { auth } from "../lib/firebase";
import { Ham } from "../assets";
import { Link } from "react-router-dom";
import { ArrowBackIos, Check, Email } from "@mui/icons-material";
import { sendPasswordResetEmail } from "firebase/auth";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [messageError, setMessageError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess(true);
      setLoading(false);
      setMessageError(false);
    } catch (error) {
      setLoading(false);

      let errorMessage = "An error occurred. Please try again later.";
      if (error.code === "auth/user-not-found") {
        errorMessage = "No user found with this email address.";
      }
      setLoading(false);
      setMessageError(errorMessage);
      console.error("Error resetting password:", error);
    }
  };

  return (
    <div>
      {/* container  */}
      <main className=" relative flex  items-end h-screen overflow-scroll ">
        <Link
          to="/signin"
          className="absolute top-2 left-2 text-white z-50 bg-pink-600 rounded-full p-2 flex items-center justify-center">
          <ArrowBackIos fontSize="medium" />
        </Link>
        <img
          className="w-full h-[300px] object-cover absolute top-0 z-0"
          src={Ham}
          alt=""
        />

        <div className=" bg-black w-full  z-50  h-[70vh] rounded-t-[50px]">
          <h1 className=" text-center font-bold font-serif my-[30px] text-[20px]">
            Forgot Password
          </h1>

          {success ? (
            <div className=" flex flex-col gap-[10px] items-center justify-center w-full">
              <span className=" border-2 border-pink-600 p-3 flex items-center justify-center rounded-full w-fit">
                {" "}
                <Check fontSize="large" />
              </span>
              <p className=" text-center text-[22px] font-extrabold">
                Password reset email sent! Please check your inbox. <br />
              </p>
              <span className=" border-2 border-pink-600 p-3 flex items-center justify-center rounded-full w-fit">
                {" "}
                <Email fontSize="large" />
              </span>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="w-[80%] mx-auto md:w-[40%]">
              <div className=" flex flex-col gap-[5px] my-5">
                <p>Input email:</p>

                <input
                  className=" bg-transparent border-2 border-pink-600 w-full rounded-full px-5 py-2 outline-none"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className=" w-full flex items-center justify-center flex-col">
                <button
                  to="signin"
                  className="bg-pink-600 px-[35px] py-[10px] text-[12px] font-bold text-white rounded-full my-[10px]">
                  {loading ? (
                    <div role="status">
                      <svg
                        aria-hidden="true"
                        className="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-pink-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    "Send Reset Email"
                  )}
                </button>
              </div>
              {messageError && (
                <p className="text-[15px] font-bold text-red-600 text-center">
                  {messageError}
                </p>
              )}
            </form>
          )}
        </div>
      </main>
    </div>
  );
};

export default ForgotPassword;
