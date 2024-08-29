import React from "react";

const Hero = ({heroData}) => {
  return (
    <>
      <div className="w-full flex flex-col lg:flex-row items-start py-6 gap-10 text-white relative mb-96">
        <div className="flex flex-col items-start w-full lg:w-[50%]">
          <span className="sm:text-[8vw] md:text-[8vw] lg:text-[4.5vw] text-[11vw] font-semibold pt-10 leading-tight">
            {heroData[0].heading}
          </span>
          <p className=" text-[1.1rem] sm:text-[1.5rem] pt-5 pb-5 font-light text-justify">
          {heroData[0].subheading}
         
          </p>
          <button className="rounded-full px-11 py-3 duration-300 cursor-pointer bg-black text-white border-2 hover:border-[#968f8f] hover:bg-white hover:text-black active:scale-[0.95]">
            Click Me
          </button>
        </div>
      </div>
    </>
  );
};

export default Hero;
