import React, { useState, useEffect } from "react";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { auth } from "../Firebase";

const Nav = ({ navbarData, active }) => {
  const { logoText, navItems } = navbarData;
  const [openNav, setOpenNav] = React.useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // This effect runs on component mount
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    // Clean up the observer when component unmounts
    return () => unsubscribe();
  }, []);

  const isLoggedIn = () => {
    return !!user; // Returns true if user is logged in, false otherwise
  };

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="md:mb-4 mt-2 p-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {navItems.map((navbarData, index) => (
        <Typography
          key={index}
          as="li"
          variant="small"
          color="blue-gray"
          className={`p-1 font-normal relative before:absolute before:bg-black before:bottom-0 before:left-0 before:w-full before:h-[1.5px] lg:before:hover:scale-x-100 before:origin-left before:duration-500
          ${navbarData.active ? "before:scale-x-100" : "before:scale-x-0"}
            `}
        >
          <Link to={navbarData.link} className="flex items-center text-[16px]">
            {navbarData.text}
          </Link>
        </Typography>
      ))}
      {isLoggedIn() ? (
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className={`flex gap-8 p-1 font-normal`}
        >
          <Link
            to="/Dashboard"
            className={`flex items-center text-[16px] relative before:absolute before:bg-black before:bottom-0 before:left-0 before:w-full before:h-[1.5px] before:scale-x-0 before:hover:scale-x-100 before:origin-left before:duration-500
         `}
          >
            Dashboard
          </Link>
          <Link
            to="/Jobs"
            className={`flex items-center text-[16px] relative before:absolute before:bg-black before:bottom-0 before:left-0 before:w-full before:h-[1.5px] lg:before:hover:scale-x-100 before:origin-left before:duration-500
        ${active ? "before:scale-x-100" : "before:scale-x-0"} `}
          >
            Jobs
          </Link>
        </Typography>
      ) : (
        <></>
      )}
    </ul>
  );

  return (
    <Navbar className="text-['inherit'] top-0 sticky z-50 h-max max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-4 border-0 shadow-lg">
      <div className="flex items-center justify-between pl-4 text-blue-gray-900">
        <div className={`flex items-center gap-4 w-full justify-between`}>
          <Typography
            as="a"
            href=""
            className="cursor-pointer flex items-center lg:text-2xl font-['poppins']"
          >
            {logoText}
          </Typography>
          <div className="mr-4 hidden lg:flex items-center">
            {navList}
            {isLoggedIn() ? ( // Show Log Out button if user is logged in
              <button
                className="bg-[#9a5bf8] text-white hover:bg-white hover:text-black shadow-lg focus:scale-90 duration-300 py-2 px-4 rounded-lg"
                onClick={() => auth.signOut()}
              >
                Log Out
              </button>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <IconButton
            variant="text"
            className="h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden flex"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </IconButton>
        </div>
      </div>
      <Collapse open={openNav}>{navList}</Collapse>
    </Navbar>
  );
};

export default Nav;
