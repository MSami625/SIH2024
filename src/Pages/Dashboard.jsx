import React, { useState, useEffect } from "react";
import { AiFillHome } from "react-icons/ai";
import { IoDocumentTextOutline, IoLogOutOutline } from "react-icons/io5";
import { BiSolidBarChartSquare } from "react-icons/bi";
import { FaChartLine } from "react-icons/fa6";
import { BsPlayCircleFill } from "react-icons/bs";
import DashHome from "../Components/Dashboard/DashHome";
import { MdSpaceDashboard } from "react-icons/md";

import Header from "../Components/Dashboard/header"; // Assuming Header is used somewhere
import EditProfile from "../Components/Dashboard/EditProfile";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null); // State to hold the user data
  const [activeComponent, setActiveComponent] = useState(
    <DashHome userData={userData} />
  ); // State for the active content
  const [id, setId] = useState(0);

  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out the user
      navigate("/"); // Navigate to the homepage after logout
    } catch (error) {
      console.error("Logout failed: ", error);
      alert("Logout failed. Please try again.");
    }
  };

  /// Function to fetch user data using the uid
  const fetchUserData = async (uid) => {
    try {
      const response = await axios.get(
        `http://192.168.137.201:1337/api/userdata?filters[uid][$eq]=${uid}&populate=jobs`
      );
      if (response.data && response.data.data.length > 0) {
        setUserData(response.data.data[0]); // Set the first user data result
        setId(response.data.data[0].id);
      } else {
        console.log("No user data found");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserData(user.uid); // Fetch user data when the user is authenticated
      } else {
        console.log("No authenticated user");
      }
    });

    // Cleanup the listener when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []);

  // Navigation items
  const navItems = [
    {
      id: 0,
      icon: <AiFillHome className="w-5 h-5" />,
      text: "Dashboard",
      display: <DashHome userData={userData} />, // Pass userData to DashHome
    },
    {
      id: 1,
      icon: <BiSolidBarChartSquare className="w-5 h-5" />,
      text: "Profile",
      display: <EditProfile id={id} />,
    },

    {
      id: 2,
      icon: <BsPlayCircleFill className="w-5 h-5" />,
      text: "Media",
      display: "Media Content",
    },
  ];

  const [activeItem, setActiveItem] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <Header userData={userData} />
      <div className="w-screen h-screen pl-8 pr-8 pt-4 flex  items-start">
        {/* Navbar */}
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`absolute z-50 flex flex-col items-center min-h-[80vh] rounded-3xl transition-all duration-300 ease-in-out ${
            isHovered ? "w-60" : "w-16"
          } bg-[rgb(154,91,248)]`}
        >
          <div className="flex flex-col items-center gap-8 mt-6 justify-start hover:text-[rgb(154,91,248)]">
            {/* Render navigation items */}
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
                <a
                  href="#"
                  className={`flex items-center overflow-hidden ${
                    isHovered ? "w-44" : ""
                  }`}
                >
                  <div className="w-6">{item.icon}</div>
                  <span className="ml-2">{item.text}</span>
                </a>
              </div>
            ))}
            {/* Home link */}
            <div
              className={`flex items-center w-10 max-h-[40px] gap-4 p-2 rounded-2xl cursor-pointer text-lg transition-all duration-300 ease-in-out ${
                activeItem === -1
                  ? "bg-white p-[10px] shadow-xl text-[rgb(154,91,248)]"
                  : "bg-transparent hover:bg-white hover:text-[rgb(154,91,248)] text-white"
              } ${isHovered ? "w-44" : ""}`}
            >
              <a
                href="./"
                className={`flex items-center overflow-hidden ${
                  isHovered ? "w-44" : ""
                }`}
              >
                <div className="w-6">
                  <MdSpaceDashboard className="w-5 h-5" />
                </div>
                <span className="ml-2">Home</span>
              </a>
            </div>

            {/* Forum link */}
            <div
              onClick={() => handleNavClick(-1)}
              className={`flex items-center w-10 max-h-[40px] gap-4 p-2 rounded-2xl cursor-pointer text-lg transition-all duration-300 ease-in-out ${
                activeItem === -1
                  ? "bg-white p-[10px] shadow-xl text-[rgb(154,91,248)]"
                  : "bg-transparent hover:bg-white hover:text-[rgb(154,91,248)] text-white"
              } ${isHovered ? "w-44" : ""}`}
            >
              <a
                href="./Forum"
                className={`flex items-center overflow-hidden ${
                  isHovered ? "w-44" : ""
                }`}
              >
                <div className="w-6">
                  <FaChartLine className="w-5 h-5" />
                </div>
                <span className="ml-2">Forum</span>
              </a>
            </div>
          </div>

          <div className="absolute bottom-10  p-2 px-3  rounded-lg hover:cursor-pointer duration-300 flex justify-center bg-transparent hover:bg-white hover:text-[rgb(154,91,248)]   text-white text-3xl">
            <a onClick={handleLogout}>
              <IoLogOutOutline />
            </a>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex pl-16  rounded-lg max-h-[80vh] ml-6 overflow-hidden  flex-col gap-10 items-center flex-wrap justify-start ">
          {navItems[activeItem].display}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
