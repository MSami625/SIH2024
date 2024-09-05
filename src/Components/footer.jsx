import React, { useState } from "react";
import { Typography, Button } from "@material-tailwind/react";

function Footer({ data }) {
  const {
    active,
    logoText,
    menuItems,
    buttonText,
    contactInfo,
    moreInfo,
    socialIcons,
  } = data;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    feedback: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <footer className="flex flex-col items-center md:pb-4 glassmorph bg-[rgba(255,255,255)] relative">
      {/* feedback */}
      <div
        className={`${
          active ? "flex" : "hidden"
        } flex-col md:flex-row justify-around items-center overflow-hidden w-screen h-[80vh] border-b-[1px] border-[rgba(0,0,0,.5)] z-1 p-8 relative bg-white before:hidden md:before:inline before:absolute before:w-screen before:h-screen before:top-0 before:-left-[45vw] before:bg-[#9a5bf8]`}
      >
        <p className="absolute top-8 left-auto md:left-20 text-5xl font-bold text-black md:text-white">
          Feedback
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center mt-12 w-full md:w-1/2 h-max rounded-lg shadow-[0_0_10px_rgba(0,0,0,.5)] p-4 z-[1] bg-white"
        >
          <div className="py-4 flex flex-col gap-2">
            <label htmlFor="name">Name:</label>
            <input
              className="w-full border-[1px] border-[rgba(0,0,0,0.1)] rounded-sm p-2 focus:outline-none focus:border-b-black"
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="py-4 flex flex-col gap-2">
            <label htmlFor="email">Email:</label>
            <input
              className="w-full border-[1px] border-[rgba(0,0,0,0.1)] rounded-sm p-2 focus:outline-none focus:border-b-black"
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="py-4 flex flex-col gap-2">
            <label htmlFor="feedback">Feedback:</label>
            <textarea
              className="w-full border-[1px] border-[rgba(0,0,0,0.1)] rounded-sm p-2 focus:outline-none focus:border-b-black"
              id="feedback"
              name="feedback"
              value={formData.feedback}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="bg-[#9a5bf8] text-white py-2">
            Submit
          </button>
        </form>
        <img
          src="https://greatergood.berkeley.edu/images/jcogs_img/cache/GettyImages-1416315615_-_abcdef_-_16756da2050f2a5c89512a94e3aea69904c7adb9-fb_-_abcdef_-_fdc70d8290e0358d046ff461d05c915f0321c021.jpg"
          alt=""
          className="hidden md:inline object-cover h-[52vh] shadow-[0_0_10px_rgba(0,0,0,0.5)]"
        />
      </div>

      {/* Footer Menu */}
      <div
        className={`w-[90%] flex flex-col gap-6 sm:gap-0 sm:flex-row items-center sm:items-start justify-between border-b-[1px] border-[rgba(0,0,0,.5)] p-8 md:p-16 md:pb-24 ${
          active ? "" : "border-t-[1px]"
        }`}
      >
        <Typography
          as="a"
          href="#"
          className="cursor-pointer flex text-3xl font-['poppins']"
        >
          {logoText}
        </Typography>
        <div className="flex flex-col gap-8 sm:gap-12">
          <ul className="flex flex-col gap-2 items-center sm:items-start">
            {menuItems.items.map((item, index) => (
              <li
                key={index}
                className="w-[max-content] font-normal relative before:absolute before:bg-black before:bottom-0 before:left-0 before:w-[102%] before:h-[1.5px] before:scale-x-0 lg:before:hover:scale-x-100 before:origin-left before:duration-500"
              >
                <a href={menuItems.links[index]} className="flex items-center">
                  {item}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="/login"
            className="w-[100%] hover:text-black bg-black hover:bg-white border-2 border-black px-4 text-white py-2 rounded-lg duration-300"
          >
            {buttonText}
          </a>
        </div>
        <hr className="block sm:hidden h-[1px] w-[100%] border-black" />
        <div className="w-[90%] text-justify md:w-1/2 flex flex-col gap-8 sm:gap-12 items-center sm:items-start">
          <p>{moreInfo.about}</p>
          <p className="font-bold">{contactInfo.address}</p>
        </div>
      </div>

      {/* Footer Detail */}
      <div className="flex flex-col sm:flex-row w-[80%] items-center sm:justify-between">
        <p className="py-2 sm:py-8">© 2024 by FusionX</p>
        <div className="flex items-center justify-end gap-2 sm:w-[40%] sm:py-8">
          {socialIcons.icons.map((icon, index) => (
            <p key={index} className="h-[100%] m-0">
              <a href={socialIcons.links[index]} className="">
                <svg
                  viewBox="0 0 50 50"
                  xmlns="http://www.w3.org/2000/svg"
                  role="none"
                  width="40"
                  height="40"
                  className="hover:invert hover:bg-white rounded duration-300 p-1"
                >
                  <path d={icon}></path>
                </svg>
              </a>
            </p>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
