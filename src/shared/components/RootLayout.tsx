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
    </div>
  );
};

export default RootLayout;
