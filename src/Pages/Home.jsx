import React, { useEffect, useState } from "react";
import { Parallax } from "react-scroll-parallax";
import Nav from "../Components/navbar";
import Hero from "../Components/Home/Hero";
import Services from "../Components/Home/services";
import Footer from "../Components/footer";
import Particles from "../Components/background";

function Home() {
  const sitedata = {
    navbarData: [
      { text: "Home", link: "/", active: true },
      { text: "About", link: "/about" },
      { text: "Demo1", link: "/demo1" },
      { text: "Demo2", link: "/demo2" },
    ],
    footerData: [
      { text: "Home", link: "/", active: true },
      { text: "About", link: "/about" },
      { text: "Demo1", link: "/demo1" },
      { text: "Demo2", link: "/demo2" },
    ],
  };
  return (
    <>
      <Nav navbarData={sitedata.navbarData} />
      <div className="mx-[8vw]">
        <Particles />
        <Parallax speed={-20}>
          <Hero />
        </Parallax>
        <Services />
      </div>
      <Parallax speed={20} translateY={[10, -5]}>
        <Footer footerData={sitedata.footerData} />
      </Parallax>
    </>
  );
}

export default Home;
