import React from "react";
import "./App.css";
import Lenis from "@studio-freight/lenis";
import Home from "./Pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ParallaxProvider } from "react-scroll-parallax";
import { Circle2 } from "react-preloaders";

const lenis = new Lenis();

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

function App() {
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
      <Circle2 time={1000} />
    </React.Fragment>
  );
}

export default App;
