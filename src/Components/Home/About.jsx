import React from "react";

function About({ aboutData }) {
  const aboutItems = [aboutData.connect, aboutData.network, aboutData.donate];

  return (
    <section className="flex flex-col items-center pt-8 overflow-x-hidden bg-white relative">
      {/* Head */}
      <div className="md:w-3/5 flex flex-col items-center text-center z-10 relative">
        <p className="text-xl md:text-4xl py-6"></p>
        <p className="text-3xl md:text-6xl leading-70 w-[90%]">
          The platform is designed to enhance connections and support for our
          graduates.
        </p>
      </div>

      {/* About */}
      {aboutItems.map((data, index) => (
        <div key={index} className="w-full py-20 md:px-20 px-4">
          <div className="flex flex-col md:flex-row items-center border-2 border-black">
            <div
              className={`flex items-center w-full ${
                index % 2 === 0 ? "md:order-1" : ""
              }`}
            >
              <img
                src={data.image}
                alt={data.title}
                className="w-full h-[50vh] object-cover"
              />
            </div>
            <div className="w-full py-8 md:p-0">
              <div className="w-[90%] flex flex-col gap-4 pl-8">
                <h1 className="text-5xl font-bold">{data.title}</h1>
                <p className="text-justify">{data.description}</p>
                <a
                  href="/"
                  className="bg-black w-max text-white px-12 py-2 hover:bg-white hover:text-black duration-300 border-2 hover:border-black"
                >
                  {data.btn}
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

export default About;
