import React from "react";

function Services() {

  const servicesData = [
    {
      id: 1,
      title: "Name of Service",
      description: "This is the space to describe the service and explain how customers or clients can benefit from it. It’s an opportunity to add a short description that includes relevant details, like pricing, duration, location and how to book the service",
    },
    {
      id: 2,
      title: "Name of Service",
      description: "This is the space to describe the service and explain how customers or clients can benefit from it. It’s an opportunity to add a short description that includes relevant details, like pricing, duration, location and how to book the service",
    },
    {
      id: 3,
      title: "Name of Service",
      description: "This is the space to describe the service and explain how customers or clients can benefit from it. It’s an opportunity to add a short description that includes relevant details, like pricing, duration, location and how to book the service",
    },
    {
      id: 4,
      title: "Name of Service",
      description: "This is the space to describe the service and explain how customers or clients can benefit from it. It’s an opportunity to add a short description that includes relevant details, like pricing, duration, location and how to book the service",
    },
  
  ];

  return (
    <div className="bg-[#ecedf8] pt-20">
      <div className="flex flex-col justify-center items-start px-[8vw] gap-10 pb-20 border-b-[1px] border-b-black">
        <div className="px-4 py-2 text-xs font-bold bg-[#2F2B36] tracking-widest text-white border-2 rounded-tr-xl">
          SERVICES
        </div>
        <p className="text-4xl text-neutral-700 font-semibold">Committed to excellence</p>
      </div>
      
      <div className="flex w-full flex-col lg:flex-col">
        {servicesData.map((service) => (
          <div key={service.id} className="border-b-[1px] border-b-black">
          <div className="w-full flex gap-6 items-start lg:gap-48 px-[8vw] py-12 ease-in-out duration-300  flex-col lg:flex-row hover:text-white hover:bg-neutral-500">
              <span className="text-5xl font-semibold">0{service.id}</span>
              <h3 className="text-3xl text-center">{service.title}</h3>
              <p className="text-base leading-7 text-justify">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;
