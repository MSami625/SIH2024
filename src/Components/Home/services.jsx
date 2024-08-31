import React from "react";

function Services({ animate }) {
  const servicesData = [
    {
      head: "Enhanced Clarity and Ease of Understanding",
      description:
        "Transforming complex language and technical jargon into easily understandable information ensures that institutes comprehend AICTE's requirements with clarity.",
    },
    {
      head: "Customized Guidance and Relevant Documentation",
      description:
        "The portal dynamically generates documentation templates and fee structures based on the specific course requirements inputted by the institute, ensuring relevance and accuracy.",
    },
    {
      head: "Time and Resource Efficiency",
      description:
        "By automating the parsing and presentation of information, Fusion significantly reduces the time and effort required to interpret and navigate the Approval Process Handbook.",
    },
    {
      head: "Increased Accuracy and Compliance",
      description:
        "Clear instructions provided by Fusion facilitate accurate adherence to AICTE's guidelines, resulting in higher-quality submissions and reduced need for reworks.",
    },
    {
      head: "Continuous Updates and Real-time Assistance",
      description:
        "The AI-based portal ensures continuous updates to reflect changes in the Approval Process Handbook and offers real-time assistance to address queries during the approval process.",
    },
  ];

  return (
    <div
      className={`w-full flex flex-col items-center gap-16 relative min-h-[60vh]  text-white duration-1000 ${
        animate.services > 200 ? "-translate-x-0" : "-translate-x-full"
      }`}
      id="services"
    >
      <div className="w-[85%]">
        {console.log(animate.services)}
        <h1 className="text-6xl font-extrabold underline">Services</h1>
      </div>
      <div className="flex flex-col gap-16 w-[85%]">
        {servicesData.map((data, index) => (
          <div className="w-full flex gap-8 group">
            <div
              key={index}
              className={`w-[30%] h-[30vh] cursor-default group border-2 group-hover:scale-110 border-white shadow-lg duration-500 p-8 group relative hidden md:flex items-center justify-center glassmorph ${
                index % 2 !== 0 ? "order-2" : ""
              }`}
            >
              <h1 className="font-bold text-6xl text-center opacity-100 group-hover:top-0 group-hover:left-1 group-hover:text-xl group-hover:opacity-70 absolute">
                {`0${index + 1}`}
              </h1>
              <p className="text-3xl font-extrabold opacity-0 group-hover:opacity-100 duration-500">
                {data.head}
              </p>
            </div>
            <div className="relative w-full border-2 border-white shadow-lg duration-500 p-8 flex items-center justify-center text-xl glassmorph">
              <p className="font-bold text-3xl absolute opacity-100 group-hover:opacity-0 duration-500 text-center px-2 md:px-auto">
                {data.head}
              </p>
              <p className="opacity-0 group-hover:opacity-100 duration-500 text-justify">
                {data.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;
