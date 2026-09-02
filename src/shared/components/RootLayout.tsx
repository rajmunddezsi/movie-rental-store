import { Outlet, ScrollRestoration } from "react-router-dom";
import Navbar from "./Navbar";

const RootLayout = () => {
  return (
    <div className="bg-black min-h-screen">
      <div className="bg-light"></div>
      <Navbar />
      <div className="h-max">
        <Outlet />
      </div>
      <ScrollRestoration />
      <svg style={{ display: "none" }}>
        <filter id="glass-distortion">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.012 0.012"
            numOctaves="8"
            seed="5"
            result="noise"
          />
          <feGaussianBlur in="noise" stdDeviation="2" result="blurred" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="blurred"
            scale="30"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>
    </div>
  );
};

export default RootLayout;
