import React from "react";

function About() {
  return (
    <>
      <div className="  my-[50px] max-w-[90%] mx-auto rounded-[20px] bg-pink-600">
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
                  Our mission
                </h2>
                <p className=" md:text-[20px] text-[16px] font-[500] flex flex-col gap-[20px] items-center  md:w-[500px] text-center md:text-start">
                  Our mission is to empower individuals, families, and
                  businesses to find their perfect property and achieve their
                  real estate dreams. We are committed to providing exceptional
                  service, unmatched expertise, and innovative solutions.
                </p>
              </section>
              <section className="flex flex-col gap-[10px] items-start ">
                <h2 className=" md:text-[28px] text-[20px] font-[700] flex flex-col gap-[20px] items-center ">
                  Our vission
                </h2>
                <p className=" md:text-[20px] text-[16px] font-[500] flex flex-col gap-[20px] items-center  md:w-[500px] text-center md:text-start">
                  Our vision is to redefine the real estate experience by
                  setting new standards of excellence, innovation, and
                  sustainability. We aspire to be the trusted partner for our
                  clients and the leading name in the real estate industry.
                </p>
              </section>
            </section>
          </div>
        </section>
      </div>
      {/* // part 2 */}
      <div className=" max-w-[1500px] mx-auto p-5 ">
        {/*detail*/}
        <div className=" my-20 flex sm:flex-row flex-col sm:gap-0 gap-10">
          <article className=" sm:text-3xl sm:p-10 text-xl shadow-md shadow-pink-600 rounded-xl   sm:rounded-tr-full sm:rounded-bl-full text-center overflow-scroll hover:scale-[102%] transition-scale duration-300">
            {" "}
            <h1 className=" text-pink-600 text-2xl font-bold">Home / About</h1>
            <p className=" p-2 text-slate-600 font-semibold text-sm text-start">
              Livingstone Estates is the main agency in Estepona, specialising
              in high-end properties and beachfront apartments. With 24 years of
              experience, we cater to clients from all over the world seeking
              their dream homes, profitable investments, and exceptional
              rentals.
            </p>
          </article>
          <article className=" sm:text-3xl sm:p-10 text-xl shadow-md shadow-pink-600 rounded-xl   sm:rounded-tr-full sm:rounded-bl-full text-center  overflow-scroll hover:scale-[102%] transition-scale duration-300">
            {" "}
            <h1 className=" text-pink-600 text-2xl font-bold">
              Property Agents
            </h1>
            <p className=" p-2 text-slate-600 font-semibold text-sm text-start  ">
              By prioritising professionalism, teamwork, and a client-centric
              approach, Livingstone Estates builds lasting partnerships based on
              trust and exceeding expectations with an excellent marketing
              strategy, we showcase properties effectively, standing out in a
              competitive market.
            </p>
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
                WHY BUY WITH{" "}
                <span className=" text-white text-2xl sm:text-6xl">US</span>
              </h1>
              <div>
                <p className="  text-white font-semibold text-sm text-start flex  flex-wrap  sm:w-[400px]">
                  Livingstone Estates is your trusted source for an extensive
                  range of premium Estepona real estate listings, offering both
                  sales and rentals. Our privileged access to many
                  exclusively-contracted properties reflects the trusted
                  position we hold in the Estepona property market, thanks to
                  our deep local knowledge and real estate expertise.
                </p>
              </div>
            </div>
          </div>
          {/* opt 2 */}
          <div className="  flex-1 flex sm:flex-row  gap-10 flex-col">
            <img
              className="sm:w-[20%] w-full h-[400px] object-cover sm:rounded-t-full  rounded-md hover:scale-[102%] translate-scale duration-300 bg-white"
              src="img"
              alt=""
            />
            <div className=" flex-1 flex-col h-fit my-auto">
              <h1 className=" text-2xl  text-pink-600 font-bold my-5  font-serif">
                OUR MARKETING{" "}
                <span className=" text-slate-600 text-2xl sm:text-6xl">
                  STRA..
                </span>
              </h1>
              <div>
                <p className="  text-slate-600 font-semibold text-sm text-start flex  flex-wrap  sm:w-[400px]">
                  Livingstone Estates stands as a beacon in Estepona’s luxury
                  real estate sector, boasting unmatched expertise and a global
                  reach. Our legacy is anchored in innovative marketing
                  strategies, driven by a team of industry experts. We excel in
                  connecting with potential buyers, whether through broad
                  marketing campaigns or discreet off-market sales. Trust
                  Livingstone Estates to elevate the sale of your Estepona
                  property, consistently surpassing industry expectations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
