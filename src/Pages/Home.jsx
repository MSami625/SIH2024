import React, { useEffect, useState } from "react";
import Nav from "../Components/navbar";
import Hero from "../Components/Hero";
import Services from "../Components/services";

function Home() {
  const sitedata = {
    navbarData: [
      { text: "Home", link: "/", active: true },
      { text: "About", link: "/about" },
      { text: "Demo1", link: "/demo1" },
      { text: "Demo2", link: "/demo2" },
    ],
  };
  return (
  <>
     <Nav navbarData={sitedata.navbarData} />
     
    <div className="ml-[8vw] mr-[8vw]">
      <Hero />
      <Services />
    </div>
    </>
  );
}

export default Home;
