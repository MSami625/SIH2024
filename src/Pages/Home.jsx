import React, { useEffect, useState } from "react";
import { Parallax } from "react-scroll-parallax";
import Nav from "../Components/navbar";
import Hero from "../Components/Home/Hero";
import Services from "../Components/Home/services";
import Footer from "../Components/footer";
import Particles from "../Components/background";

function Home() {
  // Visibility Animation Controller
  const elemArr = ["services"];
  const initialState = elemArr.reduce((key, elementId) => {
    key[elementId] = 0;
    return key;
  }, {});
  const [inViewport, setInViewport] = useState(initialState);
  const calculateInViewport = (elementIds) => {
    elementIds.forEach((elementId) => {
      const element = document.getElementById(elementId);
      if (element) {
        const elH = element.offsetHeight;
        const H = window.innerHeight;
        const r = element.getBoundingClientRect();
        const t = r.top;
        const b = r.bottom;

        setInViewport((prevValues) => ({
          ...prevValues,
          [elementId]: Math.max(
            0,
            t > 0 ? Math.min(elH, H - t) : Math.min(b, H)
          ),
        }));
      }
    });
  };
  useEffect(() => {
    calculateInViewport(elemArr);

    const handleScrollResize = () => {
      calculateInViewport(elemArr);
    };

    window.addEventListener("scroll", handleScrollResize);
    window.addEventListener("resize", handleScrollResize);

    return () => {
      window.removeEventListener("scroll", handleScrollResize);
      window.removeEventListener("resize", handleScrollResize);
    };
  }, elemArr);

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
      <Particles />
      <Parallax speed={-25}>
        <Hero heroData={sitedata.heroData} />
      </Parallax>
      <Parallax speed={100} translateY={[0, -2]}>
        <Services animate={inViewport} />
      </Parallax>
      <Footer footerData={sitedata.footerData} />
    </>
  );
}

export default Home;
