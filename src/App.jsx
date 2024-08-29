import React, { useState, useEffect } from "react";
import "./App.css";
import Lenis from "@studio-freight/lenis";
import Home from "./Pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ParallaxProvider } from "react-scroll-parallax";
import { Sugar } from "react-preloaders";

const lenis = new Lenis();

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

function App() {
  const [isLoaded, setIsLoaded] = useState(true);
  useEffect(() => {
    const handleLoad = () => {
      setTimeout(() => {
        setIsLoaded(false);
      }, 1000);
    };
    window.addEventListener("load", handleLoad);
    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  return (
    <React.Fragment>
      <ParallaxProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Home" element={<Home />} />
          </Routes>
        </Router>
      </ParallaxProvider>
      <Sugar
        customLoading={isLoaded}
        time={0}
        animation={"fade"}
        color={"#fff"}
        background={"linear-gradient(45deg, #a1c4fd 0%, #c2e9fb 100%)"}
      />
    </React.Fragment>
  );
}

export default App;
