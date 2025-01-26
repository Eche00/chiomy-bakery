import React from "react";
import "./Styles.css";
import { AbtImg } from "../assets";
import PageDetails from "./PageDetails";

function About() {
  return (
    <>
      <div className="  my-[50px] max-w-[90%] mx-auto rounded-[20px] bg-pink-600 quicksand">
        <section className=" md:w-[95%] w-[70%] mx-auto py-[40px] flex gap-[30px] md:flex-row flex-col">
          <h1 className=" md:text-[40px] text-[24px] font-[700] flex flex-col gap-[20px] text-center md:hidden ">
            About us
          </h1>
          <img
            className="md:w-[600px] md:h-[600px] h-[235px] object-cover md:rounded-[20px] rounded-[8px] bg-white"
            src={AbtImg}
            alt="about img"
          />

          <div>
            <h1 className=" md:text-[40px] text-[24px] font-[700] md:flex flex-col gap-[20px] text-center hidden  w-full py-[20px]">
              About us
            </h1>
            <section className=" flex flex-col justify-between md:gap-[70px] gap-[20px]">
              <section className="flex flex-col gap-[10px] items-start">
                <h2 className=" md:text-[28px] text-[20px] font-[700] flex flex-col gap-[20px] items-center ">
                  Welcome
                </h2>
                <p className=" md:text-[20px] text-[16px] font-[500] flex flex-col gap-[20px] items-center  md:w-[500px] text-start">
                  Welcome to Chiommy’s Cake and surprises Where Every Bite and
                  Every Surprise Tells a Story!
                </p>
              </section>
              <section className="flex flex-col gap-[10px] items-start ">
                <h2 className=" md:text-[28px] text-[20px] font-[700] flex flex-col gap-[20px] items-center ">
                  Our Mission
                </h2>
                <p className=" md:text-[20px] text-[16px] font-[500] flex flex-col gap-[20px] items-center  md:w-[500px] text-start">
                  At Chiommy’s Cake and Surprises, we’re passionate about making
                  your special moments unforgettable with our wide range of
                  exquisite pastries, creative surprises, and thoughtful gifts.
                  From stunning cakes to curated food trays and custom packages,
                  we bring love and joy to every celebration.
                </p>
              </section>
            </section>
          </div>
        </section>
      </div>
      {/* // part 2 */}
      <PageDetails />
    </>
  );
}

export default About;
