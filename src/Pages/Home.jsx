import React, { useEffect, useState } from "react";
import Nav from "../Components/navbar";
import Hero from "../Components/Hero";

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
    <div className="">
      <Nav navbarData={sitedata.navbarData} />  
      <Hero />
    </div>
  );
}

export default Home;
