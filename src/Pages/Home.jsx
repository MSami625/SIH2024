import React, { useEffect, useState } from "react";
import Nav from "../Components/navbar";
import Footer from "../Components/footer";

function Home() {
  const sitedata = {
    navbarData: [
      { text: "Home", link: "/", active: true },
      { text: "About", link: "/about" },
      { text: "Demo1", link: "/demo1" },
      { text: "Demo2", link: "/demo2" },
    ],
    footerData: [],
  };
  return (
    <div className="">
      <Nav navbarData={sitedata.navbarData} />
      <Footer footerData={sitedata.footerData} />
    </div>
  );
}

export default Home;
