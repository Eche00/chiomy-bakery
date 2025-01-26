import React, { useState } from "react";
import { Contactus } from "../assets";

function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // error and loading
  const [error, setError] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [success, setSucesss] = useState(false);

  // Handle form field changes
  const handleChange = (e) => {
    setError(false);
    setSucesss(false);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log(formData);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    setImgError(false);
    setSucesss(false);

    if (files.length <= 0) {
      return;
    }
    try {
      // Reset the form after successful submission
      setFormData({
        name: "",
        email: "",
        message: "",
      });
      setLoading(false);
      setError(false);
      setSucesss(true);
      setTimeout(() => {
        setSucesss(false);
      }, 2000);
    } catch (e) {
      console.error("Error adding document: ", e);
      setError(true);
      setSucesss(false);
    }
  };
  return (
    <div className=" w-full">
      <div className="  my-[50px] max-w-[90%] mx-auto rounded-[20px] border-2 border-pink-600 quicksand sm:mb-0 mb-[100px]">
        <section className=" sm:w-[95%] w-[90%] mx-auto py-[40px] flex gap-[30px] sm:flex-row flex-col">
          <img
            className="sm:w-[600px] sm:h-[600px] h-[235px] object-cover sm:rounded-[20px] rounded-[8px] bg-white"
            src={Contactus}
            alt="Contact us img"
          />

          {/* section 2  */}
          <section className=" sm:w-[95%] w-[100%] mx-auto pt-[40px] flex gap-[30px] sm:flex-row flex-col">
            <h1 className=" sm:text-[40px] text-[24px] font-[700] flex flex-col gap-[20px] text-center sm:hidden ">
              Contact Us
            </h1>
            <form
              className="w-[90%] mx-auto overflow-scroll  h-fit pb-0 "
              onSubmit={handleSubmit}>
              <div className=" flex flex-col gap-[5px] my-5">
                <h1 className=" sm:text-[40px] text-[24px] font-[700] sm:flex flex-col gap-[20px] text-center hidden ">
                  Contact Us
                </h1>
                <p>Name</p>
                <input
                  className=" bg-transparent border-2 border-pink-600 w-full rounded-full px-5 py-2 outline-none"
                  type="text"
                  name="name"
                  id="name"
                  onChange={handleChange}
                  value={formData.name}
                  required
                />
              </div>
              <div className=" flex flex-col gap-[5px] my-5">
                <p>Email</p>
                <input
                  className=" bg-transparent border-2 border-pink-600 w-full rounded-full px-5 py-2 outline-none"
                  type="email"
                  name="email"
                  onChange={handleChange}
                  id="email"
                  value={formData.email}
                  required
                />
              </div>

              <div className=" flex flex-col gap-[5px] my-5">
                <p>Message</p>

                <textarea
                  className=" bg-transparent border-2 border-pink-600 w-full rounded-[10px] px-5 py-2 outline-none"
                  name="message"
                  id="message"
                  cols="30"
                  onChange={handleChange}
                  rows="10"
                  required
                  value={formData.message}></textarea>
              </div>

              <button
                className="bg-pink-600  py-[15px] text-[16px] font-bold text-white rounded-full my-[10px] w-full"
                type="submit">
                {loading ? "Submitting..." : "Submit"}
              </button>
              {error && (
                <p className=" text-lg  py-[5px] text-red-600 text-center font-bold">
                  Error uploading form <br />
                  <span className="text-sm text-white">please try again !</span>
                </p>
              )}
            </form>
          </section>
        </section>
      </div>
    </div>
  );
}

export default ContactUs;
