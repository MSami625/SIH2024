import React from "react";

const UpcomingEvents = ({ events, eventPage }) => {
  return (
    <div>
      <h3 className="text-3xl font-bold text-gray-800 mt-12">
        Upcoming Events
      </h3>
      <div className={`flex gap-4 mt-6 ${eventPage ? "flex-col" : "flex-row"}`}>
        {events.map((event) => (
          <div
            key={event.id}
            className="w-full bg-white shadow-md rounded-lg p-4"
          >
            <img
              className="w-full h-40 object-cover rounded-md mb-4"
              src="https://wuelev8-user-bucket-prod.s3-ap-south-1.amazonaws.com/SIH_logo_2024_horizontal1724405745636.png"
              alt={event.title}
            />
            <h4 className="text-xl font-bold text-gray-800">{event.title}</h4>
            <p className="text-gray-600">{event.date}</p>
            <p className="text-gray-600">{event.location}</p>
            <p className="text-lg font-semibold mt-2">
              {event.free ? "Free" : event.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvents;
