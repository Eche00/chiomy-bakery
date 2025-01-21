import React from "react";
import "./Styles.css";

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
            src=""
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
      <div className=" max-w-[1500px] mx-auto p-5 ">
        {/*detail*/}
        <div className=" my-20 flex sm:flex-row flex-col md:gap-[20px] gap-[50px]">
          <article className=" sm:text-3xl sm:p-10 text-xl shadow-md shadow-pink-600 rounded-xl     overflow-scroll hover:scale-[102%] transition-scale duration-300 flex-1">
            {" "}
            <h1 className=" text-pink-600 text-2xl font-bold text-center">
              Our Pastries
            </h1>
            <p className=" p-2 text-slate-600 font-semibold text-sm text-start">
              Our cakes are freshly baked and designed to add a magical touch to
              every occasion. We offer:
            </p>
            <ul className=" p-2 text-slate-600 font-semibold text-sm text-start flex flex-col gap-[5px] list-disc list-inside">
              <li>Single-layer cakes</li>
              <li>Double-layer cakes</li>
              <li>Tiered cakes</li>
              <li>Round cakes</li>
              <li>Square cakes</li>
              <li>Heart-shaped cakes</li>
              <li>Photo cakes</li>
            </ul>
            <p className=" p-2 text-slate-600 font-semibold text-sm text-start">
              Available in flavors like vanilla, chocolate, butterscotch, red
              velvet, marble, and strawberry, our cakes are finished with
              buttercream, whipped cream (ice cream), or Swiss meringue
              buttercream to suit your style and taste.
            </p>
          </article>
          <article className=" sm:text-3xl sm:p-10 text-xl shadow-md shadow-pink-600 rounded-xl     overflow-scroll hover:scale-[102%] transition-scale duration-300 flex-1">
            {" "}
            <h1 className=" text-pink-600 text-2xl font-bold text-center">
              Our Surprises
            </h1>
            <p className=" p-2 text-slate-600 font-semibold text-sm text-start">
              We go beyond cakes to create unforgettable experiences. Here’s
              what we offer:
            </p>
            <ul className=" p-2 text-slate-600 font-semibold text-sm text-start flex flex-col gap-[10px] list-disc list-inside">
              <li>
                <b>Food Trays: </b>{" "}
                <span>
                  Beautifully curated food trays featuring a mix of delicious
                  treats, perfect for gifting or personal indulgence.
                </span>
              </li>
              <li>
                <b>Gift Items: </b>
                <span>
                  Chocolates, teddy bears, wines, champagnes, balloons, and
                  more.
                </span>
              </li>
              <li>
                <b>Proposal Surprises: </b>
                <span>
                  Make your “Will You Marry Me” moment truly magical with our
                  personalized surprise setups.
                </span>
              </li>
              <li>
                <b>Custom Frames: </b>
                <span>
                  We create all types of frames, photo frames, personalized gift
                  frames, wall art frames, and decorative frames to help you
                  preserve memories and elevate your decor.
                </span>
              </li>
              <li>
                <b>Curated Surprise Packages: </b>
                <span>
                  Tailored packages for birthdays, anniversaries, proposals, and
                  other special occasions.
                </span>
              </li>
            </ul>
          </article>
        </div>
        {/*opt*/}
        <div className=" flex flex-col gap-20 mb-[100px]">
          <div className="  flex-1 flex sm:flex-row flex-col   gap-10">
            <img
              className="sm:w-[20%] w-full h-[400px] object-cover sm:rounded-t-full  rounded-md hover:scale-[102%] translate-scale duration-300 bg-white"
              src="img"
              alt=""
            />
            <div className=" flex-1 flex-col h-fit my-auto">
              <h1 className=" text-2xl  text-pink-600 font-bold my-5  font-serif">
                Why Choose{" "}
                <span className=" text-white text-2xl sm:text-6xl">Us?</span>
              </h1>
              <div className="flex flex-col gap-[20px]">
                <p className="  text-white font-semibold text-sm text-start flex  flex-wrap  sm:w-[400px]">
                  <b>Fast & Reliable Delivery:</b> We have successfully
                  delivered to various locations across Enugu State, Nigeria,
                  including Independence Layout, New Haven, GRA, Trans Ekulu,all
                  parts of Nsukka, Enugu Ezike, Ogui Road, Abakpa, Achara
                  Layout, and more.
                </p>
                <ul className=" p-2 text-slate-600 font-semibold text-sm text-start flex flex-col gap-[10px] list-disc list-inside">
                  <li>
                    <b>24/7 Service: </b>
                    <span>
                      Open every day, including Sundays and public holidays, for
                      your convenience.
                    </span>
                  </li>

                  <li>
                    <b>Unmatched Quality: </b>
                    <span>
                      Our skilled bakers use only the freshest ingredients and
                      modern techniques to create exceptional products.
                    </span>
                  </li>
                  <li>
                    <b> Outstanding Customer Care: </b>
                    <span>
                      We are dedicated to providing an unparalleled experience
                      for every customer.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/*opt 2*/}
          <div className="  flex-1 flex sm:flex-row flex-col   gap-10">
            <img
              className="sm:w-[20%] w-full h-[400px] object-cover sm:rounded-t-full  rounded-md hover:scale-[102%] translate-scale duration-300 bg-white"
              src="img"
              alt=""
            />
            <div className=" flex-1 flex-col h-fit my-auto">
              <h1 className=" text-2xl  text-pink-600 font-bold my-5  font-serif">
                Perfect for Every{" "}
                <span className=" text-white text-2xl sm:text-6xl">
                  Occasion
                </span>
              </h1>
              <div className="flex flex-col gap-[20px]">
                <p className="  text-white font-semibold text-sm text-start flex  flex-wrap  sm:w-[400px]">
                  Whether you’re near or far, you can celebrate your loved ones
                  with Chiommy’s Cake and Surprises. From anywhere in the world:
                  UK, UAE, Canada, India etc you can send cakes, food trays, and
                  surprises to your family and friends within Enugu, Nigeria.{" "}
                </p>
                <p className="  text-white font-semibold text-sm text-start flex  flex-wrap  sm:w-[400px]">
                  <b>We cater to all types of occasions, including:</b>
                </p>
                <ul className=" p-2 text-slate-600 font-semibold text-sm text-start flex flex-col gap-[10px] list-disc list-inside">
                  <li>
                    <b>Birthdays: </b>
                    <span>
                      Custom cakes, cupcakes, and surprise packages for kids,
                      friends, and loved ones.
                    </span>
                  </li>

                  <li>
                    <b>Weddings: </b>
                    <span>
                      Elegant tiered cakes and thoughtful gifts for your big
                      day.
                    </span>
                  </li>
                  <li>
                    <b>Anniversaries: </b>
                    <span>
                      Celebrate milestones with our signature cakes and curated
                      surprises.
                    </span>
                  </li>
                  <li>
                    <b>Proposals: </b>
                    <span>
                      Let us help you plan the perfect “Will You Marry Me”
                      surprise.
                    </span>
                  </li>
                  {/* flex wrap  */}
                  <div className="flex flex-wrap gap-[10px]">
                    <li>
                      <b>Graduations </b>
                    </li>
                    <li>
                      <b>Baby Showers </b>
                    </li>
                    <li>
                      <b>Housewarmings </b>
                    </li>
                    <li>
                      <b>Romantic Surprises </b>
                    </li>
                    <li>
                      <b>Corporate Events </b>
                    </li>
                  </div>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* // part 3 */}
      <div className=" max-w-[1500px] mx-auto p-5 ">
        <div className=" my-20 flex  flex-col md:gap-[20px] gap-[50px]">
          <article className=" sm:text-3xl sm:p-10 text-xl shadow-md shadow-pink-600 rounded-xl     overflow-scroll hover:scale-[102%] transition-scale duration-300 flex-1">
            {" "}
            <h1 className=" text-pink-600 text-2xl font-bold text-center">
              How to Order
            </h1>
            <p className=" p-2 text-slate-600 font-semibold text-sm text-start">
              Placing an order is quick and stress-free! Explore our offerings
              on our website or contact us via phone or WhatsApp at +234 813 159
              0672.
            </p>
            <p className=" p-2 text-slate-600 font-semibold text-sm text-start">
              With our swift and reliable delivery services, your cakes, food
              trays, and surprises will reach your loved ones right on time,
              adding a touch of joy to their day.
            </p>
          </article>
          {/* sub part  */}
          <article className=" sm:text-3xl sm:p-10 text-xl shadow-md md:shadow-pink-600 rounded-xl     overflow-scroll hover:scale-[102%] transition-scale duration-300 flex-1">
            {" "}
            <h1 className=" text-pink-600 text-2xl font-bold text-center">
              Preserve Every Memory
            </h1>
            <p className=" p-2 text-slate-600 font-semibold text-sm text-start">
              At Chiommy’s Cake and Surprises, we believe in creating moments
              that last a lifetime. Our custom frames, whether photo frames or
              decorative art are perfect for commemorating special moments and
              adding a personal touch to your space.
            </p>
            <h1 className=" text-pink-600 text-2xl font-bold text-center">
              Celebrate with Chiommy’s Cake
            </h1>
            <p className=" p-2 text-slate-600 font-semibold text-sm text-start">
              From exquisite cakes to curated food trays, thoughtful surprises,
              and custom frames, we’re here to make every occasion sweeter, more
              meaningful, and truly unforgettable. Explore our offerings today
              and let us bring your celebrations to life!
            </p>
          </article>
        </div>
      </div>
    </>
  );
}

export default About;
