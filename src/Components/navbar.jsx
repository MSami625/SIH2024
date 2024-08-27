import React, { useState, useEffect, useRef } from "react";
import logoImage from "./Assets/logo.png";
import { IoMenu } from "react-icons/io5";
import { IconContext } from "react-icons";

function navbar({ navbarData }) {
  const [active, setActive] = useState(false);
  const navRef = useRef(null);
  const toggleActive = () => {
    setActive((prevActive) => !prevActive);
  };
  const handleClickOutside = (event) => {
    if (navRef.current && !navRef.current.contains(event.target)) {
      setActive(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navList = (
    <div
      className="flex flex-col lg:flex-row w-max gap-4 lg:gap-8 items-center"
      ref={navRef}
    >
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
    </div>
  );

  return (
    <div className="top-8 z-50 flex lg:inline items-center justify-between sticky ">
      <div className="flex items-center justify-between  mx-8 lg:mx-24 px-6 lg:px-8 py-4 rounded-full shadow-[0_0_30px_rgba(0,0,0,0.15)] w-max lg:w-auto duration-300">
        <div className="w-max flex items-center gap-1 lg:gap-2">
          <img src={logoImage} alt="" className="w-8 lg:w-10" />
          <a href="/" className="text-xl lg:text-2xl">
            FusionX
          </a>
        </div>
        <div className="hidden lg:flex gap-8">
          {navList}
          <button className="rounded-full px-8 py-2 duration-300 cursor-pointer bg-black text-white border-2 hover:border-[#968f8f] hover:bg-white hover:text-black active:scale-[0.95]">
            Click Me
          </button>
        </div>
      </div>
      <div
        className={`flex lg:hidden absolute shadow-[0_0_30px_rgba(0,0,0,0.15)] mr-8 right-0 top-0 p-3 rounded-lg ${
          active ? "" : ""
        } `}
      >
        <div
          className={`overflow-hidden duration-500 ${
            active ? "w-24 h-[148px]" : "w-0 h-0"
          }`}
        >
          {navList}
        </div>
        <div className="w-max" onClick={toggleActive}>
          <IconContext.Provider
            value={{ style: { height: "24px", width: "24px" } }}
          >
            <IoMenu />
          </IconContext.Provider>
        </div>
      </div>
    </div>
  );
}

export default navbar;
