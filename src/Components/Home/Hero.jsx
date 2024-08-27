import React from "react";

const Hero = () => {
  return (
    <>
      <div className="w-full flex flex-col lg:flex-row items-start pt-16 gap-10">
        <div className="flex flex-col items-start w-full lg:w-[50%]">
          <span className="sm:text-[8vw]  md:text-[8vw] lg:text-[4.5vw]  text-[11vw] font-semibold pt-10 text-gray-800 leading-tight">
            Write a Title Here. Click to Add and Edit Title Text.
          </span>
          <p className=" text-[1.1rem] sm:text-[1.5rem] pt-5 pb-5 font-light ">
            This is a space to welcome visitors to the site. Add an engaging
            image or video.{" "}
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
