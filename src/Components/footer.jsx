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
    <div className="mt-32 bg-white flex flex-col items-center">
      {/* feedback form */}
      <div className="bg-[#fff] shadow-[0_20px_rgba(255,255,255,1),0_0_20px_rgba(0,0,0,0.15)] rounded-t-[50px] h-max w-[85%] lg:grid grid-cols-[40%_50%] justify-center p-8 lg:p-12 -translate-y-24">
        <div>
          <p className="text-[45px] md:text-[70px] font-[600] text-wrap flex lg:flex-col gap-6 lg:gap-0">
            Get<span className="underline md:no-underline">in Touch</span>
          </p>
          <div className="hidden lg:flex relative">
            <div className="rounded-full w-32 h-32 bg-cyan-200 absolute top-10"></div>
            <div className="rounded-full w-32 h-32 bg-cyan-500 absolute top-40 left-40"></div>
          </div>
        </div>
        <div>
          <form
            action=""
            className="flex flex-col justify-center lg:grid grid-cols-2 grid-rows-4 lg:items-center gap-x-2 gap-y-4 lg:gap-y-0 mt-8 lg:m-0"
          >
            <label
              htmlFor="Name"
              className="col-span-2 flex flex-col font-[600]"
            >
              Name*
              <input
                type="text"
                name="Name"
                className="bg-transparent border-black border-b-2 focus:outline-none py-2"
                required
              />
            </label>
            <label
              htmlFor="Email"
              className="col-start-1 flex flex-col font-[600]"
            >
              Email*
              <input
                type="email"
                placeholder="you@example.com"
                name="Email"
                className="bg-transparent border-black border-b-2 focus:outline-none py-2"
                required
              />
            </label>
            <label
              htmlFor="Number"
              className="col-start-2 flex flex-col font-[600]"
            >
              Phone
              <input
                type="number"
                name="Number"
                placeholder="123-456-7890"
                className="bg-transparent border-black border-b-2 focus:outline-none py-2"
              />
            </label>
            <label
              htmlFor="Feedback"
              className="row-start-3 col-span-2 flex flex-col font-[600]"
            >
              Feedback
              <textarea
                name=""
                id=""
                rows={4}
                className="bg-transparent border-black border-b-2 focus:outline-none"
                required
              ></textarea>
            </label>
            <button className="bg-black px-4 py-2 rounded-full text-white text-center col-span-2 row-start-4 h-max hover:text-black hover:bg-white hover:border-[#968f8f] border-2 active:scale-[0.95] duration-300 shadow-[0_0_30px_rgba(0,0,0,0.15)]">
              Submit
            </button>
          </form>
        </div>
      </div>

      {/* footer */}
      <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-0 w-[90%] border-black border-t-2 border-b-2 p-12 -translate-y-12">
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
      <div className="pb-8 w-[85%] flex justify-between">
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
