import React from "react";
import logoImage from "./Assets/logo.png";
import { FaReddit, FaLinkedin, FaGithub } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

function footer({ footerData }) {
  const iconArr = [
    {
      icon: (
        <FaReddit className="w-8 h-8 p-[2px] hover:-translate-y-1 duration-300" />
      ),
      link: "/",
    },
    {
      icon: (
        <FaLinkedin className="w-8 h-8 p-[1px] hover:-translate-y-1 duration-300" />
      ),
      link: "/",
    },
    {
      icon: (
        <FaSquareXTwitter className="w-8 h-8 p-[1px] hover:-translate-y-1 duration-300" />
      ),
      link: "/",
    },
    {
      icon: (
        <FaGithub className="w-8 h-8 p-[1px] hover:-translate-y-1 duration-300" />
      ),
      link: "/",
    },
  ];
  return (
    <div className=" bg-[rgba(255,255,255,1)] flex flex-col items-center">
      {/* footer */}
      <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-0 w-[90%] border-black border-b-2 px-12 pt-24 h-[50vh]">
        <div className="w-max flex md:flex-col flex-row gap-2 lg:gap-0">
          <img src={logoImage} alt="" className="w-8 lg:w-10" />
          <a href="/" className="text-xl lg:text-2xl">
            FusionX
          </a>
        </div>
        <div className="w-max">
          <p className="font-bold mb-4 mt-4 md:mt-0">MENU</p>
          <div className="flex flex-col gap-2">
            {footerData.map((items, index) => (
              <a
                key={index}
                href={items.link}
                className={`${
                  items.active ? "text-blue-500" : "hover:text-blue-500"
                }`}
              >
                {items.text}
              </a>
            ))}
          </div>
        </div>
        <div className="w-max">
          <p className="font-bold mb-4 mt-4 md:mt-0">CONTACT</p>
          <div className="flex flex-col gap-2">
            <p>123-456-7890</p>
            <a
              href="mailto:demo@mysite.com"
              className="hover:text-blue-500 hover:underline"
            >
              demo@mysite.com
            </a>
          </div>
        </div>
        <div className="w-max text-wrap">
          <p className="font-bold mb-4 mt-4 md:mt-0">ADDRESS</p>
          <div className="flex flex-col gap-2">
            <address>
              Galgotias University <br /> Greater Noida, Uttar Pradesh <br />{" "}
              203201
            </address>
          </div>
        </div>
        <div className="flex gap-4 md:hidden">
          {iconArr.map((content, index) => (
            <a key={index} href={content.link}>
              {content.icon}
            </a>
          ))}
        </div>
      </div>
      <div className="py-8 w-[85%] flex justify-between">
        <p>Privacy Policy</p>
        <div className="lg:flex gap-4 hidden">
          {iconArr.map((content, index) => (
            <a key={index} href={content.link}>
              {content.icon}
            </a>
          ))}
        </div>
        <p>© 2024 by FusionX</p>
      </div>
    </div>
  );
}

export default footer;
