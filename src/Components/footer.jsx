import React from "react";
import logoImage from "./Assets/logo.png";

function footer({ footerData }) {
  return (
    <div className="mt-32 bg-[#3C3D37] flex flex-col items-center">
      {/* feedback form */}
      <div className="bg-[#E1F7F5] rounded-t-[50px] h-max w-[85%] grid grid-cols-[30%_50%] justify-center gap-40 p-12 -translate-y-28">
        <div>
          <p className="text-[70px] font-[600] text-wrap flex flex-col">
            Get <span>in Touch</span>
          </p>
        </div>
        <div>
          <form
            action=""
            className="grid grid-cols-2 grid-rows-4 items-center gap-x-2"
          >
            <label htmlFor="Name" className="col-span-2 flex flex-col">
              Name*
              <input
                type="text"
                name="Name"
                className="bg-transparent border-black border-b-2 focus:outline-none py-2"
                required
              />
            </label>
            <label htmlFor="Email" className="col-start-1 flex flex-col">
              Email*
              <input
                type="email"
                placeholder="you@example.com"
                name="Email"
                className="bg-transparent border-black border-b-2 focus:outline-none py-2"
                required
              />
            </label>
            <label htmlFor="Number" className="col-start-2 flex flex-col">
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
              className="row-start-3 col-span-2 flex flex-col"
            >
              Feedback
              <textarea
                name=""
                id=""
                rows={4}
                className="bg-transparent border-black border-b-2 focus:outline-none focus:bg-white duration-300"
                required
              ></textarea>
            </label>
            <button className="bg-black px-4 py-2 rounded-full text-white text-center col-span-2 row-start-4 h-max hover:text-black hover:bg-white duration-300 shadow-[0_0_30px_rgba(0,0,0,0.15)]">
              Submit
            </button>
          </form>
        </div>
      </div>

      {/* footer */}
      <div className="grid grid-cols-5 grid-rows-1 w-[85%] text-white border-white border-b-2 pb-12">
        <div className="w-max flex flex-col col-start-1">
          <img src={logoImage} alt="" className="w-8 lg:w-10 invert" />
          <a href="/" className="text-xl lg:text-2xl">
            FusionX
          </a>
        </div>
        <div className="col-start-2 w-max justify-self-center">
          <p className="font-bold mb-4">MENU</p>
          <div className="flex flex-col gap-2">
            <a href="">Demo1</a>
            <a href="">Demo2</a>
            <a href="">Demo3</a>
          </div>
        </div>
        <div className="col-start-3 w-max justify-self-center">
          <p className="font-bold mb-4">CONTACT</p>
          <div className="flex flex-col gap-2">
            <p>123-456-7890</p>
            <p>demo@mysite.com</p>
          </div>
        </div>
        <div className="col-start-4 w-max justify-self-center">
          <p className="font-bold mb-4">SOCIALS</p>
          <div className="flex flex-col gap-2">
            <a href="">Demo</a>
            <a href="">Demo</a>
          </div>
        </div>
        <div className="col-start-5 w-max text-wrap justify-self-end">
          <p className="font-bold mb-4">ADDRESS</p>
          <div className="flex flex-col gap-2">
            <p>Lorem molestias alias</p>
            <p>blanditiis ad maxime</p>
          </div>
        </div>
      </div>
      <div className="py-8 text-white w-[85%] flex justify-between">
        <p>Privacy Policy</p>
        <p>© 2024 by FusionX</p>
      </div>
    </div>
  );
}

export default footer;
