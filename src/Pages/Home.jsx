import React, { useState } from "react";
import { Ham } from "../assets";
import Cakes from "../Categories/Cakes";
import GiftPacks from "../Categories/GiftPacks";
import Decorations from "../Categories/Decorations";
import Breads from "../Categories/Breads";
import Pastries from "../Categories/Pastries";
import PageDetails from "./PageDetails";

function Home() {
  const [cakes, setCakes] = useState(true);
  const [pastries, setPastries] = useState(false);
  const [breads, setBreads] = useState(false);
  const [decorations, setDecorations] = useState(false);
  const [giftPacks, setGiftPacks] = useState(false);

  const handleCake = (e) => {
    e.preventDefault();
    setPastries(false);
    setCakes(true);
    setBreads(false);
    setDecorations(false);
    setGiftPacks(false);
  };
  const handlePastries = (e) => {
    e.preventDefault();
    setCakes(false);
    setPastries(true);
    setBreads(false);
    setDecorations(false);
    setGiftPacks(false);
  };
  const handleBreads = (e) => {
    e.preventDefault();
    setPastries(false);
    setCakes(false);
    setBreads(true);
    setDecorations(false);
    setGiftPacks(false);
  };
  const handleDecorations = (e) => {
    e.preventDefault();
    setPastries(false);
    setCakes(false);
    setBreads(false);
    setDecorations(true);
    setGiftPacks(false);
  };
  const handleGiftPacks = (e) => {
    e.preventDefault();
    setPastries(false);
    setCakes(false);
    setBreads(false);
    setDecorations(false);
    setGiftPacks(true);
  };
  return (
    <div>
      {/* container  */}
      <div className="w-[95%] mx-auto py-[20px]">
        <section>
          <img
            className="w-full sm:h-[500px] h-[300px] rounded-[10px] object-cover"
            src={Ham}
            alt=""
          />
        </section>
        {/* button section  */}
        <section className="  my-[30px]  overflow-scroll w-full">
          <div className=" flex items-center gap-[10px] w-fit overflow-scroll">
            <button
              onClick={handleCake}
              className={
                cakes
                  ? "bg-pink-600 w-[120px] py-[10px] rounded-full text-[14px] font-bold duration-300 "
                  : "border-2 border-pink-600 w-[120px] py-[10px] rounded-full text-[14px] font-bold duration-300"
              }>
              Cake
            </button>
            <button
              onClick={handlePastries}
              className={
                pastries
                  ? "bg-pink-600 w-[120px] py-[10px] rounded-full text-[14px] font-bold duration-300"
                  : "border-2 border-pink-600 w-[120px] py-[10px] rounded-full text-[14px] font-bold duration-300"
              }>
              Pastries
            </button>
            <button
              onClick={handleBreads}
              className={
                breads
                  ? "bg-pink-600 w-[120px] py-[10px] rounded-full text-[14px] font-bold duration-300"
                  : "border-2 border-pink-600 w-[120px] py-[10px] rounded-full text-[14px] font-bold duration-300"
              }>
              Breads
            </button>
            <button
              onClick={handleDecorations}
              className={
                decorations
                  ? "bg-pink-600 w-[120px] py-[10px] rounded-full text-[14px] font-bold duration-300"
                  : "border-2 border-pink-600 w-[120px] py-[10px] rounded-full text-[14px] font-bold duration-300"
              }>
              Decorations
            </button>
            <button
              onClick={handleGiftPacks}
              className={
                giftPacks
                  ? "bg-pink-600 w-[120px] py-[10px] rounded-full text-[14px] font-bold duration-300"
                  : "border-2 border-pink-600 w-[120px] py-[10px] rounded-full text-[14px] font-bold duration-300"
              }>
              GiftPacks
            </button>
          </div>
        </section>

        {/* category section  */}
        <section>
          {cakes && <Cakes />}
          {pastries && <Pastries />}
          {breads && <Breads />}
          {decorations && <Decorations />}
          {giftPacks && <GiftPacks />}
          <PageDetails />
        </section>
      </div>
    </div>
  );
}

export default Home;
