import React, { useState } from "react";
import { AiFillHome } from "react-icons/ai";
import { IoDocumentTextOutline, IoLogOutOutline } from "react-icons/io5";
import { BiSolidBarChartSquare } from "react-icons/bi";
import { FaChartLine } from "react-icons/fa6";
import { BsPlayCircleFill } from "react-icons/bs";
import DashHome from "../Components/Dashboard/DashHome";
import Forums from "../Components/Dashboard/Forums";
import Header from "../Components/Dashboard/header";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase";
import { useNavigate } from "react-router-dom";

function Dashboard() {

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out the user
      navigate("/"); // Navigate to the homepage after logout
    } catch (error) {
      console.error("Logout failed: ", error);
      // Optionally, show an error message or alert
      alert("Logout failed. Please try again.");
    }
  };

  
  const navItems = [
    { id: 0, icon: <AiFillHome />, text: "Home", display: <DashHome /> },
    {
      id: 1,
      icon: <IoDocumentTextOutline />,
      text: "Documents",
      display: <Forums />,
    },
    {
      id: 2,
      icon: <BiSolidBarChartSquare />,
      text: "Analytics",
      display: "Analytics Content",
    },
    { id: 3, icon: <FaChartLine />, text: "Trends", display: "Trends Content" },
    {
      id: 4,
      icon: <BsPlayCircleFill />,
      text: "Media",
      display: "Media Content",
    },
  ];

  const [activeItem, setActiveItem] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <Header />
      <div className="w-screen h-screen pl-8 pr-8 pt-4 grid grid-rows-[30%_70%] grid-cols-[20%_80%]">
        {/* Navbar */}
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`relative flex flex-col items-center min-h-[80vh] rounded-3xl transition-all duration-300 ease-in-out ${isHovered ? "w-60" : "w-20"} bg-[rgb(154,91,248)]`}
        >
          <div className="flex flex-col items-center gap-8 mt-6 justify-start hover:text-[rgb(154,91,248)]">
            {navItems.map((item) => (
              <div
                onClick={(e) => {
                  e.preventDefault();
                  setActiveItem(item.id);
                }}
                key={item.id}
                className={`flex items-center w-10 max-h-[40px] gap-4 p-2 rounded-2xl cursor-pointer text-lg transition-all duration-300 ease-in-out ${
                  activeItem === item.id
                    ? "bg-white p-[10px] shadow-xl text-[rgb(154,91,248)]"
                    : "bg-transparent hover:bg-white hover:text-[rgb(154,91,248)] text-white"
                } ${isHovered ? "w-44" : ""}`}
              >
                <a href="#" className={`flex items-center overflow-hidden ${isHovered ? "w-44" : ""}`}>
                  <div>{item.icon}</div>
                  <span className="ml-2">{item.text}</span>
                </a>
              </div>
            ))}
          </div>

          <div className="absolute bottom-10 w-full flex justify-center text-white text-2xl">
            <a onClick={handleLogout}>
              <IoLogOutOutline />
            </a>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col gap-10 items-center justify-center w-full h-full">
          {navItems[activeItem].display}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
