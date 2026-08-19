import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const RootLayout = () => {
  return (
    <div className="bg-black">
      <Navbar />
      <div className="p-10">
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
