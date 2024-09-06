import React from "react";
import Nav from "../Components/navbar";
import UpcomingEvents from "../Components/upcomingEvents";

function Network() {
  const siteData = {
    navbarData: {
      logoText: "FusionX",
      navItems: [
        { text: "Home", link: "/" },
        { text: "Engage", link: "/Engage" },
        { text: "Network", link: "/", active: true },
        { text: "Events", link: "/Events" },
        { text: "Directory", link: "/Directory" },
        { text: "Forum", link: "/Forum" },
      ],
    },
    dropdownOptions: {
      promotion: ["UI UX Promotion", "Design Conference", "Tech Meetup"],
      location: ["Jakarta Selatan", "Bali", "Yogyakarta"],
      dates: ["Any date", "Sep 14, 2019", "Sep 18, 2019"],
    },
    upcomingEvents: [
      {
        id: 1,
        title: "Indonesia - Korea Conference",
        date: "Sep 18, 2019",
        location: "Yogyakarta, Indonesia",
        price: "Rs. 900 /-",
        image: "https://via.placeholder.com/300x200",
        free: false,
      },
      {
        id: 2,
        title: "Dream World in Jakarta",
        date: "Sep 17, 2019",
        location: "Jakarta, Indonesia",
        price: "Free",
        image: "https://via.placeholder.com/300x200",
        free: true,
      },
      {
        id: 3,
        title: "Pesta Kembang Api Terbesar",
        date: "Sep 16, 2019",
        location: "Jakarta, Indonesia",
        price: "Rs. 1500 /-",
        image: "https://via.placeholder.com/300x200",
        free: false,
      },
    ],
  };

  const checkDistance = (x1, y1, x2, y2, minDistance) => {
    const dx = x1 - x2;
    const dy = y1 - y2;
    return Math.sqrt(dx * dx + dy * dy) > minDistance;
  };

  const generateImageContainers = (count, radius, minDistance, content) => {
    const containers = [];
    const positions = [];
    const texts = [
      "Discover Meaningful Networking",
      "Expand Your Professional Circle",
      "Find Like-Minded Professionals",
    ]; // Add different texts for each image

    for (let i = 0; i < count; i++) {
      let positionX, positionY, validPosition;
      let attempts = 0;

      do {
        const angle = -Math.random() * 180;
        positionX = 50 + radius * Math.cos((angle * Math.PI) / 180);
        positionY = 50 + radius * Math.sin((angle * Math.PI) / 180);
        validPosition = positions.every(([x, y]) =>
          checkDistance(positionX, positionY, x, y, minDistance)
        );
        attempts++;
      } while (!validPosition && attempts < 100);

      positions.push([positionX, positionY]);

      containers.push(
        <div
          key={i}
          className="absolute flex flex-col gap-4 w-max duration-300"
          style={{
            top: `${positionY}%`,
            left: `${positionX}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          {content(i, texts[i % texts.length])} {/* Pass the dynamic text */}
        </div>
      );
    }

    return containers;
  };

  return (
    <div className="bg-[#D1E9F6] min-h-screen">
      <Nav navbarData={siteData.navbarData} />

      {/* Hero */}
      <div className="flex justify-center items-center h-[90vh] sticky top-[10vh]">
        <div className="absolute w-[45vw] h-[45vw] rounded-full border-2 border-slate-100 p-20 translate-y-24 shadow-[0_0_10px_rgba(0,0,0,.4)] animate-[ping_3s_linear_infinite]"></div>
        <div className="absolute w-[45vw] h-[45vw] rounded-full border-2 border-slate-100 p-20 translate-y-24 shadow-[0_0_10px_rgba(0,0,0,.4)] animate-[ping_3s_linear_1s_infinite]"></div>
        <div className="absolute w-[45vw] h-[45vw] rounded-full border-2 border-slate-100 p-20 translate-y-24 shadow-[0_0_10px_rgba(0,0,0,.4)] animate-[ping_3s_linear_2s_infinite]"></div>
        <div className="relative w-[45vw] h-[45vw] rounded-full border-2 border-slate-100 p-20 translate-y-24 shadow-[0_0_10px_rgba(0,0,0,.4)]">
          {generateImageContainers(3, 50, 15, (i, text) => (
            <>
              <p
                className={`-top-12 w-max px-4 text-white font-bold bg-blue-400 py-1 before:absolute before:w-6 before:h-4 before:rotate-[45deg] before:top-5 before:bg-blue-400 before:z-[-1] absolute ${
                  i % 2 === 0
                    ? "right-0 before:right-2"
                    : "left-0 before:left-2"
                }`}
              >
                {text}
              </p>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJo1MiPQp3IIdp54vvRDXlhbqlhXW9v1v6kw&s"
                alt={`Container ${i + 1}`}
                className="w-12 h-12 rounded-full border-2 border-slate-300"
              />
            </>
          ))}
          <div className="relative w-full h-full rounded-full border-2 border-slate-100 translate-y-8 shadow-[0_0_10px_rgba(0,0,0,.4)]">
            {generateImageContainers(2, 50, 10, () => (
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJo1MiPQp3IIdp54vvRDXlhbqlhXW9v1v6kw&s"
                alt="Nested Container"
                className="w-12 h-12 rounded-full border-2 border-slate-300"
              />
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 bg-transparent p-4 rounded-lg min-w-[35vw] h-[28vh] flex flex-col items-center">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJo1MiPQp3IIdp54vvRDXlhbqlhXW9v1v6kw&s"
            alt=""
            className="w-24 h-24 rounded-full border-2 border-white -translate-y-16"
          />
          <div className="flex flex-col w-2/3 items-center text-center gap-2 -translate-y-12">
            <p className="text-4xl font-bold">GET MENTORED</p>
            <p className="text-md">
              Building relevant connections can be hard, with our premium
              subscription, get mentored!
            </p>
          </div>
        </div>
      </div>

      {/* Events */}
      <div className="w-full px-12 py-8 relative bg-white">
        <p className="text-5xl font-bold mb-12">EVENTS</p>
        <div className="bg-white rounded-lg shadow-md flex overflow-hidden">
          <div className="w-2/3">
            <img
              className="h-full w-full object-cover"
              src="https://wuelev8-user-bucket-prod.s3-ap-south-1.amazonaws.com/SIH_logo_2024_horizontal1724405745636.png"
              alt="Event"
            />
          </div>
          <div className="w-1/3 p-6">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Made for Those Who Do
            </h2>
            <p className="text-sm text-gray-500 mb-4">Photo by Saepul Rohman</p>
            <div className="mb-6">
              {Object.keys(siteData.dropdownOptions).map((key) => (
                <select key={key} className="w-full p-3 border rounded-lg mb-4">
                  {siteData.dropdownOptions[key].map((option, index) => (
                    <option key={index}>{option}</option>
                  ))}
                </select>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end relative">
          <div className="absolute -bottom-12 bg-white shadow-lg rounded-lg p-6 w-72">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Date & Time
            </h3>
            <p className="text-gray-600 mb-4">
              Saturday, Sep 14, 2019 at 20:30 PM
            </p>
            <button className="text-purple-500 underline mb-4">
              Add to Calendar
            </button>
            <button className="w-full bg-purple-500 text-white py-2 px-4 rounded-lg mb-2">
              Book Now (Free)
            </button>
            <button className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-lg">
              Promoter Program
            </button>
            <p className="text-center text-gray-400 mt-2">No Refunds</p>
          </div>
        </div>

        <UpcomingEvents events={siteData.upcomingEvents} eventPage={false} />
      </div>
    </div>
  );
}

export default Network;
