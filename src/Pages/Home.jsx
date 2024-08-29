import React, { useEffect, useState } from "react";
import { Parallax } from "react-scroll-parallax";
import Nav from "../Components/navbar";
import Hero from "../Components/Home/Hero";
import Services from "../Components/Home/services";
import Footer from "../Components/footer";
import Particles from "../Components/background";
import Faq from "../Components/Home/faq";

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
    heroData: [
      {
        heading: "Write a Title Here. Click to Add and Edit Title Text.",
        subheading:
          "This is a space to welcome visitors to the site. Add an engaging image or video.",
      },
    ],
  };
  return (
    <>
      <Nav navbarData={sitedata.navbarData} />
      <div className="mx-[8vw]">
        <Particles />
        <Parallax speed={-50}>
          <Hero heroData={sitedata.heroData} />
        </Parallax>
      </div>
      <Parallax speed={200} translateY={[-5, 2]}>
        <Services />
        <Faq />
      </Parallax>
      <Footer footerData={sitedata.footerData} />
    </>
  );
}

export default Home;
