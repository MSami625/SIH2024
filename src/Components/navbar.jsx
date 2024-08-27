import React from "react";
import logoImage from "./Assets/logo.png";
import { IoMenu } from "react-icons/io5";
import { IconContext } from "react-icons";

function navbar({ navbarData }) {
  return (
    <div className="top-8 z-50 flex lg:inline items-center justify-between sticky ">
      <div className="flex items-center justify-between mt-8 mx-8 lg:mx-24 px-8 py-4 rounded-full shadow-[0_0_30px_rgba(0,0,0,0.15)] w-max lg:w-auto duration-300">
        <div className="w-max flex items-center gap-2">
          <img src={logoImage} alt="" className="w-10" />
          <a href="/" className="text-2xl">
            FusionX
          </a>
        </div>
        <div className="hidden lg:flex w-max gap-8 items-center">
          {navbarData.map((items, index) => (
            <a
              key={index}
              href={items.link}
              className={`relative before:absolute before:bg-[#988f8f] before:bottom-0 before:left-0 before:w-full before:h-[1.5px] hover:before:scale-x-100 before:origin-left before:duration-500 ${
                items.active ? "" : "before:scale-x-0"
              }`}
            >
              {items.text}
            </a>
          ))}
          <button className="rounded-full px-8 py-2 duration-300 cursor-pointer bg-black text-white border-2 hover:border-[#968f8f] hover:bg-white hover:text-black active:scale-[0.95]">
            Click Me
          </button>
        </div>
      </div>
      <div className="flex lg:hidden items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.15)] w-max rounded-full p-2 mr-8">
        <IconContext.Provider
          value={{ style: { height: "24px", width: "24px" } }}
        >
          <IoMenu />
        </IconContext.Provider>
      </div>
    </div>
  );
}

export default navbar;
